package com.ssafy.d3v.backend.common.message;

import lombok.Getter;

@Getter
public enum SuccessMessages {

    // BOOKMARK 북마크 API 요청 성공 메시지

    SUCCESS_BOOKMARK_CREATE("북마크 생성에 성공했습니다."),
    SUCCESS_BOOKMARK_UPDATE("북마크 수정에 성공했습니다."),
    SUCCESS_BOOKMARK_DELETE("북마크가 삭제되었습니다."),
    SUCCESS_BOOKMARK_QUESTION_DELETE("북마크에서 질문이 삭제되었습니다."),
    ;


    SuccessMessages(String message) {
        this.message = message;
    }

    private final String message;
}
