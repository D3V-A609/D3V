package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.HistoryResponse;
import com.ssafy.d3v.backend.member.entity.History;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.HistoryRepository;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.time.LocalDate;
import java.util.List;
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
                .toList();
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

    @Override
    @Scheduled(cron = "0 50 23 * * ?")
    @Transactional
    public void calculateStreak() {
        List<Member> members = memberRepository.findAll();

        for (Member member : members) {
            History history = historyRepository.findByMemberIdAndDate(member.getId(), LocalDate.now())
                    .orElseThrow(() -> new IllegalArgumentException("히스토리가 존재하지 않습니다."));

            List<History> historys = historyRepository.findByMemberOrderByDateAsc(member)
                    .stream()
                    .filter(ele -> ele.getCount() >= 1)
                    .toList();

            long maxStreak = 0;
            long ongoingStreak = 0;
            long currentStreak = 0;
            LocalDate prevDate = null;

            for (History ele : historys) {
                if (prevDate == null || ele.getDate().equals(prevDate.plusDays(1))) {
                    currentStreak++;
                } else {
                    maxStreak = Math.max(maxStreak, currentStreak);
                    currentStreak = 1;
                }
                prevDate = ele.getDate();
            }

            maxStreak = Math.max(maxStreak, currentStreak);

            if (history.getCount() == 0) {
                ongoingStreak = 0;
            } else {
                ongoingStreak += 1;
            }

            memberRepository.saveAndFlush(member.toBuilder()
                    .maxStreak(maxStreak)
                    .ongoingStreak(ongoingStreak)
                    .build());
        }
    }

    @Override
    public Integer getCountByMemberIdAndDate(long memberId) {
        return historyRepository.findByMemberIdAndDate(memberId, LocalDate.now())
                .orElseThrow(() -> new IllegalArgumentException("히스토리가 존재하지 않습니다.")).getCount();
    }
}
