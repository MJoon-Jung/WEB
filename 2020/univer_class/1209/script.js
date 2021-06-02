// window.addEventListener("load", function () {
//   let btn = document.querySelector("button");
//   btn.addEventListener("click", function () {
//     let height = parseInt(document.querySelector("input").value);
//     let p = document.querySelector("#print");
//     let pyramid = "";
//     for (let i = 1; i <= height; i++) {
//       for (let j = 1; j <= height - i; j++) {
//         pyramid += "&nbsp";
//       }
//       for (let j = 1; j <= i * 2 - 1; j++) {
//         pyramid += "*";
//       }
//       pyramid += "<br/>";
//     }
//     p.innerHTML = pyramid;
//   });
// });
// window.addEventListener("load", function () {
//   function displayImage() {
//     const image = document.querySelector("img");
//     const btn = document.querySelector("button");

//     image.src =
//       "https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk";
//     image.width = 400;
//   }
// });

// window.onload = () => {
//   const image = document.querySelector("img");
//   const btn = document.querySelector("button");

//   btn.addEventListener("click", function () {
//     image.src =
//       "https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk";
//     image.width = 200;
//   });

//   //   btn.onclick = displayImage;

//   //   function displayImage() {
//   //     image.src =
//   //       "https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk";
//   //     image.width = 200;
//   //   }
// };

window.onload = () => {
  let btn = document.querySelector("button");

  btn.addEventListener("click", function () {
    let str = "";
    str = document.querySelector("input").value;
    let p = document.querySelector(".ans");
    p.innerHTML += str;
  });
};
