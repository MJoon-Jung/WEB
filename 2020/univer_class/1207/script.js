// let arr1 = [];
// let arr2 = [11,22,33,44,55];

// let arr3 = [
//   [],
//   [],
//   [],
//   []
// ];
// let count =1;
// let str = ""
// for(let i = 0; i < arr3.length; i++){
//   for(let j = 0; j < 5; j++){
//     arr3[i][j] = count++;
//     str += arr3[i][j] + "\t";
//   }
//   str+="\n";
// }
// console.log(str);
// console.log(arr3);

let cars = ["BMW", "Audi", "현대", "Bentz"];
let fruits = ["Apple", "Banana", "Peach", "Cherry"];
let new1 = cars.concat(fruits); //배열 합침
// console.log(cars.length);
// console.log(fruits.length);
// console.log(new1.length);
// console.log(new1);
// let index = new1.indexOf("Cherry");  //index 찾기
// console.log(index);

//join()
// let str1 = fruits.join();
// console.log(str1);

//pop()
// console.log(fruits);
// fruits.pop();
// console.log(fruits);
// fruits.push("망고");
// console.log(fruits);

// shift() , unshift()
//pop과 반대로 처음껄 삭제 및 추가
//처음것에 추가하면 뒤에가 전체 다 이동해야 되서
//바람직하지 않음 사용 잘 않함
// console.log(fruits);
// fruits.shift();
// console.log(fruits);
// fruits.unshift("망고");
// console.log(fruits);

// slice
// let fruits2 = fruits.slice(1,3);
// let fruits2 = fruits.slice(0);
// console.log(fruits2);

//splice 안에 다른내용 넣고 빼기
// console.log(new1);
// let new2 = new1.splice(5,2,"PineApple","Kiwi");
// console.log(new2);
// console.log(new1);

//sort() 정렬 문자취급이라 앞자리만 보고 판단...
// let score1= [21,35,44,32,32,87,7,1];
// console.log(score1);
// // score1.sort();
// score1.sort(function(a,b){
//   return a - b;
// });
// score1.sort(function(a,b){
//   return b - a;
// });
// console.log(score1);

// let a = [11,12,25,31,45,69,75,88,93,99];
// let b = [17,27,33,41,53,67,79,85,87,91];
// let c = [];

// for(let i = 0; i < a.length; i++){
//   c[i] = a[i] + b[i];
// }
// console.log(c);

// c = [];
// for(let i = 0; i < a.length; i++){
//   if(a[i] >= b[i]){
//     c[i] = a[i];
//   }
//   else if(a[i] < b[i]){
//     c[i] = b[i];
//   }
// }
// console.log(c);

// c = [];
// c = a.concat(b);
// c.sort(function(x,y){
//   return x-y;
// })
// console.log(c);

// a.sort(function(x,y){
//   return x-y;
// })

// b.sort(function(x,y){
//   return x-y;
// })

// let i = 0;
// let j = 0;
// while(true){
//   if(a[i] > b[j]){
//     c.push(a[i]);
//     i++;
//   }
//   else if(a[i] < b[j]){
//     c.push(b[j]);
//     j++;
//   }
//   else{
//     c.push(a[i]);
//     c.push(b[j]);
//     i++;
//     j++;
//   }
//   if(i == a.length){
//     for(; j < b.length; j++){
//       c.push(b[j]);
//     }
//     break;
//   }
//   if(j == b.length){
//     for(; i < a.length; i++){
//       c.push(a[i]);
//     }
//     break;
//   }
// }
// console.log(c);

// let score = [];
// for(let i = 0; i < 10; i++){
//   score[i] = Math.floor((Math.random() * 99 + 1));
// }
// console.log(score);

// score.sort(function(a,b){
//   return a- b;
// })
// console.log(score);

// function hello(){
//   console.log("HELLO");
// }
// hello();

// function func(a,b){
//   return a+b;
// }
// console.log(func(1,2));

// function sum(a){
//   if(a == 1){
//     return a;
//   }
//   else{
//     return a + sum(a-1);
//   }
// }
// let k = parseInt(prompt("숫자를 입력하시오!"));
// alert(sum(k));

// function hello(){
//   console.log("HELLO");
// }
// hello();

// var hello = function(){
//   console.log("Hello . var");
// }
// var hello = () => console.log("hellodd");

// let sum = (a,b) => console.log(a+b);
// sum(2,3);
// let hello = function(){
//   console.log("Hello . var");
// }
// hello();

// function callTenTimes(callback){
//   for(let i = 0; i < 10; i++){
//     callback();
//   }
// }
// let callback = () => console.log("Hello");
// callTenTimes(callback);

// callTenTimes(function(){
//   console.log("Hello");
// })

// function func(){
//   setTimeout(hello,3000);
//   //setTimeout이라는 함수실행과 초를 입력해서 시간차를 둠
// }
// function hello(){
//   console.log("Hello ...3초후");
// }
// func();
// console.log("종료");

//지금 현재 안돌아감 다시 해봐야됨
// window.onload = function(){
//   let time1;
//   const pid = document.querySelector("#pid");
//   const button = document.querySelector(".button");
//   button.addEventListener("click",stopInterval);

//   function displayTime(){
//     time1 = setInterval(timer , 500);
//   }
//   function stopInterval(){
//     clearInterval(time1);
//   }
//   function timer (){
//     let today = new Date();
//     let times = today.toString();
//     pid.innerHTML = times;
//   }
//   displayTime();
// }

// window.onload = function(){
//   const pid = document.querySelector("#pid");
//   const button = document.querySelector(".button");
//   function displayTime(){
//     let today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth()+1;
//     let date = today.getDate();
//     let hours = today.getHours();
//     let minutes = today.getMinutes();
//     let seconds = today.getSeconds();
//     let times = `${year}년${month}월${date}일${hours}시${minutes}분${seconds}초`;

//     pid.innerHTML = times;
//     let timeid = setTimeout(function(){
//       displayTime()
//     },500);
//   }
//   displayTime();
// }

// let txt = "";
// let person = {
//   name:"홍길동",
//   addr:"지리산",
//   age:20
// };

// person.power = "매우 강함";
// person["addr"] = "태백산";
// // console.log(person);

// for(let x in person){
//   console.log(`${x} : ${person[x]}`);
// }

// let obj ={
//   sid:2020111,
//   major:'computer Programming',
//   isGraduated : true,
//   score : [88,93,97,91,89],
//   introduce : function(){
//     console.log(`학번 : ${this.sid}, 전공 : ${this.major}, 졸업 : ${this.isGraduated}`);
//   }
// };
// for(let n in obj){
//   console.log(`${n} : ${obj[n]}`);
// }
// obj.introduce();
