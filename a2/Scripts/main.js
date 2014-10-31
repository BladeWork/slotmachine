/// <reference path="jquery.js" />
//begin to set the stage
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

var stage;
function init() {
    stage = new createjs.Stage(document.getElementById('myCanvas'));
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

function handleTick(e) {
    stage.update();
}

/* GUI functions */
function start() {
    drawSlotMachine();
    drawSpinButton();
    drawExitButton();
    drawResetButton();
    drawDownBet();
    drawUpBet();
    drawLabels();
}
/* GUI function for drawing Slot Machine
   An mouse click listener */
function drawSlotMachine() {
    var slotmachine = new createjs.Bitmap("img/slot-machine5.png");
    slotmachine.x = -15;
    slotmachine.y = -8;
    slotmachine.scaleX = 1;
    slotmachine.scaleY = 1;
    stage.addChild(slotmachine);
    stage.update();
}

/* GUI function for drawing Spin button
   An mouse click listener */
function drawSpinButton() {
    var spinButton = new createjs.Bitmap("img/spin.jpg");
    spinButton.x = 304;
    spinButton.y = 419;
    spinButton.scaleX = 1.22;
    spinButton.scaleY = 1;
    spinButton.addEventListener("click", function (event) { spinAction(); } );
    stage.addChild(spinButton);
    stage.update();
}

/* When the player clicks the spin button the game kicks off */
function spinAction() {
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();

        //list the spinResult[] and find the opposite images
        for (var i = 0; i < 3; i++) {
            drawFruits(spinResult[i],i);
        }

        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
}
/* GUI function for drawing Fruits
   An mouse click listener */
function drawFruits(fruitName,i) {
    var fruitIcon = new createjs.Bitmap("img/" + fruitName + ".png");
    switch (i) {
        case 0:
            fruitIcon.x = 55;
            break;
        case 1:
            fruitIcon.x = 165;
            break;
        case 2:
            fruitIcon.x = 283;
            break;
    }
    fruitIcon.y = 236;
    fruitIcon.scaleX = 1;
    fruitIcon.scaleY = 1;
    stage.addChild(fruitIcon);
    stage.update();
}

/* GUI function for drawing Exit button
   An mouse click listener */
function drawExitButton() {
    var exitButton = new createjs.Bitmap("img/exit.png");
    exitButton.x = 360;
    exitButton.y = 80;
    exitButton.scaleX = 0.6;
    exitButton.scaleY = 0.6;
    exitButton.addEventListener("click", function (event) { exitAction(); });
    stage.addChild(exitButton);
    stage.update();
}

/* An action function for closing game */
function exitAction() {
    //For IE
    window.opener = null;
    window.open('', '_self');
    window.close();
    //For Other browers
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}

/* GUI function for drawing Reset button
   An mouse click listener */
function drawResetButton() {
    var resetButton = new createjs.Bitmap("img/reset.jpg");
    resetButton.x = 64;
    resetButton.y = 419;
    resetButton.scaleX = 1.23;
    resetButton.scaleY = 1;
    resetButton.addEventListener("click", function (event) { resetAll();init(); });
    stage.addChild(resetButton);
    stage.update();
}

/* GUI function for drawing down bet
   An mouse click listener */
function drawDownBet() {
    var downBet = new createjs.Bitmap("img/downbet.png");
    downBet.x = 240;
    downBet.y = 423;
    downBet.scaleX = 0.17;
    downBet.scaleY = 0.17;
    downBet.addEventListener("click", function (event) { alert("down"); });
    stage.addChild(downBet);
    stage.update();
}


/* GUI function for drawing up bet
   An mouse click listener */
function drawUpBet() {
    var upBet = new createjs.Bitmap("img/upbet.png");
    upBet.x = 125;
    upBet.y = 423;
    upBet.scaleX = 0.29;
    upBet.scaleY = 0.29;
    upBet.addEventListener("click", function (event) { alert("up"); });
    stage.addChild(upBet);
    stage.update();
}

/* GUI function for drawing bet label & $10 label */
function drawLabels() {
    var betLabel = new createjs.Bitmap("img/bet.png");
    var dollarLabel = new createjs.Bitmap("img/10dollar.png");
    betLabel.x = 175;
    betLabel.y = 415;
    betLabel.scaleX = 0.25;
    betLabel.scaleY = 0.25;

    dollarLabel.x = 175;
    dollarLabel.y = 438;
    dollarLabel.scaleX = 0.25;
    dollarLabel.scaleY = 0.25;
    stage.addChild(betLabel);
    stage.addChild(dollarLabel);
    stage.update();
}

/* GUI function for drawing Jackpot win message */
function drawJackPot() {
    var jackPotLabel = new createjs.Bitmap("img/jackpot.png");
    jackPotLabel.x = 150;
    jackPotLabel.y = 140;
    jackPotLabel.scaleX = 0.4;
    jackPotLabel.scaleY = 0.4;

    stage.addChild(jackPotLabel);
    stage.update();
}

/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        drawJackPot();
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "Blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}