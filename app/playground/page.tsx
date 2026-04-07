import { SYSTEM_NAV, COMPONENT_NAV } from "./_nav";
import styles from "./page.module.css";

export const metadata = {
  title: "Goalgetr Design System",
  description: "Interactive component documentation and token reference",
};

export default function PlaygroundIndex() {
  return (
    <div className={styles.indexShell}>
      <header className={styles.indexHeader}>
        <h1>Goalgetr Design System</h1>
        <p>
          Interactive documentation for all reusable components, with live
          knobs, token references, and accessibility notes.
        </p>
      </header>

      {/* System pages */}
      <section className={styles.indexSection}>
        <h2 className={styles.indexSectionTitle}>System</h2>
        <ul className={styles.indexGrid}>
          {SYSTEM_NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={`${styles.indexCard} ${styles.indexCardSystem}`}>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Component pages */}
      <section className={styles.indexSection}>
        <h2 className={styles.indexSectionTitle}>Components</h2>
        <ul className={styles.indexGrid}>
          {COMPONENT_NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.indexCard}>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
