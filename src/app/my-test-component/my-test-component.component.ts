import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { timer, fromEvent, interval, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  filter,
  mapTo,
  map,
  tap,
  pluck
} from "rxjs/operators";

import { ajax } from "rxjs/ajax";
import { ApiCallServiceService } from "../shared/services/api-call-service.service";

import { Country } from "../shared/models/country";

@Component({
  selector: "app-my-test-component",
  templateUrl: "./my-test-component.component.html",
  styleUrls: ["./my-test-component.component.css"]
})
export class MyTestComponentComponent implements OnInit {
  //constructor() {}
  constructor(private apiService: ApiCallServiceService) {}
  //apiService: ApiCallServiceService;

  public currentNumber = 0;
  public CountryList: Country[];
  public CountrySearchResult: Country[];

  ngOnInit(): void {
    fromEvent(document, "click")
      .pipe(scan(count => count + 1, 0))
      .subscribe(count => console.log(`Clicked ${count} times`));

    this.GetCountries();
    const searchBox = document.getElementById("search-box");

    const typeahead = fromEvent(searchBox, "input").pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => this.apiService.SearchCountry(searchTerm))
    );

    typeahead.subscribe(data => {
      this.CountryList = data;
      //console.log(data);
      // Handle the data from the API
    });
  }
  GetCountries() {
    this.apiService.GetCountries().subscribe((data: Country[]) => {
      this.CountryList = data;
    });
  }
}
