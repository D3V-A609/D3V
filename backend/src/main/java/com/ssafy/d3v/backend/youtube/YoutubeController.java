package com.ssafy.d3v.backend.youtube;

import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@Tag(name = "유튜브 API")
@RequestMapping("/api/youtube")
@RequiredArgsConstructor
public class YoutubeController {

    @Value("${youtube.api.key}")
    private String youtubeApiKey;

    private static final String YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        try {
            String refinedQuery = query + " 개발자 면접 OR IT 면접 -결혼 -연애";

            String encodedQuery = URLEncoder.encode(refinedQuery, StandardCharsets.UTF_8);

            String apiUrl = String.format(
                    "%s?part=snippet&maxResults=10&q=%s&type=video&relevanceLanguage=ko&regionCode=KR&order=relevance&key=%s",
                    YOUTUBE_API_URL, encodedQuery, youtubeApiKey);
            System.out.println("유튜브 API 요청 URL: " + apiUrl);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching videos: " + e.getMessage());
        }
    }
}
