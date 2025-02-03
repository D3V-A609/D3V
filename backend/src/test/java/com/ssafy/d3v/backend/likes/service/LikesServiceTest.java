package com.ssafy.d3v.backend.likes.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.common.AccessLevel;
import com.ssafy.d3v.backend.like.dto.LikesRequest;
import com.ssafy.d3v.backend.like.entity.Likes;
import com.ssafy.d3v.backend.like.repository.LikesRepository;
import com.ssafy.d3v.backend.like.service.LikesServiceImpl;
import com.ssafy.d3v.backend.member.MemberRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.Question;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class LikesServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private LikesRepository likesRepository;

    @InjectMocks
    private LikesServiceImpl likesService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    @DisplayName("memberId와 answerId가 존재하는 경우 좋아요를 생성한다.")
    public void create_success() {
        int answerId = 1;
        LikesRequest request = new LikesRequest(1);
        Member mockMember = new Member("ollie", "by28287@gmail.com", "12343");
        Question mockQuestion = new Question("질문1", "모범답변1");
        Answer mockAnswer = new Answer(mockMember, mockQuestion, "내용", LocalDateTime.now(), AccessLevel.PRIVATE);

        when(memberRepository.findById(request.memberId())).thenReturn(Optional.of(mockMember));
        when(answerRepository.findById(answerId)).thenReturn(Optional.of(mockAnswer));

        assertDoesNotThrow(() -> likesService.create(answerId, request));

        verify(likesRepository, times(1)).save(Mockito.<Likes>any());
    }
    @Test
    @DisplayName("memberId에 대한 member가 존재하지 않는 경우 IllegalArgumentException 을 반환한다.")
    public void create_memberNotFound() {
        int answerId = 1;
        LikesRequest request = new LikesRequest(1);

        when(memberRepository.findById(request.memberId())).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> likesService.create(answerId, request));
    }
    @Test
    @DisplayName("answerId에 대한 answer가 존재하지 않는 경우 IllegalArgumentException 을 반환한다.")
    public void create_answerNotFound() {
        int answerId = 1;
        LikesRequest request = new LikesRequest(1);
        Member mockMember = new Member("ollie", "by28287@gmail.com", "12343");
        Question mockQuestion = new Question("질문1", "모범답변1");
        Answer mockAnswer = new Answer(mockMember, mockQuestion, "내용", LocalDateTime.now(), AccessLevel.PRIVATE);

        when(memberRepository.findById(request.memberId())).thenReturn(Optional.of(mockMember));
        when(answerRepository.findById(answerId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> likesService.create(answerId, request));
    }

    @Test
    @DisplayName("답변에 대한 좋아요를 취소한다.")
    public void delete_success() {
        int answerId = 1;
        int memberId = 1;
        Member mockMember = new Member("ollie", "by28287@gmail.com", "12343");
        Question mockQuestion = new Question("질문1", "모범답변1");
        Answer mockAnswer = new Answer(mockMember, mockQuestion, "내용", LocalDateTime.now(), AccessLevel.PRIVATE);
        Likes mockLikes = new Likes(mockMember, mockAnswer);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(mockMember));
        when(answerRepository.findById(answerId)).thenReturn(Optional.of(mockAnswer));
        when(likesRepository.findByAnswerIdAndMemberId(mockAnswer, mockMember)).thenReturn(Optional.of(mockLikes));

        assertDoesNotThrow(() -> likesService.delete(answerId));

        verify(likesRepository, times(1)).delete(mockLikes);
    }
    @Test
    @DisplayName("answerId와 memberId에 대한 좋아요가 없는 경우 IllegalArgumentException 을 반환한다.")
    public void delete_likesNotFound() {
        int answerId = 1;
        int memberId = 2;
        Member mockMember = new Member("ollie", "by28287@gmail.com", "12343");
        Answer mockAnswer = new Answer(mockMember, null, "내용", null, null);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(mockMember));
        when(answerRepository.findById(answerId)).thenReturn(Optional.of(mockAnswer));
        when(likesRepository.findByAnswerIdAndMemberId(mockAnswer, mockMember)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> likesService.delete(answerId));
    }
}
