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
    public List<HistoryResponse> getHistory(Long memberId) {
        LocalDate today = LocalDate.now();
        List<History> histories = historyRepository
                .findByMemberIdAndDateBetween(memberId, today.minusYears(1), today);

        return histories.stream()
                .map(history -> HistoryResponse.builder()
                        .date(history.getDate())
                        .count(history.getCount())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void createDailyHistory() {
        LocalDate today = LocalDate.now();
        List<Member> members = memberRepository.findAll();

        for (Member member : members) {
            History history = History.builder()
                    .member(member)
                    .date(today)
                    .count(0)
                    .build();

            log.info("history: {}", history.toString());
            historyRepository.save(history);
        }
    }
}
