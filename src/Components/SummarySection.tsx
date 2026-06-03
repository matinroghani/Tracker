import styles from "../MainTracker.module.css";
import SummaryCards from "./SummaryCards";

export default function SummarySection() {
  return (
    <div className={styles.summaryCards}>
      <SummaryCards />
    </div>
  );
}
