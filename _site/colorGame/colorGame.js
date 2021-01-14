let colors, squares, chosenSquare, chosenSquareColor;
let numOfSquares = 6;

//DOM selectors
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1El = document.getElementsByTagName("h1");
let reset = document.getElementById("reset");



//select element to put color squares
let containerOfSquares = document.getElementById("container");

btnEasy = document.getElementById("easy");
btnHard = document.getElementById("hard");
initialization(numOfSquares);
playGame();

reset.addEventListener("click", function(){
    h1El[0].style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    this.textContent = "New Colors";
    initialization(numOfSquares);
    playGame();
});

btnEasy.addEventListener("click", function () {
    btnEasy.classList.add("selected");
    btnHard.classList.remove("selected");
    numOfSquares = 3;
    initialization(numOfSquares);
    playGame();
});

btnHard.addEventListener("click", function () {
    btnHard.classList.add("selected");
    btnEasy.classList.remove("selected");
    numOfSquares = 6;
    initialization(numOfSquares);
    playGame();
});


//initialize game
function initialization(num) {
    colors = createColorArray(num);
    squares = rest(colors);
    chosenSquare = pickColor();
    chosenSquareColor = colors[chosenSquare];
    //show the winning rgb combination to the user so he can try find the winning square
    colorDisplay.textContent = chosenSquareColor;
}




function playGame() {
    for (let i = 0; i < squares.length; i++) {
        //add colors to squares
        squares[i].style.backgroundColor = colors[i];

        //listen for click event
        squares[i].addEventListener("click", function () {
            if (chosenSquare === i) {
                //if you got the square right display relevant message and change the colors to the winning color
                messageDisplay.textContent = "Correct!";
                reset.textContent = "Play Again?"
                changeColors(chosenSquareColor);
            } else {
                //if you got the square wrong display relevant message and hide the clicked square
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });

    }
}


//change squares and h1 background colors to winning colors
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    h1El[0].style.backgroundColor = color;
}

//create random color array of length specified by level
function createColorArray(num) {
    let colors = [];
    for (let i = 0; i < num; i++) {
        colors.push("rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")");
    }
    return (colors);
}

//choose random square as winning
function pickColor() {
    let chosenSquare = Math.floor(Math.random() * colors.length);
    return (chosenSquare);
}

function rest(colors) {
    let htmlCode = '<div class="square"></div>'.repeat(colors.length);
    containerOfSquares.innerHTML = htmlCode;
    let squares = document.querySelectorAll(".square");
    return (squares);
}