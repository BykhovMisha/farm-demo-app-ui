import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { AnimalModel } from "src/app/models";

export const animalAdapter = createEntityAdapter<AnimalModel>({
  selectId: (x) => x.id,
});

export interface AnimalState {
  page: {
    totalCount: number;
    items: EntityState<AnimalModel>;
    isLoading: boolean;
  };
  isActionApplying: boolean;
}

export const animalInitialState: AnimalState = {
  page: {
    totalCount: 0,
    items: animalAdapter.getInitialState(),
    isLoading: false,
  },
  isActionApplying: false,
};
