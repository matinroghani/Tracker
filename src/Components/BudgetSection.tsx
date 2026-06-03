import { useMemo } from "react";
import { useAppSelector } from "../Hooks/hooks";
import styles from "../MainTracker.module.css";

const categoryLabels: Record<string, string> = {
  dailyProvisions: "خوراکی",
  transportation: "حمل‌ونقل",
  basicCommodities: "کالای اساسی",
  maintenance: "تعمیرات",
};

const categoryColors: Record<string, string> = {
  dailyProvisions: "#6c5ce7",
  transportation: "#69e264",
  basicCommodities: "#4eb0d6",
  maintenance: "#e47ae7",
};

export default function BudgetSection() {
  const { transactionsList } = useAppSelector((state) => state.transactions);

  const categoryData = useMemo(() => {
    const expenses = transactionsList.filter(
      (t) => t.type === "expense" && t.category
    );

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const grouped = expenses.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, amount]) => ({
      category,
      amount,
      percent: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
    }));
  }, [transactionsList]);

  return (
    <div className={styles.budgetSection}>
      <h3>دسته‌بندی مخارج</h3>

      {categoryData.length > 0 ? (
        categoryData.map((item) => (
          <div className={styles.categoryItem} key={item.category}>
            <span>{categoryLabels[item.category] ?? item.category}</span>

            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: categoryColors[item.category] ?? "#999",
                }}
              ></div>
            </div>

            <span>{item.percent.toFixed(0)}٪</span>
          </div>
        ))
      ) : (
        <div className={styles.emptyState}>هنوز مخارجی ثبت نشده است.</div>
      )}
    </div>
  );
}
