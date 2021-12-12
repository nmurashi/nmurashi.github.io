import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.css']
})
export class RpsComponent implements OnInit {
  gesture: String = "";
  prevGesture: String = "None";
  computerChoice: String = "";
  yourChoice: String = "";
  gameStatus: String = "";
  gameRunning: boolean = false;
  color: String = "bg-dark";
  //gestureChanged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    if (event.getPrediction() != this.prevGesture) {
      this.gesture = event.getPrediction();
      if (this.gesture == "Two Open Hands" && this.gameRunning == false) {
        this.color = "bg-dark";
        this.test();
        this.gameRunning = true;
      }
      else if (this.gesture == "Two Closed Hands" || this.gesture == "Two Hands Pinching") {
        window.location.href = '/';
      }
      this.prevGesture = this.gesture;
    }
  }

  test() {
    console.log("Hey!");
    setTimeout("console.log('Hey! Its been 4 seconds!')", 4000);

    var timeleft = 3;
    var downloadTimer = setInterval(function() {
      if(timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown")!.innerHTML = "Open both hands to play again!";
      } else {
        document.getElementById("countdown")!.innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
      }, 1000);
    
    setTimeout(this.computer.bind(this, this.computerChoice, this.yourChoice, this.gameStatus, this.gameRunning), 4000);
  }


  computer() {
    console.log("Computer called! Making choice...");
    const randomNumber = Math.floor(Math.random() * 3);
    const options: String[] = ["Rock", "Paper", "Scissors"];
    this.computerChoice = options[randomNumber];
    this.yourChoice = this.gesture == "Open Hand" ?
     "Paper" : (this.gesture == "Closed Hand" || this.gesture == "Hand Pinching") ?
      "Rock" : this.gesture == "Hand Pointing" ?
       "Scissors" : this.gesture;
    this.gameStatus = this.whoWon(this.computerChoice);
    this.gameRunning = false;
    console.log("yourChoice:", this.yourChoice, "and computerChoice:", this.computerChoice, " - options:", options[randomNumber]);    
  }

  whoWon(compChoice:String) {
    var stat: String = "";
    switch(this.gesture) {
      case "Open Hand":
        if (compChoice == "Paper")
          stat = "Tie"
        else if (compChoice == "Scissors")
          stat = "Lose"
        else
          stat = "Win"
        break;
      case "Closed Hand":
        if (compChoice == "Rock")
          stat = "Tie"
        else if (compChoice == "Paper")
          stat = "Lose"
        else
          stat = "Win"
        break;
      case "Hand Pointing":
        if (compChoice == "Scissors")
          stat = "Tie"
        else if (compChoice == "Rock")
          stat = "Lose"
        else
          stat = "Win"
        break;
      default:
        stat = "need to try again";
        break;
    }
    this.color = (stat == "Win") ? "bg-success" : (stat == "Lose") ? "bg-danger" : "bg-dark";
    return stat;    
  }

}


// prediction(event: PredictionEvent){
//   this.gesture = event.getPrediction();
//   if (this.gesture != "None") {
//     if (this.gameRunning == false) {
//       this.computer();
//     }
//     this.gameRunning = true;
//   }
//   this.gameRunning = this.gesture != "None" ? true : false;
// }