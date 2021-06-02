// const items = [
//   { name: "가방", price: 15000 },
//   { name: "설탕", price: 1500 },
//   { name: "소금", price: 5000 },
//   { name: "아이패드", price: 450000 },
//   { name: "패딩", price: 100000 },
//   { name: "노트북", price: 800000 },
// ];

// console.log(items);

// items.sort(function (a, b) {
//   return a.price - b.price;
// });

// function Student(name, score) {
//   this.name = name;
//   this.score = score;
// }
// const slist = [];
// slist[0] = new Student("bjun", 89);
// slist[1] = new Student("zjun", 91);
// slist[2] = new Student("ijun", 47);
// slist[3] = new Student("kjun", 99);
// slist[4] = new Student("mjun", 68);

// console.log(slist);

// slist.sort(function (a, b) {
//   return a.score - b.score;
// });
window.addEventListener("load", function () {
  let images = [
    "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
    "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
  ];
  let con = document.querySelector(".container");
  let img = document.querySelector(".images");
  let text = ["js 재밌네", "css flext", "safsfsf"];
  let i = 0;
  // let isprime = true;
  function displayText() {
    setInterval(function () {
      con.innerHTML = text[i++];
      if (i == 3) {
        i = 0;
      }
    }, 3000);
  }
  function displayImg() {
    setInterval(function () {
      img.innerHTML = `<img src = ${images[i]}>`;
    }, 3000);
  }
  displayText();
  displayImg();
});
