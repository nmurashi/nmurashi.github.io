import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-quickdraw',
  templateUrl: './quickdraw.component.html',
  styleUrls: ['./quickdraw.component.css']
})
export class QuickdrawComponent implements OnInit {
  gesture: String = "";
  prevGesture: String = "None";
  gameStatus: String = "";
  gameRunning: boolean = false;
  color:String = "bg-dark";
  intervalId: any; // used for an interval in test()
  timeoutId: any; // used for a timeout in test()

  constructor() { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    if (event.getPrediction() != this.prevGesture) {
      this.gesture = event.getPrediction();
      //if ((this.gesture == "Hand Pointing" || this.gesture == "Closed Hand") && this.gameRunning == false && (this.prevGesture == "Hand Pointing" || this.prevGesture == "Closed Hand")) { // Closed Hand in case they point right at the camera
      if (this.gesture == "Open Hand" && this.gameRunning == false) {
        console.log("Hey you're doing", this.gesture)
        this.test(Math.floor(Math.random() * 6) + 6);
        this.gameRunning = true;
      }
      else if ((this.gesture == "Hand Pointing" || this.gesture == "Closed Hand" || this.gesture ==  "Hand Pinching") && this.gameRunning) { // stop if you trigger too early
        this.gameRunning = false;
        this.gameStatus = "Lose";
        this.color = "bg-danger";
        document.getElementById("countdown")!.innerHTML = "Too quick! <br/> Wave to play again!";
        clearInterval(this.intervalId); // end the interval
        clearTimeout(this.timeoutId); // end the timeout
      }
      else if (this.gesture == "Two Closed Hands" || this.gesture == "Two Hands Pinching") {
        window.location.href = '/';
      }
      this.prevGesture = this.gesture;
    }
  }

  test(randomNumber: number) {
    console.log("Hey!");
    console.log("randomNumber:", randomNumber);

    setTimeout("console.log('Hey! Its been idk seconds!')", randomNumber * 1000);
    var timeleft = randomNumber;
    this.color = "bg-dark";
    var self = this;
    var downloadTimer = setInterval(function() {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
      } 
      else if (timeleft == randomNumber) {
        document.getElementById("countdown")!.innerHTML = "Steady";
      }
      else if (timeleft > 2) {
        document.getElementById("countdown")!.innerHTML += ".";
      }
      else if (timeleft == 2) {
        self.gameRunning = false;
        document.getElementById("countdown")!.innerHTML = "Fire!";
      }
      else {
        console.log("Fired!")
      }
      timeleft -= 1;
      }, 1000);
    this.intervalId = downloadTimer; 
    console.log("randomNumber:", randomNumber);
    this.timeoutId = setTimeout(this.computer.bind(this, this.gameStatus, this.gameRunning), (randomNumber - 0.25) * 1000); // 0.25 can be changed, greater for more difficulty, nothing for easy mode
  }

  computer() {
    this.gameRunning = false;
    console.log("Computer called! Making choice...");
    this.gameStatus = this.whoWon();
  }

  whoWon() {
    if (this.gesture == "Hand Pointing" || this.gesture == "Closed Hand" || this.gesture ==  "Hand Pinching") {
      document.getElementById("countdown")!.innerHTML = "Well done! <br/> Wave to play again!";
      this.color = "bg-success";
      return "Win";
    }
    else {
      document.getElementById("countdown")!.innerHTML = "Not quite... <br/> Wave to play again!";
      this.color = "bg-danger";
      return "Lose";
    }
  }

}