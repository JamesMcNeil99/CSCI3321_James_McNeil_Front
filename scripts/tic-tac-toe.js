var gameWon = true;
var firstGame = true;
var xTurn = true;
var turnCount = 0;
function beginGame(){
    var boxes = document.querySelectorAll("#container div");
    turnCount = 0;
    document.getElementById("start").style.display = "none";
    if(!firstGame)
        for(var i = 0; i < boxes.length; i++){
            boxes[i].innerHTML = "";
        }
    if(firstGame){
        document.getElementById("start").innerHTML= "Replay";
        document.getElementById("status").style.display = "block";
        firstGame = false;
    }
    for(var i = 0; i < boxes.length; i++){
        boxes[i].style.cursor = "pointer";
    }
    gameWon = false;
    if(xTurn)
    document.getElementById("status").innerHTML="X's go first."
    else
    document.getElementById("status").innerHTML="O's go first.";
}

function playOnTile(tileID){
    if(!gameWon){
        var tile = document.getElementById(tileID);
        if(tile.innerHTML === ""){
            if(xTurn){
                tile.innerHTML = "X";
                tile.style.cursor = "default";
                xTurn = false;
                turnCount++;
            }
            else{
                tile.innerHTML = "O";
                tile.style.cursor = "default";
                xTurn = true;
                turnCount++;
            }
        }
        if(xTurn){
            document.getElementById("status").innerHTML = "X's turn."
        }
        else{
            document.getElementById("status").innerHTML = "O's turn."
        }
        checkGame();
    }
}
function checkGame(){
    var boxes = document.querySelectorAll("#container div");
    if(turnCount >= 5){
        if( boxes[0].innerHTML !== "" && boxes[0].innerHTML === boxes[1].innerHTML && boxes[0].innerHTML === boxes[2].innerHTML || 
            boxes[3].innerHTML !== "" && boxes[3].innerHTML === boxes[4].innerHTML && boxes[3].innerHTML === boxes[5].innerHTML || 
            boxes[6].innerHTML !== "" && boxes[6].innerHTML === boxes[7].innerHTML && boxes[6].innerHTML === boxes[8].innerHTML ||
            boxes[0].innerHTML !== "" && boxes[0].innerHTML === boxes[3].innerHTML && boxes[0].innerHTML === boxes[6].innerHTML ||
            boxes[1].innerHTML !== "" && boxes[1].innerHTML === boxes[4].innerHTML && boxes[1].innerHTML === boxes[7].innerHTML ||
            boxes[2].innerHTML !== "" && boxes[2].innerHTML === boxes[5].innerHTML && boxes[2].innerHTML === boxes[8].innerHTML ||
            boxes[0].innerHTML !== "" && boxes[0].innerHTML === boxes[4].innerHTML && boxes[0].innerHTML === boxes[8].innerHTML ||
            boxes[2].innerHTML !== "" && boxes[2].innerHTML === boxes[4].innerHTML && boxes[2].innerHTML === boxes[6].innerHTML){
                gameWon = true;
                if(xTurn){
                    document.getElementById("status").innerHTML="O's won!";
                }
                else{
                    document.getElementById("status").innerHTML="X's won!";
                }
                document.getElementById("start").style.display = "inline"
                for(var x = 0; x < boxes.length; x++){
                    boxes[x].style.cursor = "default";
                }
            }
        else if(turnCount === 9){
            gameWon = true;
            document.getElementById("status").innerHTML="Tie game!";
            document.getElementById("start").style.display = "inline";
        }
    }
}