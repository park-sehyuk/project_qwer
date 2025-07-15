document.addEventListener('DOMContentLoaded', () => {
    const USERS_STORAGE_KEY = 'userInfo';

    function loadUsersFromLocalStorage() {
        const data = localStorage.getItem(USERS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    function saveUsersToLocalStorage(usersArray) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersArray));
    }

    const searchButton = document.querySelector('.startsearch .search');
    const resetButton = document.querySelector('.startsearch .starline');
    const tableBody = document.querySelector('.user-data-table tbody');

    const searchInput = document.getElementById('searchUserInput');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    renderUserTable();

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const startDate = startDateInput ? startDateInput.value : '';
            const endDate = endDateInput ? endDateInput.value : '';

            const allUsers = loadUsersFromLocalStorage();
            let filteredUsers = allUsers;

            if (searchTerm !== '') {
                filteredUsers = filteredUsers.filter(user =>
                    (user.userId && user.userId.toLowerCase().includes(searchTerm)) ||
                    (user.userName && user.userName.toLowerCase().includes(searchTerm))
                );
            }

            if (startDate && endDate) {
                const startDateTime = new Date(startDate);
                const endDateTime = new Date(endDate);
                endDateTime.setHours(23, 59, 59, 999);

                filteredUsers = filteredUsers.filter(user => {
                    if (!user.purchaseDateTime) {
                        return false;
                    }
                    const userPurchaseDate = new Date(user.purchaseDateTime);
                    return userPurchaseDate >= startDateTime && userPurchaseDate <= endDateTime;
                });
            }
            
            if (searchTerm === '' && (!startDate || !endDate)) {
                renderUserTable(allUsers);
            } else {
                renderUserTable(filteredUsers);
            }
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
            }
            if (startDateInput) {
                startDateInput.value = '';
            }
            if (endDateInput) {
                endDateInput.value = '';
            }
            renderUserTable();
        });
    }

    function renderUserTable(usersToDisplay = null) {
        tableBody.innerHTML = '';

        const users = usersToDisplay || loadUsersFromLocalStorage();

        const minRows = 7;
        const totalColumns = 10;

        if (users.length === 0) {
            const noDataRow = tableBody.insertRow();
            const cell = noDataRow.insertCell();
            cell.colSpan = totalColumns;
            cell.textContent = '등록된 회원 정보가 없습니다.';
            cell.style.textAlign = 'center';
            noDataRow.classList.add('no-results-row');
            tableBody.appendChild(noDataRow);
        } else {
            users.forEach(user => {
                const row = tableBody.insertRow();
                
                row.insertCell().textContent = user.userId || '';
                row.insertCell().textContent = user.userName || '';
                row.insertCell().textContent = user.address || '';
                row.insertCell().textContent = user.userphone || '';
                row.insertCell().textContent = user.amount || '';
                row.insertCell().textContent = user.productName || '';
                row.insertCell().textContent = user.purchaseDateTime || '';
                row.insertCell().textContent = user.paymentMethod || '';
                row.insertCell().textContent = user.taxInvoiceStatus || '';

                const manageCell = row.insertCell();
                const editButton = document.createElement('button');
                editButton.textContent = '수정';
                editButton.className = 'action-buttons';
                editButton.dataset.id = user.userId;
                manageCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.className = 'action-buttons';
                deleteButton.dataset.id = user.userId;
                manageCell.appendChild(deleteButton);
            });
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

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('action-buttons')) {
            const button = event.target;
            const targetUserId = button.dataset.id;

            if (button.textContent === '수정') {
                editUser(targetUserId);
            } else if (button.textContent === '삭제') {
                deleteUser(targetUserId);
            }
        }
    });

    function editUser(targetUserId) {
        let users = loadUsersFromLocalStorage();
        const userIndex = users.findIndex(user => user.userId === targetUserId);

        if (userIndex !== -1) {
            const user = users[userIndex];
            
            user.userName = prompt(`'${user.userName || ''}'의 새 이름을 입력하세요:`, user.userName || '') || user.userName;
            user.userphone = prompt(`'${user.userphone || ''}'의 새 전화번호를 입력하세요:`, user.userphone || '') || user.userphone;
            user.address = prompt(`'${user.address || ''}'의 새 주소를 입력하세요:`, user.address || '') || user.address;
            user.amount = prompt(`'${user.amount || ''}'의 새 총 구매액을 입력하세요:`, user.amount || '') || user.amount;
            user.productName = prompt(`'${user.productName || ''}'의 최근 구매 상품명을 입력하세요:`, user.productName || '') || user.productName;
            user.purchaseDateTime = prompt(`'${user.purchaseDateTime || ''}'의 새 구매일시를 입력하세요:`, user.purchaseDateTime || '') || user.purchaseDateTime;
            user.paymentMethod = prompt(`'${user.paymentMethod || ''}'의 새 결제수단을 입력하세요:`, user.paymentMethod || '') || user.paymentMethod;
            user.taxInvoiceStatus = prompt(`'${user.taxInvoiceStatus || ''}'의 새 세금계산서 상태를 입력하세요:`, user.taxInvoiceStatus || '') || user.taxInvoiceStatus;

            saveUsersToLocalStorage(users);
            renderUserTable();
            alert(`'${targetUserId}' 회원의 정보가 수정되었습니다.`);
        } else {
            alert('해당 회원을 찾을 수 없습니다.');
        }
    }

    function deleteUser(targetUserId) {
        if (confirm(`정말 '${targetUserId}' 회원을 삭제하시겠습니까?`)) {
            let users = loadUsersFromLocalStorage();
            const updatedUsers = users.filter(user => user.userId !== targetUserId);
            saveUsersToLocalStorage(updatedUsers);
            renderUserTable();
            alert(`'${targetUserId}' 회원이 삭제되었습니다.`);
        }
    }

});