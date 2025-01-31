package com.ssafy.d3v.backend.member;

import com.ssafy.d3v.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    void findByMemberId(int memberId);
}
