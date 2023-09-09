import { Injectable, inject } from "@angular/core";
import { Observable, tap, catchError, throwError, map, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AnimalApiService } from "src/app/services/api";
import { setIsPageLoading, setPage } from "./actions";

@Injectable({ providedIn: "root" })
export class AnimalStoreService {
  readonly #store = inject(Store);
  readonly #apiService = inject(AnimalApiService);

  public getPage(skip: number, take: number, name: string): Observable<void> {
    this.#store.dispatch(setIsPageLoading({ value: true }));
    return this.#apiService.getPage(skip, take, name).pipe(
      tap((page) => {
        this.#store.dispatch(setPage({ page }));
      }),
      catchError((error: unknown) => {
        this.#store.dispatch(setIsPageLoading({ value: false }));
        return throwError(() => error);
      }),
      map(() => {
        return;
      }),
    );
  }
}
