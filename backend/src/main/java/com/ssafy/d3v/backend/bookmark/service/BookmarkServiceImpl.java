package com.ssafy.d3v.backend.bookmark.service;

import com.ssafy.d3v.backend.bookmark.dto.BookmarkCreateDto;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkDetailResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkSelectionResponse;
import com.ssafy.d3v.backend.bookmark.dto.QuestionInfo;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import com.ssafy.d3v.backend.bookmark.entity.BookmarkQuestion;
import com.ssafy.d3v.backend.bookmark.repository.BookmarkQuestionRepository;
import com.ssafy.d3v.backend.bookmark.repository.BookmarkRepository;
import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.FollowRepository;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    private final QuestionRepository questionRepository;
    private final BookmarkQuestionRepository bookmarkQuestionRepository;
    private final FollowRepository followRepository;

    // 북마크 생성
    @Override
    @Transactional
    public void create(BookmarkCreateDto request) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
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
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();

        // 본인 소유 북마크 확인
        if (!bookmark.getMember().getId().equals(member.getId())) {
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
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow();
        // memberId -> member.getId() 로 수정 예정
        if (!bookmark.getMember().getId().equals(member.getId())) {
            throw new SecurityException("본인의 북마크만 삭제 가능");
        }
        bookmarkRepository.delete(bookmark);
    }

    // 북마크 단일 조회
    @Override
    public BookmarkDetailResponse get(Long id) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
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

        return BookmarkResponse.from(bookmarks);
    }

    // 질문의 북마크들 조회
    @Override
    public BookmarkSelectionResponse getQuestionBookmarks(Long questionId) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
        List<Bookmark> bookmarks = bookmarkRepository.findByMember(member);
        List<Long> bookmarkIds = bookmarkQuestionRepository.findBookmarkIdsByQuestionIdAndMemberId(questionId,
                member.getId());
        return BookmarkSelectionResponse.from(bookmarks, bookmarkIds);
    }

    // 질문의 북마크들 수정
    @Override
    @Transactional
    public BookmarkSelectionResponse updateQuestionBookmarks(Long questionId, List<Long> newBookmarkIds) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);

        List<Bookmark> userBookmarks = bookmarkRepository.findByMember(member);
        List<Long> userBookmarkIds = userBookmarks.stream()
                .map(Bookmark::getId)
                .toList();

        List<Long> currentBookmarkIds = bookmarkQuestionRepository.findBookmarkIdsByQuestionId(questionId);
        List<Long> currentBookmarkList = new ArrayList<>(currentBookmarkIds);

        List<Long> validNewBookmarkIds = newBookmarkIds.stream()
                .filter(userBookmarkIds::contains)
                .toList();

        List<Long> toAdd = validNewBookmarkIds.stream()
                .filter(id -> !currentBookmarkList.contains(id))
                .toList();

        List<Long> toRemove = currentBookmarkIds.stream()
                .filter(id -> !validNewBookmarkIds.contains(id))
                .toList();

        if (!toRemove.isEmpty()) {
            bookmarkQuestionRepository.deleteByQuestionIdAndBookmarkIds(questionId, toRemove);
        }

        for (Long bookmarkId : toAdd) {
            Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                    .orElseThrow(() -> new RuntimeException("추가하려는 북마크가 존재하지 않습니다."));
            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("해당 질문이 존재하지 않습니다."));

            bookmarkQuestionRepository.save(BookmarkQuestion.builder()
                    .bookmark(bookmark)
                    .question(question)
                    .build());
        }

        List<Long> updatedBookmarkIds = bookmarkQuestionRepository.findBookmarkIdsByQuestionId(questionId);
        return BookmarkSelectionResponse.from(userBookmarks, new ArrayList<>(updatedBookmarkIds));
    }

    // 북마크에 질문들 추가
    @Override
    @Transactional
    public void addQuestions(Long bookmarkId, List<Long> questionIds) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new RuntimeException("해당 북마크가 존재하지 않습니다."));
        if (!bookmark.getMember().getId().equals(member.getId())) {
            throw new RuntimeException("본인의 북마크에만 질문을 추가할 수 있습니다.");
        }
        List<Long> existingQuestionIds = bookmarkQuestionRepository.findQuestionIdsByBookmarkIdAndMemberId(bookmarkId,
                member.getId());

        List<Question> questionsToAdd = questionRepository.findAllById(
                questionIds.stream().filter(id -> !existingQuestionIds.contains(id)).toList()
        );

        List<BookmarkQuestion> newEntries = new ArrayList<>();
        for (Question question : questionsToAdd) {
            newEntries.add(BookmarkQuestion.builder()
                    .bookmark(bookmark)
                    .question(question)
                    .build());
        }

        if (!newEntries.isEmpty()) {
            bookmarkQuestionRepository.saveAll(newEntries);
        }
    }

    // 북마크에 있는 질문 삭제
    @Override
    @Transactional
    public void deleteQuestion(Long bookmarkId, Long questionId) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId).orElseThrow();
        if (!bookmark.getMember().equals(member)) {
            throw new RuntimeException("본인 북마크가 아니어요");
        }
        bookmarkQuestionRepository.deleteByBookmarkIdAndQuestionId(bookmarkId, questionId);

    }

    @Override
    @Transactional
    public void createDefault(Member member) {
        Bookmark defaultBookmark = Bookmark.builder()
                .member(member)
                .name("기본 북마크")
                .accessLevel(AccessLevel.PUBLIC)
                .description("기본 북마크입니다.")
                .build();
        bookmarkRepository.save(defaultBookmark);
    }

    @Override
    public boolean isBookmarkedQuestion(Long questionId) {
        String memberName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(memberName);
        return bookmarkQuestionRepository.existsByQuestionIdAndMemberId(questionId, member.getId());
    }


    private boolean isAccessible(Bookmark bookmark) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(userName);
        Member owner = bookmark.getMember();
        if (bookmark.getAccessLevel() == AccessLevel.PUBLIC) {
            return true;
        }
        if (bookmark.getAccessLevel() == AccessLevel.PRIVATE && owner.equals(member)) {
            return true;
        }
        if (bookmark.getAccessLevel() == AccessLevel.PROTECTED) {
            return followRepository.existsByFollowerAndFollowing(owner, member)
                    && followRepository.existsByFollowerAndFollowing(member, owner)
                    || bookmark.getMember().getId().equals(member.getId());
        }

        return false;

    }
}
