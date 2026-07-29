// The order — the LAST screen of this flow.
//
// Its CTA `reset()`s to the asset root rather than stepping back through the
// item screens the customer already finished with. That is the package's rule
// for a terminal screen: the last screen of a flow returns to that flow's root,
// so a reviewer clicking through can never run out of road.

import { useMockNav } from '../../kit/MockNav';

import { useCafeOrder } from './cafeOrder';
import styles from './OrderScreen.module.css';

export function OrderScreen() {
  const nav = useMockNav();
  const { basket, total, clearBasket } = useCafeOrder();

  return (
    <div className={styles.screen}>
      <header className={styles.bar}>
        <button
          type="button"
          className={styles.back}
          onClick={() => {
            nav.back();
          }}
          aria-label="Back"
        >
          &lsaquo;
        </button>
        <h1 className={styles.title}>Your order</h1>
      </header>

      <ul className={styles.list}>
        {basket.map((item, index) => (
          // The basket may hold the same item twice, so the id alone is not a
          // key — position is what distinguishes two of the same coffee.
          <li key={`${item.id}-${String(index)}`} className={styles.row}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.price}>{item.price}</span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span className={styles.total}>{total}</span>
        </div>
        <button
          type="button"
          className={styles.place}
          onClick={() => {
            clearBasket();
            nav.reset();
          }}
        >
          Place order
        </button>
      </div>
    </div>
  );
}
