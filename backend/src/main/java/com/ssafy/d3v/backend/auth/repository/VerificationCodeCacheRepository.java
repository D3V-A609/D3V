package com.ssafy.d3v.backend.auth.repository;

import com.ssafy.d3v.backend.auth.entity.VerificationCodeCache;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface VerificationCodeCacheRepository extends CrudRepository<VerificationCodeCache, String> {
    default Optional<VerificationCodeCache> findValidCode(String email) {
        return findById(email)
                .filter(cache -> cache.getCreatedAt().isAfter(LocalDateTime.now().minusMinutes(5)));
    }
}
