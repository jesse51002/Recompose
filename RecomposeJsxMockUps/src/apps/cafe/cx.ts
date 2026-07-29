// A LOCAL COPY of ../combatden/cx.ts, byte-identical below the header.
//
// Duplicated rather than shared for the same reason that one is duplicated from
// the studio's: eleven lines is cheaper than a dependency, and an app folder
// that imports a sibling app folder is the edge this structure exists to
// prevent. `src/kit/` may not import `src/apps/` (eslint Gate 1), and an app
// reaching sideways into another app would be worse — it would make deleting
// one app break another.
//
// IF A THIRD APP NEEDS THIS, promote it to `src/kit/`. `cx` genuinely is
// app-agnostic; two copies is the cheapest correct answer, three is a signal.

export type ClassValue = string | false | null | undefined;

/** Joins the truthy class names. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
