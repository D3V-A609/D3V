package com.ssafy.d3v.backend.member.repository;

import com.ssafy.d3v.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
