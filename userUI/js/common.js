$(function () {
  if (
    window.location.pathname.includes("/search/") ||
    window.location.pathname.includes("/userLog/") ||
    window.location.pathname.includes("/production/")
  ) {
    headerPath = "../include/header.html";
    footerPath = "../include/footer.html";
  } else {
    headerPath = "include/header.html";
    footerPath = "include/footer.html";
  }

  $("#header").load(headerPath, function () {
    // 헤더가 로드된 후에 실행할 코드
    const searchBtn = document.getElementById("searchBtn");
    const searchResultDiv = document.getElementById("searchResult");

    searchBtn.addEventListener("click", function () {
      if (searchResultDiv.style.display === "none") {
        searchResultDiv.style.display = "block";
      } else {
        searchResultDiv.style.display = "none";
        searchInput.value = "";
      }
    });
    const popularSearch = document.querySelectorAll("#srMid ul li button");
    const searchResultPage = "search/searchResult.html";

    popularSearch.forEach((button) => {
      button.addEventListener("click", function () {
        const searchText = this.textContent;
        const targetUrl = `${searchResultPage}?query=${encodeURIComponent(
          searchText
        )}`;
        window.location.href = targetUrl;
      });
    });

    const searchInput = document.getElementById("search");
    const srBtn = document.getElementById("srBtn");
    const clearButton = document.getElementById("clear");

    searchInput.addEventListener("input", function () {
      if (searchInput.value.length > 0) {
        clearButton.style.display = "block";
      } else {
        clearButton.style.display = "none";
      }
    });
    srBtn.addEventListener("click", function () {
      const enteredText = searchInput.value;
      if (enteredText) {
        const targetUrl = `${searchResultPage}?query=${encodeURIComponent(
          enteredText
        )}`;
        window.location.href = targetUrl;
      } else {
        alert("검색어를 입력해주세요!");
      }
    });
    clearButton.addEventListener("click", function () {
      searchInput.value = "";
    });
  });

  $("#footer").load(footerPath, function () {
    // 푸터가 로드된 후에 실행할 코드
  });
});

// const productData = [
//   {
//     imageUrl: "../img/printcottongucci.PNG",
//     name: "프린트 코튼 저지 티셔츠",
//     content: "구찌",
//     price: "830000",
//     category: "반팔",
//     color1: "",
//     color2: "",
//     color3: "",
//     detail:
//       "새로운 시즌을 맞아 진화를 거듭하는 구찌의 하우스 코드와 저지 소재의 만남. 구찌 웹(Web) 배너 프린트가 돋보이는 레귤러 핏 코튼 저지 티셔츠.",
//   },
// ];
