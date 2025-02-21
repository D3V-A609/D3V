package com.ssafy.d3v.backend.bookmark.entity;

import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.member.entity.Member;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@Builder
@AllArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Bookmark {
    @Id
    @Column(name = "bookmark_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "access_level")
    private AccessLevel accessLevel;

    @OneToMany(mappedBy = "bookmark", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookmarkQuestion> bookmarkQuestions;

    public void update(String name, String description, AccessLevel accessLevel) {
        this.name = name;
        this.description = description;
        this.accessLevel = accessLevel;
    }
}
