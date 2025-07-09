let sliderImgs = ['img/sliderImg1.png', 'img/sliderImg2.jpeg', 'img/sliderImg3.jpg', 'img/sliderImg4.jpg'];

const sliderImg = document.getElementById("sliderImg");
const prewBtn = document.getElementById("prewBtn");
const nextBtn = document.getElementById("nextBtn");
const pagerItems = document.querySelectorAll("#sliderPager li");



let currentIndex = 0;

// 이미지와 페이저를 함께 업데이트
    function updateSlider() {
        sliderImg.src = sliderImgs[currentIndex];

        pagerItems.forEach((li, index) => {
            li.classList.toggle("active", index === currentIndex);
        });
    }

    // 다음 이미지로 이동
    function goNextSlide() {
        currentIndex = (currentIndex + 1) % sliderImgs.length;
        updateSlider();
    }

    // 이전 이미지로 이동
    function goPrevSlide() {
        currentIndex = (currentIndex - 1 + sliderImgs.length) % sliderImgs.length;
        updateSlider();
    }

    // 자동 슬라이드 (3초 간격)
    let autoSlide = setInterval(goNextSlide, 6000);

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
            currentIndex = index;
            updateSlider();
        });
    });

    // 초기 실행
    updateSlider();