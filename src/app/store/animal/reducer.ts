import { createReducer, on } from "@ngrx/store";
import { AnimalState, animalAdapter, animalInitialState } from "./state";
import {
  createAnimal,
  deleteAnimal,
  getPage,
  setIsActionApplying,
  setIsPageLoading,
  setPage,
  updateAnimal,
} from "./actions";

export const animalReducer = createReducer(
  animalInitialState,
  on(getPage, (state): AnimalState => {
    return {
      ...state,
      page: {
        ...state.page,
        isLoading: true,
      },
    };
  }),
  on(setPage, (state, { page }): AnimalState => {
    return {
      ...state,
      page: {
        totalCount: page.totalCount,
        items: animalAdapter.setAll(page.items, state.page.items),
        isLoading: false,
      },
    };
  }),
  on(setIsPageLoading, (state, { value }): AnimalState => {
    return { ...state, page: { ...state.page, isLoading: value } };
  }),
  on(createAnimal, updateAnimal, deleteAnimal, (state): AnimalState => {
    return { ...state, isActionApplying: true };
  }),
  on(setIsActionApplying, (state, { value }): AnimalState => {
    return { ...state, isActionApplying: value };
  }),
);
