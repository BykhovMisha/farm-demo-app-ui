import { createSelector } from "@ngrx/store";
import { AppState } from "../state";
import { AnimalState, animalAdapter } from "./state";

const selectAnimalState = (state: AppState): AnimalState => state.animalState;
const { selectEntities } = animalAdapter.getSelectors();

export const select = createSelector(selectAnimalState, (state) =>
  selectEntities(state.page.items),
);

export const selectAnimalCount = createSelector(
  selectAnimalState,
  (state) => state.page.totalCount,
);

export const selectAnimalIsPageLoading = createSelector(
  selectAnimalState,
  (state) => state.page.isLoading,
);

export const selectIsAnimalActionApplying = createSelector(
  selectAnimalState,
  (state) => state.isActionApplying,
);
