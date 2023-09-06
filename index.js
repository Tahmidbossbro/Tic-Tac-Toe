let boxes = document.querySelectorAll(".box");

var current_symbol = "X";

for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    this.textContent = current_symbol;
    if (current_symbol === "X") {
      current_symbol = "O";
    } else {
      current_symbol = "X";
    }
  });
}
