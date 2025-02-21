import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { createArticle } from "../../store/actions/articleActions";
import "./WriteArticle.css";

const categories = [
  { id: 1, name: "JOB_REVIEW", label: "합격 후기" },
  { id: 2, name: "QUESTION_REVIEW", label: "답변 첨삭" },
  { id: 3, name: "INFO_SHARING", label: "정보 공유" },
  { id: 4, name: "ETC", label: "기타" },
];

const MAX_FILE_SIZE_MB = 5; // 최대 파일 크기 (MB)
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"]; // 허용된 확장자

const WriteArticle: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const dispatch = useAppDispatch();

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ category?: string; title?: string; content?: string; images?: string }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newErrors: string[] = [];

      // 이미지 파일 검증
      const validFiles = selectedFiles.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
          newErrors.push(`허용되지 않는 확장자입니다: ${file.name}`);
          return false;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          newErrors.push(`파일 크기가 너무 큽니다 (최대 ${MAX_FILE_SIZE_MB}MB): ${file.name}`);
          return false;
        }
        return true;
      });

      setImages(validFiles);
      if (newErrors.length > 0) {
        setErrors((prev) => ({ ...prev, images: newErrors.join("\n") }));
      } else {
        setErrors((prev) => ({ ...prev, images: undefined }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { category?: string; title?: string; content?: string } = {};
    if (!categoryId) newErrors.category = "카테고리가 입력되지 않았습니다.";
    if (!title.trim()) newErrors.title = "제목이 입력되지 않았습니다.";
    if (!content.trim()) newErrors.content = "내용이 입력되지 않았습니다.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("category_id", String(categoryId));
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image) => formData.append("images", image));

    dispatch(createArticle(formData));
    alert("게시글이 성공적으로 등록되었습니다!");
    onCancel();
  };

  // Quill toolbar options
  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <div className="article-write-article">
      <div className="detail-header">
        <button className="back-button" onClick={onCancel}>
          목록
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="article-form-group">
          <label htmlFor="category" className="article-form-label">
            카테고리<span className="article-required">*</span>
          </label>
          <select
            id="category"
            value={categoryId || ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            className={`article-form-select ${errors.category ? "article-error-border" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <option value="" disabled>
              카테고리를 선택해주세요
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <span className="article-error-message">{errors.category}</span>}
        </div>

        <div className="article-form-group">
          <label htmlFor="title" className="article-form-label">
            제목<span className="article-required">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`article-form-input ${errors.title ? "article-error-border" : ""}`}
          />
          {errors.title && <span className="article-error-message">{errors.title}</span>}
        </div>

        <div className="article-form-group">
          <label htmlFor="content" className="article-form-label">
            내용<span className="article-required">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="내용을 입력해주세요"
            modules={quillModules}
            className="article-quill-editor"
          />
          {errors.content && <span className="article-error-message">{errors.content}</span>}
        </div>

        <div className="article-form-group article-image-upload">
          <label htmlFor="images" className="article-form-label">
            이미지 첨부
          </label>
          <div className="article-form-group article-image-input">
            <input
                id="images"
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                multiple
                onChange={handleImageChange}
                style={{ cursor: "pointer" }}
            />
            <small className="article-image-description">
                * 허용된 확장자: jpg, jpeg, png, gif / 파일 최대 크기: {MAX_FILE_SIZE_MB}MB
            </small>
            {errors.images && <span className="article-error-message">{errors.images}</span>}
          </div>
        </div>

        <div className="article-form-buttons">
          <button type="button" className="article-cancel-button" onClick={onCancel} style={{ cursor: "pointer" }}>
            취소
          </button>
          <button type="submit" className="article-submit-button" style={{ cursor: "pointer" }}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteArticle;