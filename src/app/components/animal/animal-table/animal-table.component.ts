import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { AnimalModel } from "src/app/models";
import { AnimalControlsComponent } from "../animal-controls/animal-controls.component";

@Component({
  selector: "farm-animal-table",
  standalone: true,
  imports: [MatTableModule, AnimalControlsComponent],
  styleUrls: ["./animal-table.component.scss"],
  templateUrl: "./animal-table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalTableComponent {
  @Input() public animals: AnimalModel[] = [];
  @Input() public totalCount = 0;
  public columns = ["name"];
}
