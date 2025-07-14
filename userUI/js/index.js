// 슬라이더 이미지 배열
let sliderImgs = ['img/sliderImg1.png', 'img/gucciSlider.jpg', 'img/sliderImg3.jpg', 'img/sliderImg4.jpg'];

// 모든 아이텀 저장 배열
let itemLists = [];

// 베스트 아이템 리스트 데이터
let bestItemList = [{
    id : 1,
    src : 'img/gadigan1.PNG',
    title : '블랙/카멜 울 자카드 가디건',
    price : '2,240,000',
    content : '구찌'
},{
    id : 2,
    src : 'img/shirtsweater1.PNG',
    title : '텍스처 코튼 리넨 셔츠 스웨터',
    price : '369,000',
    content : '랄프로렌'
},{
    id : 3,
    src : 'img/tshirt1.PNG',
    title : '프린트 코튼 저지 티셔츠',
    price : '830,000',
    content : '구찌'
},{
    id : 4,
    src : 'img/classic1.PNG',
    title : '클래식핏 리넨셔츠',
    price : '219,000',
    content : '랄프로렌'
},{
    id : 5,
    src : 'img/intarsia1.PNG',
    title : '인타르시아 디테일의 실크 코튼 스웨터',
    price : '2,110,000',
    content : '구찌'
},{
    id : 6,
    src : 'img/poloshirt1.PNG',
    title : '커스텀 슬림핏 소프트 코튼 폴로 셔츠',
    price : '125,300',
    content : '랄프로렌'
}];

// 추천 아이템 리스트 데이터
let suggItemList = [{
    id : 1,
    src : 'img/classic1.PNG',
    title : '클래식핏 리넨셔츠',
    price : '219,000',
    content : '랄프로렌'
},{
    id : 2,
    src : 'img/intarsia1.PNG',
    title : '인타르시아 디테일의 실크 코튼 스웨터',
    price : '2,110,000',
    content : '구찌'
},{
    id : 3,
    src : 'img/poloshirt1.PNG',
    title : '커스텀 슬림핏 소프트 코튼 폴로 셔츠',
    price : '125,300',
    content : '랄프로렌'
}];

// 상품 아이템 리스트 데이터
let productItemList = [{
    id : 1,
    src : 'img/gadigan1.PNG',
    title : '블랙/카멜 울 자카드 가디건',
    price : '2,240,000',
    content : '구찌'
},{
    id : 2,
    src : 'img/sweater1.PNG',
    title : '윔블던 코튼 폴로 칼라 스웨터',
    price : '439,000',
    content : '랄프로렌'
},{
    id : 3,
    src : 'img/tshirt1.PNG',
    title : '프린트 코튼 저지 티셔츠',
    price : '830,000',
    content : '구찌'
}];

// 슬라이더 관련 요소들
const sliderImg = document.getElementById("sliderImg");
const prewBtn = document.getElementById("prewBtn");
const nextBtn = document.getElementById("nextBtn");
const pagerItems = document.querySelectorAll("#sliderPager li");

// 아이템 리스트 관련 요소
const bestItemListEl = document.getElementById("bestItemList");
const bestItem = document.getElementById("bestItem");
const suggItemListEl = document.getElementById("suggItemList");
const gucciBtn = document.getElementById("gucciBtn");
const poloBtn = document.getElementById("poloBtn");
const maisonBtn = document.getElementById("maisonBtm");
const chanelBtn = document.getElementById("chanelBtn");
const productItemListEl = document.getElementById("productItemList");
// 템플릿
const items = document.getElementById('items');

function loadItems(){
    const data = localStorage.getItem('itmeList');
    if(data){
        const parsed = JSON.parse(data);
        itemLists.push(...parsed);
    }
}

function saveItems(){
    localStorage.setItem('itmeList', JSON.stringify(itemLists));
}


let sliderIndex = 0;

// 이미지와 페이저를 함께 업데이트
    function updateSlider() {
        sliderImg.src = sliderImgs[sliderIndex];

        pagerItems.forEach((li, index) => {
            li.classList.toggle("active", index === sliderIndex);
        });
    }

    // 다음 이미지로 이동
    function goNextSlide() {
        sliderIndex = (sliderIndex + 1) % sliderImgs.length;
        updateSlider();
    }

    // 이전 이미지로 이동
    function goPrevSlide() {
        sliderIndex = (sliderIndex - 1 + sliderImgs.length) % sliderImgs.length;
        updateSlider();
    }

    // 자동 슬라이드 (5초 간격)
    let autoSlide = setInterval(goNextSlide, 5000);

    // 사용자 조작 시에도 자동 슬라이드는 계속 유지
    nextBtn.addEventListener("click", () => {
        goNextSlide();
    });

    prewBtn.addEventListener("click", () => {
        goPrevSlide();
    });

    // 페이저 클릭 시 해당 인덱스로 이동
    pagerItems.forEach((li, index) => {
        li.addEventListener("click", () => {
            sliderIndex = index;
            updateSlider();
        });
    });

    // 초기 실행
    updateSlider();

    // 아이템 리스트 생성
    function itemList(){

        bestItemList.forEach(item => {
            const cloneLi = items.content.firstElementChild.cloneNode(true);
            cloneLi.querySelector('img').src = item.src;
            cloneLi.querySelector('.title').textContent = item.title;
            cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
            cloneLi.querySelector('.content').textContent = item.content;
            bestItemListEl.appendChild(cloneLi);
        });

        suggItemList.forEach(item => {
            const cloneLi = items.content.firstElementChild.cloneNode(true);
                cloneLi.querySelector('img').src = item.src;
                cloneLi.querySelector('img').alt = item.title;
                cloneLi.querySelector('.title').textContent = item.title;
                cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
                cloneLi.querySelector('.content').textContent = item.content;
                suggItemListEl.appendChild(cloneLi);
        });
        // 구찌 탭 기능
        gucciBtn.addEventListener("click", () => {
            suggItemListEl.innerHTML = '';
            suggItemList.forEach(item => {
                if(item.content === '구찌'){
                    const cloneLi = items.content.firstElementChild.cloneNode(true);
                    cloneLi.querySelector('img').src = item.src;
                    cloneLi.querySelector('img').alt = item.title;
                    cloneLi.querySelector('.title').textContent = item.title;
                    cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
                    cloneLi.querySelector('.content').textContent = item.content;
                    suggItemListEl.appendChild(cloneLi);
                }
            });
        });

        // 릴프로렌 탭 기능
        poloBtn.addEventListener("click", () => {
            suggItemListEl.innerHTML = '';
            suggItemList.forEach(item => {
                if(item.content === '랄프로렌'){
                    const cloneLi = items.content.firstElementChild.cloneNode(true);
                    cloneLi.querySelector('img').src = item.src;
                    cloneLi.querySelector('img').alt = item.title;
                    cloneLi.querySelector('.title').textContent = item.title;
                    cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
                    cloneLi.querySelector('.content').textContent = item.content;
                    suggItemListEl.appendChild(cloneLi);
                }
            });
        });

        // 메종키츠네 탭 기능
        // maisonBtn.addEventListener("click", () => {
        //     suggItemListEl.innerHTML = '';
        //     suggItemList.forEach(item => {
        //         if(item.content === '메종 키츠네'){
        //             const cloneLi = items.content.firstElementChild.cloneNode(true);
        //             cloneLi.querySelector('img').src = item.src;
        //             cloneLi.querySelector('img').alt = item.title;
        //             cloneLi.querySelector('.title').textContent = item.title;
        //             cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
        //             cloneLi.querySelector('.content').textContent = item.content;
        //             suggItemListEl.appendChild(cloneLi);
        //         }
        //     });
        // });

        // // 샤넬 탭 기능
        // chanelBtn.addEventListener("click", () => {
        //     suggItemListEl.innerHTML = '';
        //     suggItemList.forEach(item => {
        //         if(item.content === '샤넬'){
        //             const cloneLi = items.content.firstElementChild.cloneNode(true);
        //             cloneLi.querySelector('img').src = item.src;
        //             cloneLi.querySelector('img').alt = item.title;
        //             cloneLi.querySelector('.title').textContent = item.title;
        //             cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
        //             cloneLi.querySelector('.content').textContent = item.content;
        //             suggItemListEl.appendChild(cloneLi);
        //         }
        //     });
        // });

        // 이달의 상품 리스트
        productItemList.forEach(item => {
            const cloneLi = items.content.firstElementChild.cloneNode(true);
            cloneLi.querySelector('img').src = item.src;
            cloneLi.querySelector('img').alt = item.title;
            cloneLi.querySelector('.title').textContent = item.title;
            cloneLi.querySelector('.price').textContent = `가격: ${item.price}원`;
            cloneLi.querySelector('.content').textContent = item.content;
            productItemListEl.appendChild(cloneLi);
        });

    }
    itemList();

    // 스와이프
    function enableDragScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1; // 드래그 속도 조절
        container.scrollLeft = scrollLeft - walk;
    });
}

// 적용
enableDragScroll(bestItem);


loadItems();