import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AlertService } from "src/app/services/shared";
import { Alert, AlertType } from "src/app/models";

@Component({
  selector: "farm-alerts",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  public readonly alertService = inject(AlertService);
  public readonly AlertType = AlertType;

  public closeAlert(alert: Alert): void {
    this.alertService.removeAlert(alert);
  }
}
