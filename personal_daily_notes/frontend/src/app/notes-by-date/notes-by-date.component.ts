import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../backend.service';

import { Note } from '../note';

import { 
  date_to_yyyymmddString, 
  yyyymmddString_to_date 
} from '../date_string_functions'

@Component({
  selector: 'app-notes-by-date',
  templateUrl: './notes-by-date.component.html',
  styleUrls: ['./notes-by-date.component.scss']
})
export class NotesByDateComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getNotesByDate()
    console.log(this.currentDateString)
  }

  currentDateString: string | null = this.activatedRoute.snapshot.paramMap.get('date');
  notes: Array<Note> = [];

  getNotesByDate(): void {
    this.backendService.getNotesByDate(this.currentDateString)
      .subscribe(notes => {
        this.notes = notes
        this.improveNotesCreationDatetimeReadability()
      });
  }

  improveNotesCreationDatetimeReadability(): void {
    for (const currentNote of this.notes) {
      const currentNoteCreationDatetime = new Date(currentNote.creation_datetime);
      const currentNoteCreationDatetimeStringUTC = parseISOStringToReadableDatetimeString(currentNote.creation_datetime);
      const currentNoteCreationDatetimeStringLocal = dateToReadableDatetimeString(currentNoteCreationDatetime);
      currentNote.utc_creation_datetime = currentNoteCreationDatetimeStringUTC;
      currentNote.local_creation_datetime = currentNoteCreationDatetimeStringLocal;
    }
  }
}

function parseISOStringToReadableDatetimeString(ISOString: string): string {
  // Pass a ISOStringDate and return its UTCStringDatetime
  var ISOStringSplitted: Array<any> = ISOString.split(/\D+/);
  const dateString = ISOStringSplitted[0]+'-'+ISOStringSplitted[1]+'-'+ISOStringSplitted[2];
  const timeString = ISOStringSplitted[3] + ":" + ISOStringSplitted[4] + ":" + ISOStringSplitted[5];
  const dateTimeString = dateString+' '+timeString;
  return dateTimeString
}

function dateToReadableDatetimeString(date: Date): string {
  // Pass a Date object and return its LocalStringDatetime
  const dateString = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  const timeString = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const dateTimeString = dateString+' '+timeString;
  return dateTimeString
}
