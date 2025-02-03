-- CREATE TABLE IF NOT EXISTS member
-- (
--     member_id      SERIAL PRIMARY KEY,
--     nickname       TEXT      NULL,
--     email          TEXT      NULL,
--     password       TEXT      NULL,
--     profile_img    TEXT      NULL,
--     github_url     TEXT      NULL,
--     max_streak     INT       NULL,
--     ongoing_streak INT       NULL,
--     deleted_at     TIMESTAMP NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS served_question
-- (
--     served_question_id SERIAL PRIMARY KEY,
--     member_id          INT       NOT NULL,
--     question_id        INT       NOT NULL,
--     is_solved          BOOLEAN   NULL,
--     served_at          TIMESTAMP NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS answer
-- (
--     answer_id    SERIAL PRIMARY KEY,
--     member_id    BIGINT    NOT NULL,
--     question_id  BIGINT    NOT NULL,
--     content      TEXT      NULL,
--     created_at   TIMESTAMP NULL,
--     access_level TEXT      NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS comment
-- (
--     comment_id SERIAL PRIMARY KEY,
--     answer_id  INT       NOT NULL,
--     content    TEXT      NULL,
--     created_at TIMESTAMP NULL,
--     deleted_at TIMESTAMP NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS job
-- (
--     job_id           SERIAL PRIMARY KEY,
--     development_role TEXT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS skill
-- (
--     skill_id SERIAL PRIMARY KEY,
--     name     TEXT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS question_job
-- (
--     question_job_id SERIAL PRIMARY KEY,
--     question_id     INT NOT NULL,
--     job_id          INT NOT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS bookmark
-- (
--     bookmark_id  SERIAL PRIMARY KEY,
--     member_id    INT  NOT NULL,
--     question_id  INT  NOT NULL,
--     name         TEXT NULL,
--     access_level TEXT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS likes
-- (
--     like_id   SERIAL PRIMARY KEY,
--     member_id BIGINT NOT NULL,
--     answer_id BIGINT NOT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS history
-- (
--     history_id SERIAL PRIMARY KEY,
--     member_id  INT  NOT NULL,
--     date       DATE NULL,
--     count      INT  NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS question_skill
-- (
--     question_skill_id SERIAL PRIMARY KEY,
--     question_id       INT NOT NULL,
--     skill_id          INT NOT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS question
-- (
--     question_id     SERIAL PRIMARY KEY,
--     content         TEXT NULL,
--     standard_answer TEXT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS job_skill
-- (
--     job_skill_id SERIAL PRIMARY KEY,
--     job_id       INT NOT NULL,
--     skill_id     INT NOT NULL
-- );

-- Insert dummy data

-- Member data
INSERT INTO member (nickname, email, password, status, profile_img, github_url, max_streak, ongoing_streak, deleted_at, created_at, updated_at)
VALUES ('test', 'test@example.com', '1234', 'ACTIVE', 'profile1.png', 'https://github.com/test', 0, 0, NULL, '2025-01-01', '2025-01-01'),
       ('Alice', 'alice@example.com', 'password123', 'ACTIVE','profile2.png', 'https://github.com/alice', 5, 3, NULL, '2025-01-01', '2025-01-01'),
       ('Bob', 'bob@example.com', 'password456', 'ACTIVE', 'profile3.png', 'https://github.com/bob', 10, 7, '2025-01-01', '2025-01-01', '2025-01-01'),
       ('Charlie', 'charlie@example.com', 'password789', 'ACTIVE', 'profile4.png', 'https://github.com/charlie', 15, 5, NULL, '2025-01-01', '2025-01-01'),
       ('Diana', 'diana@example.com', 'password321', 'ACTIVE', 'profile5.png', 'https://github.com/diana', 8, 6, '2025-02-01', '2025-01-01', '2025-01-01');

-- Question data
INSERT INTO question (content, standard_answer)
VALUES ('Question 1', 'Standard answer for question 1'),
       ('Question 2', 'Standard answer for question 2'),
       ('Question 3', 'Standard answer for question 3'),
       ('Question 4', 'Standard answer for question 4');
--        ('Question 5', 'Standard answer for question 5'),
--        ('Question 6', 'Standard answer for question 6'),
--        ('Question 7', 'Standard answer for question 7'),
--        ('Question 8', 'Standard answer for question 8'),
--        ('Question 9', 'Standard answer for question 9'),
--        ('Question 10', 'Standard answer for question 10'),
--        ('Question 11', 'Standard answer for question 11'),
--        ('Question 12', 'Standard answer for question 12'),
--        ('Question 13', 'Standard answer for question 13'),
--        ('Question 14', 'Standard answer for question 14'),
--        ('Question 15', 'Standard answer for question 15'),
--        ('Question 16', 'Standard answer for question 16'),
--        ('Question 17', 'Standard answer for question 17'),
--        ('Question 18', 'Standard answer for question 18'),
--        ('Question 19', 'Standard answer for question 19'),
--        ('Question 20', 'Standard answer for question 20'),
--        ('Question 21', 'Standard answer for question 21'),
--        ('Question 22', 'Standard answer for question 22'),
--        ('Question 23', 'Standard answer for question 23'),
--        ('Question 24', 'Standard answer for question 24'),
--        ('Question 25', 'Standard answer for question 25'),
--        ('Question 26', 'Standard answer for question 26'),
--        ('Question 27', 'Standard answer for question 27'),
--        ('Question 28', 'Standard answer for question 28'),
--        ('Question 29', 'Standard answer for question 29'),
--        ('Question 30', 'Standard answer for question 30'),
--        ('Question 31', 'Standard answer for question 31'),
--        ('Question 32', 'Standard answer for question 32'),
--        ('Question 33', 'Standard answer for question 33'),
--        ('Question 34', 'Standard answer for question 34'),
--        ('Question 35', 'Standard answer for question 35'),
--        ('Question 36', 'Standard answer for question 36'),
--        ('Question 37', 'Standard answer for question 37'),
--        ('Question 38', 'Standard answer for question 38'),
--        ('Question 39', 'Standard answer for question 39'),
--        ('Question 40', 'Standard answer for question 40'),
--        ('Question 41', 'Standard answer for question 41'),
--        ('Question 42', 'Standard answer for question 42'),
--        ('Question 43', 'Standard answer for question 43'),
--        ('Question 44', 'Standard answer for question 44'),
--        ('Question 45', 'Standard answer for question 45'),
--        ('Question 46', 'Standard answer for question 46'),
--        ('Question 47', 'Standard answer for question 47'),
--        ('Question 48', 'Standard answer for question 48'),
--        ('Question 49', 'Standard answer for question 49'),
--        ('Question 50', 'Standard answer for question 50'),
--        ('Question 51', 'Standard answer for question 51'),
--        ('Question 52', 'Standard answer for question 52'),
--        ('Question 53', 'Standard answer for question 53'),
--        ('Question 54', 'Standard answer for question 54'),
--        ('Question 55', 'Standard answer for question 55'),
--        ('Question 56', 'Standard answer for question 56'),
--        ('Question 57', 'Standard answer for question 57'),
--        ('Question 58', 'Standard answer for question 58'),
--        ('Question 59', 'Standard answer for question 59'),
--        ('Question 60', 'Standard answer for question 60'),
--        ('Question 61', 'Standard answer for question 61'),
--        ('Question 62', 'Standard answer for question 62'),
--        ('Question 63', 'Standard answer for question 63'),
--        ('Question 64', 'Standard answer for question 64'),
--        ('Question 65', 'Standard answer for question 65'),
--        ('Question 66', 'Standard answer for question 66'),
--        ('Question 67', 'Standard answer for question 67'),
--        ('Question 68', 'Standard answer for question 68'),
--        ('Question 69', 'Standard answer for question 69'),
--        ('Question 70', 'Standard answer for question 70'),
--        ('Question 71', 'Standard answer for question 71'),
--        ('Question 72', 'Standard answer for question 72'),
--        ('Question 73', 'Standard answer for question 73'),
--        ('Question 74', 'Standard answer for question 74'),
--        ('Question 75', 'Standard answer for question 75'),
--        ('Question 76', 'Standard answer for question 76'),
--        ('Question 77', 'Standard answer for question 77'),
--        ('Question 78', 'Standard answer for question 78'),
--        ('Question 79', 'Standard answer for question 79'),
--        ('Question 80', 'Standard answer for question 80'),
--        ('Question 81', 'Standard answer for question 81'),
--        ('Question 82', 'Standard answer for question 82'),
--        ('Question 83', 'Standard answer for question 83'),
--        ('Question 84', 'Standard answer for question 84'),
--        ('Question 85', 'Standard answer for question 85'),
--        ('Question 86', 'Standard answer for question 86'),
--        ('Question 87', 'Standard answer for question 87'),
--        ('Question 88', 'Standard answer for question 88'),
--        ('Question 89', 'Standard answer for question 89'),
--        ('Question 90', 'Standard answer for question 90'),
--        ('Question 91', 'Standard answer for question 91'),
--        ('Question 92', 'Standard answer for question 92'),
--        ('Question 93', 'Standard answer for question 93'),
--        ('Question 94', 'Standard answer for question 94'),
--        ('Question 95', 'Standard answer for question 95'),
--        ('Question 96', 'Standard answer for question 96'),
--        ('Question 97', 'Standard answer for question 97'),
--        ('Question 98', 'Standard answer for question 98'),
--        ('Question 99', 'Standard answer for question 99'),
--        ('Question 100', 'Standard answer for question 100'),
--        ('Question 101', 'Standard answer for question 101'),
--        ('Question 102', 'Standard answer for question 102'),
--        ('Question 103', 'Standard answer for question 103'),
--        ('Question 104', 'Standard answer for question 104'),
--        ('Question 105', 'Standard answer for question 105'),
--        ('Question 106', 'Standard answer for question 106'),
--        ('Question 107', 'Standard answer for question 107'),
--        ('Question 108', 'Standard answer for question 108'),
--        ('Question 109', 'Standard answer for question 109'),
--        ('Question 110', 'Standard answer for question 110'),
--        ('Question 111', 'Standard answer for question 111'),
--        ('Question 112', 'Standard answer for question 112'),
--        ('Question 113', 'Standard answer for question 113'),
--        ('Question 114', 'Standard answer for question 114'),
--        ('Question 115', 'Standard answer for question 115'),
--        ('Question 116', 'Standard answer for question 116'),
--        ('Question 117', 'Standard answer for question 117'),
--        ('Question 118', 'Standard answer for question 118'),
--        ('Question 119', 'Standard answer for question 119'),
--        ('Question 120', 'Standard answer for question 120'),
--        ('Question 121', 'Standard answer for question 121'),
--        ('Question 122', 'Standard answer for question 122'),
--        ('Question 123', 'Standard answer for question 123'),
--        ('Question 124', 'Standard answer for question 124'),
--        ('Question 125', 'Standard answer for question 125'),
--        ('Question 126', 'Standard answer for question 126'),
--        ('Question 127', 'Standard answer for question 127'),
--        ('Question 128', 'Standard answer for question 128'),
--        ('Question 129', 'Standard answer for question 129'),
--        ('Question 130', 'Standard answer for question 130'),
--        ('Question 131', 'Standard answer for question 131'),
--        ('Question 132', 'Standard answer for question 132'),
--        ('Question 133', 'Standard answer for question 133'),
--        ('Question 134', 'Standard answer for question 134'),
--        ('Question 135', 'Standard answer for question 135'),
--        ('Question 136', 'Standard answer for question 136'),
--        ('Question 137', 'Standard answer for question 137'),
--        ('Question 138', 'Standard answer for question 138'),
--        ('Question 139', 'Standard answer for question 139'),
--        ('Question 140', 'Standard answer for question 140'),
--        ('Question 141', 'Standard answer for question 141'),
--        ('Question 142', 'Standard answer for question 142'),
--        ('Question 143', 'Standard answer for question 143'),
--        ('Question 144', 'Standard answer for question 144'),
--        ('Question 145', 'Standard answer for question 145'),
--        ('Question 146', 'Standard answer for question 146'),
--        ('Question 147', 'Standard answer for question 147'),
--        ('Question 148', 'Standard answer for question 148'),
--        ('Question 149', 'Standard answer for question 149'),
--        ('Question 150', 'Standard answer for question 150'),
--        ('Question 151', 'Standard answer for question 151'),
--        ('Question 152', 'Standard answer for question 152'),
--        ('Question 153', 'Standard answer for question 153'),
--        ('Question 154', 'Standard answer for question 154'),
--        ('Question 155', 'Standard answer for question 155'),
--        ('Question 156', 'Standard answer for question 156'),
--        ('Question 157', 'Standard answer for question 157'),
--        ('Question 158', 'Standard answer for question 158'),
--        ('Question 159', 'Standard answer for question 159'),
--        ('Question 160', 'Standard answer for question 160'),
--        ('Question 161', 'Standard answer for question 161'),
--        ('Question 162', 'Standard answer for question 162'),
--        ('Question 163', 'Standard answer for question 163'),
--        ('Question 164', 'Standard answer for question 164'),
--        ('Question 165', 'Standard answer for question 165'),
--        ('Question 166', 'Standard answer for question 166'),
--        ('Question 167', 'Standard answer for question 167'),
--        ('Question 168', 'Standard answer for question 168'),
--        ('Question 169', 'Standard answer for question 169'),
--        ('Question 170', 'Standard answer for question 170'),
--        ('Question 171', 'Standard answer for question 171'),
--        ('Question 172', 'Standard answer for question 172'),
--        ('Question 173', 'Standard answer for question 173'),
--        ('Question 174', 'Standard answer for question 174'),
--        ('Question 175', 'Standard answer for question 175'),
--        ('Question 176', 'Standard answer for question 176'),
--        ('Question 177', 'Standard answer for question 177'),
--        ('Question 178', 'Standard answer for question 178'),
--        ('Question 179', 'Standard answer for question 179'),
--        ('Question 180', 'Standard answer for question 180'),
--        ('Question 181', 'Standard answer for question 181'),
--        ('Question 182', 'Standard answer for question 182'),
--        ('Question 183', 'Standard answer for question 183'),
--        ('Question 184', 'Standard answer for question 184'),
--        ('Question 185', 'Standard answer for question 185'),
--        ('Question 186', 'Standard answer for question 186'),
--        ('Question 187', 'Standard answer for question 187'),
--        ('Question 188', 'Standard answer for question 188'),
--        ('Question 189', 'Standard answer for question 189'),
--        ('Question 190', 'Standard answer for question 190'),
--        ('Question 191', 'Standard answer for question 191'),
--        ('Question 192', 'Standard answer for question 192'),
--        ('Question 193', 'Standard answer for question 193'),
--        ('Question 194', 'Standard answer for question 194'),
--        ('Question 195', 'Standard answer for question 195'),
--        ('Question 196', 'Standard answer for question 196'),
--        ('Question 197', 'Standard answer for question 197'),
--        ('Question 198', 'Standard answer for question 198'),
--        ('Question 199', 'Standard answer for question 199'),
--        ('Question 200', 'Standard answer for question 200'),
--        ('Question 201', 'Standard answer for question 201'),
--        ('Question 202', 'Standard answer for question 202'),
--        ('Question 203', 'Standard answer for question 203'),
--        ('Question 204', 'Standard answer for question 204'),
--        ('Question 205', 'Standard answer for question 205'),
--        ('Question 206', 'Standard answer for question 206'),
--        ('Question 207', 'Standard answer for question 207'),
--        ('Question 208', 'Standard answer for question 208'),
--        ('Question 209', 'Standard answer for question 209'),
--        ('Question 210', 'Standard answer for question 210'),
--        ('Question 211', 'Standard answer for question 211'),
--        ('Question 212', 'Standard answer for question 212'),
--        ('Question 213', 'Standard answer for question 213'),
--        ('Question 214', 'Standard answer for question 214'),
--        ('Question 215', 'Standard answer for question 215'),
--        ('Question 216', 'Standard answer for question 216'),
--        ('Question 217', 'Standard answer for question 217'),
--        ('Question 218', 'Standard answer for question 218'),
--        ('Question 219', 'Standard answer for question 219'),
--        ('Question 220', 'Standard answer for question 220'),
--        ('Question 221', 'Standard answer for question 221'),
--        ('Question 222', 'Standard answer for question 222'),
--        ('Question 223', 'Standard answer for question 223'),
--        ('Question 224', 'Standard answer for question 224'),
--        ('Question 225', 'Standard answer for question 225'),
--        ('Question 226', 'Standard answer for question 226'),
--        ('Question 227', 'Standard answer for question 227'),
--        ('Question 228', 'Standard answer for question 228'),
--        ('Question 229', 'Standard answer for question 229'),
--        ('Question 230', 'Standard answer for question 230'),
--        ('Question 231', 'Standard answer for question 231'),
--        ('Question 232', 'Standard answer for question 232'),
--        ('Question 233', 'Standard answer for question 233'),
--        ('Question 234', 'Standard answer for question 234'),
--        ('Question 235', 'Standard answer for question 235'),
--        ('Question 236', 'Standard answer for question 236'),
--        ('Question 237', 'Standard answer for question 237'),
--        ('Question 238', 'Standard answer for question 238'),
--        ('Question 239', 'Standard answer for question 239'),
--        ('Question 240', 'Standard answer for question 240'),
--        ('Question 241', 'Standard answer for question 241'),
--        ('Question 242', 'Standard answer for question 242'),
--        ('Question 243', 'Standard answer for question 243'),
--        ('Question 244', 'Standard answer for question 244'),
--        ('Question 245', 'Standard answer for question 245'),
--        ('Question 246', 'Standard answer for question 246'),
--        ('Question 247', 'Standard answer for question 247'),
--        ('Question 248', 'Standard answer for question 248'),
--        ('Question 249', 'Standard answer for question 249'),
--        ('Question 250', 'Standard answer for question 250');

-- Served Question data
INSERT INTO served_question (member_id, question_id, is_solved, is_daily, served_at)
VALUES (1, 1, TRUE, FALSE, '2025-01-20'),
       (2, 2, FALSE, FALSE, '2025-01-21'),
       (3, 3, TRUE, FALSE, '2025-01-22'),
       (4, 4, FALSE, FALSE, '2025-01-23');

-- Answer data
INSERT INTO answer (member_id, question_id, content, created_at, access_level)
VALUES (1, 1, 'PostgreSQL is an open-source database.', '2025-01-20 10:00:00', 'public'),
       (2, 2, 'ACID ensures reliable transactions.', '2025-01-21 11:00:00', 'protected'),
       (3, 3, 'Normalization reduces redundancy and improves efficiency.', '2025-01-22 12:00:00', 'private'),
       (4, 4, 'B-Tree is the default index type in PostgreSQL.', '2025-01-23 13:00:00', 'public');

-- Comment data
INSERT INTO feedback (answer_id, member_id,  content, created_at, updated_at ,deleted_at)
VALUES (1, 1, 'Great explanation!', '2025-01-20 10:15:00', '2025-01-20 10:15:00', NULL),
       (2, 1, 'Needs more details.', '2025-01-21 11:15:00', '2025-01-21 11:15:00', '2025-01-22'),
       (3, 2, 'This is very helpful!', '2025-01-22 12:30:00', '2025-01-22 12:30:00', NULL),
       (4, 2, 'Clear and concise.', '2025-01-23 13:30:00', '2025-01-23 13:30:00', NULL);

-- Job data
INSERT INTO job (development_role)
VALUES ('Frontend'),
       ('Backend'),
       ('Fullstack'),
       ('DevOps');

-- Skill data
INSERT INTO skill (name)
VALUES ('JAVASCRIPT'),
       ('SQL'),
       ('PYTHON'),
       ('DOCKER');

-- Question-Job data
INSERT INTO question_job (question_id, job_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2),
       (3, 3),
       (3, 4),
       (4, 3),
       (4, 4);

-- Bookmark data
INSERT INTO bookmark (member_id, question_id, name, description, access_level)
VALUES (1, 1, 'My first bookmark', '첫 북마크', 'public'),
       (2, 2, 'Important question', '중요한 북마크', 'private'),
       (3, 3, 'Reference question', '북마크 설명1', 'public'),
       (4, 4, 'To review later', '북마크 설명2', 'protected');

-- Likes data
INSERT INTO likes (member_id, answer_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4);

-- History data
INSERT INTO history (member_id, date, count)
VALUES (1, '2025-01-20', 5),
       (2, '2025-01-21', 3),
       (3, '2025-01-22', 7),
       (4, '2025-01-23', 2);

-- Question-Skill data
INSERT INTO question_skill (question_id, skill_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2),
       (3, 3),
       (3, 4),
       (4, 3),
       (4, 4);

-- Job-Skill data
INSERT INTO job_skill (job_id, skill_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4);

---
INSERT INTO member (member_id, nickname, email, password, profile_img, github_url, max_streak, ongoing_streak, deleted_at, provider_type)
VALUES
    (1, 'dev_hong', 'dev_hong@example.com', 'securePass123', 'https://example.com/profiles/dev_hong.jpg', 'https://github.com/devhong', 50, 10, false, 'GITHUB'),
    (2, 'jane_doe', 'jane_doe@example.com', 'securePass456', 'https://example.com/profiles/jane_doe.jpg', 'https://github.com/janedoe', 30, 5, false, 'GOOGLE'),
    (3, 'john_smith', 'john_smith@example.com', 'securePass789', 'https://example.com/profiles/john_smith.jpg', 'https://github.com/johnsmith', 20, 2, true, 'LOCAL');

INSERT INTO question (question_id, title, content)
VALUES
    (1, 'What is Spring Boot?', 'Can you explain what Spring Boot is?'),
    (2, 'What is Java?', 'Explain what Java programming language is.');

INSERT INTO answer (answer_id, member_id, question_id, content, created_at, access_level)
VALUES
    (1, 1, 1, 'Spring Boot is a framework that simplifies the process of building Java applications.', '2023-01-01 10:00:00', 'PUBLIC'),
    (2, 2, 2, 'Java is a high-level, class-based, object-oriented programming language.', '2023-02-01 15:30:00', 'PRIVATE');
