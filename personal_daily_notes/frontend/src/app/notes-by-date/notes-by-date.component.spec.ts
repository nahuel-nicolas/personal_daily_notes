import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesByDateComponent } from './notes-by-date.component';

describe('NotesByDateComponent', () => {
  let component: NotesByDateComponent;
  let fixture: ComponentFixture<NotesByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
