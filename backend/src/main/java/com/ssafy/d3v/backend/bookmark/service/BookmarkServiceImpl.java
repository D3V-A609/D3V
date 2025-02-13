package com.ssafy.d3v.backend.bookmark.service;

import com.ssafy.d3v.backend.bookmark.dto.BookmarkCreateDto;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkDetailResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkResponse;
import com.ssafy.d3v.backend.bookmark.dto.QuestionInfo;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import com.ssafy.d3v.backend.bookmark.repository.BookmarkRepository;
import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.FollowRepository;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    //    private final QuestionRepository questionRepository;
    private final Long testId = 1L;
    private final FollowRepository followRepository;

    // 북마크 생성
    @Override
    @Transactional
    public void create(BookmarkCreateDto request) {
        Member member = memberRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("사용자가 없습니다."));
//        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
//        Member member = memberRepository.findMemberByEmail(userName).orElseThrow();
        Bookmark bookmark = Bookmark.builder()
                .member(member)
                .name(request.name())
                .description(request.description())
                .accessLevel(AccessLevel.valueOf(request.accessLevel()))
                .build();
        bookmarkRepository.save(bookmark);
    }

    // 북마크 수정
    @Override
    @Transactional
    public void update(Long id, BookmarkCreateDto request) {
//        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
//        Member member = memberRepository.findMemberByEmail(userName).orElseThrow();
        Member member = memberRepository.findById(testId).orElseThrow();
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();

        // 본인 소유 북마크 확인
        if (!bookmark.getMember().getId().equals(id)) {
            throw new SecurityException("본인의 북마크만 수정 가능합니다");
        }

        // null 값 확인
        String updatedName = request.name() != null ? request.name() : bookmark.getName();
        String updatedDescription =
                request.description() != null ? request.description() : bookmark.getDescription();
        String updatedAccessLevel =
                request.accessLevel() != null ? request.accessLevel() : bookmark.getAccessLevel().toString();

        bookmark.update(
                updatedName,
                updatedDescription,
                AccessLevel.valueOf(updatedAccessLevel)
        );
    }

    // 북마크 삭제 (하드)
    @Override
    @Transactional
    public void delete(Long id) {
//        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
//        Member member = memberRepository.findMemberByEmail(userName).orElseThrow();
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();
        // memberId -> member.getId() 로 수정 예정
        if (!bookmark.getMember().getId().equals(testId)) {
            throw new SecurityException("본인의 북마크만 삭제 가능");
        }
        bookmarkRepository.delete(bookmark);
    }

    // 북마크 단일 조회
    @Override
    public BookmarkDetailResponse get(Long id) {
//        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
//        Member member = memberRepository.findMemberByEmail(userName).orElseThrow();
        Bookmark bookmark = bookmarkRepository.findById(id).orElseThrow();
        if (!isAccessible(bookmark)) {
            throw new RuntimeException("접근 권한이 없습니다.");
        }
        List<QuestionInfo> questionInfoList = bookmark.getBookmarkQuestions()
                .stream()
                .map(bq -> QuestionInfo.from(bq.getQuestion()))
                .toList();
        return BookmarkDetailResponse.from(bookmark, questionInfoList);
    }

    // 북마크 전체 조회
    @Override
    public BookmarkResponse getAll(Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        List<Bookmark> bookmarks = bookmarkRepository.findByMember(member).stream()
                .filter(this::isAccessible)
                .toList();

        List<BookmarkResponse.BookmarkDto> bookmarkDtos = bookmarks.stream()
                .map(bookmark -> BookmarkResponse.BookmarkDto.from(
                        bookmark,
                        bookmark.getBookmarkQuestions().size()
                ))
                .toList();

        return BookmarkResponse.builder()
                .bookmarks(bookmarkDtos)
                .build();
    }


    private boolean isAccessible(Bookmark bookmark) {
//        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
//        Member member = memberRepository.findMemberByEmail(userName).orElseThrow();
        Member member = memberRepository.findById(testId).orElseThrow();
        Member owner = bookmark.getMember();
        if (bookmark.getAccessLevel() == AccessLevel.PUBLIC) {
            return true;
        }
        if (bookmark.getAccessLevel() == AccessLevel.PRIVATE && owner.equals(member)) {
            return true;
        }
        if (bookmark.getAccessLevel() == AccessLevel.PROTECTED) {
            return followRepository.existsByFollowerAndFollowing(owner, member);
        }

        return false;

    }

    // TODO: 2차 MVP 때 개발 시작 (북마크에 질문 추가, 수정, 삭제)

//    // 북마크에 질문 추가
//    @Override
//    @Transactional
//    public BookmarkDetailResponse addQuestion(Long bookmarkId, Long questionId) {
//        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
//                .orElseThrow();
//
//        Question question = questionRepository.
//    }
//
//    // 북마크에서 질문 삭제
//    @Override
//    @Transactional
//    public BookmarkDetailResponse deleteQuestion(Long bookmarkId, Long questionId) {
//
//    }
//
//    // 북마크 질문 순서 수정
//    @Override
//    @Transactional
//    public BookmarkDetailResponse updateQuestionOrder(Long bookmarkId, Long questionId, int order) {
//
//    }

}
