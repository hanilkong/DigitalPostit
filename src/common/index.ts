export type PostitStatusT = "NONE" | "ALREADY" | "SELECTED";
export interface PostitDataI {
  row: number;
  col: number;
  id: string;
  mediaArt: string;
  selectMode: PostitStatusT;
  index: number;
  postitColor: string;
  description: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}
export const white = "#FFFFFF";
export const primaryOrange = "#F96D41";
export const ongoing2 = "#C3DBFE";
export const error = "#B72E2A";
export const postitBlue = "#1B87C4";
export const gray6 = "#7D8389";
export const initPostit = (row: number, col: number): PostitDataI => ({
  row,
  col,
  index: 0,
  id: "",
  mediaArt: "",
  description: "",
  createdAt: 0,
  updatedAt: 0,
  createdBy: "",
  postitColor: "rgba(255, 255, 255, 0.25)",
  selectMode: "NONE",
});
export const postitMap = {
  col: 20,
  row: 71,
};
export const initPostitArr = (col = postitMap.col, row = postitMap.row) =>
  Array.from(Array(col), (_col, colIndex) =>
    Array(row)
      .fill(0)
      .map((_row, rowIndex) => initPostit(colIndex, rowIndex))
  );
