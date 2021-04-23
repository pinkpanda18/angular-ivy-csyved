import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"]
})
export class TimerComponent implements OnInit {
  constructor() {}

  public currentNumber = 0;
  ngOnInit() {
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);

    // Subscribe to begin publishing values
    const subscription = secondsCounter.subscribe(n => {
      const compute = n + 1;
      this.currentNumber = compute % 2 == 0 ? 100 : compute;
    });
  }
}
