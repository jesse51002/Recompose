// The café's demo content. Constants, like every other app in this package —
// NO fetching, ever (../../../CLAUDE.md).
//
// Nothing here is a customization slot. It is the content a tenant's own
// catalogue would supply, held fixed so a redesign is judged against stable
// data rather than against whatever a backend happened to return.

export interface CafeItem {
  readonly id: string;
  readonly name: string;
  /** Menu section this belongs to, in the order sections should appear. */
  readonly section: string;
  readonly price: string;
  readonly blurb: string;
  /**
   * How the card's art is drawn — there is no bundled image and no generated
   * slot, so each item names a CSS treatment built from the palette instead.
   * A picture that cannot come from the theme has no business pretending to.
   */
  readonly art: 'ring' | 'wedge' | 'stack' | 'dot';
}

export const CAFE_SECTIONS: readonly string[] = Object.freeze([
  'Espresso',
  'Filter',
  'Kitchen',
]);

export const CAFE_MENU: readonly CafeItem[] = Object.freeze([
  {
    id: 'flat-white',
    name: 'Flat White',
    section: 'Espresso',
    price: '4.20',
    blurb: 'Double ristretto, steamed whole milk, no foam to speak of.',
    art: 'ring',
  },
  {
    id: 'cortado',
    name: 'Cortado',
    section: 'Espresso',
    price: '3.80',
    blurb: 'Equal parts espresso and milk, served in glass.',
    art: 'dot',
  },
  {
    id: 'long-black',
    name: 'Long Black',
    section: 'Espresso',
    price: '3.40',
    blurb: 'Two shots pulled over hot water. Nothing else.',
    art: 'wedge',
  },
  {
    id: 'batch',
    name: 'Batch Brew',
    section: 'Filter',
    price: '3.00',
    blurb: 'Whatever is on today, ground coarse and brewed by the litre.',
    art: 'stack',
  },
  {
    id: 'pourover',
    name: 'Pour Over',
    section: 'Filter',
    price: '5.50',
    blurb: 'Single origin, made to order. Takes about four minutes.',
    art: 'ring',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    section: 'Filter',
    price: '4.60',
    blurb: 'Steeped overnight, poured over a single large cube.',
    art: 'dot',
  },
  {
    id: 'sourdough',
    name: 'Sourdough Toast',
    section: 'Kitchen',
    price: '6.00',
    blurb: 'Thick cut, cultured butter, sea salt on the side.',
    art: 'stack',
  },
  {
    id: 'pastry',
    name: 'Morning Pastry',
    section: 'Kitchen',
    price: '4.80',
    blurb: 'Baked here before open. Ask what came out.',
    art: 'wedge',
  },
]);

/** The items in one section, in menu order. */
export function itemsInSection(section: string): readonly CafeItem[] {
  return CAFE_MENU.filter((item) => item.section === section);
}

/** One item by id, or the first — the same forgiving lookup the kit's registry uses. */
export function itemOrFirst(id: string | null): CafeItem {
  return CAFE_MENU.find((item) => item.id === id) ?? CAFE_MENU[0]!;
}
