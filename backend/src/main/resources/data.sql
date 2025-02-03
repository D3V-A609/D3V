INSERT INTO member (nickname, email, password, profile_img, github_url, max_streak, ongoing_streak, provider_type, created_at, updated_at)
VALUES
    ( 'dev_hong', 'dev_hong@example.com', 'securePass123', 'https://example.com/profiles/dev_hong.jpg', 'https://github.com/devhong', 50, 10, 'GITHUB', '2025-01-01', '2025-01-01'),
    ('jane_doe', 'jane_doe@example.com', 'securePass456', 'https://example.com/profiles/jane_doe.jpg', 'https://github.com/janedoe', 30, 5,  'GOOGLE', '2025-01-01', '2025-01-01'),
    ('john_smith', 'john_smith@example.com', 'securePass789', 'https://example.com/profiles/john_smith.jpg', 'https://github.com/johnsmith', 20, 2, 'LOCAL', '2025-01-01', '2025-01-01');

select * from member;

INSERT INTO question (content, standard_answer)
VALUES ('Question 1', 'Standard answer for question 1'),
       ('Question 2', 'Standard answer for question 2'),
       ('Question 3', 'Standard answer for question 3'),
       ('Question 4', 'Standard answer for question 4'),
       ('Question 5', 'Standard answer for question 5'),
       ('Question 6', 'Standard answer for question 6'),
       ('Question 7', 'Standard answer for question 7'),
       ('Question 8', 'Standard answer for question 8'),
       ('Question 9', 'Standard answer for question 9'),
       ('Question 10', 'Standard answer for question 10'),
       ('Question 11', 'Standard answer for question 11'),
       ('Question 12', 'Standard answer for question 12'),
       ('Question 13', 'Standard answer for question 13'),
       ('Question 14', 'Standard answer for question 14'),
       ('Question 15', 'Standard answer for question 15'),
       ('Question 16', 'Standard answer for question 16'),
       ('Question 17', 'Standard answer for question 17'),
       ('Question 18', 'Standard answer for question 18'),
       ('Question 19', 'Standard answer for question 19'),
       ('Question 20', 'Standard answer for question 20'),
       ('Question 21', 'Standard answer for question 21'),
       ('Question 22', 'Standard answer for question 22'),
       ('Question 23', 'Standard answer for question 23'),
       ('Question 24', 'Standard answer for question 24'),
       ('Question 25', 'Standard answer for question 25'),
       ('Question 26', 'Standard answer for question 26'),
       ('Question 27', 'Standard answer for question 27'),
       ('Question 28', 'Standard answer for question 28'),
       ('Question 29', 'Standard answer for question 29'),
       ('Question 30', 'Standard answer for question 30'),
       ('Question 31', 'Standard answer for question 31'),
       ('Question 32', 'Standard answer for question 32'),
       ('Question 33', 'Standard answer for question 33'),
       ('Question 34', 'Standard answer for question 34'),
       ('Question 35', 'Standard answer for question 35'),
       ('Question 36', 'Standard answer for question 36'),
       ('Question 37', 'Standard answer for question 37'),
       ('Question 38', 'Standard answer for question 38'),
       ('Question 39', 'Standard answer for question 39'),
       ('Question 40', 'Standard answer for question 40'),
       ('Question 41', 'Standard answer for question 41'),
       ('Question 42', 'Standard answer for question 42'),
       ('Question 43', 'Standard answer for question 43'),
       ('Question 44', 'Standard answer for question 44'),
       ('Question 45', 'Standard answer for question 45'),
       ('Question 46', 'Standard answer for question 46'),
       ('Question 47', 'Standard answer for question 47'),
       ('Question 48', 'Standard answer for question 48'),
       ('Question 49', 'Standard answer for question 49'),
       ('Question 50', 'Standard answer for question 50'),
       ('Question 51', 'Standard answer for question 51'),
       ('Question 52', 'Standard answer for question 52'),
       ('Question 53', 'Standard answer for question 53'),
       ('Question 54', 'Standard answer for question 54'),
       ('Question 55', 'Standard answer for question 55'),
       ('Question 56', 'Standard answer for question 56'),
       ('Question 57', 'Standard answer for question 57'),
       ('Question 58', 'Standard answer for question 58'),
       ('Question 59', 'Standard answer for question 59'),
       ('Question 60', 'Standard answer for question 60'),
       ('Question 61', 'Standard answer for question 61'),
       ('Question 62', 'Standard answer for question 62'),
       ('Question 63', 'Standard answer for question 63'),
       ('Question 64', 'Standard answer for question 64'),
       ('Question 65', 'Standard answer for question 65'),
       ('Question 66', 'Standard answer for question 66'),
       ('Question 67', 'Standard answer for question 67'),
       ('Question 68', 'Standard answer for question 68'),
       ('Question 69', 'Standard answer for question 69'),
       ('Question 70', 'Standard answer for question 70'),
       ('Question 71', 'Standard answer for question 71'),
       ('Question 72', 'Standard answer for question 72'),
       ('Question 73', 'Standard answer for question 73'),
       ('Question 74', 'Standard answer for question 74'),
       ('Question 75', 'Standard answer for question 75'),
       ('Question 76', 'Standard answer for question 76'),
       ('Question 77', 'Standard answer for question 77'),
       ('Question 78', 'Standard answer for question 78');

select * from question;

INSERT INTO served_question (member_id, question_id, is_solved, is_daily, served_at)
VALUES (1, 1, TRUE, FALSE, '2025-01-20'),
       (2, 2, FALSE, FALSE, '2025-01-21'),
       (3, 3, TRUE, FALSE, '2025-01-22'),
       (1, 4, FALSE, FALSE, '2025-01-23');

select * from served_question;

INSERT INTO answer (member_id, question_id, content, created_at, access_level)
VALUES (1, 1, 'PostgreSQL is an open-source database.', '2025-01-20 10:00:00', 'public'),
       (2, 2, 'ACID ensures reliable transactions.', '2025-01-21 11:00:00', 'protected'),
       (3, 3, 'Normalization reduces redundancy and improves efficiency.', '2025-01-22 12:00:00', 'private'),
       (1, 4, 'B-Tree is the default index type in PostgreSQL.', '2025-01-23 13:00:00', 'public');

select * from answer;

INSERT INTO feedback (answer_id, member_id,  content, created_at, updated_at ,deleted_at)
VALUES (1, 1, 'Great explanation!', '2025-01-20 10:15:00', '2025-01-20 10:15:00', NULL),
       (2, 1, 'Needs more details.', '2025-01-21 11:15:00', '2025-01-21 11:15:00', '2025-01-22'),
       (3, 2, 'This is very helpful!', '2025-01-22 12:30:00', '2025-01-22 12:30:00', NULL),
       (4, 2, 'Clear and concise.', '2025-01-23 13:30:00', '2025-01-23 13:30:00', NULL);

select * from feedback;

INSERT INTO job (development_role)
VALUES ('Frontend'),
       ('Backend'),
       ('Fullstack'),
       ('DevOps');

select * from job;

INSERT INTO skill (name)
VALUES ('JAVASCRIPT'),
       ('SQL'),
       ('PYTHON'),
       ('JAVA');

select * from skill;

INSERT INTO question_job (question_id, job_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2),
       (3, 3),
       (3, 4),
       (4, 3),
       (4, 4);

select * from question_job;

INSERT INTO bookmark (member_id, question_id, name, description, access_level)
VALUES (1, 1, 'My first bookmark', '첫 북마크', 'public'),
       (2, 2, 'Important question', '중요한 북마크', 'private'),
       (3, 3, 'Reference question', '북마크 설명1', 'public'),
       (4, 4, 'To review later', '북마크 설명2', 'protected');

select * from bookmark;

INSERT INTO likes (member_id, answer_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4);

SELECT * FROM likes;

INSERT INTO history (member_id, date, count)
VALUES (1, '2025-01-20', 5),
       (2, '2025-01-21', 3),
       (3, '2025-01-22', 7),
       (4, '2025-01-23', 2);

select * from history;

INSERT INTO question_skill (question_id, skill_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 2),
       (3, 3),
       (3, 4),
       (4, 3),
       (4, 4);

select * from question_skill;

INSERT INTO job_skill (job_id, skill_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4);

select * from job_skill;