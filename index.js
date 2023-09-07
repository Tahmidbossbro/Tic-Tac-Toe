document.body.style.zoom = "90%";
var originalHtml = document.body.innerHTML;

function gameOn() {
  let boxes = document.querySelectorAll(".box");

  var current_symbol = "";
  var total_clicks = 0;

  function activateClickers() {
    symbol_buttons[0].remove();
    symbol_buttons[1].remove();
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", eventHandler);
    }
  }

  function eventHandler() {
    this.removeEventListener("click", eventHandler);
    this.textContent = current_symbol;
    total_clicks++;
    checkWinner(this.classList[1]);
    if (current_symbol === "X") {
      current_symbol = "O";
    } else {
      current_symbol = "X";
    }
  }
  function disableAllListeners() {
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener("click", eventHandler);
    }
  }
  // Target Buttons
  symbol_buttons = document.querySelectorAll(".btn");

  for (var i = 0; i < symbol_buttons.length; i++) {
    symbol_buttons[i].addEventListener("click", function () {
      current_symbol = this.textContent;
      activateClickers();
    });
  }

  // Find Winner

  function checkWinner(target) {
    console.clear();
    const rows = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const columns = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
    const diagonals = [
      [1, 5, 9],
      [3, 5, 7],
    ];
    var row_data = "";
    var column_data = "";
    var diagonal_1_data = "";
    var diagonal_2_data = "";
    var need_to_check_col = false;
    var need_to_check_dia_1 = false;
    var need_to_check_dia_2 = false;
    var winner_decided = false;

    // Row Checker
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].includes(+target)) {
        console.log(rows[i]);
        for (let j = rows[i][0]; j < rows[i][2] + 1; j++) {
          row_data += boxes[j - 1].textContent;
        }
        console.log(row_data);
        if (row_data[0] === row_data[1] && row_data[0] === row_data[2]) {
          console.log("Winner! in Row " + (i + 1));
          disableAllListeners();
          winner_decided = true;
          for (let j = rows[i][0]; j < rows[i][2] + 1; j++) {
            document.querySelector(".p" + j).innerHTML +=
              '<div class="line_1"></div>';
          }
        } else {
          need_to_check_col = true;
        }
      }
    }
    console.log("Row Checked");

    if (need_to_check_col) {
      // Column checker
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].includes(+target)) {
          console.log(columns[i]);
          for (let j = columns[i][0]; j < columns[i][2] + 1; j += 3) {
            column_data += boxes[j - 1].textContent;
          }
          console.log(column_data);
          if (
            column_data[0] === column_data[1] &&
            column_data[0] === column_data[2]
          ) {
            console.log("Winner! in Column " + (i + 1));
            disableAllListeners();
            winner_decided = true;
            for (let j = columns[i][0]; j < columns[i][2] + 1; j += 3) {
              document.querySelector(".p" + j).innerHTML +=
                '<div class="line_2"></div>';
            }
          } else {
            need_to_check_dia_1 = true;
          }
        }
      }
      console.log("Column Checked");
    }

    if (need_to_check_dia_1) {
      // Diagonal 1 checker

      console.log(diagonals[0]);
      for (let j = diagonals[0][0]; j < diagonals[0][2] + 1; j += 4) {
        diagonal_1_data += boxes[j - 1].textContent;
      }
      console.log(diagonal_1_data);
      if (
        diagonal_1_data[0] === diagonal_1_data[1] &&
        diagonal_1_data[0] === diagonal_1_data[2]
      ) {
        console.log("Winner! in Diagonal 1");
        disableAllListeners();

        winner_decided = true;

        for (let j = diagonals[0][0]; j < diagonals[0][2] + 1; j += 4) {
          document.querySelector(".p" + j).innerHTML +=
            '<div class="line_4"></div>';
        }
      } else {
        need_to_check_dia_2 = true;
      }

      console.log("Diagonal 1 Checked");
    }

    if (need_to_check_dia_2) {
      // Diagonal 2 checker

      console.log(diagonals[1]);
      for (let j = diagonals[1][0]; j < diagonals[1][2] + 1; j += 2) {
        diagonal_2_data += boxes[j - 1].textContent;
      }
      console.log(diagonal_2_data);
      if (
        diagonal_2_data[0] === diagonal_2_data[1] &&
        diagonal_2_data[0] === diagonal_2_data[2]
      ) {
        console.log("Winner! in Diagonal 2");
        disableAllListeners();
        winner_decided = true;

        for (let j = diagonals[1][0]; j < diagonals[1][2] + 1; j += 2) {
          document.querySelector(".p" + j).innerHTML +=
            '<div class="line_3"></div>';
        }
      }

      console.log("Diagonal 2 Checked");
    }
    if (winner_decided) {
      document.querySelector("h1").textContent = current_symbol + " Wins!";
      document.querySelector(".button-container").innerHTML +=
        '<button class="btn">↻</button>';
      document
        .querySelector(".button-container")
        .addEventListener("click", function () {
          document.body.innerHTML = originalHtml;
          gameOn();
        });
    } else if (winner_decided == false && total_clicks == 9) {
      document.querySelector("h1").textContent = "Draw!";
      document.querySelector(".button-container").innerHTML +=
        '<button class="btn">↻</button>';
      document
        .querySelector(".button-container")
        .addEventListener("click", function () {
          document.body.innerHTML = originalHtml;
          gameOn();
        });
    }
  }
}

gameOn();
