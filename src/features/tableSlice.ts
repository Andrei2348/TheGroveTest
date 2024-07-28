import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Row } from '../services/tableGenerator' 

export interface Obj {
  status: boolean;
  rowId: number | null;
  selectedCol: number | null;
}

interface TableState {
  columns: string[];
  rows: Row[];
  isOpen: boolean;
  obj: Obj;
}

const initialState: TableState = {
  columns: [],
  rows: [],
  isOpen: false,
  obj: {
    status: false,
    rowId: null,
    selectedCol: null,
  },
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  
  reducers: {
    openModal: (state, action: PayloadAction<{ index: number; rowId: number; value: boolean }>) => {
      state.isOpen = true;
      state.obj.status = action.payload.value;
      state.obj.rowId = action.payload.rowId;
      state.obj.selectedCol = action.payload.index;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.obj.status = false;
      state.obj.rowId = null;
      state.obj.selectedCol = null;
    },
    setColumnsAndRows: (state, action: PayloadAction<{ columns: string[], rows: Row[] }>) => {
      state.columns = action.payload.columns;
      state.rows = action.payload.rows;
    },
    addRow: (state) => {
      const lastObjectNumber = state.rows.slice(-1)[0]?.id || 0;
      const newRow: Row = {
        id: lastObjectNumber + 1,
        name: `Заказ ${lastObjectNumber + 2}`,
        cells: Array.from({ length: state.columns.length }, () => Math.random() >= 0.5),
      };
      state.rows.push(newRow);
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
      state.isOpen = false;
      state.obj.status = false;
      state.obj.rowId = null;
      state.obj.selectedCol = null;
    },
    updateRowStatus: (state, action: PayloadAction<{ rowId: number; colIndex: number; status: boolean }>) => {
      console.log(state.obj.rowId)
      const row = state.rows.find(row => row.id === state.obj.rowId);
      // const row = state.rows.find(row => row.id === action.payload.rowId);
      console.log(row)
      if (row && action.payload.colIndex !== null) {
        row.cells[action.payload.colIndex] = !action.payload.status;
      }
    },
  },
});

export const { setColumnsAndRows, addRow, deleteRow, updateRowStatus, openModal, closeModal } = tableSlice.actions;

export const selectTableData = (state: RootState) => state.table;

export default tableSlice.reducer;
