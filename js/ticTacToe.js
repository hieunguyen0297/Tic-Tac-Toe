
//create function main
function main(){
    //create a out put div
    let outputDiv = createItem('div', 'absolute',  '#FFE4B5', 50, 50, 200, 60 );
    //set HTML text
    outputDiv.innerHTML = 'Tic Tac Toe';


    //create a div to hold buttons 
    let btnDiv = createItem('div', 'absolute', 'blue', 120, 50, 200, 200)
    //set style for this div
    btnDiv.style.display = 'grid';
    btnDiv.style.gridTemplateColumns = '50px 50px 50px ';
    btnDiv.style.gridColumnGap = '20px';
    btnDiv.style.gridRowGap = '10px';

    //use a for loop to create 9 buttons and then push them to the div above. 
    for(let b = 0; b < 9; b++){
        let button = createItem('button', 'relative', '#FFE4B5', 0, 0, 60, 60 );
        button.setAttribute('data-id', `${b}`);
        btnDiv.appendChild(button);
    }


    //create a reset button 
    let resetBtn = createItem('button', 'absolute', 'lightgrey', 350, 100, 100, 40);
    resetBtn.setAttribute('data-id', '9');
    
    //set text for this button
    resetBtn.innerHTML = 'Replay';

    //create a 2-d array to track the X and O
    let board = [ 
        ['','',''],
        ['','',''], 
        ['','',''] 
    ];

    //create playx and set it to true to make it move first
    let playX = true;

    //create a counter
    let counter = 0

    //get all button elements
    document.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', (eventData) => {
            //increase counter 1 when there is a click
            counter += 1
            //get data id of each button
            let dataId = parseInt(eventData.target.getAttribute('data-id'));
            //get data value of each button
            let dataValue = eventData.target.getAttribute('data-value');
            
        
            //check if the button already has attribute datavalue of x or o, it will return nothing
            if(dataValue == 'X' || dataValue =='O'){
                return;
            }

            //check data id to make sure it is not the replay button
            //update text for buttons in the board
            if(dataId != 9){
                //when it is X turn, update the button with X as text 
                if(playX){
                    item.setAttribute('data-value', 'X');
                    let player = eventData.target.getAttribute('data-value');
                    //change the value of playX to false to let the O move
                    playX = !playX;
                    item.innerHTML = player;
                    //call the function updateBoard to update the board
                    updateBoard(dataId, board, player);
                    outputDiv.innerHTML = 'Tic Tac Toe' + '<br>'+ "O turn";
                //when it is O turn, update the button with O as text 
                }else{
                    item.setAttribute('data-value', 'O');
                    let player = eventData.target.getAttribute('data-value');
                    //change the value of playX to true again to make it move
                    playX = !playX;
                    item.innerHTML = player;
                    //call the function updateBoard to update the board
                    updateBoard(dataId, board, player);
                    
                    outputDiv.innerHTML = 'Tic Tac Toe' + '<br>'+ "X turn";
                }
            //when the replay button is clicked, set the all button HTML to a empty string     
            }else{
                document.querySelectorAll('button').forEach(item => {  
                    //set all buttons back to the beginning
                    item.innerHTML = '';
                    item.setAttribute('data-value', '');
                })
                item.innerHTML = 'Replay';
                playX = true;
                //set counter back to 0 when replay clicked
                counter = 0;
                //set the board back to empty
                board = [ ['','',''], ['','',''], ['','',''] ];
                  //update the output div to previous state
                outputDiv.innerHTML = 'Tic Tac Toe' ;
            } 

            //check to see who win
            if(checkWiner(board)){
                let winner= eventData.target.getAttribute('data-value');
                outputDiv.innerHTML = 'Tic Tac Toe' + '<br>'+ winner + ' won';
            //after 9 clicks, print cat's game    
            }else if(counter == 9){
                outputDiv.innerHTML = 'Tic Tac Toe' + '<br>'+ "Cat's game";
            }

            
        })
    })
    
    
}


//create a function to update the board status
function updateBoard(dataId, board, player){
    if(dataId == 0 || dataId == 1 || dataId == 2){
        board[0][dataId] = player;
    }else if(dataId == 3 || dataId == 4 || dataId == 5){
        board[1][dataId-3] = player;
    }else{
        board[2][dataId-6] = player;
    }
}

//create a function to check to see who won
function checkWiner(board){
    //check first row
    if(board[0][0] != '' && board[0][0] == board[0][1] && board[0][0] == board[0][2]){
        return true;
    //second row
    }else if(board[1][0] != '' && board[1][0] == board[1][1] && board[1][0] == board[1][2]){
        return true;
    //third row
    }else if(board[2][0] != '' && board[2][0] == board[2][1] && board[2][0] == board[2][2]){
        return true;
    //first column
    }else if(board[0][0] != '' && board[0][0] == board[1][0] && board[0][0] == board[2][0]){
        return true;
    //second column
    }else if(board[0][1] != '' && board[0][1] == board[1][1] && board[0][1] == board[2][1]){
        return true;
    //third column
    }else if(board[0][2] != '' && board[0][2] == board[1][2] && board[0][2] == board[2][2]){
        return true;
    //diagnal    
    }else if(board[0][0] != '' && board[0][0] == board[1][1] && board[0][0] == board[2][2]){
        return true;
    //opposite diagnal
    }else if(board[0][2] != '' && board[0][2] == board[1][1] && board[0][2] == board[2][0]){
        return true;
    }
}


//create a function to create HTML elements
function createItem(iType, position, background, top, left, width, height){
    //create item
    let item = document.createElement(iType);
    //set style
    item.style.position = position;
    item.style.top = top + 'px';
    item.style.left = left + 'px';
    item.style.width = width + 'px';
    item.style.fontSize = '25px'
    item.style.textAlign = 'center';
    item.style.height =  height + 'px';
    item.style.backgroundColor = background;
    //display the item to screen
    document.body.appendChild(item);
    return item;
}
