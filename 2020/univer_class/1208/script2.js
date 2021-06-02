// window.onload=()=>{
//   let p1 = document.querySelector("#p1");
//   p1.innerHTML = "Hello <br/> world";
// }

// document.getElementById("demo").innerHTML = "Hello world";

// window.onload=()=>{
//   document.querySelector('h1').style.backgroundColor='red';
//   document.querySelector('h2').style.backgroundColor='green';
// }
// window.addEventListener('load', function(){
//   let h1 = document.querySelector("h1");
//   h1.innerHTML = "hello <br/> world"
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = "h2 2번문장입니다"

//   document.querySelector('h1').style.backgroundColor= "red"
//   document.querySelector('h2').style.backgroundColor="green";
// })

// window.addEventListener('load',function(){
// let p2 = document.getElementById("p2");
// p2.innerHTML = "2번째 p입니다"
// p2.style.backgroundColor="red";

// let p1 = document.getElementsByClassName("p1");
// p1[0].style.backgroundColor="green";
// p1[1].style.backgroundColor="yellow";

// let ptag = document.getElementsByTagName("p");
// ptag[0].style.backgroundColor = "red";

// let p2 = document.querySelector("#p2");
// p2.style.color="red";
// let p1 = document.querySelector(".p1");
// p1.style.color="blue";
// let p1 = document.querySelectorAll(".p1");
// p1[1].style.color="gold";

//querySelector는 여러개여도 가장 위에 것만 선택됨
//querySelectorAll은 배열로 다 넣고 선택해서 사용가능하다.
// })

// window.addEventListener('load',function(){
// let h1 = document.querySelector("h1");
// h1.innerHTML += "<br>DOM element H1";
// let img = document.querySelector("img");
// img.src = "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";
// let btn = document.querySelector("button");
// btn.addEventListener("click", changeImg);
// function changeImg(){
//   let img = document.querySelector("img");
//   img.src = "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";
// }
// document.querySelector("img").src="https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";

// })

// window.addEventListener('load',function(){

// }

// window.addEventListener("load", function(){
// const pelems1 = document.querySelectorAll('p');
// for(let i = 0; i < pelems1.length; i++){
//   pelems1[i].style.backgroundColor = "yellow";
// }

// const pelems2 = document.getElementsByTagName('p');
// for(let i = 0; i < pelems2.length; i++){
//   pelems2[i].style.backgroundColor="yellowgreen"
// }

// const pelems3 = document.querySelectorAll("p:nth-child(2n+1)");
// for(let i = 0; i < pelems3.length; i++){
//   pelems3[i].style.backgroundColor = "orange";
// }

// const pelems4 = document.querySelector("p:nth-of-type(5)");
// pelems4.style.backgroundColor = "beige";
// })

// window.onload=()=>{
//   let output = "";
//   for(let i = 0; i < 10; i++){
//     output += `<h1>Header- ${i} </h1>`;
//   }
//   document.body.innerHTML=output;

//   const headers = document.querySelectorAll('h1');
//   headers[5].style.color = 'red';
// }

// window.addEventListener("load", function(){
//   let output = "";
//   for(let i = 0; i < 256; i++){
//     output+="<div></div>";
//   }
//   document.body.innerHTML = output;

//   let divs = document.querySelectorAll("div");
//   for(let i = 0; i < divs.length; i++){
//     divs[i].style.height="2px";
//     divs[i].style.backgroundColor = `rgb(${i},${i},${i})`;
//   }
// })

// function changeImg(){
//   let input = document.querySelector("input");
//   let ptag = document.querySelector("#value");
//   let btn = document.querySelector("button");
//   btn.addEventListener("click", function(){
//     ptag.innerHTML = input.value;
//   });
// };

// window.addEventListener("load",function(){
//   let input = document.querySelector("input");
//   let ptag = document.querySelector("#value");
//   let btn = document.querySelector("button");
//   btn.addEventListener("click", function(){
//     ptag.innerHTML += input.value + "<br>;
//     // ptag.innerHTML = input.value;
//   });
// })

// window.addEventListener("load",function(){
//   let btn = document.querySelector("button");
//   btn.addEventListener("click", function(){
//     let str = document.querySelector("input").value;
//     document.querySelector(".ans").innerHTML = `입력된 문자열은 『${str}』 입니다`;
//   })
// })

window.addEventListener("load", function () {
  let btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    let n = parseInt(document.querySelector("input").value);
    let pyramid = "";
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n - i; j++) {
        pyramid += "&nbsp";
      }
      for (let k = 1; k <= i * 2 - 1; k++) {
        pyramid += "*";
      }
      pyramid += "<br>";
    }
    document.querySelector(".pyramid").innerHTML = pyramid;
  });
});
