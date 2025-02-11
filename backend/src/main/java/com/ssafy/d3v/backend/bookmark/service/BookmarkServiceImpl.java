package com.ssafy.d3v.backend.bookmark.service;

import com.ssafy.d3v.backend.bookmark.dto.BookmarkCreateDto;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkDetailResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkResponse;
import com.ssafy.d3v.backend.bookmark.dto.QuestionInfo;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import com.ssafy.d3v.backend.bookmark.entity.BookmarkQuestion;
import com.ssafy.d3v.backend.bookmark.repository.BookmarkQuestionRepository;
import com.ssafy.d3v.backend.bookmark.repository.BookmarkRepository;
import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    private final BookmarkQuestionRepository bookmarkQuestionRepository;
    private final QuestionRepository questionRepository;

    // 북마크 추가
    @Override
    @Transactional
    public void create(BookmarkCreateDto request) {
        Bookmark bookmark = Bookmark.builder()
                .name(request.getName())
                .description(request.getDescription())
                .accessLevel(AccessLevel.valueOf(request.getAccessLevel()))
                .build();
        Bookmark saved = bookmarkRepository.save(bookmark);
    }

    // 북마크 수정
    @Override
    @Transactional
    public void update(Long id, BookmarkCreateDto request) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();
        bookmark.update(
                request.getName(),
                request.getDescription(),
                AccessLevel.valueOf(request.getAccessLevel())
        );
    }

    // 북마크 삭제 (하드)
    @Override
    @Transactional
    public void delete(Long id) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();
        bookmarkRepository.delete(bookmark);
    }

    // 북마크 단일 조회
    @Override
    public BookmarkDetailResponse get(Long id) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();

        List<BookmarkQuestion> bookmarkQuestions = bookmarkQuestionRepository.findByBookmark(bookmark);
        List<QuestionInfo> questionInfoList = bookmarkQuestions.stream()
                .map(bq -> {
                    Question question = bq.getQuestion();
                    return QuestionInfo.builder()
                            .id(question.getId())
                            .content(question.getContent())
                            .build();
                })
                .toList();
        return BookmarkDetailResponse.builder()
                .id(bookmark.getId())
                .name(bookmark.getName())
                .description(bookmark.getDescription())
                .accessLevel(String.valueOf(bookmark.getAccessLevel()))
                .questions(questionInfoList).build();
    }

    // 북마크 전체 조회
    @Override
    public BookmarkResponse getAll(Long memberId) {
        // TODO: 로그인 구현 후 ACCESS LEVEL 에 따른 필터 로직 구현
        memberId = 1L;
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다."));
        List<Bookmark> bookmarks = bookmarkRepository.findByMember(member);

        // DTO 변환
        List<BookmarkResponse.BookmarkDto> bookmarkDtos = bookmarks.stream()
                .map(bookmark -> BookmarkResponse.BookmarkDto.builder()
                        .id(bookmark.getId())
                        .name(bookmark.getName())
                        .accessLevel(bookmark.getAccessLevel().name())
                        .questionCount(bookmarks.size())
                        .build())
                .toList();

        return BookmarkResponse.builder()
                .bookmarks(bookmarkDtos)
                .build();
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
