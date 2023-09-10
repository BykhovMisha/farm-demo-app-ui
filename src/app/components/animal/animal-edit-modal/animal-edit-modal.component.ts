import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import { AnimalEditModalData } from "./animal-edit-modal-data";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "farm-animal-table",
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: "./animal-edit-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalEditModalComponent {
  public constructor(
    public dialogRef: MatDialogRef<AnimalEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnimalEditModalData,
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public editAnimal(): void {
    this.dialogRef.close(this.data);
  }
}
