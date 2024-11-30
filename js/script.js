class Player {
    constructor(die1Value = 0, die2Value = 0, score = 0) {
        this.die1Value = die1Value;
        this.die2Value = die2Value;
        this.score = score;
        this.totalScore = 0;
    }
    
    rollDie() { //roll die and find score
        this.die1Value = Math.round(Math.random() * 5 + 1);
        this.die2Value = Math.round(Math.random() * 5 + 1);
        
        //find score
        if (this.die1Value < 1 || this.die2Value < 1 || 
            this.die1Value > 6 || this.die2Value > 6) { //error
            this.score = NaN;
        }
        else if (this.die1Value == 1 || this.die2Value == 1) {
            this.score = 0;
        }
        else if (this.die1Value == this.die2Value) {
            this.score = (this.die1Value + this.die2Value) * 2;
        }
        else {
            this.score = this.die1Value + this.die2Value;
        }

        //calculate total score
        this.totalScore += this.score;
    }
}


let personPlayer = new Player();
let compPlayer = new Player();
let timesClicked = 0;



$("#dice_button").on("click", function(){

    if(timesClicked < 3) {
        personPlayer.rollDie();
        compPlayer.rollDie();
        
        $("#player_score_text").children().remove();
        $("#player_score_text").append(`
        <p>You Rolled: <img src="./img/dieTile00${personPlayer.die1Value}.png" alt="dieTile00${personPlayer.die1Value}">,  <img src="./img/dieTile00${personPlayer.die2Value}.png" alt="dieTile00${personPlayer.die2Value}">
        </p><p>Your Score: <b>${personPlayer.score}</b></p>
        <p><b>Your Total Score: ${personPlayer.totalScore}</b></p>`);

        $("#comp_score_text").children().remove();
        $("#comp_score_text").append(`
        <p>Computer Rolled: <img src="./img/dieTile00${compPlayer.die1Value}.png" alt="dieTile00${compPlayer.die1Value}">,  <img src="./img/dieTile00${compPlayer.die2Value}.png" alt="dieTile00${compPlayer.die2Value}">
        </p><p>Computer's Score: <b>${compPlayer.score}</b></p>
        <p><b>Computer's Total Score: ${compPlayer.totalScore}</b></p>`)

        timesClicked ++;
    }
    else {
        //$("#end_message_section").css("display", "block");
        $("#end_message_section").fadeIn(500, "linear");

        if(timesClicked > 4) {
            return
        }
        else {
            $("#end_message").children().remove();
        }

        if((personPlayer.totalScore > compPlayer.totalScore)) {
            $("#end_message").append("<b>You won!</b>");
            timesClicked ++;
        }
        else if((personPlayer.totalScore < compPlayer.totalScore)) {
            $("#end_message").append("<b>You lost...</b>");
            timesClicked ++;
        }
        else {

        }
    }
    
});

$("#new_game_button").on("click", function() {
    timesClicked = 0;
    personPlayer = new Player();
    compPlayer = new Player();

    $("#player_score_text").children().remove();
    $("#player_score_text").append(`
    <p>You Rolled: </p>
    <p>Your Score: </p>
    <p><b>Your Total Score: </b></p>`);

    $("#comp_score_text").children().remove();
    $("#comp_score_text").append(`
    <p>Computer Rolled: </p>
    <p>Computer's Score: </p>
    <p><b>Computer's Total Score: </p>`)

    $("#end_message_section").css("display", "none");
})

