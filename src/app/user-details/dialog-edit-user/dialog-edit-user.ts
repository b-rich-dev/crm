import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User as UserModel } from '../../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.html',
  styleUrl: './dialog-edit-user.scss',
})
export class DialogEditUser {
  loading = false;
  dialogRef = inject(MatDialogRef<DialogEditUser>);
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: UserModel }) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveData(): void {
    this.loading = true;

    if (this.data.user.id) {
      const userDocRef = doc(this.firestore, 'users', this.data.user.id);
      updateDoc(userDocRef, this.data.user.toJSON()).then(() => {
        this.loading = false;
        this.dialogRef.close();
      }).catch((error) => {
        console.error('Error updating user:', error);
        this.loading = false;
      });
    } else {
      console.error('User ID is missing, cannot update user');
      this.loading = false;
    }
  }
}
