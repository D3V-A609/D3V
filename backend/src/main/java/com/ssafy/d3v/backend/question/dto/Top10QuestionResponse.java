package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.DevelopmentRole;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;

public record Top10QuestionResponse(int questionId, String question, SkillType skill,
                                    DevelopmentRole job, boolean isSolved, List<Integer> bookmarkIds) {
}