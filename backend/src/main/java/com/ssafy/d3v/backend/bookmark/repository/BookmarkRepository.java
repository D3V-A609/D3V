package com.ssafy.d3v.backend.bookmark.repository;

import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByMemberId(Long memberId);
}
