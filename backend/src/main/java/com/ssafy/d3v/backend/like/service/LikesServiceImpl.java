package com.ssafy.d3v.backend.like.service;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.like.dto.LikesRequest;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.like.entity.Likes;
import com.ssafy.d3v.backend.like.repository.LikesRepository;
import com.ssafy.d3v.backend.member.MemberRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {
    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final AnswerRepository answerRepository;
    private final Integer memberId = 1;

    @Override
    public void create(int answerId, LikesRequest request) {
        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 ID: " + request.memberId()));

        Answer answer = answerRepository.findById(request.answerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변 입니다. 답변 ID: " + request.answerId()));

        Likes likes = Likes.builder()
                .memberId(member)
                .answerId(answer)
                .build();

        likesRepository.save(likes);
    }

}