window.addEventListener("load", function () {
  let btn = document.querySelectorAll("button");
  let num_list = new Array();
  btn[0].addEventListener("click", function () {
    let input = document.querySelectorAll("input");
    for (let i = 0; i < 10; i++) {
      num_list.push(Math.floor(Math.random() * 98 + 1));
    }
    input[0].value = num_list;
  });
  btn[1].addEventListener("click", function () {
    let input = document.querySelectorAll("input");
    num_list.sort(function (a, b) {
      return a - b;
    });
    input[1].value = num_list;
  });
});
