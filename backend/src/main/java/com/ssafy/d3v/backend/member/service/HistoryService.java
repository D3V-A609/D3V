package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.HistoryResponse;
import java.util.List;

public interface HistoryService {
    List<HistoryResponse> getHistory(Long memberId);

    void createDailyHistory();

    void calculateStreak();

    Integer getCountByMemberIdAndDate(long memberId);
}
