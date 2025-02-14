package com.ssafy.d3v.backend.member.repository;

import com.ssafy.d3v.backend.member.entity.Follow;
import com.ssafy.d3v.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndFollowing(Member follower, Member following);

    int countByFollower(Member follower);

    int countByFollowing(Member following);
}