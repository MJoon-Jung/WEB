// let a = Math.random() * 100;
// let b = Math.floor(a);
// console.log(b);

// let ar = new Array(5);
// for(let i = 0; i < ar.length; i++){
//   ar[i] = new Array(5);
// }
// let start = -1;

// for(let i=0; i < ar.length; i++){
//   start += 2;
//   let end = 1;
//   for(let j = 0; j < ar[i].length; j++){
//     let str ="";
//     str += start;
//     str += end;
//     ar[i][j] = str;
//     end++;
//   }
// }
// let start = 10;
// for(let i = 0; i <ar.length; i++){
//   let end = 1;
//   for(let j =0; j<ar.length; j++){
//     ar[i][j] = start + end;
//     end++;
//   }
//   start += 20;
// }
// console.log(ar);

// let callSetUp = () => console.log(`3way hands shaking`);
// callSetUp();

// let programming = () => console.log("programming is intersting");
// programming();

// let sum = (a,b) => console.log(a+b);
// sum(3,12);
// let age = 21;
// let welcome = (age < 20) ? function () {
//    alert("투표권이 없습니다.");} :
// function () {
//   alert("투표하세요");
// };
// welcome();

// let welcome = (age > 20)? function(){
//   alert("투표하세요");}:
//   function(){
//     alert("미성년자입니다 돌아가");
//   }
// welcome();

// function callTenTimes(callback){
//   for(let i = 0; i < 10; i++){
//     callback();
//   }
// }
// let callback = () => console.log("Hello");
// let callbackc = () => console.log("Hello2");
// callTenTimes(callbackc);

// function func(){
//   setTimeout(hello,3000);
// }
// function hello(){
//   console.log("Hello 3second ");
// }
// func();
// console.log("종료");

// let times;
// function displayHello(){
//   times = setInterval(function(){
//     alert("Hello");
//   }, 3000);
// }
// displayHello()

// window.onload = function(){
//   let time1;
//   const pid = document.querySelector("#pid");
//   const button = document.querySelector("button");
//   button.addEventListener("click", stopInterval);

//   function displayTime(){
//     time1 = setInterval(timer, 500);
//   }

//   function timer(){
//     let today = new Date();
//     let times = today.toString();
//     pid.innerHTML = times;
//   }

//   function stopInterval(){
//     clearInterval(time1);
//   }
//   displayTime();
// }

// window.onload = function(){
//   function displayTime(){
//     const pid = document.querySelector("#pid")
//     const button = document.querySelector("button")

//     let today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth() +1;
//     let day = today.getDay();
//     let hours = today.getHours();
//     let minutes = today.getMinutes();
//     let seconds = today.getSeconds();
//     let times = `${year}년\t ${month}월 ${day}일\n${hours}시 ${minutes}분 ${seconds}초`;
//     pid.innerHTML = times;
//     let  timeid = setTimeout(function(){
//       displayTime();
//     },500);
//   }
//   displayTime();
// }

// let num = 13.3714;
// let a = num.toFixed(1);
// let a = num.toPrecision(1);
// console.log(a)

// var person = {
//   name: "홍길동",
//   addr : "지리산",
//   age : 20
// }
// person["name"] = "ad"
// person.power = 6;
// person.name = "dsf";
// var person = new Object();
// person.name="홍길동";
// person.addr = "지리산";
// person.age = 20;
// console.log(person);

// var person = {
//   name:"홍길동",
//   addr : "지리산",
//   age : 20,
//   who: function(){
//     return this.name + " " + this.addr + " " + this.age;
//   }
// };
// console.log(person.who());

// function Person(name, addr, age){
//   this.name = name;
//   this.addr = addr;
//   this.age = age;
// };

// let man = new Person("asd","bcd",20);
// let woman = new Person("qwe","wer",24);

// console.log(man.name + " " + man.addr + " " + man.age);
// console.log(`${woman.name}은 ${woman.addr}에 살며 나이는 ${woman.age}세 이다`);
