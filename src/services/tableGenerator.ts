export interface Row {
  id: number,
  name: string;
  cells: boolean[];
}

export const generateColumns = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numColumns = Math.floor(Math.random() * 99) + 2;
      const columns = Array.from({ length: numColumns }, (_, i) => `Обработка ${i + 1}`);
      resolve(columns);
    }, 1500);
  });
};

export const generateRows = (numColumns: number): Promise<Row[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numRows = Math.floor(Math.random() * 99) + 2;
      const rows = Array.from({ length: numRows }, (_, i) => ({
        id: i,
        name: `Заказ ${i + 1}`,
        cells: Array.from({ length: numColumns }, () => Math.random() >= 0.5)
      }));
      resolve(rows);
    }, 1500);
  });
};
