package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.JobRole;
import org.springframework.stereotype.Service;

@Service
public class JobRoleService {

    public JobRole convertToJobRole(String jobRoleString) {
        if (jobRoleString == null || jobRoleString.isEmpty()) {
            throw new IllegalArgumentException("Job role string cannot be null or empty");
        }

        try {
            // 대소문자 구분 없이 변환
            return JobRole.valueOf(jobRoleString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid job role: " + jobRoleString);
        }
    }
}
