// post.js 파일 내용

document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.dataset.id;
            const row = this.closest('tr');
            const categoryNameCell = row.children[1];

            const currentCategoryName = categoryNameCell.textContent;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentCategoryName;
            inputField.className = 'edit-input';

            categoryNameCell.innerHTML = '';
            categoryNameCell.appendChild(inputField);

            inputField.focus();

            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const newCategoryName = inputField.value;
                    if (newCategoryName.trim() === '') {
                        alert('카테고리 이름을 입력해주세요.');
                        inputField.focus();
                        return;
                    }
                    console.log(`카테고리 ID: ${categoryId}, 새 이름: ${newCategoryName} (서버 전송 필요)`);
                    // 실제 서버 통신: fetch(`/api/categories/${categoryId}`, { method: 'PUT', body: JSON.stringify({ name: newCategoryName })})
                    // .then(response => response.json())
                    // .then(data => { /* 성공/실패 처리 */ });
                    categoryNameCell.textContent = newCategoryName;
                }
            });

            inputField.addEventListener('blur', function() {
                if (categoryNameCell.querySelector('.edit-input')) {
                    categoryNameCell.textContent = currentCategoryName;
                }
            });

            alert(`${categoryId}번 카테고리 수정 버튼 클릭!`);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.dataset.id;
            const rowToDelete = this.closest('tr');

            if (confirm(`${categoryId}번 카테고리를 정말 삭제하시겠습니까?`)) {
                alert(`${categoryId}번 카테고리 삭제 진행!`);
                // 실제 서버 통신: fetch(`/api/categories/${categoryId}`, { method: 'DELETE' })
                // .then(response => response.json())
                // .then(data => {
                //     if (data.success) { rowToDelete.remove(); } else { alert('삭제 실패: ' + data.message); }
                // })
                // .catch(error => console.error('Error:', error));
                rowToDelete.remove();
            } else {
                alert('삭제를 취소했습니다.');
            }
        });
    });
});