window.addEventListener("load", function () {
  let input = document.querySelector("input");
  let btn = document.querySelectorAll("button");
  input.setAttribute("size", "50");
  let money = 0;
  btn[0].addEventListener("click", function () {
    input.value = `예금주 : 정명준, 잔액 : ${money}`;
  });
  btn[1].addEventListener("click", function () {
    let temp = parseInt(input.value);
    money += temp;
    input.value = `${temp} 원 입금되었습니다.(잔액 : ${money})`;
  });
  btn[2].addEventListener("click", function () {
    let temp = parseInt(input.value);
    if (money - temp < 0) {
      input.value = `잔액이 부족해서 출금할 수 없습니다(잔액 : ${money})`;
    } else {
      money -= temp;
      input.value = `${temp}원 출금되었습니다. (잔액 : ${money})`;
    }
  });
  btn[3].addEventListener("click", function () {
    input.value = ``;
  });
});
