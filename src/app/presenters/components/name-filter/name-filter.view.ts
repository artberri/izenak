export interface INameFilterUserActions {
  onSearchInputChanged(): void;
}

export interface INameFilterMutations {
  applyResetFiltersMutation(): void;
  applyFilterByTermMutation(searchTerm: string): void;
}

export interface INameFilterView extends INameFilterMutations, INameFilterUserActions {
  searchTerm: string;
}
