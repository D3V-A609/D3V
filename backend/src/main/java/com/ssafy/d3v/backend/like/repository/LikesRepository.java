package com.ssafy.d3v.backend.like.repository;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.like.entity.Likes;
import com.ssafy.d3v.backend.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByAnswerAndMember(Answer answerId, Member memberId);
    int countByAnswer(Answer answer);
}
