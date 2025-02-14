package com.ssafy.d3v.backend.member.repository;

import com.ssafy.d3v.backend.member.entity.Follow;
import com.ssafy.d3v.backend.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndFollowing(Member follower, Member following);

    int countByFollower(Member follower);

    int countByFollowing(Member following);

    void deleteByFollowerAndFollowing(Member follower, Member following);

    List<Follow> findAllByFollowing(Member following);

    List<Follow> findAllByFollower(Member follower);
}