export interface Transaction {
  readonly id: string;
  title: string;
  type: "income" | "expense" | "savings";
  amount: number;
  category: string;
  date: Date | null;
}
