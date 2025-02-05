INSERT INTO member (nickname, email, password, profile_img, github_url, max_streak, ongoing_streak, provider_type, created_at, updated_at)
VALUES
    ( 'dev_hong', 'dev_hong@example.com', 'securePass123', 'https://example.com/profiles/dev_hong.jpg', 'https://github.com/devhong', 50, 10, 'GITHUB', '2025-01-01', '2025-01-01'),
    ('jane_doe', 'jane_doe@example.com', 'securePass456', 'https://example.com/profiles/jane_doe.jpg', 'https://github.com/janedoe', 30, 5,  'GOOGLE', '2025-01-01', '2025-01-01'),
    ('john_smith', 'john_smith@example.com', 'securePass789', 'https://example.com/profiles/john_smith.jpg', 'https://github.com/johnsmith', 20, 2, 'LOCAL', '2025-01-01', '2025-01-01'),
    ('test', 'test@example.com', '1234', 'profile1.png', 'https://github.com/test', 0, 0, 'LOCAL', '2025-01-01', '2025-01-01');

select * from member;

INSERT INTO question (content, standard_answer)
VALUES ('React의 Virtual DOM 동작 원리', 'React의 가상 DOM은 메모리에서 작동하는 가벼운 DOM 트리입니다. 상태나 props가 변경될 때 새로운 가상 DOM을 생성하고 이전 가상 DOM과 비교(diffing)해서 변경된 부분만 실제 DOM에 반영합니다. 이를 통해 전체 DOM을 재렌더링하지 않고, 효율적으로 화면을 업데이트합니다.'),
       ('JavaScript 이벤트 루프와 비동기 처리', 'Standard answer for question 2'),
       ('Spring Security 인증 구현 방법', 'Standard answer for question 3'),
       ('TypeScript 제네릭 활용법', 'Standard answer for question 4'),
       ('Docker 컨테이너 네트워킹', 'Standard answer for question 5'),
       ('React Native 성능 최적화', 'Standard answer for question 6'),
       ('Node.js 메모리 누수 디버깅', 'Standard answer for question 7'),
       ('Vue.js 상태 관리 패턴', 'Standard answer for question 8'),
       ('Kubernetes 파드 스케줄링', 'Standard answer for question 9'),
       ('Flutter 위젯 라이프사이클', 'Standard answer for question 10'),
       ('Django REST framework 인증', 'Standard answer for question 11'),
       ('Angular 의존성 주입', 'Standard answer for question 12'),
       ('iOS 앱 배포 프로세스', 'Standard answer for question 13'),
       ('AWS Lambda 함수 최적화', 'Standard answer for question 14'),
       ('Spring Boot JPA 성능 튜닝', 'Standard answer for question 15'),
       ('React Query 캐시 전략', 'Standard answer for question 16'),
       ('Jenkins 파이프라인 구축', 'Standard answer for question 17'),
       ('Android 백그라운드 처리', 'Standard answer for question 18'),
       ('TypeScript 타입 추론', 'Standard answer for question 19'),
       ('Python FastAPI 비동기 처리', 'Standard answer for question 20'),
       ('Docker Compose 구성', 'Standard answer for question 21'),
       ('React Native 네비게이션', 'Standard answer for question 22'),
       ('Node.js 마이크로서비스', 'Standard answer for question 23'),
       ('Vue.js 컴포지션 API', 'Standard answer for question 24'),
       ('AWS ECS 클러스터 관리', 'Standard answer for question 25'),
       ('Flutter 상태 관리', 'Standard answer for question 26'),
       ('Spring WebFlux 리액티브', 'Standard answer for question 27'),
       ('Angular 변화 감지', 'Standard answer for question 28'),
       ('iOS 푸시 알림 구현', 'Standard answer for question 29'),
       ('Kubernetes 볼륨 관리', 'Standard answer for question 30'),
       ('Django 캐시 전략', 'Standard answer for question 31'),
       ('Python과 R을 활용한 데이터 분석 기법 비교', 'Standard answer for question 32'),
       ('Terraform을 활용한 클라우드 인프라 코드 관리', 'Standard answer for question 33'),
       ('React와 Vue.js의 상태 관리 비교', 'Standard answer for question 34'),
       ('Java로 대용량 트랜잭션 처리 구현', 'Standard answer for question 35'),
       ('Docker Swarm과 Kubernetes 비교', 'Standard answer for question 36'),
       ('iOS와 Android에서 푸시 알림 동작 비교', 'Standard answer for question 37'),
       ('Django ORM 최적화 전략', 'Standard answer for question 38'),
       ('Angular와 React의 성능 최적화 전략', 'Standard answer for question 39'),
       ('Azure와 AWS 클라우드 비교', 'Standard answer for question 40'),
       ('Flutter로 멀티플랫폼 앱 개발', 'Standard answer for question 41'),
       ('Kafka를 활용한 실시간 데이터 처리', 'Standard answer for question 42'),
       ('CI/CD 파이프라인 구축 사례', 'Standard answer for question 43'),
       ('머신러닝 모델 성능 개선을 위한 하이퍼파라미터 튜닝', 'Standard answer for question 44'),
       ('TypeScript로 대규모 프로젝트 관리', 'Standard answer for question 45'),
       ('Kotlin을 사용한 Android 앱 최적화', 'Standard answer for question 46'),
       ('Redis를 활용한 캐싱 전략', 'Standard answer for question 47'),
       ('PostgreSQL과 MySQL의 성능 비교', 'Standard answer for question 48'),
       ('Vue.js와 Nuxt.js를 활용한 SSR 구현', 'Standard answer for question 49'),
       ('Elasticsearch를 활용한 로그 분석', 'Standard answer for question 50'),
       ('GraphQL API 설계 패턴', 'Standard answer for question 51'),
       ('WebAssembly 성능 최적화', 'Standard answer for question 52'),
       ('Unity 3D 게임 최적화', 'Standard answer for question 53'),
       ('IoT 디바이스 보안', 'Standard answer for question 54'),
       ('스마트 컨트랙트 개발과 테스팅', 'Standard answer for question 55'),
       ('마이크로프론트엔드 아키텍처', 'Standard answer for question 56'),
       ('자연어 처리를 위한 BERT 모델 활용', 'Standard answer for question 57'),
       ('모바일 앱 자동화 테스트', 'Standard answer for question 58'),
       ('서버리스 아키텍처 구현', 'Standard answer for question 59'),
       ('실시간 데이터 시각화', 'Standard answer for question 60'),
       ('임베디드 리눅스 커널 최적화', 'Standard answer for question 61'),
       ('풀스택 JAMstack 웹 개발', 'Standard answer for question 62');

select * from question;

INSERT INTO served_question (member_id, question_id, is_solved, is_daily, served_at)
VALUES (1, 1, TRUE, FALSE, '2025-01-20'),
       (2, 1, FALSE, FALSE, '2025-01-21'),
       (3, 1, TRUE, FALSE, '2025-01-22'),
       (4, 1, FALSE, FALSE, '2025-01-23');

select * from served_question;

INSERT INTO answer (member_id, question_id, content, created_at, access_level)
VALUES (1, 1, 'React의 가상 DOM은 메모리에서 작동하는 가벼운 DOM 트리입니다. 상태나 props가 변경될 때 새로운 가상 DOM을 생성하고 이전 가상 DOM과 비교(diffing)해서 변경된 부분만 실제 DOM에 반영합니다. 이를 통해 전체 DOM을 재렌더링하지 않고, 효율적으로 화면을 업데이트합니다.', '2025-01-20 10:00:00', 'PUBLIC'),
       (2, 1, 'React의 가상 DOM은 메모리에서 작동하는 가벼운 DOM입니다. 상태나 props가 변경되면 React는 새로운 가상 DOM을 생성하고, 이전 가상 DOM과 비교(diffing)하여 변경된 부분을 식별합니다. 그 뒤에 이 변경 사항만 실제 DOM에 반영하기 때문에 전체 DOM을 다시 그리는 비효율을 줄이고 성능을 최적화합니다. 이런 방식은 선언적 UI와 잘 맞아떨어져 코드 관리도 쉬워집니다.', '2025-01-21 11:00:00', 'PUBLIC'),
       (3, 1, '가상 DOM은 React가 효율적으로 화면을 업데이트하기 위해 사용하는 기술입니다. 컴포넌트의 상태나 props가 변경되면, 가상 DOM에서 새로운 화면을 만들어 이전과 비교(diffing)한 뒤, 바뀐 부분만 실제 DOM에 적용해서 성능을 높입니다.', '2025-01-22 12:00:00', 'PUBLIC'),
       (1, 1, '가상 DOM은 React가 화면을 더 빠르게 업데이트하기 위해 사용하는 기술입니다. 상태나 props가 바뀌면 가상 DOM에서 먼저 새로운 화면을 만들고, 이전 가상 DOM과 비교해서 뭐가 바뀌었는지 확인합니다. 확인된 바뀐 부분만 실제 DOM에 반영해서 성능을 높입니다.', '2025-01-23 13:00:00', 'PUBLIC');

select * from answer;

INSERT INTO feedback (answer_id, member_id,  content, created_at, updated_at ,deleted_at)
VALUES (1, 1, 'Great explanation!', '2025-01-20 10:15:00', '2025-01-20 10:15:00', NULL),
       (2, 1, 'Needs more details.', '2025-01-21 11:15:00', '2025-01-21 11:15:00', '2025-01-22'),
       (3, 2, 'This is very helpful!', '2025-01-22 12:30:00', '2025-01-22 12:30:00', NULL),
       (4, 2, 'Clear and concise.', '2025-01-23 13:30:00', '2025-01-23 13:30:00', NULL);

select * from feedback;

INSERT INTO job (development_role) VALUES
('FRONTEND'),
('BACKEND'),
('DEVOPS'),
('MOBILE'),
('DATA_SCIENCE'),
('DATABASE'),
('MACHINE_LEARNING'),
('FULLSTACK'),
('GAME_DEVELOPMENT'),
('EMBEDDED'),
('BLOCKCHAIN'),
('CYBER_SECURITY');

select * from job;

INSERT INTO skill (name) VALUES
('REACT'),
('JAVASCRIPT'),
('SPRING'),
('JAVA'),
('TYPESCRIPT'),
('DOCKER'),
('REACT_NATIVE'),
('NODE_JS'),
('VUE'),
('KUBERNETES'),
('FLUTTER'),
('DJANGO'),
('PYTHON'),
('ANGULAR'),
('IOS'),
('AWS'),
('JENKINS'),
('ANDROID'),
('R'),
('PANDAS'),
('TERRAFORM'),
('AZURE'),
('CLOUD_COMPUTING'),
('DART'),
('KAFKA'),
('SPARK'),
('GIT'),
('SCIKIT_LEARN'),
('TENSORFLOW'),
('KOTLIN'),
('JETPACK'),
('REDIS'),
('MONGODB'),
('POSTGRESQL'),
('MYSQL'),
('SQL'),
('NUXT'),
('ELASTICSEARCH'),
('LOGSTASH'),
('KIBANA'),
('GRAPHQL'),
('APOLLO'),
('WEBASSEMBLY'),
('RUST'),
('C_PLUS'),
('UNITY'),
('C_SHARP'),
('GRAPHICS'),
('C'),
('IOT'),
('ENCRYPTION'),
('SOLIDITY'),
('ETHEREUM'),
('WEB3_JS'),
('MODULE_FEDERATION'),
('WEBPACK'),
('BERT'),
('APPIUM'),
('SELENIUM'),
('SERVERLESS_FRAMEWORK'),
('D3_JS'),
('WEBSOCKET'),
('LINUX_KERNEL'),
('ASSEMBLY'),
('NEXT_JS'),
('GATSBY'),
('HEADLESS_CMS');

select * from skill;

INSERT INTO question_job (question_id, job_id) VALUES
(1, 1), -- Frontend
(2, 1), -- Frontend
(3, 2), -- Backend
(4, 1), -- Frontend
(5, 3), -- DevOps
(6, 4), -- Mobile
(7, 2), -- Backend
(8, 1), -- Frontend
(9, 3), -- DevOps
(10, 4), -- Mobile
(11, 2), -- Backend
(12, 1), -- Frontend
(13, 4), -- Mobile
(14, 3), -- DevOps
(15, 2), -- Backend
(16, 1), -- Frontend
(17, 3), -- DevOps
(18, 4), -- Mobile
(19, 1), -- Frontend
(20, 2), -- Backend
(21, 3), -- DevOps
(22, 4), -- Mobile
(23, 2), -- Backend
(24, 1), -- Frontend
(25, 3), -- DevOps
(26, 4), -- Mobile
(27, 2), -- Backend
(28, 1), -- Frontend
(29, 4), -- Mobile
(30, 3), -- DevOps
(31, 2), -- Backend
(32, 5), -- Data Science (also Backend)
(33, 3), -- DevOps
(34, 1), -- Frontend
(35, 2), -- Backend
(36, 3), -- DevOps
(37, 4), -- Mobile (iOS and Android)
(38, 5), -- Data Science (also Backend)
(39, 1), -- Frontend
(40, 3), -- DevOps (AWS and Azure)
(41, 4), -- Mobile (Flutter)
(42, 6), -- Database (also Backend)
(43, 3), -- DevOps (also Backend)
(44, 7), -- Machine Learning (also Data Science)
(45, 1), -- Frontend (TypeScript)
(46, 4), -- Mobile (Kotlin)
(47, 6), -- Database (also Backend)
(48, 6), -- Database (PostgreSQL and MySQL)
(49, 1), -- Frontend (Vue and Nuxt.js)
(50, 6), -- Database (Elasticsearch) and DevOps
(51, 8), -- Fullstack (GraphQL and Apollo)
(52, 1), -- Frontend (WebAssembly)
(53, 9), -- Game Development (Unity)
(54, 10),-- Embedded and Cyber Security (IoT Security)
(55, 11),-- Blockchain (Smart Contracts)
(56, 1), -- Frontend (Microfrontend Architecture)
(57, 7),-- Machine Learning (BERT Model)
(58, 4),-- Mobile and Testing (Appium/Selenium)
(59, 3),-- DevOps and Backend(Serverless Framework)
(60, 5),-- Data Science and Frontend(D3.js Visualization)
(61, 10),-- EMBEDDED
(62, 8); -- FULLSTACK

select * from question_job;

INSERT INTO question_skill (question_id, skill_id) VALUES
(1, 1), -- React
(1, 2), -- JavaScript
(2, 2), -- JavaScript
(3, 3), -- Spring
(3, 4), -- Java
(4, 5), -- TypeScript
(5, 6), -- Docker
(6, 7), -- React Native
(7, 8), -- Node.js
(8, 9), -- Vue
(9, 10), -- Kubernetes
(10, 11), -- Flutter
(11, 12), -- Django
(11, 13), -- Python
(12, 14), -- Angular
(13, 15), -- iOS
(14, 16), -- AWS
(15, 3), -- Spring
(15, 4), -- Java
(16, 1), -- React
(17, 17), -- Jenkins
(18, 18), -- Android
(19, 5), -- TypeScript
(20, 13), -- Python
(21, 6), -- Docker
(22, 7), -- React Native
(23, 8), -- Node.js
(24, 9), -- Vue
(25, 16), -- AWS
(26, 11), -- Flutter
(27, 3), -- Spring
(27, 4), -- Java
(28, 14), -- Angular
(29, 15), -- iOS
(30, 10), -- Kubernetes
(31, 12), -- Django
(31, 13), -- Python
(32, 13), -- Python
(32, 19), -- R
(32, 20), -- Pandas
(33, 21), -- Terraform
(33, 16), -- AWS
(34, 1), -- React
(34, 9), -- Vue
(34, 2), -- JavaScript
(35, 4), -- Java
(35, 3), -- Spring
(36, 6), -- Docker
(36, 10), -- Kubernetes
(37, 15), -- iOS
(37, 18), -- Android
(38, 12), -- Django
(38, 13), -- Python
(38, 22), -- SQL
(39, 14), -- Angular
(39, 1),--React
(40, 16), -- AWS
(40, 23), -- Azure
(40, 24), -- Cloud Computing
(41, 11), -- Flutter
(41, 25), -- Dart
(42, 26), -- Kafka
(42, 27), -- Spark
(42, 4),  -- Java
(43, 17), -- Jenkins
(43, 28), -- Git
(43, 6),  -- Docker
(44, 13), -- Python
(44, 29), -- Scikit-learn
(44, 30), -- TensorFlow
(45, 5),  -- TypeScript
(45, 2),  -- JavaScript
(45, 1),  -- React
(46, 31), -- Kotlin
(46, 18), -- Android
(46, 32), -- Jetpack
(47, 33), -- Redis
(47, 8),  -- Node.js
(47, 34), -- MongoDB
(48, 35), -- PostgreSQL
(48, 36), -- MySQL
(48, 22), -- SQL
(49, 9),  -- Vue
(49, 37), -- Nuxt.js
(49, 2),  -- JavaScript
(50, 38), -- Elasticsearch
(50, 39), -- Logstash
(50, 40), -- Kibana
(51, 41), -- GraphQL
(51, 42), -- Apollo
(51, 8),  -- Node.js
(52, 43), -- WebAssembly
(52, 44), -- Rust
(52, 45), -- C++
(53, 46), -- Unity
(53, 47), -- C#
(53, 48), -- 3D Graphics
(54, 49), -- C
(54, 50), -- IoT
(54, 51), -- Encryption
(55, 52), -- Solidity
(55, 53), -- Ethereum
(55, 54), -- Web3.js
(56, 2),   -- JavaScript
(56, 55),   -- Module Federation
(56, 56 ),-- Webpack
(57, 13), -- Python
(57, 57), -- BERT
(57, 30), -- TensorFlow
(58, 58), -- Appium
(58, 59), -- Selenium
(58, 4),  -- Java
(59, 16), -- AWS Lambda
(59, 60), -- Serverless Framework
(60, 61), -- D3.js
(60, 62), -- WebSocket
(60, 1),  -- React
(61, 49), -- C
(61, 63), -- Linux Kernel
(61, 64), -- Assembly
(62, 65), -- Next.js
(62, 66), -- Gatsby
(62, 67); -- Headless CMS

select  * from question_skill;

INSERT INTO bookmark (bookmark_id, member_id, name, description, access_level)
VALUES (1, 1, 'My first bookmark', '첫 북마크', 'PUBLIC'),
       (2, 2, 'Important question', '중요한 북마크', 'PRIVATE'),
       (3, 3, 'Reference question', '북마크 설명1', 'PUBLIC'),
       (4, 4, 'To review later', '북마크 설명2', 'PROTECTED');

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

INSERT INTO job_skill (job_id, skill_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4);

select * from job_skill;