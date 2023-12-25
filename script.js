let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let reset = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-game");
let msg = document.querySelector("#msg")

let turnX = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnX){
            box.innerText = "X";
            turnX = false;
        } else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
});

const gameDraw = () => {
    msg.innerText = `Game is Drawn.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () =>{
    count = 0;
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const disableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
    return false;
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);