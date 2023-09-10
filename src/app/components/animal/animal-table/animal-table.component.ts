import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  inject,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { AnimalModel, PageModel } from "src/app/models";
import { AnimalControlsComponent } from "../animal-controls/animal-controls.component";

function getDefaultPageModel(): PageModel<AnimalModel> {
  return new PageModel<AnimalModel>({
    totalCount: 0,
    items: [],
  });
}

function toAnimalModel(
  model?: PageModel<AnimalModel> | null,
): PageModel<AnimalModel> {
  return model ? model : getDefaultPageModel();
}

@Component({
  selector: "farm-animal-table",
  standalone: true,
  imports: [
    MatTableModule,
    AnimalControlsComponent,
    CommonModule,
    MatPaginatorModule,
  ],
  styleUrls: ["./animal-table.component.scss"],
  templateUrl: "./animal-table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalTableComponent {
  @Input({ transform: toAnimalModel })
  public pageModel: PageModel<AnimalModel> = getDefaultPageModel();

  @ViewChild("paginator")
  public paginator!: MatPaginator;
  public columns = ["name"];

  #changeDetectorRef = inject(ChangeDetectorRef);
}
