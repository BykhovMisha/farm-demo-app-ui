import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  booleanAttribute,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Subscription, debounceTime } from "rxjs";

@Component({
  selector: "farm-animal-controls",
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  styleUrls: ["./animal-controls.component.scss"],
  templateUrl: "./animal-controls.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalControlsComponent implements OnInit, OnDestroy {
  @Input({ transform: booleanAttribute })
  public isActionApplying = false;

  @Output() public nameChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public addAnimal: EventEmitter<void> = new EventEmitter<void>();

  readonly #subs = new Subscription();
  public name = new FormControl("");

  public ngOnInit(): void {
    this.#subs.add(
      this.name.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.nameChange.emit(value ?? "");
      }),
    );
  }

  public ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  public onAddAnimal(): void {
    this.addAnimal.emit();
  }
}
