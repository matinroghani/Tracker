import { useAppSelector } from "../Hooks/hooks";
import styles from "../MainTracker.module.css";

export default function SummaryCards() {
  const totalInventory = useAppSelector((state) =>
    state.transactions.transactionsList.reduce((total, item) => {
      if (item.type === "income") return total + item.amount;
      if (item.type === "expense") return total - item.amount;
      return total ;
    }, 85000000),
  );
  const totalSavings = useAppSelector((state) =>
    state.transactions.transactionsList.reduce((total, item) => {
      if (item.type === "savings") return total + item.amount;
      return total;
    }, 0),
  );

  const todayExpense = useAppSelector((state) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.transactions.transactionsList
      .filter((item) => {
        if (!item.date) return false;
        const transactionDate = new Date(item.date);
        transactionDate.setHours(0, 0, 0, 0);
        return (
          transactionDate.getTime() === today.getTime() &&
          item.type === "expense"
        );
      })
      .reduce((total, item) => total + item.amount, 0);
  });

  return (
    <>
      <div className={`${styles.card} ${styles.balanceCard}`}>
        <div className={styles.cardIcon}>💰</div>
        <div className={styles.cardContent}>
          <span className={styles.cardTitle}>موجودی کل</span>
          <h3 className={styles.cardAmount}>
            {totalInventory >= 0 ? totalInventory.toLocaleString() : 0}
            <small>تومان</small>
          </h3>
        </div>
      </div>

      <div
        className={`${styles.card}`}
        style={{
          background:
            todayExpense > 1500000
              ? "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)" 
              : todayExpense >= 500000
                ? "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)" 
                : "linear-gradient(135deg, #059669 0%, #10b981 100%)", 
        }}
      >
        <div className={styles.cardIcon}>📉</div>
        <div className={styles.cardContent}>
          <span className={styles.cardTitle}>هزینه‌های امروز</span>
          <h3 className={styles.cardAmount}>
            {todayExpense} <small>تومان</small> 
          </h3>
          <span className={styles.cardTrendWarning}>
            {todayExpense > 1500000
              ? "بسیار بیشتر از حد معمول"
              : todayExpense >= 500000
                ? "بیش از حد معمول"
                : "در حد معمول"}
          </span>
        </div>
      </div>

      <div className={`${styles.card} ${styles.savingsCard}`}>
        <div className={styles.cardIcon}>🏦</div>
        <div className={styles.cardContent}>
          <span className={styles.cardTitle}>پس‌انداز ماهانه</span>
          <h3 className={styles.cardAmount}>
            {totalSavings} <small>تومان</small>
          </h3>
        </div>
      </div>
    </>
  );
}
