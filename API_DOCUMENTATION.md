# 게시판 & 챗봇 API 문서

## 개요
Spring Boot 기반의 게시판과 챗봇 기능을 제공하는 REST API입니다.

## 엔티티 구조
- **User**: 사용자 정보 (ID: Integer)
- **Posts**: 게시글 정보 (ID: Long, 작성자: User)
- **Comments**: 댓글 정보 (ID: Long, 게시글: Posts)
- **Chatbot**: 챗봇 메시지 (ID: Long)

---

## 게시판 API

### 1. 게시글 API

#### POST /api/posts - 게시글 생성
```json
Request Body:
{
  "title": "게시글 제목",
  "content": "게시글 내용",
  "userId": 1
}

Response:
{
  "id": 1,
  "title": "게시글 제목",
  "content": "게시글 내용",
  "authorName": "사용자명",
  "authorId": 1,
  "createdDate": "2024-01-01T10:00:00",
  "lastModifiedDate": "2024-01-01T10:00:00",
  "comments": []
}
```

#### GET /api/posts - 전체 게시글 조회
```json
Response:
[
  {
    "id": 1,
    "title": "게시글 제목",
    "content": "게시글 내용",
    "authorName": "사용자명",
    "authorId": 1,
    "createdDate": "2024-01-01T10:00:00",
    "lastModifiedDate": "2024-01-01T10:00:00",
    "comments": []
  }
]
```

#### GET /api/posts/{postId} - 게시글 단건 조회
```json
Response:
{
  "id": 1,
  "title": "게시글 제목",
  "content": "게시글 내용",
  "authorName": "사용자명",
  "authorId": 1,
  "createdDate": "2024-01-01T10:00:00",
  "lastModifiedDate": "2024-01-01T10:00:00",
  "comments": [
    {
      "id": 1,
      "content": "댓글 내용",
      "postId": 1,
      "createdDate": "2024-01-01T10:30:00",
      "lastModifiedDate": "2024-01-01T10:30:00"
    }
  ]
}
```

#### PUT /api/posts/{postId} - 게시글 수정
```json
Request Body:
{
  "title": "수정된 제목",
  "content": "수정된 내용",
  "userId": 1
}

Response: (게시글 정보)
```

#### DELETE /api/posts/{postId}?userId={userId} - 게시글 삭제
```
Response: "게시글이 삭제되었습니다."
```

#### GET /api/posts/user/{userId} - 사용자별 게시글 조회
```json
Response: [게시글 목록]
```

### 2. 댓글 API

#### POST /api/comments - 댓글 생성
```json
Request Body:
{
  "content": "댓글 내용",
  "postId": 1
}

Response:
{
  "id": 1,
  "content": "댓글 내용",
  "postId": 1,
  "createdDate": "2024-01-01T10:30:00",
  "lastModifiedDate": "2024-01-01T10:30:00"
}
```

#### GET /api/comments - 전체 댓글 조회
#### GET /api/comments/{commentId} - 댓글 단건 조회
#### GET /api/comments/post/{postId} - 게시글별 댓글 조회
#### PUT /api/comments/{commentId} - 댓글 수정
#### DELETE /api/comments/{commentId} - 댓글 삭제

---

## 챗봇 API

### POST /api/chatbot/chat - 챗봇 메시지 전송
```json
Request Body:
{
  "content": "안녕하세요"
}

Response:
{
  "id": 2,
  "content": "챗봇: 안녕하세요! 무엇을 도와드릴까요?",
  "createdDate": "2024-01-01T11:00:00",
  "lastModifiedDate": "2024-01-01T11:00:00"
}
```

### GET /api/chatbot/history - 대화 내역 조회
```json
Response:
[
  {
    "id": 1,
    "content": "사용자: 안녕하세요",
    "createdDate": "2024-01-01T11:00:00",
    "lastModifiedDate": "2024-01-01T11:00:00"
  },
  {
    "id": 2,
    "content": "챗봇: 안녕하세요! 무엇을 도와드릴까요?",
    "createdDate": "2024-01-01T11:00:00",
    "lastModifiedDate": "2024-01-01T11:00:00"
  }
]
```

### GET /api/chatbot/{messageId} - 메시지 단건 조회
### DELETE /api/chatbot/{messageId} - 메시지 삭제
### DELETE /api/chatbot/history - 대화 내역 전체 삭제

---

## 챗봇 응답 규칙

챗봇은 다음과 같은 키워드에 반응합니다:
- **인사**: "안녕", "hello", "hi" → 인사 응답
- **게시판**: "게시판", "게시글" → 게시판 기능 설명
- **댓글**: "댓글" → 댓글 기능 설명
- **도움**: "도움", "help" → 도움말 제공
- **시간**: "시간", "time" → 시간 관련 응답
- **감사**: "감사", "고마워", "thank" → 감사 응답
- **작별**: "바이", "bye" → 작별 인사
- **기타**: 이해하지 못한 메시지 → 기본 응답

---

## 에러 처리

모든 API는 다음과 같은 HTTP 상태 코드를 사용합니다:
- **200 OK**: 성공
- **400 Bad Request**: 잘못된 요청
- **404 Not Found**: 리소스를 찾을 수 없음
- **500 Internal Server Error**: 서버 오류

에러 발생 시 메시지와 함께 적절한 HTTP 상태 코드가 반환됩니다.