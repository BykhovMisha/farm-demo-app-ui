import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/animal/animal-page").then(
        (x) => x.AnimalPageComponent,
      ),
  },
  { path: "**", redirectTo: "/" },
];
