import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MessageDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
}
