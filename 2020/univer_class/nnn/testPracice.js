// var a = 1;
// function func() {
//   console.log(a);
//   var a = 100;
// }
// func();
// console.log(a);

// let b = 1;
// function func() {
//   console.log(b);
//   b = 100;
// }
// func();
// console.log(b);

// var a = 100;
// let b = 200;

// if (a == 100) {
//   let b = a * 30;
//   console.log(b);
// }
// console.log(b);

// foo();
// foo2();
// function foo() {
//   console.log("hello");
// }
// var foo2 = function () {
//   console.log("hello2");
// };

// console.log(myname2);
// var myname;
// myname = "HEEE";
// let myname2 = "HEEE2";

// let x = 5;
// console.log(x + "5");
// console.log(typeof (x + "5"));

// let x = "안녕하세요 \"정명준입니다\"";
// console.log(x);

// let x = 5;

// console.log(x == "5" ? "같다" : "아니다");
// console.log(x === "5" ? "같다" : "아니다");

// let x = prompt("dd");
// let x = parseInt(prompt("dd"));
// console.log(typeof x);

// let x = confirm("확인?");
// console.log(typeof x);
// var strNum = "2016년도";
// console.log(parseInt(strNum)); 2016
// console.log(Number(strNum));   Nan

// var strNum = "제10회";
// console.log(parseInt(strNum)); //Nan
// console.log(Number(strNum));  //Nan

// window.addEventListener("load", function () {
//   function displayClock() {
//     let p = document.querySelector("p");
//     let today = new Date();
//     let years = today.getFullYear();
//     let month = today.getMonth();
//     let date = today.getDate();
//     let hours = today.getHours();
//     let minutes = today.getMinutes();
//     let seconds = today.getSeconds();
//     let times = `${years}년${month}월 ${date}일 ${hours}시 ${minutes}분 ${seconds}초`;
//     p.innerHTML = times;
//     setTimeout(function () {
//       displayClock();
//     }, 500);
//   }
//   displayClock();
// });

// window.addEventListener("load", function () {
//   let p = document.querySelector("p");
//   setTimeout(displayout, 3000);
//   function displayout() {
//     alert("hello");
//   }
// });
// let i = 0;
// do {
//   console.log(i++);
// } while (i < 100);

// let data1 = new Array();
// for (let i = 0; i < 5; i++) {
//   data1[i] = i;
//   data1[i] = new Array();
//   for (let j = 0; j < 5; j++) {
//     data1[i][j] = j;
//   }
// }
// console.log(data1.length);
// console.log(data1[0].length);

// const array1 = [1, 2, 3];   //unshift는 추가해주고 새로운 배열의 길이를 리턴한다
//shift 는 맨 앞 숫자를 제거하고 그 수를 return 해줌

// console.log(array1.unshift(4, 5));

// console.log(array1);

// let a = [1, 2, 3];
// let b = ["1", "2", "3"];
// let c = b.concat(a);
// let c = a.join(" ");
// c.pop();
// a.shift();
// console.log(a);
// console.log(a.indexOf(2));

// let a = [1, 2, 3, 4, 5, 6, 7];
// a.splice(3, a.length - 3, "hello", "hello2");
// let b = a.slice(0, 5);
// array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
// slice() 메서드는 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
// arr.slice([begin[, end]])
// console.log(b);

// let a = new Array();
// for (let i = 0; i < 10; i++) {
//   a[i] = Math.floor(Math.random() * 99 + 1);
// }
// console.log(a);
// a.sort();
// console.log(a);
// a.sort(function (a, b) {
//   return a - b;
// });
// console.log(a);
// a.reverse();
// console.log(a);

// window.addEventListener("load", function () {
//   let btn = document.querySelector("button");
//   btn.addEventListener("click", function () {
//     let p = document.querySelector("p");
//     let input = document.querySelector("input");
//     let height = parseInt(input.value);
//     let str = "";
//     for (let i = 1; i <= height; i++) {
//       for (let j = 1; j <= height - i; j++) {
//         str += "&nbsp";
//       }
//       for (let j = 1; j <= i * 2 - 1; j++) {
//         str += "*";
//       }
//       str += "<br>";
//     }
//     p.innerHTML = str;
//   });
// });

data1 = [11, 12, 25, 31, 45, 69, 75, 88, 93, 99];
data2 = [17, 27, 33, 41, 53, 67, 79, 85, 87, 91];
data3 = [];

// for (let i = 0; i < data1.length; i++) {
//   data3[i] = data1[i] + data2[i];
// }
// for (let i = 0; i < data1.length; i++) {
//   if (data1[i] >= data2[i]) {
//     data3[i] = data1[i];
//   } else {
//     data3[i] = data2[i];
//   }
// }
// let i = 0;
// let j = 0;
// while (i < data1.length || j < data2.length) {
//   if (data1[i] > data2[j]) {
//     data3.push(data2[j++]);
//   } else if (data1[i] == data2[j]) {
//     data3.push(data1[i++]);
//     data3.push(data2[j++]);
//   } else {
//     data3.push(data1[i++]);
//   }
// }
// if (i == data1.length) {
//   for (let k = j; k < data2.length; j++) {
//     data3.push(data2[j]);
//   }
// } else if (i == data1.length) {
//   for (let k = i; k < data1.length; i++) {
//     data3.push(data1[i]);
//   }
// }
// console.log(data3);

// window.addEventListener("load", function () {
//   let a = document.querySelectorAll(".atag");
//   for (let i = 0; i < a.length; i++) {
//     a[i].addEventListener("mouseover", function () {
//       a[i].style.backgroundColor = "red";
//     });
//     a[i].addEventListener("mouseout", function () {
//       a[i].style.backgroundColor = "blue";
//     });
//   }
// });

// window.addEventListener("load", function () {
//   function func() {
//     hello();
//     console.log("종료");
//   }
//   function hello() {
//     setTimeout(function () {
//       console.log("hello");
//       func();
//     }, 5000);
//   }
//   func();
// });

// let person = {
//   name: "홍길동",
//   addr: "지리산",
//   age: 20,
//   who: function () {
//     return `name : ${this.name} addr : ${this.addr} age : ${this.age}`;
//   },
// };
// console.log(person.who());
// console.log(person);
// person.power = 5;
// person["addr"] = "한라산";
// console.log(person);

// let height = parseFloat(prompt("키 입력"));
// let weight = parseFloat(prompt("몸무게 입력"));

// let value = bmi(height, weight);
// console.log(`bmi : ${value}`);

// function bmi(a, b) {
//   console.log(`bmi지수 : ${weight / (height / 100) ** 2}`);
//   return weight / (height / 100) ** 2;
// }
// function displayImage() {
//   const btn = document.querySelector("button");
//   const img = document.querySelector("img");
//   img.src =
//     "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg";
// }

// window.addEventListener("load", function () {
//   const btn = document.querySelector("button");
//   btn.onclick = displayImage;
//   function displayImage() {
//     const img = document.querySelector("img");
//     img.setAttribute(
//       "src",
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
//     );
//   }
// });

// window.addEventListener("load", displayImage);
// function displayImage() {
//   const btn = document.querySelector("button");
//   btn.addEventListener("click", function () {
//     const img = document.querySelector("img");
//     img.setAttribute(
//       "src",
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
//     );
//   });
// }
