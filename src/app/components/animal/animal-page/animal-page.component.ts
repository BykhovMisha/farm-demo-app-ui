import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { Subscription, Observable } from "rxjs";
import { AnimalApiService } from "src/app/services/api";
import { AnimalModel, PageModel } from "src/app/models";
import { AnimalControlsComponent } from "../animal-controls/animal-controls.component";
import { AnimalTableComponent } from "../animal-table/animal-table.component";

@Component({
  selector: "farm-animal-page",
  standalone: true,
  imports: [MatTableModule, AnimalControlsComponent, AnimalTableComponent],
  styleUrls: ["./animal-page.component.scss"],
  templateUrl: "./animal-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalPageComponent {
  readonly #apiService: AnimalApiService = inject(AnimalApiService);
  #getSubscription?: Subscription;

  public name = "";
  public page$: Observable<PageModel<AnimalModel>> = this.#apiService.getPage(
    0,
    10,
    this.name,
  );
  public totalCount = 0;

  public onNameChange(name: string): void {
    this.name = name;
  }

  public currentYear = new Date().getFullYear();
}
