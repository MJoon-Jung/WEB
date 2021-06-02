// window.addEventListener("load", displayOn);
// function displayOn() {
//   const btn = document.querySelector(".btn");

//   btn.addEventListener("click", function () {
//     const images = document.querySelector("img");
//     images.setAttribute(
//       "src",
//       "https://lh3.googleusercontent.com/proxy/NC8l1kE67Ft7E8__uHzChSRyVO8dGKcAenqlAH00AO9v37E0vy4oKO14so1EgkV9O3CiKOA2FYPyIOMLiPOSx3Hn2oReCR5q9XVcPR2DBe1G"
//     );
//     images.setAttribute("width", "50%");
//   });
// }

// window.addEventListener("load", function () {
//   const btn = document.querySelector(".btn");
//   const image = document.querySelector("img");

//   btn.onclick = displayImage;
//   function displayImage() {
//     image.src =
//       "https://lh3.googleusercontent.com/proxy/NC8l1kE67Ft7E8__uHzChSRyVO8dGKcAenqlAH00AO9v37E0vy4oKO14so1EgkV9O3CiKOA2FYPyIOMLiPOSx3Hn2oReCR5q9XVcPR2DBe1G";
//     image.width = 500;
//   }
// });

// window.onload = function () {
//   let form1 = document.querySelector("#form1");
//   form1.onsubmit = function () {
//     return false;
//   };

//   let naver = document.querySelector("a");
//   naver.onclick = function () {
//     return false;
//   };
// };

// window.addEventListener("load", function () {
//   let form1 = document.querySelector("#form1");
//   let naver = document.querySelector("a");

//   form1.addEventListener("submit", function (event) {
//     event.preventDefault();
//   });
//   naver.addEventListener("click", function (event) {
//     event.preventDefault();
//   });
// });

// window.addEventListener("load", function () {
//   const btn = document.querySelector("button");
//   btn.addEventListener("click", function () {
//     const ip = document.querySelector("input");
//     ip.value = eval(ip.value);
//   });
// });

// window.addEventListener("load", function () {
//   const input = document.querySelector("input");
//   const btn = document.querySelector("button");
//   btn.addEventListener("click", function () {
//     let n = parseInt(input.value);
//     let str = "";
//     for (let i = 1; i <= n / 2; i++) {
//       if (n % i == 0) {
//         str += i + "  ";
//       }
//     }
//     str += n;
//     input.setAttribute("size", str.length);
//     // input.style.width = "1400px";
//     input.value = str;
//   });
// });

// window.addEventListener("load", function () {
//   let btn = document.querySelectorAll("button");
//   let input = document.querySelectorAll("input");
//   let num_list = new Array(10);
//   btn[0].addEventListener("click", function () {
//     for (let i = 0; i < 10; i++) {
//       num_list[i] = Math.floor(Math.random() * 98 + 1);
//     }
//     input[0].setAttribute("size", "40");
//     input[0].value = num_list;
//   });
//   btn[1].addEventListener("click", function () {
//     num_list.sort(function (a, b) {
//       return a - b;
//     });
//     input[1].setAttribute("size", "40");
//     input[1].value = num_list;
//   });
// });
// window.addEventListener("load", function () {
//   let atags = document.querySelectorAll(".atag");
//   for (let i = 0; i < atags.length; i++) {
//     atags[i].addEventListener("mouseover", function () {
//       this.style.backgroundColor = "red";
//     });
//     atags[i].addEventListener("mouseout", function () {
//       this.style.backgroundColor = "blue";
//     });
//   }
// });
