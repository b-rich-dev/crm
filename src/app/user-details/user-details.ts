import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { User as UserModel } from '../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditAddress } from './dialog-edit-address/dialog-edit-address';
import { DialogEditUser } from './dialog-edit-user/dialog-edit-user';

@Component({
  selector: 'app-user-details',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private cdr = inject(ChangeDetectorRef);

  user: UserModel | null = null;
  userId: string | null = null;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      const userDoc = doc(this.firestore, 'users', this.userId);
      docData(userDoc, { idField: 'id' }).subscribe((userData: any) => {
        if (userData) {
          this.user = new UserModel(userData);
          this.cdr.detectChanges(); // Manuell Change Detection triggern
        }
      });
    }
  }

  editUser() {
    this.dialog.open(DialogEditUser, {
      data: { user: this.user }
    });
  }

  editAddress() {
    this.dialog.open(DialogEditAddress, {
      data: { user: this.user }
    });
  }
}
