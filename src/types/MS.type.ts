export type MSCellLocation = { row: number; col: number };
export type MSCellSurroundingLocations =
  | 'tl'
  | 'tm'
  | 'tr'
  | 'ml'
  | 'mr'
  | 'bl'
  | 'bm'
  | 'br';
export type MSCellSurroundings = {
  [key in MSCellSurroundingLocations]?: boolean;
};

export type MSGameOverEvent = CustomEvent<MSCellLocation>;
export type MSWinEvent = CustomEvent<undefined>;
export type MSCellRevealSurroundingsEvent = CustomEvent<{
  location: MSCellLocation;
  surroundingEmptyCells: MSCellSurroundingLocations[];
}>;
