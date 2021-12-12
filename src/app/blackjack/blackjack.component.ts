import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  gesture: String = "";
  prevGesture: String = "None";
  computerChoice: String = "";
  yourChoice: String = "";
  gameStatus: String = "";
  gameRunning: boolean = false;
  color: String = "bg-dark";

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
    const randomNumber = Math.floor(Math.random() * 2);
    const options: String[] = ["Hit", "Hold"];
    this.computerChoice = options[randomNumber];
    this.yourChoice = this.gesture == "Open Hand" ?
     "Hold" : this.gesture == "Closed Hand" ?
      "Hit" : this.gesture == "Hand Pointing" ?
       "Hit" : this.gesture;
    this.gameStatus = this.whoWon(this.computerChoice);
    this.gameRunning = false;
    console.log("yourChoice:", this.yourChoice, "and computerChoice:", this.computerChoice, " - options:", options[randomNumber]);    
  }

  whoWon(compChoice:String) {
    switch(this.gesture) {
      case "Open Hand":
        this.color = "bg-success";
        return "Win";
        break;
      case "Closed Hand":
        this.color = "bg-danger";
        return "Lose";
        break;
      case "Hand Pointing":
        this.color = "bg-dark";
        return "Tie";
        break;
      default:
        return "need to try again";
    }
    
  }

}