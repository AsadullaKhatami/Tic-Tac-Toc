let boxes = document.querySelectorAll(".box");
let winMess = document.querySelector(".mess");
let mess = document.querySelector("#message");
let container = document.querySelector(".container");
let resetBtn = document.querySelector("#reset-btn");
let againBtn = document.querySelector("#again-btn");

let playerX = true;
let trackMove = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let setPlayer = () => {
    let num = Math.floor(Math.random() * 9);
    // console.log(num);
    if (num % 2 == 0) {
        playerX = true;
        // console.log(playerX);
    } else {
        playerX = false;
        // console.log(playerX);

    }
}

const resetGame = () => {
    setPlayer();
    enabledBtn();
}

for (let box of boxes) {
    box.addEventListener("click", () => {
        // console.log("button was clicked");
        if (playerX) {
            box.innerText = 'X';
            playerX = false;
        } else {
            box.innerText = 'O';
            playerX = true;
        }
        box.disabled = true;

        trackMove++;
        // console.log(trackMove);

        checkWiner(boxes);
    });
}

let shoWinner = (move1) => {
    winMess.classList.remove("hide");
    mess.innerText = `Congratulation! the winner is ${move1}`;
    container.style.display = "none";
    resetBtn.style.display = "none";
}

let drawMess = () => {
    winMess.classList.remove("hide");
    mess.innerText = `congratulation!  there was no winner the game is draw.`;
    container.style.display = "none";
    resetBtn.style.display = "none";
    trackMove = 0;
}

const checkWiner = (boxes) => {
    for (let winPattern of winPatterns) {

        let move1 = boxes[winPattern[0]].innerText;
        let move2 = boxes[winPattern[1]].innerText;
        let move3 = boxes[winPattern[2]].innerText;

        if (move1 !== "" && move2 !== "" && move3 !== "") {
            if (move1 === move2 && move2 === move3) {
                console.log(`winner is ${move1}`);
                shoWinner(move1);
                disBtn();
                trackMove = 0;
            }
        }

        if (trackMove === 9) {
            drawMess();
        }
    }
}

function disBtn() {
    for (let box of boxes) {
        box.disabled = true;
    }
};

function enabledBtn() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

resetBtn.addEventListener("click", () => {
    resetGame();
    trackMove = 0;
});

againBtn.addEventListener("click", () => {
    resetGame();
    winMess.classList.add("hide");
    container.style.display = "flex";
    resetBtn.style.display = "block";
});