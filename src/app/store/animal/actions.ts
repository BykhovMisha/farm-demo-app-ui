import { createAction, props } from "@ngrx/store";
import { PageModel, AnimalModel } from "src/app/models";

export const getPage = createAction(
  "[Animal] Get Page",
  props<{ skip: number; take: number; name: string }>(),
);

export const setPage = createAction(
  "[Animal] Set Page",
  props<{ page: PageModel<AnimalModel> }>(),
);

export const setIsPageLoading = createAction(
  "[Animal] Set is page loading",
  props<{ value: boolean }>(),
);

export const createAnimal = createAction(
  "[Animal] Create Animal",
  props<{ name: string }>(),
);

export const updateAnimal = createAction(
  "[Animal] Update Animal",
  props<{ id: number; name: string }>(),
);

export const deleteAnimal = createAction(
  "[Animal] Delete Animal",
  props<{ id: number }>(),
);

export const setIsActionApplying = createAction(
  "[Animal] Set is action applying",
  props<{ value: boolean }>(),
);

export type AnimalActionTypes =
  | typeof getPage
  | typeof setPage
  | typeof setIsPageLoading
  | typeof createAnimal
  | typeof updateAnimal
  | typeof deleteAnimal
  | typeof setIsActionApplying;
