const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();

        this.classList.toggle('active');

        if (this.classList.contains('active')) {
            this.innerHTML = '♥'; 
        } else {
            this.innerHTML = '♡'; 
        }
    });
});