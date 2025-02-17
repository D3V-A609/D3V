package com.ssafy.d3v.backend.member.repository;

import com.ssafy.d3v.backend.member.entity.Member;
import jakarta.validation.constraints.NotBlank;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByNickname(@NotBlank String nickname);

    Optional<Member> findByEmail(@NotBlank String email);

    boolean existsByEmail(String email);

    Member findMemberByEmail(String email); // Optional로 바꾸면 안됨

    Optional<Member> findMemberById(long memberId);
}
