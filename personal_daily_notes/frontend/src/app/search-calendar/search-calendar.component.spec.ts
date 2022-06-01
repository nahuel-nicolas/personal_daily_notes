import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCalendarComponent } from './search-calendar.component';

describe('SearchCalendarComponent', () => {
  let component: SearchCalendarComponent;
  let fixture: ComponentFixture<SearchCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
