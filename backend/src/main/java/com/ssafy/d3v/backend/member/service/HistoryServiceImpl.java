package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.HistoryResponse;
import com.ssafy.d3v.backend.member.entity.History;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.HistoryRepository;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoryServiceImpl implements HistoryService {
    private final HistoryRepository historyRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<HistoryResponse> getHistory(Long memberId, int year) {
        List<History> histories = historyRepository.findByDateBetween(
                LocalDate.of(year, 1, 1), LocalDate.of(year, 12, 31));

        return histories.stream()
                .map(history -> HistoryResponse.builder()
                        .date(history.getDate())
                        .count(history.getCount())
                        .build())
                .collect(Collectors.toList());
    }
}
