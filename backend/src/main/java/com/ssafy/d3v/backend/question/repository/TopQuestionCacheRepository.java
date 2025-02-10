package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.TopQuestionCache;
import org.springframework.data.repository.CrudRepository;

public interface TopQuestionCacheRepository extends CrudRepository<TopQuestionCache, String> {
}
