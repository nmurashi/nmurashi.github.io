import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  prevGesture: String = "None";
  constructor() { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    if (event.getPrediction() != this.prevGesture) {
      this.gesture = event.getPrediction();
      if (this.gesture == "One Open One Closed") {
        window.location.href = '/rps';
      }
      else if (this.gesture == "One Open One Point") {
        window.location.href = '/quickdraw';
      }
      this.prevGesture = this.gesture;
    }
  }

}