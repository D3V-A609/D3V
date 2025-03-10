import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { createComment } from "../../store/actions/commentActions";
import "./CommentInput.css";

interface CommentInputProps {
  articleId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await dispatch(createComment({ articleId, content })).unwrap();
      console.log("댓글 작성 성공");

      // 입력 필드 초기화
      setContent("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        placeholder="댓글을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="comment-submit" type="submit">
        등록
      </button>
    </form>
  );
};

export default CommentInput;
