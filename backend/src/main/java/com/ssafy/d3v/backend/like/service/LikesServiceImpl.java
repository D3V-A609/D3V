package com.ssafy.d3v.backend.like.service;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.like.dto.LikesRequest;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.like.entity.Likes;
import com.ssafy.d3v.backend.like.repository.LikesRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {
    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final AnswerRepository answerRepository;
    private final Long memberId = 1L;

    @Override
    @Transactional
    public void create(long answerId, LikesRequest request) {
        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 ID: " + request.memberId()));

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변 입니다. 답변 ID: " + answerId));

        boolean exists = likesRepository.findByAnswerAndMember(answer, member).isPresent();

        if (!exists) {
            Likes likes = Likes.builder()
                    .member(member)
                    .answer(answer)
                    .build();
            likesRepository.save(likes);
        }
    }

    @Override
    @Transactional
    public void delete(long answerId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 ID: " + memberId));

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변 입니다. 답변 ID: " + answerId));

        Likes likes = likesRepository.findByAnswerAndMember(answer, member)
                .orElseThrow(() -> new IllegalArgumentException("좋아요가 없습니다."));

        likesRepository.delete(likes);
    }
}