// API 기본 URL
const API_BASE_URL = 'http://localhost:8080/api';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    loadChatHistory();
    
    // 테스트 사용자 생성
    createTestUsers();
});

// 테스트 사용자 생성
async function createTestUsers() {
    try {
        await fetch(`${API_BASE_URL}/test/create-users`, {
            method: 'POST'
        });
    } catch (error) {
        console.log('테스트 사용자가 이미 존재하거나 생성에 실패했습니다.');
    }
}

// 게시글 목록 로드
async function loadPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        const posts = await response.json();
        
        const container = document.getElementById('posts-container');
        
        if (posts.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">게시글이 없습니다.</div>';
            return;
        }
        
        container.innerHTML = posts.map(post => `
            <div class="post-item border-bottom py-3" onclick="showPostDetail(${post.id})">
                <h6 class="mb-1">${post.title}</h6>
                <p class="mb-1 text-muted">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
                <small class="text-muted">
                    <i class="fas fa-user"></i> ${post.authorName} | 
                    <i class="fas fa-clock"></i> ${new Date(post.createdDate).toLocaleString()} |
                    <i class="fas fa-comments"></i> ${post.comments.length}개
                </small>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('게시글 로드 실패:', error);
        document.getElementById('posts-container').innerHTML = 
            '<div class="alert alert-danger">게시글을 불러오는데 실패했습니다.</div>';
    }
}

// 게시글 상세 보기
async function showPostDetail(postId) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        const post = await response.json();
        
        const detailContainer = document.getElementById('post-detail');
        const contentContainer = document.getElementById('post-detail-content');
        
        contentContainer.innerHTML = `
            <h4>${post.title}</h4>
            <div class="mb-3">
                <small class="text-muted">
                    <i class="fas fa-user"></i> ${post.authorName} | 
                    <i class="fas fa-clock"></i> ${new Date(post.createdDate).toLocaleString()}
                </small>
            </div>
            <div class="mb-4">
                <p style="white-space: pre-wrap;">${post.content}</p>
            </div>
            
            <hr>
            
            <h6><i class="fas fa-comments"></i> 댓글 (${post.comments.length}개)</h6>
            
            <div class="mb-3">
                <div class="input-group">
                    <input type="text" id="comment-input-${postId}" class="form-control" placeholder="댓글을 입력하세요...">
                    <button class="btn btn-outline-primary" onclick="addComment(${postId})">
                        <i class="fas fa-plus"></i> 댓글 추가
                    </button>
                </div>
            </div>
            
            <div id="comments-${postId}">
                ${post.comments.map(comment => `
                    <div class="border-bottom py-2">
                        <p class="mb-1">${comment.content}</p>
                        <small class="text-muted">
                            <i class="fas fa-clock"></i> ${new Date(comment.createdDate).toLocaleString()}
                        </small>
                    </div>
                `).join('')}
            </div>
        `;
        
        detailContainer.style.display = 'block';
        detailContainer.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('게시글 상세 로드 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
    }
}

// 댓글 추가
async function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();
    
    if (!content) {
        alert('댓글 내용을 입력하세요.');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                postId: postId
            })
        });
        
        if (response.ok) {
            input.value = '';
            showPostDetail(postId); // 댓글 목록 새로고침
        } else {
            alert('댓글 추가에 실패했습니다.');
        }
        
    } catch (error) {
        console.error('댓글 추가 실패:', error);
        alert('댓글 추가에 실패했습니다.');
    }
}

// 게시글 작성 모달 표시
function showCreatePostModal() {
    const modal = new bootstrap.Modal(document.getElementById('createPostModal'));
    modal.show();
}

// 게시글 작성
async function createPost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const userId = parseInt(document.getElementById('post-userid').value);
    
    if (!title || !content) {
        alert('제목과 내용을 모두 입력하세요.');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
                userId: userId
            })
        });
        
        if (response.ok) {
            // 모달 닫기
            const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
            modal.hide();
            
            // 폼 초기화
            document.getElementById('create-post-form').reset();
            document.getElementById('post-userid').value = '1';
            
            // 게시글 목록 새로고침
            loadPosts();
            
            alert('게시글이 작성되었습니다.');
        } else {
            alert('게시글 작성에 실패했습니다.');
        }
        
    } catch (error) {
        console.error('게시글 작성 실패:', error);
        alert('게시글 작성에 실패했습니다.');
    }
}

// 챗봇 대화 내역 로드
async function loadChatHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/chatbot/history`);
        const messages = await response.json();
        
        const container = document.getElementById('chat-container');
        
        if (messages.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">챗봇과 대화를 시작하세요!</div>';
            return;
        }
        
        container.innerHTML = messages.map(message => {
            const isUser = message.content.startsWith('사용자:');
            const content = message.content.replace(/^(사용자:|챗봇:)\s*/, '');
            
            return `
                <div class="message ${isUser ? 'user' : 'bot'}">
                    <div class="content">${content}</div>
                </div>
            `;
        }).join('');
        
        container.scrollTop = container.scrollHeight;
        
    } catch (error) {
        console.error('챗봇 대화 내역 로드 실패:', error);
    }
}

// 챗봇 메시지 전송
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        });
        
        if (response.ok) {
            input.value = '';
            loadChatHistory(); // 대화 내역 새로고침
        } else {
            alert('메시지 전송에 실패했습니다.');
        }
        
    } catch (error) {
        console.error('메시지 전송 실패:', error);
        alert('메시지 전송에 실패했습니다.');
    }
}

// 엔터키로 메시지 전송
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 챗봇 대화 내역 삭제
async function clearChat() {
    if (!confirm('모든 대화 내역을 삭제하시겠습니까?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/chatbot/history`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadChatHistory();
            alert('대화 내역이 삭제되었습니다.');
        } else {
            alert('대화 내역 삭제에 실패했습니다.');
        }
        
    } catch (error) {
        console.error('대화 내역 삭제 실패:', error);
        alert('대화 내역 삭제에 실패했습니다.');
    }
}