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
                    console.log(`카테고리 ID: ${categoryId}, 새 이름: ${newCategoryName}`);
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
                rowToDelete.remove();
            } else {
                alert('삭제를 취소했습니다.');
            }
        });
    });

    const searchInput = document.querySelector('.category-search-input');
    const searchButton = document.querySelector('.search');
    const resetButton = document.querySelector('.starline');
    const tableBody = document.querySelector('.category-data-table tbody');
    const allTableRows = Array.from(tableBody.querySelectorAll('tr'));

    if (searchButton && searchInput && tableBody) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        if (resetButton) {
            resetButton.addEventListener('click', function() {
                searchInput.value = '';
                displayRows(allTableRows);
            });
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredRows = [];

        allTableRows.forEach(row => {
            const categoryName = row.children[1].textContent.toLowerCase();
            if (categoryName.includes(searchTerm)) {
                filteredRows.push(row);
            }
        });

        displayRows(filteredRows);
    }

    function displayRows(rowsToDisplay) {
        tableBody.innerHTML = '';
        if (rowsToDisplay.length > 0) {
            rowsToDisplay.forEach(row => {
                tableBody.appendChild(row);
            });
        } else {
            const noResultsRow = document.createElement('tr');
            const noResultsCell = document.createElement('td');
            noResultsCell.colSpan = 5;
            noResultsCell.textContent = '검색 결과가 없습니다.';
            noResultsCell.style.textAlign = 'center';
            noResultsCell.style.padding = '20px';
            noResultsRow.appendChild(noResultsCell);
            tableBody.appendChild(noResultsRow);
        }
    }
});