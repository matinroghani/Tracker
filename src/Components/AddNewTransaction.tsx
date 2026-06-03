import { useState } from "react";
import styles from "../MainTracker.module.css";
import { DatePicker } from "react-persian-range-picker";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Store/store";
import type { Transaction } from "../types";
import { v4 as uuidv4 } from "uuid";
import { addTransaction } from "../Features/TransactionsSlice";

export default function AddNewTransaction() {
  const dispatch: AppDispatch = useDispatch();

  const [date, setDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleAddNewTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      id: uuidv4(),
      title,
      type,
      amount,
      category,
      date,
    };

    dispatch(addTransaction(newTransaction));

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("expense");
    setDate(new Date());
  };

  return (
    <>
      <div className={styles.sectionHeader}>
        <h3>تراکنش جدید</h3>
      </div>
      <form
        className={styles.transactionForm}
        onSubmit={handleAddNewTransaction}
      >
        <div className={styles.formGroup}>
          <label htmlFor="transactionType">نوع تراکنش</label>
          <select
            id="transactionType"
            value={type}
            className={styles.inputField}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="expense">هزینه</option>
            <option value="income">درآمد</option>
            <option value="savings">پس انداز</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="transactionDescription">عنوان تراکنش</label>
          <textarea
            id="transactionDescription"
            className={styles.inputField}
            placeholder="مثلا خرید از سوپر مارکت..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="transactionAmount">مبلغ</label>
          <input
            type="number"
            id="transactionAmount"
            className={styles.inputField}
            placeholder="مبلغ را وارد کنید"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="transactionCategory">دسته‌بندی</label>
          <select
            id="transactionCategory"
            className={styles.inputField}
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "dailyProvisions"
                  | "transportation"
                  | "basicCommodities"
                  | "maintenance"
              )
            }
            required
          >
            <option value="" disabled>-- یک دسته‌بندی انتخاب کنید --</option>
            <option value="dailyProvisions">خوراکی روزمره</option>
            <option value="transportation">حمل و نقل</option>
            <option value="basicCommodities">کالای اساسی</option>
            <option value="maintenance">تعمیرات</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="transactionDate">تاریخ</label>
          <DatePicker
            value={date}
            onChange={(val) => setDate(val as Date)}
            calendar="persian"
            placeholder="تاریخ را انتخاب کنید"
          />
        </div>

        <button type="submit" className={styles.actionButton}>
          افزودن تراکنش
        </button>
      </form>
    </>
  );
}
