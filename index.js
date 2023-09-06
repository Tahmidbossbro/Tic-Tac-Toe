let boxes = document.querySelectorAll(".box");

var current_symbol = "";

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
// Target Buttons
symbol_buttons = document.querySelectorAll('.btn');

for (var i = 0; i < symbol_buttons.length; i++) {
  
  symbol_buttons[i].addEventListener("click", function () {
    current_symbol = this.textContent;
    document.querySelector('.button-container').style.visibility = 'hidden'
  });
}

