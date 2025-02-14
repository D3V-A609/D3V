package com.ssafy.d3v.backend.member.repository;

import com.ssafy.d3v.backend.member.entity.History;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByMemberIdAndDateBetween(long memberId, LocalDate start, LocalDate end);
}
