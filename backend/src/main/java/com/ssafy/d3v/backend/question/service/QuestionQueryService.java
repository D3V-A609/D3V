package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.repository.QuestionJobRepository;
import com.ssafy.d3v.backend.question.repository.QuestionSkillRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuestionQueryService {

    private final QuestionSkillRepository questionSkillRepository;
    private final QuestionJobRepository questionJobRepository;

    // Skill 조회
    public List<Skill> getSkillsByQuestionId(Long questionId) {
        return questionSkillRepository.findAllByQuestionIdWithSkill(questionId)
                .stream()
                .map(QuestionSkill::getSkill)
                .collect(Collectors.toList());
    }

    // Job 조회
    public List<Job> getJobsByQuestionId(Long questionId) {
        return questionJobRepository.findAllByQuestionIdWithJob(questionId)
                .stream()
                .map(QuestionJob::getJob)
                .collect(Collectors.toList());
    }
}
