import { Component, OnInit } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { BackendService } from '../backend.service';

import { 
  date_to_yyyymmddString, 
  yyyymmddString_to_date 
} from '../date_string_functions'

interface FetchedDate {
  extremeDates: any; // E.g. "2022-05-28"
}

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-search-calendar',
  templateUrl: './search-calendar.component.html',
  styleUrls: ['./search-calendar.component.scss']
})
export class SearchCalendarComponent implements OnInit {
  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.getDates() 
  }

  fetchedDates: keyable = {};
  minDate: Date = new Date();
  maxDate: Date = new Date();
  selectedDate: Date = new Date();

  getDates(): void {
    this.backendService.getDates().subscribe(fetchedDates => {
      this.fetchedDates = fetchedDates;
      this.updateExtremeDates();
    });
  }

  date_to_yyyymmddString(date: Date): string {
    return date_to_yyyymmddString(date);
  }

  updateExtremeDates(): void {
    this.minDate = yyyymmddString_to_date(this.fetchedDates["extremeDates"][0])
    this.maxDate = yyyymmddString_to_date(this.fetchedDates["extremeDates"][1])
    this.selectedDate = this.maxDate
  }

  datesFilter(d: Date | null): boolean {
    const currentDate = d || new Date();
    const currentDateString = date_to_yyyymmddString(currentDate);
    const isFilterPassed = currentDateString in this.fetchedDates;
    return isFilterPassed;
  };

  boundDatesFilter = this.datesFilter.bind(this);
}