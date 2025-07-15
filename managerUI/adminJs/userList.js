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
    } else if (searchButton) {
        console.warn("검색 입력 필드(id='searchUserInput')가 없어 검색 기능이 제한됩니다.");
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

        if (users.length === 0) {
            const noDataRow = tableBody.insertRow();
            const cell = noDataRow.insertCell();
            cell.colSpan = 10;
            cell.textContent = '등록된 회원 정보가 없습니다.';
            cell.style.textAlign = 'center';
            return;
        }

        users.forEach(user => {
            const row = tableBody.insertRow();
            
            row.insertCell().textContent = user.userId || '없음';
            row.insertCell().textContent = user.userName || '없음';
            row.insertCell().textContent = user.address || '정보 없음';
            row.insertCell().textContent = user.userphone || '없음';
            row.insertCell().textContent = user.amount || '0원';
            row.insertCell().textContent = user.productName || '없음';
            row.insertCell().textContent = user.purchaseDateTime || '없음';
            row.insertCell().textContent = user.paymentMethod || '없음';
            row.insertCell().textContent = user.taxInvoiceStatus || '해당 없음';

            const manageCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = '수정';
            editButton.className = 'action-buttons';
            editButton.onclick = () => editUser(user.userId);
            manageCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.className = 'action-buttons';
            deleteButton.onclick = () => deleteUser(user.userId);
            manageCell.appendChild(deleteButton);
        });
    }

    function editUser(targetUserId) {
        let users = loadUsersFromLocalStorage();
        const userIndex = users.findIndex(user => user.userId === targetUserId);

        if (userIndex !== -1) {
            const user = users[userIndex];
            
            user.userName = prompt(`'${user.userName || '이름 없음'}'의 새 이름을 입력하세요:`, user.userName || '') || user.userName;
            user.userphone = prompt(`'${user.userphone || '전화번호 없음'}'의 새 전화번호를 입력하세요:`, user.userphone || '') || user.userphone;
            user.address = prompt(`'${user.address || '주소 없음'}'의 새 주소를 입력하세요:`, user.address || '') || user.address;
            user.amount = prompt(`'${user.amount || '0원'}'의 새 총 구매액을 입력하세요:`, user.amount || '0원') || user.amount;
            user.productName = prompt(`'${user.productName || '상품명 없음'}'의 최근 구매 상품명을 입력하세요:`, user.productName || '') || user.productName;
            user.purchaseDateTime = prompt(`'${user.purchaseDateTime || '구매일시 없음'}'의 새 구매일시를 입력하세요:`, user.purchaseDateTime || '') || user.purchaseDateTime;
            user.paymentMethod = prompt(`'${user.paymentMethod || '결제수단 없음'}'의 새 결제수단을 입력하세요:`, user.paymentMethod || '') || user.paymentMethod;
            user.taxInvoiceStatus = prompt(`'${user.taxInvoiceStatus || '세금계산서 정보 없음'}'의 새 세금계산서 상태를 입력하세요:`, user.taxInvoiceStatus || '') || user.taxInvoiceStatus;

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