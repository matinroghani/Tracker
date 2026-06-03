import { useAppSelector } from "../Hooks/hooks";
import styles from "../MainTracker.module.css";
import type { Transaction } from "../types";
import moment from "moment-jalaali";

const categoryLabels: Record<string, string> = {
  dailyProvisions: "خوراکی روزمره",
  transportation: "حمل و نقل",
  basicCommodities: "کالای اساسی",
  maintenance: "تعمیرات",
  basicIncome: "درآمد کلی",
};

export default function TransactionSection() {
  const { transactionsList } = useAppSelector((state) => state.transactions);

  return (
    <div className={styles.transactionSection}>
      <div className={styles.sectionHeader}>
        <h3>تراکنش‌های اخیر</h3>
        <button className={styles.viewAll}>مشاهده همه</button>
      </div>

      <div className={styles.transactionList}>
        {transactionsList.length > 0 ? (
          transactionsList.map((item: Transaction) => {
            const displayDate = item.date
              ? moment(item.date).format("jYYYY/jMM/jDD")
              : "---";

            return (
              <div className={styles.transactionItem} key={item.id}>
                <div className={styles.transactionIcon}>
                  {item.type === "income" ? "💰": item.type === "savings" ? "🏦"  : "🛒"}
                </div>
                <div className={styles.transactionInfo}>
                  <h4>{item.title}</h4>
                  <small>
                    {displayDate} •{" "}
                    {categoryLabels[item.category] ?? item.category}
                  </small>
                </div>
                <div
                  className={`${styles.amount} ${
                    item.type === "income"
                      ? styles.amountIncome
                      : item.type === "savings"
                      ? styles.amountSavings
                        : styles.amountExpense
                  }`}
                >
                  {item.type === "income" ? "+" : item.type === "savings" ? "" : "-"}
                  {item.amount?.toLocaleString() ?? 0}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>هیچ تراکنشی یافت نشد.</div>
        )}
      </div>
    </div>
  );
}
