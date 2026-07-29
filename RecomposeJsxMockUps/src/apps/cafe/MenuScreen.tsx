// The menu — the asset's root screen.
//
// A GRID, deliberately. CombatDen's home is a vertical schedule list because a
// gym day is a sequence; a café menu is a set you scan, so this is two columns
// under section headings. It is the clearest way to show that the kit imposes
// no arrangement: same stage, same nav, same theming, completely different
// shape.

import { useMockNav } from '../../kit/MockNav';

import type { CafeItem } from './cafeMenu';
import { CAFE_SECTIONS, itemsInSection } from './cafeMenu';
import { useCafeOrder } from './cafeOrder';
import { ROUTE_ITEM, ROUTE_ORDER } from './routes';
import { ItemArt } from './ItemArt';
import styles from './MenuScreen.module.css';

export function MenuScreen() {
  const nav = useMockNav();
  const { openItemNamed, basket, total } = useCafeOrder();

  const open = (item: CafeItem) => {
    openItemNamed(item.id);
    nav.go(ROUTE_ITEM);
  };

  return (
    <div className={styles.screen}>
      <header className={styles.bar}>
        <span className={styles.brand}>Today</span>
        <span className={styles.sub}>Open until 4</span>
      </header>

      <div className={styles.body}>
        {CAFE_SECTIONS.map((section) => (
          <section key={section} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section}</h2>
            <div className={styles.grid}>
              {itemsInSection(section).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.card}
                  onClick={() => {
                    open(item);
                  }}
                >
                  <ItemArt art={item.art} />
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.price}>{item.price}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* The basket bar is the ONLY way to the order screen, and it is hidden
          when the basket is empty — which is fine rather than a dead end,
          because the order screen has nothing to show then and every card here
          is still a way forward. */}
      {basket.length > 0 && (
        <button
          type="button"
          className={styles.basket}
          onClick={() => {
            nav.go(ROUTE_ORDER);
          }}
        >
          <span>
            {basket.length} item{basket.length === 1 ? '' : 's'}
          </span>
          <span className={styles.basketTotal}>{total}</span>
        </button>
      )}
    </div>
  );
}
