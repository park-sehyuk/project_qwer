document.addEventListener('DOMContentLoaded', function() {
    const sizeBar = document.querySelector('.size-Bar');
    const sizeOptions = document.querySelector('.size-options');
    const sizeText = document.querySelector('.sizeText');
    const sizeButtons = document.querySelectorAll('.size-options ul li button');

    if (sizeBar && sizeOptions && sizeText && sizeButtons.length > 0) {
        sizeBar.addEventListener('click', function() {
            if (sizeOptions.style.display === 'none' || sizeOptions.style.display === '') {
                sizeOptions.style.display = 'block';
            } else {
                sizeOptions.style.display = 'none';
            }
        });

        sizeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();

                const currentSelected = document.querySelector('.size-options ul li button.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }

                this.classList.add('selected');
                sizeText.textContent = this.dataset.size;
                sizeOptions.style.display = 'none';
                console.log(`선택된 사이즈: ${this.dataset.size}`);
            });
        });

        document.addEventListener('click', function(event) {
            if (sizeOptions.style.display === 'block' && !sizeBar.contains(event.target) && !sizeOptions.contains(event.target)) {
                sizeOptions.style.display = 'none';
            }
        });
    }

    const clothContainer = document.querySelector('.cloth-container');
    const clothWrapper = document.querySelector('.cloth');
    const scrollPrevBtn = document.querySelector('.scroll-icon1');
    const scrollNextBtn = document.querySelector('.scroll-icon2');
    const scrollDots = document.querySelectorAll('.scroll p.dot');

    if (clothContainer && clothWrapper && scrollPrevBtn && scrollNextBtn && scrollDots.length > 0) {
        const imageWidth = 150;
        const imageGap = 10;
        const containerWidth = clothContainer.offsetWidth;
        const imagesPerPage = Math.floor(containerWidth / (imageWidth + imageGap));
        let currentIndex = 0;
        const totalImages = document.querySelectorAll('.cloth img').length;
        const totalPages = Math.ceil(totalImages / imagesPerPage);

        if (scrollDots.length > 0) {
            scrollDots[0].classList.add('active');
        }

        function updateScrollPosition() {
            const offset = -currentIndex * (imageWidth + imageGap) * imagesPerPage;
            clothWrapper.style.transform = `translateX(${offset}px)`;

            scrollDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            scrollPrevBtn.disabled = currentIndex === 0;
            scrollNextBtn.disabled = currentIndex >= totalPages - 1;
        }

        scrollPrevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateScrollPosition();
            }
        });

        scrollNextBtn.addEventListener('click', function() {
            if (currentIndex < totalPages - 1) {
                currentIndex++;
                updateScrollPosition();
            }
        });

        scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateScrollPosition();
            });
        });

        updateScrollPosition();
    }

    const bottomImageContainer = document.querySelector('.bottom-image-container');

    if (bottomImageContainer) {
        bottomImageContainer.scrollTop = 0;
    }

    const mainImage = document.querySelector('.left-image');
    const thumbnailImages = document.querySelectorAll('.cloth img');

    if (mainImage && thumbnailImages.length > 0) {
        thumbnailImages.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const currentSelectedThumbnail = document.querySelector('.cloth img.selected-thumbnail');
                if (currentSelectedThumbnail) {
                    currentSelectedThumbnail.classList.remove('selected-thumbnail');
                }

                this.classList.add('selected-thumbnail');

                const newMainImageUrl = this.src;
                mainImage.style.backgroundImage = `url('${newMainImageUrl}')`;
            });
        });

        if (thumbnailImages.length > 0) {
            thumbnailImages[0].click();
        }
    }
});