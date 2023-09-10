import { Injectable, signal, computed } from "@angular/core";
import { Alert } from "src/app/models";

@Injectable({ providedIn: "root" })
export class AlertService {
  readonly #alers = signal<Alert[]>([]);
  public readonly alerts = computed(this.#alers);

  public addAlert(alert: Alert, timeout = 5000): void {
    this.#alers.mutate((alerts) => alerts.push(alert));
    setTimeout(() => this.removeAlert(alert), timeout);
  }

  public removeAlert(alert: Alert): void {
    this.#alers.update((alerts) => alerts.filter((x) => x !== alert));
  }
}
