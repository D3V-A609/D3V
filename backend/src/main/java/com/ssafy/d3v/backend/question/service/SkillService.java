package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobSkill;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import com.ssafy.d3v.backend.question.repository.SkillRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Question> getQuestionsBySkillName(String skillName) {
        Skill skill = skillRepository.findByName(SkillType.valueOf(skillName.toUpperCase()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid Skill Name"));

        return skill.getQuestionSkills().stream()
                .map(QuestionSkill::getQuestion)
                .toList();
    }

    public List<Job> getJobsBySkillName(String skillName) {
        Skill skill = skillRepository.findByName(SkillType.valueOf(skillName.toUpperCase()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid Skill Name"));

        return skill.getJobSkills().stream()
                .map(JobSkill::getJob)
                .toList();
    }
}
