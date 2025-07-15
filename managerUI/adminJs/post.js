document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.category-search-input');
    const searchButton = document.querySelector('.search');
    const resetButton = document.querySelector('.starline');
    const tableBody = document.querySelector('.category-data-table tbody');

    const initialRawTableRows = Array.from(tableBody.querySelectorAll('tr'));

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const button = event.target;
            const itemId = button.dataset.id;
            const row = button.closest('tr');
            const titleCell = row.children[1];

            const currentTitle = titleCell.textContent;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentTitle;
            inputField.className = 'edit-input';

            titleCell.innerHTML = '';
            titleCell.appendChild(inputField);
            inputField.focus();

            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const newTitle = inputField.value;
                    if (newTitle.trim() === '') {
                        alert('제목을 입력해주세요.');
                        inputField.focus();
                        return;
                    }
                    console.log(`ID: ${itemId}, 새 제목: ${newTitle}`);
                    titleCell.textContent = newTitle;
                }
            });

            inputField.addEventListener('blur', function() {
                if (titleCell.querySelector('.edit-input')) {
                    titleCell.textContent = currentTitle;
                }
            });
        }

        if (event.target.classList.contains('delete-btn')) {
            const button = event.target;
            const itemId = button.dataset.id;
            const rowToDelete = button.closest('tr');

            if (confirm(`${itemId}번 게시물을 정말 삭제하시겠습니까?`)) {
                alert(`${itemId}번 게시물 삭제 진행!`);
                rowToDelete.remove();
            } else {
                alert('삭제를 취소했습니다.');
            }
        }
    });

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
                displayRows(initialRawTableRows);
            });
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredRows = [];

        initialRawTableRows.forEach(row => {
            const postTitle = row.children[1].textContent.toLowerCase();
            if (postTitle.includes(searchTerm)) {
                filteredRows.push(row);
            }
        });

        displayRows(filteredRows);
    }

    function displayRows(rowsToDisplay) {
        const minRows = 10;
        const totalColumns = 5;

        tableBody.innerHTML = '';

        if (rowsToDisplay.length > 0) {
            rowsToDisplay.forEach(row => {
                row.classList.remove('no-results-row', 'empty-dummy-row');
                tableBody.appendChild(row);
            });
        } else {
            const noResultsRow = document.createElement('tr');
            noResultsRow.classList.add('no-results-row');
            const noResultsCell = document.createElement('td');
            noResultsCell.colSpan = totalColumns;
            noResultsCell.textContent = '검색 결과가 없습니다.';
            noResultsCell.style.textAlign = 'center';
            noResultsCell.style.padding = '20px';
            noResultsRow.appendChild(noResultsCell);
            tableBody.appendChild(noResultsRow);
        }

        const currentDisplayedRows = tableBody.querySelectorAll('tr').length;
        if (currentDisplayedRows < minRows) {
            const rowsToAdd = minRows - currentDisplayedRows;
            for (let i = 0; i < rowsToAdd; i++) {
                const emptyRow = document.createElement('tr');
                emptyRow.classList.add('empty-dummy-row');
                for (let j = 0; j < totalColumns; j++) {
                    const emptyCell = document.createElement('td');
                    emptyCell.innerHTML = '&nbsp;';
                    emptyRow.appendChild(emptyCell);
                }
                tableBody.appendChild(emptyRow);
            }
        }
    }
});