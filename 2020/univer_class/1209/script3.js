window.addEventListener("load", function () {
  let btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    let inputs = document.querySelectorAll("input");
    let num = inputs[0].value;
    let str = `${num}의 약수 >>>  `;
    for (let i = 1; i <= num; i++) {
      if (num % i == 0) {
        str += i;
        str += "  ";
      }
    }
    inputs[1].value = str;
  });
});
