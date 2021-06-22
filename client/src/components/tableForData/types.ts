export type DataTableProps = {
  scheme: Scheme;
  data: RowData[] | null;
  onRowClick?: (rowId: number, custom: boolean) => void
  highlightRowOn?: (data: RowData) => boolean
};

export type RowData = {
  [key: string]: any;
};

export type Scheme = {
  [key: string]: {
    label?: string;
    formatter?: (value: any) => any;
    renderer?: (data: RowData, rowNumber: number) => JSX.Element;
    width?: number;
  };
};
