// One item, opened from the menu.
//
// TWO WAYS OFF THIS SCREEN, both wired: Back returns to the menu, and Add puts
// the item in the basket and returns there too. The package's own rule is that
// no screen may be a dead end, and the failure mode it warns about is a
// rendered affordance with no handler — which typechecks and lints cleanly, so
// nothing but walking the asset can catch it.

import { useMockNav } from '../../kit/MockNav';

import { useCafeOrder } from './cafeOrder';
import { ItemArt } from './ItemArt';
import styles from './ItemScreen.module.css';

export function ItemScreen() {
  const nav = useMockNav();
  const { openItem, addToBasket } = useCafeOrder();

  return (
    <div className={styles.screen}>
      <div className={styles.heroWrap}>
        <ItemArt art={openItem.art} size="hero" />
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
      </div>

      <div className={styles.body}>
        <span className={styles.section}>{openItem.section}</span>
        <h1 className={styles.title}>{openItem.name}</h1>
        <p className={styles.blurb}>{openItem.blurb}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>{openItem.price}</span>
        <button
          type="button"
          className={styles.add}
          onClick={() => {
            addToBasket(openItem);
            nav.back();
          }}
        >
          Add to order
        </button>
      </div>
    </div>
  );
}
