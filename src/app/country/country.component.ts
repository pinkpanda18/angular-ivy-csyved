import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { fromEvent } from "rxjs";
import { scan, throttleTime } from "rxjs/operators";
import { Country } from "../shared/models/country";

@Component({
  selector: "app-country",
  templateUrl: "./country.component.html",
  styleUrls: ["./country.component.css"]
})
export class CountryComponent implements OnInit {
  constructor() {}
  CountrySearchForm : FormGroup;
  country!: Country;

  ngOnInit() {
    this.InitForm();
    fromEvent(document, 'click')
      .pipe(
         //throttleTime(1000),
         scan(count => count + 1, 0)
        )

      .subscribe(()=> 
        count => console.log(`Clicked ${count} times`)
        );
  }

  onSubmit(FormData): void {
    if(!this.CountrySearchForm.valid){
      alert("Form is invalid!");
    }
    const newcountry = new Country();
    newcountry.name = FormData.name;
    newcountry.code = FormData.countrycode;
    this.country = newcountry;
  }
  onReset(): void {
    //aside from the reset type, lets reset it on the event itself just incase the type has been modified in html
    this.CountrySearchForm.reset();
    this.country = null;
  }

  private InitForm(){
    this.CountrySearchForm = new FormGroup({
      name: new FormControl("", Validators.required),
      countrycode: new FormControl('',[Validators.required, Validators.minLength(3)])
    });

  }
}
