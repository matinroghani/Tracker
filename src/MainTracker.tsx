import { useState } from "react";
import AddNewTransaction from "./Components/AddNewTransaction";
import BudgetSection from "./Components/BudgetSection";
import SummarySection from "./Components/SummarySection";
import TransactionSection from "./Components/TransactionSection";
import styles from "./MainTracker.module.css";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function MainTracker() {
  const [show, setShow] = useState(false);
   const todayShamsi = moment().format('jYYYY/jMM/jDD');
  const dayOfWeekShamsi = moment().format('dddd');


  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.welcomeText}>سلام، متین 👋</h2>
          <p className={styles.dateText}>امروز {dayOfWeekShamsi}، {todayShamsi}</p>
        </div>
        <button className={styles.actionButton} onClick={() => setShow(!show)}>
          + تراکنش جدید
        </button>
      </header>

      <SummarySection />

      <div className={styles.mainGrid}>
        <div className={styles.mainInfosWrapper}>
          <TransactionSection />
          <BudgetSection />
        </div>
        <div className={styles.newTransactionSection}>
          <AddNewTransaction />
        </div>
      </div>
    </div>
  );
}
