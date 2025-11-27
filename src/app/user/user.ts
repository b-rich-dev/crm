import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUser } from './dialog-add-user/dialog-add-user';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { User as UserModel } from '../models/user.class';

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class User {
  firestore: Firestore = inject(Firestore);
  allUsers: UserModel[] = [];
  private cdr = inject(ChangeDetectorRef);

  constructor(public dialog: MatDialog) {}

  openDialog(){
    this.dialog.open(DialogAddUser);
  }

  ngOnInit(): void {
    const aCollection = collection(this.firestore, 'users')
    collectionData(aCollection, { idField: 'id' }).subscribe((data: any[]) => {
      this.allUsers = data.map(userData => new UserModel(userData));
      this.cdr.detectChanges(); // Manuell Change Detection triggern
    });
  }
}
