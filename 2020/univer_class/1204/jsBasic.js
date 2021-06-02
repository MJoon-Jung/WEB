// var : 함수범위(scope)
// let : {}scope

// var num = 100;
// if(num >= 100){
//   var num = 200;
//   console.log(num);
// }
// var num = 300;

// console.log("함수 이전" + num);
// func1();
// function func1(){
// var num=500;
// console.log("함수 func1 " + num);
// var num; //hoisting
// }
// console.log("함수 이후" + num);

// console.log("num1 = " + num1);
// console.log("num2 = " + num2);
// var num1 = 100;  //hoisting
// var num2;   //hoisting

//hoisting 선언도 안했는데 바로 출력을 하게 되면 알아서 출력 위로 선언을 끌고와서 오류가 나지않고 undefined가 나옴

// let num = 100;
// if(num >= 100){
//   let num = 200;
//   console.log(num);
// }
// console.log(num);
// func1();
// function func1(){
// console.log("함수 func1 " + num);
// let num=500;  이건 오류 물어보기
// let num; //hoisting
// }
// console.log(num);

// let x = 5;
// console.log(x + "5");
// let x = 5;
// console.log("이전 " +x);
// console.log(`이후 ${x}`);

// let str1 = "hello";
// let str2 = "world";
// let str3 = " javascript is \ninteresting chorome\tcoding";

// let str4 = '어머니가 "수고해라" 라고 하셨습니다';
// let str5 = "어머니가 \"수고해라\" 라고 하셨습니다";
// console.log(str5);

// let num1 = "7";
// let num2 = 7;
// let num3 = num1 / num2;
// let num3 = num1 > num2;
//string 과 int 로 연산을 하면
//number type으로 바뀐다.
// console.log(num1 - num2);
// console.log(typeof num3 );
// console.log(num1 * num2);
// console.log(num1 / num2);
// console.log(num1 % num2);
// console.log(num1 == num2);
// console.log(num1 === num2);

// let num = 32;
// let count = 0;
// while(true){
//   let answer = prompt("숫자 입력 : ");
//   count++;
//   if(answer > num){
//     alert("더 낮습니다!!");
//   }
//   else if(answer < num){
//     alert("더 높습니다");
//   }
//   else{
//     alert("정답입니다 축하드려요!");
//     alert(`도전횟수 ${count}`);
//     break;
//   }
// }
// confirm("구매 완료!");

// let digit = prompt("input number");
// let num1 = Number(digit);
// console.log(num1);

// let today = new Date();
// console.log(today);
// let year = today.getFullYear();
// console.log(year);
// let month = today.getMonth() + 1; //0~11이라서
// console.log(month);
// let date = today.getDate();//1~31
// console.log(date);
// let day =today.getDay(); //0~6 ,일요일 0
// console.log(day);
// let hours = today.getHours(); //0~23
// console.log(hours);
// let minutes = today.getMinutes();
// console.log(minutes);
// let times1 = today.getTime(); //1970년대 이후부터 몇초지났나
// let times2 = Date.now(); //처리시간 비교할때 종종 사용
// console.log(times1);
// console.log(times2);

// let sum = 0;
// for(let i = 1; i <= 10; i++){
//   sum += i;
// }
// console.log(sum);
// let i = 1;
// sum2 = 0;
// while(i <= 10){
//   sum2+= i;
//   i++;
// }
// console.log(sum2);

// let sum = 0;
// let num;
// let i = 0;
// while(true){
//   num = parseInt(prompt("숫자 입력(0: 종료"));
//   if(num==0)break;
//   confirm(`${num}`)
// }

// for(let i = 2; i < 10; i++){
//   for(let j = 1; j < 10; j++){
//     console.log(`${i}\tx\t${j}\t=\t${i*j}\n`)
//   }
// }

// let str = "";
// for(let i = 1; i < 10; i++){
//   for(let j = 2; j < 10; j++){
//     str += `${j}\tx\t${i}\t=\t${j*i}\n`;
//   }
// }
// console.log(str);

// let n = prompt("피라미드 층 개수");
// let str = "";
// for(let i = 0; i < n; i++){
//   for(let j = n-1; j >= 0; j--){
//     if(j > i){
//       str+=" ";
//     }
//     else{
//       str+="*";
//     }
//   }
//   for(let k =1; k < n; k++){
//     if(i >= k){
//       str += "*";
//     }
//     else{
//       str+= " ";
//     }
//   }
//   str+="\n";
// }
// console.log(str);

// let data1 = new Array();
// for(let i =0; i < 10; i++){
//   data1[i] = i;
// }
// console.log(`배열크기 : ${data1.length}`);
// data1[19] = 19;
// console.log(`배열크기 : ${data1.length}`);
// console.log(`배열 : ${data1}`);

// let data2 = new Array(1,2,3,4,5,6);
// console.log(`배열크기 : ${data2.length}`);
// console.log(`배열크기 : ${data2}`)

// let data3 = [];
// let data4 = [11,22,33,44,55,66,77,88,99];
// console.log(`배열 data3 크기 : ${data3.length}`);
// console.log(`배열 data4 크기 : ${data4.length}`);

// let dt = [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9],
//   [10,11,12]
//   ];
// console.log(`배열 dt [] 크기 : ${dt.length}`);
// console.log(`배열 dt [][] 크기 : ${dt[0].length}`);
let count = 1;
let dt2 = [[], [], [], []];
for (let i = 0; i < dt2.length; i++) {
  for (let j = 0; j < dt2[0].length; j++) {
    dt2[i][j].push(count++);
  }
}
console.log(dt2);
// dt2[0].push(1,2,3);
// console.log(dt2);
// dt2[0].pop();
// console.log(dt2);
