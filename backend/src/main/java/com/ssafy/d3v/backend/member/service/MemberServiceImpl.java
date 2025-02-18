package com.ssafy.d3v.backend.member.service;

import static com.ssafy.d3v.backend.common.jwt.JwtTokenProvider.getRefreshTokenExpireTimeCookie;
import static com.ssafy.d3v.backend.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN;

import com.ssafy.d3v.backend.bookmark.service.BookmarkService;
import com.ssafy.d3v.backend.common.jwt.JwtTokenProvider;
import com.ssafy.d3v.backend.common.jwt.TokenInfo;
import com.ssafy.d3v.backend.common.util.CookieUtil;
import com.ssafy.d3v.backend.common.util.HeaderUtil;
import com.ssafy.d3v.backend.common.util.Response;
import com.ssafy.d3v.backend.common.util.S3ImageUploader;
import com.ssafy.d3v.backend.common.util.SecurityUtil;
import com.ssafy.d3v.backend.member.dto.BasicMemberRequest;
import com.ssafy.d3v.backend.member.dto.BasicMemberResponse;
import com.ssafy.d3v.backend.member.dto.MemberLoginResponse;
import com.ssafy.d3v.backend.member.dto.MemberReqDto.Login;
import com.ssafy.d3v.backend.member.dto.MemberReqDto.SignUp;
import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import com.ssafy.d3v.backend.member.entity.History;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.FollowRepository;
import com.ssafy.d3v.backend.member.repository.HistoryRepository;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.oauth.entity.ProviderType;
import com.ssafy.d3v.backend.oauth.entity.RoleType;
import com.ssafy.d3v.backend.question.entity.JobRole;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.QueryTimeoutException;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final S3ImageUploader s3ImageUploader;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;
    private final HistoryRepository historyRepository;
    @Lazy
    private final BookmarkService bookmarkService;

    @Override
    public MemberResponse get(long memberId) {
        Member member = memberRepository.findMemberById(memberId).orElseThrow();
        return MemberResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImg(member.getProfileImg())
                .githubUrl(member.getGithubUrl())
                .maxStreak(member.getMaxStreak())
                .ongoingStreak(member.getOngoingStreak())
                .providerType(member.getProviderType())
                .createdAt(member.getCreatedAt())
                .favoriteJob(member.getFavoriteJob())
                .followerCount(followRepository.countByFollowing(member))
                .followingCount(followRepository.countByFollower(member))
                .build();
    }

    @Override
    public Long getMemberId() {
        String memberEmail = SecurityUtil.getCurrentMemberEmail();
        return memberRepository.findByEmail(memberEmail).orElseThrow().getId();
    }

    @Override
    @Transactional
    public MemberResponse update(MemberRequest memberRequest, MultipartFile profileImage) {
        Member member = getMember();

        if (!profileImage.isEmpty()) {
            s3ImageUploader.deleteImageFromS3(member.getProfileImg());
            String profileImg = s3ImageUploader.upload(profileImage);
            member.setProfileImg(profileImg);
        }

        Member updated = memberRepository.saveAndFlush(member.toBuilder()
                .nickname(memberRequest.nickname())
                .password(passwordEncoder.encode(memberRequest.password()))
                .githubUrl(memberRequest.githubUrl())
                .favoriteJob(memberRequest.favoriteJob())
                .build());

        return MemberResponse.builder()
                .memberId(updated.getId())
                .nickname(updated.getNickname())
                .email(updated.getEmail())
                .profileImg(updated.getProfileImg())
                .githubUrl(updated.getGithubUrl())
                .maxStreak(updated.getMaxStreak())
                .ongoingStreak(updated.getOngoingStreak())
                .providerType(updated.getProviderType())
                .createdAt(updated.getCreatedAt())
                .favoriteJob(updated.getFavoriteJob())
                .followerCount(followRepository.countByFollower(member))
                .followingCount(followRepository.countByFollowing(member))
                .build();
    }

    @Override
    @Transactional
    public void delete() {
        Member member = getMember();
        member.delete();
        memberRepository.saveAndFlush(member);
    }

    @Override
    public Member getMember() {
        String memberEmail = SecurityUtil.getCurrentMemberEmail();
        return memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 Email: " + memberEmail));
    }

    @Override
    @Transactional
    public ResponseEntity<?> signUp(SignUp signUp, MultipartFile profileImage) {
        if (memberRepository.existsByEmail(signUp.getEmail())) {
            return Response.badRequest("이미 회원가입된 이메일입니다.");
        }
        String ImgUrl = "";
        if (profileImage != null && !profileImage.isEmpty()) {
            ImgUrl = s3ImageUploader.upload(profileImage);
        }
        String nickname = signUp.getNickname();
        String job = signUp.getFavoriteJob();
        Member member = Member.builder()
                .email(signUp.getEmail())
                .nickname(nickname.substring(0, Math.min(15, nickname.length())))
                .password(passwordEncoder.encode(signUp.getPassword()))
                .profileImg(ImgUrl)
                .githubUrl(signUp.getGithubUrl())
                .maxStreak(0L)
                .ongoingStreak(0L)
                .role(RoleType.ROLE_USER)
                .providerType(ProviderType.LOCAL)
                .favoriteJob(JobRole.valueOf(job.toUpperCase()))
                .build();

        History history = History.builder()
                .member(member)
                .date(LocalDate.now())
                .count(0)
                .build();

        memberRepository.save(member);
        historyRepository.save(history);
        bookmarkService.createDefault(member);

        return Response.ok("회원가입에 성공하였습니다.");
    }

    @Override
    @Transactional
    public ResponseEntity<?> login(HttpServletResponse response, Login login) {
        try {
            Member member = validateUser(login.getEmail(), login.getPassword());

            if (member.getProviderType() != ProviderType.LOCAL) {
                return Response.badRequest("소셜 로그인을 이용해주세요.");
            }

            // 토큰 생성
            TokenInfo tokenInfo = jwtTokenProvider.generateToken(login.getEmail(), RoleType.ROLE_USER.name());

            // Redis에 RefreshToken 저장
            storeRefreshTokenInRedis(login.getEmail(), tokenInfo);

            log.info("로그인 토큰 생성 Access Token: " + tokenInfo.getAccessToken());
            log.info("로그인 토큰 생성 Refresh Token: " + tokenInfo.getRefreshToken());
            // 쿠키에 Refresh Token 저장
            CookieUtil.addCookie(response, REFRESH_TOKEN, tokenInfo.getRefreshToken(),
                    getRefreshTokenExpireTimeCookie());

            MemberLoginResponse memberLoginResponse = MemberLoginResponse.of(member, tokenInfo.getAccessToken());

            return Response.makeResponse(HttpStatus.OK, "로그인을 성공했습니다.", 0, memberLoginResponse);
        } catch (BadCredentialsException e) {
            log.error("Login failed: Invalid credentials - {}", e.getMessage());
            return Response.badRequest("비밀번호가 일치하지 않습니다.");
        } catch (RedisConnectionFailureException e) {
            log.error("Login failed: Redis connection error - {}", e.getMessage());
            return Response.serverError("레디스 서버 연결에 실패하였습니다.");
        } catch (QueryTimeoutException e) {
            log.error("Login failed: Redis timeout error - {}", e.getMessage());
            return Response.serverError("레디스 서버 연결에서 시간 초과가 발생하였습니다.");
        }
    }

    @Transactional
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

        // 1. Request Header 에서 Access Token 추출
        String accessToken = HeaderUtil.getAccessToken(request);

        // 2. Access Token 검증
        if (!jwtTokenProvider.validateToken(accessToken)) {
            return Response.badRequest("잘못된 요청입니다.");
        }

        // 3. Access Token 에서 Member 정보를 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        // 4. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" + authentication.getName());
        }
        // 5. 쿠키에서 Refresh Token 삭제
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);

        // 6. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        return Response.ok("로그아웃 되었습니다.");
    }

    private Member validateUser(String email, String password) {
        // 1. 이메일로 사용자 조회
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 존재하지 않습니다."));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3. 인증 성공 시 사용자 반환
        return member;
    }

    private void storeRefreshTokenInRedis(String username, TokenInfo tokenInfo) {
        redisTemplate.opsForValue().set(
                "RT:" + username,
                tokenInfo.getRefreshToken(),
                tokenInfo.getRefreshTokenExpirationTime(),
                TimeUnit.MILLISECONDS
        );
        log.info("Redis refresh token stored: {}", redisTemplate.keys("RT:*"));
    }

    @Override
    public List<BasicMemberResponse> getBasicInfo(List<BasicMemberRequest> basicMemberRequest) {
        List<BasicMemberResponse> responses = new ArrayList<>();
        for (BasicMemberRequest memberRequest : basicMemberRequest) {
            Member member = memberRepository.findMemberById(memberRequest.memberId())
                    .orElseThrow(() -> new IllegalArgumentException("회원이 일치하지 않습니다."));

            responses.add(BasicMemberResponse.builder()
                    .memberId(member.getId())
                    .nickname(member.getNickname())
                    .profileImg(member.getProfileImg())
                    .favoriteJob(member.getFavoriteJob())
                    .build());
        }
        return responses;
    }
}
