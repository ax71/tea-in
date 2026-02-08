interface ICart {
  menuItemId: string;
  quantity: number;
  notes?: string;
}

interface IOrder {
  id: string;
  customer_name: string;
  table_number: number;
  cart: ICart[];
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  total: number;
}

export type { IOrder, ICart };
