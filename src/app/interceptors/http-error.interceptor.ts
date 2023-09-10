import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Alert, AlertType } from "../models";
import { AlertService } from "../services/shared";

interface FarmHttpError {
  messages?: string[];
}

export const httpErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const alertService = inject(AlertService);

  return next(request).pipe(
    catchError((errorResponse: unknown) => {
      if (!(errorResponse instanceof HttpErrorResponse)) {
        alertService.addAlert(createAlert("Unknown error"));
        return throwError(() => errorResponse);
      }

      const error = errorResponse.error as FarmHttpError;

      switch (errorResponse.status) {
        case 400: {
          const message = getAlertMessage("Bad Request", error.messages);
          alertService.addAlert(createAlert(message));
          break;
        }
        case 404: {
          const message = getAlertMessage("Not Found", error.messages);
          alertService.addAlert(createAlert(message));
          break;
        }
        case 500: {
          alertService.addAlert(createAlert("Internal Server Error"));
          break;
        }
        default: {
          alertService.addAlert(createAlert("Unknown error"));
          break;
        }
      }

      return throwError(() => errorResponse);
    }),
  );
};

const createAlert = (message: string): Alert =>
  new Alert({ message, type: AlertType.Warning });

const getAlertMessage = (
  defaultMessage: string,
  messages?: string[],
): string => {
  if (messages && messages.length > 0) {
    return messages.join("\n");
  }

  return defaultMessage;
};
