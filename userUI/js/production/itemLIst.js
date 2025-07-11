document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 샘플 데이터 (실제로는 서버에서 받아옴) ---
    const productData = [{
        imageUrl : '../../img/구찌반팔.jpeg',
        name : '인타르시아 디테일의 실크 코튼 스웨터',
        content : '구찌',
        price : '2,110,000',
        color1 : 'red',
        color2 : '',
        color3 : '',
        detail : '섬세한 디테일을 더하여 고급스러운 데일리 룩을 완성한 부드러운 촉감의 니트웨어, 티셔츠 등과 같은 클래식한 아이템을 전체적으로 선보이는 2025 크루즈 컬렉션. 실크 코튼 니트 소재에 구찌 인타르시아가 돋보이는 크루넥 스웨터.'
    }];

    // --- 2. 상태 관리 및 상수 ---
    const ITEMS_PER_PAGE = 12; // 한 페이지에 보여줄 아이템 개수

    // sessionStorage에서 상태 불러오기, 없으면 기본값 사용
    let currentPage = parseInt(localStorage.getItem('currentPage') || '1');
    let currentSort = localStorage.getItem('currentSort') || 'popular';

    // --- 3. DOM 요소 가져오기 ---
    const grid = document.getElementById('product-grid');
    const totalItemsEl = document.getElementById('total-items');
    const paginationEl = document.getElementById('pagination');
    const sortContainer = document.querySelector('.sort-container');
    const sortButton = document.querySelector('.sort-button');
    const sortText = document.getElementById('sort-text');


    // --- 4. 렌더링 함수 ---

    /** 메인 렌더링 함수: 상품 목록과 페이지네이션을 그림 */
    function render() {
        // A. sessionStorage에 현재 상태 저장
        sessionStorage.setItem('currentPage', currentPage);
        sessionStorage.setItem('currentSort', currentSort);

        // B. 데이터 정렬
        let sortedProducts = [...productData]; // 원본 배열 수정을 막기 위해 복사
        switch (currentSort) {
            case 'price_desc':
                sortedProducts.sort((a, b) => b.price - a.price); // 높은 가격순
                break;
            case 'price_asc':
                sortedProducts.sort((a, b) => a.price - b.price); // 낮은 가격순
                break;
            // 'popular' (인기순)은 기본 순서(ID순)로 처리
        }

        // C. 현재 페이지에 맞는 데이터 슬라이싱
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsForPage = sortedProducts.slice(startIndex, endIndex);

        // D. 상품 그리드 렌더링 (map 함수 사용) ✨
        grid.innerHTML = itemsForPage.map(product => `
            <div class="product-item">
                <div class="img-wrapper">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </div>
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price.toLocaleString()}원</div>
                </div>
            </div>
        `).join(''); // map은 배열을 반환하므로 join으로 하나의 문자열로 합침

        // E. 페이지네이션 렌더링
        renderPagination(sortedProducts.length);

        // F. 기타 UI 업데이트
        totalItemsEl.textContent = `${productData.length} Item`;
        const sortOptionText = document.querySelector(`.sort-dropdown a[data-sort="${currentSort}"]`).textContent;
        sortText.textContent = sortOptionText;
    }

    /** 페이지네이션 버튼을 그리는 함수 */
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        paginationEl.innerHTML = ''; // 기존 버튼 삭제

        // forEach 함수 사용 ✨
        Array.from({ length: totalPages }, (_, i) => i + 1).forEach(page => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'page-link';
            button.textContent = page;
            if (page === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = page;
                render(); // 페이지 변경 후 다시 렌더링
            });
            li.appendChild(button);
            paginationEl.appendChild(li);
        });
    }


    // --- 5. 이벤트 리스너 설정 ---

    /** 정렬 기능 이벤트 리스너 */
    function setupEventListeners() {
        // 정렬 버튼 클릭 시 드롭다운 토글
        sortButton.addEventListener('click', (e) => {
            e.stopPropagation();
            sortContainer.classList.toggle('active');
        });

        // 드롭다운 메뉴에서 정렬 기준 선택
        document.querySelector('.sort-dropdown').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                currentSort = e.target.dataset.sort;
                currentPage = 1; // 정렬 기준 변경 시 1페이지로 리셋
                render();
            }
        });

        // 다른 곳 클릭 시 드롭다운 닫기
        window.addEventListener('click', () => {
            sortContainer.classList.remove('active');
        });
    }

    // --- 6. 초기화 ---
    setupEventListeners(); // 이벤트 리스너 실행
    render(); // 첫 페이지 로드
});