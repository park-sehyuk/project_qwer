const searchBtn = document.getElementById('searchBtn');
const searchResultDiv = document.getElementById('searchResult');

searchBtn.addEventListener('click', function () {
  if (searchResultDiv.style.display === 'none') {
    searchResultDiv.style.display = 'block';
  } else {
    searchResultDiv.style.display = 'none';
    searchInput.value = '';
  }
});
const popularSearch = document.querySelectorAll('#srMid ul li button');
const searchResultPage = 'searchResult.html';

popularSearch.forEach((button) => {
  button.addEventListener('click', function () {
    const searchText = this.textContent;
    const targetUrl = `${searchResultPage}?query=${encodeURIComponent(
      searchText
    )}`;
    window.location.href = targetUrl;
  });
});

const searchInput = document.getElementById('search');
const srBtn = document.getElementById('srBtn');
const clearButton = document.getElementById('clear');

searchInput.addEventListener('input', function () {
  if (searchInput.value.length > 0) {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
});
srBtn.addEventListener('click', function () {
  const enteredText = searchInput.value;
  if (enteredText) {
    const targetUrl = `${searchResultPage}?query=${encodeURIComponent(
      enteredText
    )}}`;
    window.location.href = targetUrl;
  } else {
    alert('검색어를 입력해주세요!');
  }
});
clearButton.addEventListener('click', function () {
  searchInput.value = '';
});
