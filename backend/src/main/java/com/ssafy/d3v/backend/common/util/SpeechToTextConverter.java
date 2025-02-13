package com.ssafy.d3v.backend.common.util;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.SpeechSettings;
import com.google.protobuf.ByteString;
import com.ssafy.d3v.backend.common.exception.SpeechToTextException;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SpeechToTextConverter {
    private static final String LANGUAGE_CODE = "ko-KR";

    public static String convertSpeechToText(byte[] audioBytes) throws IOException {
        ClassPathResource resource = new ClassPathResource("d3v-official-2b51c4ccdc42.json");

        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
        SpeechSettings settings = SpeechSettings.newBuilder().setCredentialsProvider(() -> credentials).build();

        log.info("음성 변환 시작 - 입력 데이터 크기: {} bytes", audioBytes.length);
        try (SpeechClient speechClient = SpeechClient.create(settings)) {

            ByteString audioData = ByteString.copyFrom(audioBytes);

            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.WEBM_OPUS)
                    .setLanguageCode(LANGUAGE_CODE)
                    .build();

            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(audioData)
                    .build();

            RecognizeResponse response = speechClient.recognize(config, audio);
            StringBuilder transcript = new StringBuilder();

            for (SpeechRecognitionResult result : response.getResultsList()) {
                String text = result.getAlternativesList().get(0).getTranscript();
                transcript.append(text);
                log.debug("변환된 텍스트: {}", text);
            }
            return transcript.toString();
        } catch (IOException e) {
            log.error("음성 변환 실패: {}", e.getMessage(), e);
            throw new SpeechToTextException("음성 파일 변환 중 오류 발생");
        }
    }
}
