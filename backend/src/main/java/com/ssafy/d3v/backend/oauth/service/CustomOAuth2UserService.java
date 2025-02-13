package com.ssafy.d3v.backend.oauth.service;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.oauth.entity.ProviderType;
import com.ssafy.d3v.backend.oauth.entity.RoleType;
import com.ssafy.d3v.backend.oauth.entity.UserPrincipal;
import com.ssafy.d3v.backend.oauth.exception.OAuthProviderMissMatchException;
import com.ssafy.d3v.backend.oauth.info.OAuth2UserInfo;
import com.ssafy.d3v.backend.oauth.info.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final String ALREADY_SIGNED_UP_SOCIAL = "already_signed_up_social";
    private static final String ALREADY_SIGNED_UP_LOCAL = "already_signed_up_local";

    private final MemberRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("CustomOAuth2UserService loadUser Error: {} ", ex.getMessage());
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(
                userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Member savedUser = userRepository.findMemberByEmail(userInfo.getEmail()).orElseThrow();

        if (savedUser != null) {
            if (savedUser.getProviderType() == ProviderType.LOCAL) {
                log.error("CustomOAuth2UserService process Error: 기존 회원입니다. 자체 로그인을 이용해 주세요. ");
                throw new OAuthProviderMissMatchException(ALREADY_SIGNED_UP_LOCAL);
            }

            if (providerType != savedUser.getProviderType()) {
                log.error("CustomOAuth2UserService process Error: 다른 소셜에서 가입된 이메일 입니다. 해당 소셜 로그인을 이용해 주세요.");
                throw new OAuthProviderMissMatchException(ALREADY_SIGNED_UP_SOCIAL);
            }
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private Member createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        Member user = Member.builder()
                .email(userInfo.getEmail())
                .nickname(userInfo.getName())
                .providerType(providerType)
                .role(RoleType.ROLE_USER)
                .profileImg(userInfo.getImageUrl())
                .build();

        return userRepository.saveAndFlush(user);
    }

    private void updateUser(Member user, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
            user.setNickname(userInfo.getName());
        }
        user.setProfileImg(user.getProfileImg());
    }
}
