import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateNoteComponent } from './create-note/create-note.component';
import { SearchCalendarComponent } from './search-calendar/search-calendar.component';
import { NotesByDateComponent } from './notes-by-date/notes-by-date.component';

const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: 'new', component: CreateNoteComponent },
  { path: 'search', component: SearchCalendarComponent },
  { path: 'search/:date', component:  NotesByDateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
