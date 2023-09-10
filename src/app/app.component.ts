import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent, HeaderComponent } from "./components/layout";
import { AlertsComponent } from "./components/alerts/alerts.component";

@Component({
  selector: "farm-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AlertsComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
