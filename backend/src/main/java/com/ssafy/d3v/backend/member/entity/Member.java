package com.ssafy.d3v.backend.member.entity;

import com.ssafy.d3v.backend.common.util.BaseTimeEntity;
import com.ssafy.d3v.backend.oauth.entity.ProviderType;
import com.ssafy.d3v.backend.oauth.entity.RoleType;
import com.ssafy.d3v.backend.question.entity.JobRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Collection;
import java.util.Collections;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@ToString
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity implements UserDetails {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 63, nullable = false)
    private String email;

    @Setter
    @Column(name = "nickname", length = 15, nullable = false)
    private String nickname;

    @Setter
    private String password;

    @Setter
    @Column(name = "profile_img")
    private String profileImg;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "max_streak")
    private Long maxStreak;

    @Column(name = "ongoing_streak")
    private Long ongoingStreak;

    @Column(name = "provider_type")
    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(name = "favorite_job")
    @Enumerated(EnumType.STRING)
    private JobRole favoriteJob;

    @Builder
    public Member(String nickname, String email, String password) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    public Member update(String nickname, String profileImg) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
