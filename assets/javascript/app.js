var config = {
    apiKey: "AIzaSyC3EM1Vg_LDVdYs0INU9jsq27j8QY1BSgs",
    authDomain: "rps-multiplayer-d6bcf.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-d6bcf.firebaseio.com",
    projectId: "rps-multiplayer-d6bcf",
    storageBucket: "rps-multiplayer-d6bcf.appspot.com",
    messagingSenderId: "560055888557"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // SET GLOBAL VARIABLES
  var playerOneName = '';
  var playerOneChoice;
  var playerOneWins = 0;
  var playerOneLosses = 0;

  var resultMessage;

  var playerTwoName = '';
  var playerTwoChoice;
  var playerTwoWins = 0;
  var playerTwoLosses = 0;

  var userLock = false;
  var opponentLock = false;

  var userRpsLock = false;
  var opponentRpsLock = false;



  // READ DATA FROM FIREBASE AND PRINT TO WINDOW
  database.ref().on("value", function(snapshot) {

    var ts = snapshot.val();
    console.log(ts);

        $('#player-1-name').html(ts.players.One.name);
        $('#player-1-rock').html('rock');
        $('#player-1-paper').html('paper');
        $('#player-1-scissors').html('scissors');
        $('#player-1-wins').html('Wins: ' + playerOneWins);
        $('#player-1-losses').html('Losses: ' + playerOneLosses);

        $('#player-2-name').html(ts.players.Two.name);
        $('#player-2-rock').html('rock');
        $('#player-2-paper').html('paper');
        $('#player-2-scissors').html('scissors');
        $('#player-2-wins').html('Wins: ' + playerTwoWins);
        $('#player-2-losses').html('Losses: ' + playerTwoLosses);


}, function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
});




// START BUTTON SHOULD STORE FIRST USER IN USER-1 DIV AND SECOND USER IN USER-2 DIV
$('#start-button').on('click', function(event) {

    event.preventDefault();

    if ( userLock == false && opponentLock == false) {
        playerOneName = $('#user-name').val().trim();
        userLock = true;
    } else if (userLock == true && opponentLock == false) {
        playerTwoName = $('#user-name').val().trim();
        opponentLock = true;
    }

    // STORE EACH USER'S USERNAME, WIN COUNT AND LOSS COUNT TO FIREBASE
    database.ref().set({
        players: {
            One: {
                name: playerOneName,
                wins: playerOneWins,
                losses: playerOneLosses
            },
            Two: {
                name: playerTwoName,
                wins: playerTwoWins,
                losses: playerTwoLosses
            }
        }
    })

    // userOneData(playerOneName, playerTwoName)

});


// CREATE FUNCTIONALITY WHEN USER PICKS ROCK, PAPER OR SCISSORS
$('.player-choice').click(function() {

    if (userRpsLock == false && opponentRpsLock == false) {
        playerOneChoice = $(this).attr('data');

        $('.player-1-choice').hide();

        playerOneDiv = $('<div>');
        playerOneDiv.html(playerOneChoice);
        $('#player-1').append(playerOneDiv);

        console.log('Player 1: ' + playerOneChoice);
        
        userRpsLock = true;

    } else if (userRpsLock == true && opponentRpsLock == false) {

        playerTwoChoice = $(this).attr('data');

        $('.player-2-choice').hide();

        playerTwoDiv = $('<div>');
        playerTwoDiv.html(playerTwoChoice);
        $('#player-2').append(playerTwoDiv);

        console.log('Player 2: ' + playerTwoChoice);

        opponentRpsLock = true;
    }

    // IF BOTH USERS HAVE A SELECTION OF RPS, CHECK RESULTS WITH A PROVIDED FUNCTION
    if (userRpsLock == true & opponentRpsLock == true) {
        checkRPS();
    }

    // STORE EACH USER'S STATS TO FIREBASE
    database.ref().set({
        players: {
            One: {
                name: playerOneName,
                wins: playerOneWins,
                losses: playerOneLosses
            },
            Two: {
                name: playerTwoName,
                wins: playerTwoWins,
                losses: playerTwoLosses
            }
        }
    })


});

// CHECKS THE OUTCOME OF THE ROUND BASED ON RPS RULES
function checkRPS () {
    if (playerOneChoice == 'rock' && playerTwoChoice == 'scissors') {
        playerOneWins++;
        playerTwoLosses++;

        $('.p1-stats').html('Wins: ' + playerOneWins + ' Losses: ' + playerOneLosses);
        $('.p2-stats').html('Wins: ' + playerTwoWins + ' Losses: ' + playerTwoLosses);

        $('#result').html('Player 1 Wins');
    }

    if (playerOneChoice == 'rock' && playerTwoChoice == 'paper') {
        playerOneLosses++;
        playerTwoWins++;

        $('.p1-stats').html('Wins: ' + playerOneWins + ' Losses: ' + playerOneLosses);
        $('.p2-stats').html('Wins: ' + playerTwoWins + ' Losses: ' + playerTwoLosses);

        $('#result').html('Player 2 Wins');

    }

    if ( (playerOneChoice == 'rock' && playerTwoChoice == 'rock') || 
         (playerOneChoice == 'paper' && playerTwoChoice == 'paper') ||
         (playerOneChoice == 'scissors' && playerTwoChoice == 'scissors') ) {
        $('#result').html('TIE');
    }

    if (playerOneChoice == 'paper' && playerTwoChoice == 'rock') {
        playerOneWins++;
        playerTwoLosses++;

        $('.p1-stats').html('Wins: ' + playerOneWins + ' Losses: ' + playerOneLosses);
        $('.p2-stats').html('Wins: ' + playerTwoWins + ' Losses: ' + playerTwoLosses);

        $('#result').html('Player 1 Wins');

    }

    if (playerOneChoice == 'paper' && playerTwoChoice == 'scissors') {
        playerOneLosses++;
        playerTwoWins++;

        $('.p1-stats').html('Wins: ' + playerOneWins + ' Losses: ' + playerOneLosses);
        $('.p2-stats').html('Wins: ' + playerTwoWins + ' Losses: ' + playerTwoLosses);

        $('#result').html('Player 2 Wins');

    }

    if (playerOneChoice == 'scissors' && playerTwoChoice == 'paper') {
        playerOneWins++;
        playerTwoLosses++;

        $('.p1-stats').html('Wins: ' + playerOneWins + ' Losses: ' + playerOneLosses);
        $('.p2-stats').html('Wins: ' + playerTwoWins + ' Losses: ' + playerTwoLosses);

        $('#result').html('Player 1 Wins');

    }
    
    if (playerOneChoice == 'scissors' && playerTwoChoice == 'rock') {
        playerOneLosses++;
        playerTwoWins++;

        $('.p1-stats').html('Wins: ' + playerOneWins + ' Losses: ' + playerOneLosses);
        $('.p2-stats').html('Wins: ' + playerTwoWins + ' Losses: ' + playerTwoLosses);

        $('#result').html('Player 2 Wins');

    }

    countdown();

}

// 3 SECOND COUNTDOWN BETWEEN EACH ROUND
    // DISPLAY WHICH USER WON
var seconds = 3;
var intervalId;

function countdown() {
    seconds = 3;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    seconds--;

    if (seconds === 0) {
        stop();
        newRound();
    }
}

function stop() {
    clearInterval(intervalId);
}


// NEW ROUND AFTER 3 SECONDS
function newRound() {

    playerOneDiv.empty();
    playerTwoDiv.empty();

    $('.player-1-choice').show();
    $('.player-2-choice').show();

    $('#result').empty();

    userLock = false;
    opponentLock = false;
    
    userRpsLock = false;
    opponentRpsLock = false;

    countdown();

    database.ref().set({
        players: {
            One: {
                name: playerOneName,
                wins: playerOneWins,
                losses: playerOneLosses
            },
            Two: {
                name: playerTwoName,
                wins: playerTwoWins,
                losses: playerTwoLosses
            }
        }
    });


};




// function userOneData() {
//     database.ref().push({
//         playerOneName: playerOneName,
//         playerTwoName: playerTwoName,
//     });
// }