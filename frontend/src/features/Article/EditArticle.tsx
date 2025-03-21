import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { updateArticle } from "../../store/actions/articleActions";
import "./EditArticle.css";

const categories = [
  { id: 1, name: "JOB_REVIEW", label: "합격 후기" },
  { id: 2, name: "QUESTION_REVIEW", label: "답변 첨삭" },
  { id: 3, name: "INFO_SHARING", label: "정보 공유" },
  { id: 4, name: "ETC", label: "기타" },
];

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

interface EditArticleProps {
  article: Article;
  onCancel: () => void;
}

const EditArticle: React.FC<EditArticleProps> = ({ article, onCancel }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categoryId, setCategoryId] = useState<number>(article.categoryId);
  const [title, setTitle] = useState<string>(article.title);
  const [content, setContent] = useState<string>(article.content);
  const [image, setImage] = useState<File | null>(null);
  const [existingImageName, setExistingImageName] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ category?: string; title?: string; content?: string; images?: string }>({});

  useEffect(() => {
    setCategoryId(article.categoryId);
    setTitle(article.title);
    setContent(article.content);
    if (article.images && article.images.length > 0) {
      setExistingImageName(article.images[0].originImageName);
    }
  }, [article]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const extension = file.name.split(".").pop()?.toLowerCase();
      
      if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
        setErrors(prev => ({ ...prev, images: "허용되지 않는 확장자입니다." }));
        return;
      }
      
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrors(prev => ({ ...prev, images: `파일 크기가 너무 큽니다 (최대 ${MAX_FILE_SIZE_MB}MB)` }));
        return;
      }

      setImage(file);
      setExistingImageName(null);
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setExistingImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
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
    if (image) {
      formData.append("images", image);
    } else if (!existingImageName) {
      formData.append("remove_image", "true");
    }

    dispatch(updateArticle({ id: article.id, data: formData }));
    alert("게시글이 성공적으로 수정되었습니다!");
    onCancel();
  };

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
    <div className="edit-article">
      <form onSubmit={handleSubmit}>
        <div className="article-form-group">
          <label htmlFor="category" className="article-form-label">
            카테고리<span className="article-required">*</span>
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            className={`article-form-select ${errors.category ? "article-error-border" : ""}`}
            style={{ cursor: "pointer" }}
          >
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
            <div className="article-file-input-container">
              <input
                ref={fileInputRef}
                id="images"
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <button type="button" onClick={handleFileButtonClick} className="article-file-select-button">
                파일 선택
              </button>
              {(image || existingImageName) && (
                <div className="article-selected-image">
                  <span className="file-name">{image ? image.name : existingImageName}</span>
                  <button type="button" onClick={handleRemoveImage} className="article-remove-image-btn">x</button>
                </div>
              )}
            </div>
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
            수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
