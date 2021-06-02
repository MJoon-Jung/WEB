window.addEventListener("load", function () {
  let btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    let inp = document.querySelector("input");
    let equ = eval(inp.value);
    inp.value = equ;
  });
});
