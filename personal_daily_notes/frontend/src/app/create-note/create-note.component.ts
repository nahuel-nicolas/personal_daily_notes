import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
  }

  add(body: string): void {
    body = body.trim();
    if (!body) { return; }
    this.backendService.addNote({ body } as Note).subscribe(
      note => console.log(`create-note add handler`)
    );
  }
}
