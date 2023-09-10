import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
  signal,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { Subscription } from "rxjs";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AnimalApiService } from "src/app/services/api";
import { AnimalModel, PageModel } from "src/app/models";
import { AnimalControlsComponent } from "../animal-controls/animal-controls.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AnimalEditModalComponent } from "../animal-edit-modal/animal-edit-modal.component";
import { AnimalEditModalData } from "../animal-edit-modal/animal-edit-modal-data";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "farm-animal-page",
  standalone: true,
  imports: [
    MatTableModule,
    AnimalControlsComponent,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  styleUrls: ["./animal-page.component.scss"],
  templateUrl: "./animal-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalPageComponent implements OnInit, OnDestroy {
  readonly #dialog: MatDialog = inject(MatDialog);
  readonly #apiService: AnimalApiService = inject(AnimalApiService);
  readonly #changeDetectorRef = inject(ChangeDetectorRef);
  readonly #subs = new Subscription();
  #getPageSub?: Subscription;

  @ViewChild("paginator")
  public paginator!: MatPaginator;
  public columns = ["name", "actions"];
  public pageSizeOptions = [1, 10, 50];
  public pageSize = 10;
  public name = "";
  public pageIndex = 0;

  public pageModel = signal(new PageModel<AnimalModel>());
  public isPageLoading = signal(false);
  public isActionApplying = signal(false);

  public ngOnInit(): void {
    this.getPage();
  }

  public ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  public getPage(): void {
    this.pageModel.set(new PageModel<AnimalModel>());
    this.#getPageSub?.unsubscribe();
    this.isPageLoading.set(true);
    this.#getPageSub = this.#apiService
      .getPage(this.pageSize, this.pageIndex, this.name)
      .subscribe({
        next: (page) => {
          this.isPageLoading.set(false);
          this.pageModel.set(page);
        },
        error: () => {
          this.isPageLoading.set(false);
        },
      });
  }

  public onPageChange(page: PageEvent): void {
    console.log(page);
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;
    this.getPage();
  }

  public onNameChange(name: string): void {
    this.name = name;
    this.pageIndex = 0;
    this.paginator.pageIndex = this.pageIndex;
    this.getPage();
  }

  public onEditAnimal(animal?: AnimalModel): void {
    const dialogRef = this.#dialog.open(AnimalEditModalComponent, {
      data: animal ? { ...animal } : { name: "" },
    });

    this.#subs.add(
      dialogRef.afterClosed().subscribe((data?: AnimalEditModalData) => {
        console.log(data);
        if (!data) {
          return;
        }

        this.editAnimal(data);
      }),
    );
  }

  public deleteAnimal(id: number): void {
    this.isActionApplying.set(true);
    this.#apiService.deleteAnimal(id).subscribe({
      next: () => {
        this.isActionApplying.set(false);
        if (this.pageModel().items.length === 1 && this.pageIndex > 0) {
          this.pageIndex = this.pageIndex - 1;
          this.paginator.pageIndex = this.pageIndex;
        }
        this.getPage();
      },
      error: () => {
        this.isActionApplying.set(false);
      },
    });
  }

  private editAnimal(data: AnimalEditModalData): void {
    this.isActionApplying.set(true);
    const action = data.id
      ? this.#apiService.updateAnimal(data.id, data.name)
      : this.#apiService.createAnimal(data.name);

    action.subscribe({
      next: () => {
        this.isActionApplying.set(false);
        this.getPage();
      },
      error: () => {
        this.isActionApplying.set(false);
      },
    });
  }
}
