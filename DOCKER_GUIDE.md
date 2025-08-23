# Docker 컨테이너 실행 가이드

## 📋 개요
이 프로젝트는 Spring Boot 백엔드, MySQL 데이터베이스, 그리고 간단한 웹 프론트엔드로 구성된 게시판 & 챗봇 시스템입니다.

## 🛠️ 필요한 소프트웨어
- Docker
- Docker Compose

## 🚀 컨테이너 실행 방법

### 1. 프로젝트 디렉토리로 이동
```bash
cd /Users/yoon_eunseok/Documents/개발\ 공부/StudyJpa
```

### 2. Docker Compose로 모든 서비스 시작
```bash
docker-compose up --build
```

이 명령어는 다음을 수행합니다:
- Spring Boot 애플리케이션을 빌드하고 컨테이너로 실행
- MySQL 데이터베이스 컨테이너 시작
- Nginx를 사용한 프론트엔드 웹서버 시작

### 3. 백그라운드에서 실행 (선택사항)
```bash
docker-compose up --build -d
```

## 🌐 접속 URL

### 프론트엔드 웹 애플리케이션
- **URL**: http://localhost
- **기능**: 게시판과 챗봇을 사용할 수 있는 웹 인터페이스

### Swagger UI (API 문서)
- **URL**: http://localhost:8080/swagger-ui.html
- **기능**: 모든 REST API를 테스트할 수 있는 인터페이스

### 백엔드 API
- **Base URL**: http://localhost:8080/api
- **기능**: REST API 직접 호출

### MySQL 데이터베이스
- **Host**: localhost
- **Port**: 3306
- **Database**: studyjpa
- **Username**: studyjpa
- **Password**: studyjpa123

## 📊 서비스 구성

### 🐳 컨테이너 목록
1. **studyjpa-mysql**: MySQL 8.0 데이터베이스
2. **studyjpa-app**: Spring Boot 애플리케이션
3. **studyjpa-frontend**: Nginx 웹서버 (프론트엔드)

### 🔗 포트 매핑
- **80**: 프론트엔드 웹 인터페이스
- **8080**: Spring Boot 애플리케이션
- **3306**: MySQL 데이터베이스

## 🎯 사용 방법

### 1. 웹 인터페이스 사용
1. 브라우저에서 http://localhost 접속
2. 게시글 작성/조회/댓글 달기
3. 챗봇과 대화하기

### 2. API 테스트
1. 브라우저에서 http://localhost:8080/swagger-ui.html 접속
2. 각 API 엔드포인트 테스트

### 3. 테스트 사용자
시스템이 시작되면 자동으로 테스트 사용자가 생성됩니다:
- 사용자 1: user1@test.com (ID: 1)
- 사용자 2: user2@test.com (ID: 2)

## 🛑 컨테이너 중지

### 모든 컨테이너 중지
```bash
docker-compose down
```

### 데이터까지 삭제 (주의!)
```bash
docker-compose down -v
```

## 🔧 트러블슈팅

### 포트 충돌 시
만약 포트가 이미 사용 중이라면:

```bash
# 기존 프로세스 확인
lsof -i :80
lsof -i :8080
lsof -i :3306

# 프로세스 종료 후 다시 시도
docker-compose up --build
```

### 컨테이너 재빌드
```bash
# 모든 컨테이너와 이미지 삭제 후 재빌드
docker-compose down
docker system prune -a
docker-compose up --build
```

### 로그 확인
```bash
# 모든 서비스 로그 확인
docker-compose logs

# 특정 서비스 로그 확인
docker-compose logs app
docker-compose logs mysql
docker-compose logs frontend
```

## 📝 주요 API 엔드포인트

### 게시글 API
- `GET /api/posts` - 전체 게시글 조회
- `POST /api/posts` - 게시글 생성
- `GET /api/posts/{id}` - 게시글 상세 조회
- `PUT /api/posts/{id}` - 게시글 수정
- `DELETE /api/posts/{id}` - 게시글 삭제

### 댓글 API
- `POST /api/comments` - 댓글 생성
- `GET /api/comments/post/{postId}` - 게시글별 댓글 조회

### 챗봇 API
- `POST /api/chatbot/chat` - 챗봇 메시지 전송
- `GET /api/chatbot/history` - 대화 내역 조회
- `DELETE /api/chatbot/history` - 대화 내역 삭제

### 테스트 API
- `POST /api/test/create-users` - 테스트 사용자 생성
- `GET /api/test/users` - 사용자 목록 조회

## 🎉 즐거운 사용하세요!
모든 설정이 완료되었습니다. http://localhost 에서 시스템을 사용하고, http://localhost:8080/swagger-ui.html 에서 API를 테스트해보세요!