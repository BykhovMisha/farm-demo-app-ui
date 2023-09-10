import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "farm-header",
  standalone: true,
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {}
