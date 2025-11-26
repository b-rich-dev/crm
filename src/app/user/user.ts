import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUser } from './dialog-add-user/dialog-add-user';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {

  constructor(public dialog: MatDialog) {}

  openDialog(){
    this.dialog.open(DialogAddUser);
  }
}
