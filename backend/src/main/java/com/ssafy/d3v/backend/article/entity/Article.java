package com.ssafy.d3v.backend.article.entity;

import com.ssafy.d3v.backend.common.BaseEntity;
import com.ssafy.d3v.backend.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Article extends BaseEntity {
    @Id
    @Column(name = "article_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer articleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category categoryId;

    private String title;

    private String content;

    private Integer view;
}
