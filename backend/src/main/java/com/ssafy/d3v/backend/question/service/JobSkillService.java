package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.repository.JobSkillRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobSkillService {

    private final JobSkillRepository jobSkillRepository;
    private final JobRoleService jobRoleService;

    public List<String> getSkillsByJobRole(String jobRoleString) {
        JobRole jobRole = jobRoleService.convertToJobRole(jobRoleString);
        return jobSkillRepository.findSkillsByJobRole(jobRole);
    }
}