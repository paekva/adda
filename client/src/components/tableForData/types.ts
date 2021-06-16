export type DataTableProps = {
  scheme: Scheme;
  data: RowData[] | null;
  onRowClick?: (rowId: number, custom: boolean) => void
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
