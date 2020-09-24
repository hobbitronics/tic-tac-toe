let grid = ['0', '1', '2',
            '3', '4', '5',
            '6', '7', '8'];

let winner;
let temp;
let temp1;
let turnCount = 0;
clicked = [];

let reset = document.getElementById('reset');
    reset.onclick = () =>{
      location.reload();
      return false;
    }

grid.forEach(function(element, index){
clicked[index] = document.getElementById(element);
clicked[index].addEventListener('click', function(){play(index)});
    }
)

//generates random number for pc player
  const rand = () => {
    let number = Math.floor(Math.random()*9);
    if (winner === 'o'){return 10}
    else if (grid[number] !== 'x' && grid[number] !== 'o'){
    return number;     //the choice is accepted!
    } else {return rand()}  //taken already, try again
  }


//winning conditions Across rows
function winA (player) {
for (let h = 0; h < 7 ; h+=3) {  // h is 0 then 3 then 6
  if (grid[h] === player && grid[h+1] === player && grid[h+2] === player){  // covers 0,1,2 3,4,5 6,7,8 and reverse
      console.log(player +' won!')
      winner = player;
    }
  }
//winning conditions down colums
for (let h = 0; h < 3 ; h++) {  // h 0, 1, 2
  if (grid[h] === player && grid[h+3] === player && grid[h+6] === player){  // covers 0,3,6  1,4,7  2,5,8 and reverse
    console.log(player +' won!')
    winner = player;
    }
  }
//diagonal winning conditions
    if ( (grid[0] + grid[4] + grid[8]) === (player+player+player) || (grid[2] + grid[4] + grid[6]) === (player+player+player)){  // covers 0,3,6  1,4,7  2,5,8 and reverse
      console.log(player +' won!')
      winner = player;
    }
}

//plays when player clicks an empty box
function play (choice) {
  if (grid[choice] !== 'x' && grid[choice] !== 'o' && winner === undefined){  //checks that box isn't already full and no winner
  grid[choice] = 'o'                            //sets the grid number on the board to 'o'
  clicked[choice.toString()].innerHTML = 'O';   //puts move on html board
  clicked[choice].removeEventListener('click', function(){play(index)})
  winA('o')   //check for a win
  turnCount +=1;
  if (winner === 'o'){alert('you won!')}
  if (turnCount === 9 && winner === undefined){   //checks for a tie
    alert('Its a tie!')
    winner = 'tie';
  }
  temp1 = rand();   //computers choice
  grid[temp1] = 'x'//computer move, sets random board space not already moved on 'x'
  clicked[temp1.toString()].innerHTML = 'X';
  clicked[temp1].removeEventListener('click', function(){play(index)})
  winA('x')
  turnCount +=1;
  if (winner === 'x'){alert('computer won!')}
}
}