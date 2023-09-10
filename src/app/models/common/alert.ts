import { AlertType } from "./alert-type";

export class Alert {
  public type: AlertType;
  public message: string;

  public constructor(alert: Partial<Alert> & Pick<Alert, "message">) {
    this.type = alert.type ?? AlertType.Success;
    this.message = alert.message;
  }
}
