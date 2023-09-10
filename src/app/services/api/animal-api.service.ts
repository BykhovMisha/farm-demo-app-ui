import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { AnimalDto, PageDto } from "src/app/dtos";
import { AnimalModel, PageModel } from "src/app/models";
import { API_URL } from "src/injection-token";

@Injectable({ providedIn: "root" })
export class AnimalApiService {
  readonly #httpClient: HttpClient;
  readonly #apiUrl = inject(API_URL);

  get #serviceUrl(): string {
    return `${this.#apiUrl}/animals`;
  }

  public constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient;
  }

  public getPage(
    pageSize: number,
    pageIndex: number,
    name: string,
  ): Observable<PageModel<AnimalModel>> {
    const skip = pageSize * pageIndex;
    const take = pageSize;

    return this.#httpClient
      .get<PageDto<AnimalDto>>(this.#serviceUrl, {
        params: { skip, take, name },
      })
      .pipe(
        map(
          (page) =>
            new PageModel({
              ...page,
              items: page.items.map((x) => new AnimalModel(x)),
            }),
        ),
      );
  }

  public createAnimal(name: string): Observable<void> {
    return this.#httpClient.post<void>(this.#serviceUrl, { name });
  }

  public updateAnimal(id: number, name: string): Observable<void> {
    return this.#httpClient.put<void>(`${this.#serviceUrl}/${id}`, { name });
  }

  public deleteAnimal(id: number): Observable<void> {
    return this.#httpClient.delete<void>(`${this.#serviceUrl}/${id}`);
  }
}
