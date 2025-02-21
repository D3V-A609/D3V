package com.ssafy.d3v.backend.common.util;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@MappedSuperclass // 공통 매핑 정보 제공
@EntityListeners(AuditingEntityListener.class) // Auditing 기능 활성화
public abstract class BaseTimeEntity {

    @CreatedDate // 엔티티 생성 시 자동으로 값 설정
    @Column(updatable = false, nullable = false) // 수정 불가, null 허용 안 함
    private LocalDateTime createdAt;

    @LastModifiedDate // 엔티티 수정 시 자동으로 값 설정
    @Column(nullable = false) // null 허용 안 함
    private LocalDateTime updatedAt;

    @Column // 삭제 시간을 기록하기 위한 필드
    private LocalDateTime deletedAt;

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }
}
