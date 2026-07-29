// The brief, as a document.
//
// It gets its own tab rather than a card in the transcript because it IS a
// document — five fields of prose for the brand half, four for the layout —
// and a 380px column is not where anyone reads one. The transcript keeps a
// short card that says a brief is ready and opens this.
//
// Both halves render here, because both are briefs and a reviewer comparing
// them should not have to learn two layouts.

import type { SessionView } from '../studio/sessionFold';

import styles from './BriefSheet.module.css';

export function BriefSheet({ view }: { view: SessionView }) {
  // The LAST brief of each kind in the transcript, accepted or not: a revised
  // proposal supersedes the one before it, and showing the superseded one
  // would be showing a document nobody is going to act on.
  const brand = [...view.entries].reverse().find((e) => e.kind === 'brief');
  const layout = [...view.entries].reverse().find((e) => e.kind === 'layout');

  if (brand === undefined && layout === undefined) {
    return (
      <div className={styles.empty}>
        No brief yet. One appears here as soon as it has been written.
      </div>
    );
  }

  return (
    <div className={styles.sheet}>
      {brand?.kind === 'brief' && (
        <article className={styles.doc}>
          <Head title="Brand brief" state={brand.accepted ? 'accepted' : 'ready'} />
          <h2 className={styles.name}>{brand.brief.design_direction.name}</h2>
          <Field label="In a line">{brand.brief.design_direction.short_desc}</Field>
          <Field label="In full">{brand.brief.design_direction.long_desc}</Field>
          <Field label="Colour">{brand.brief.colors_direction.description}</Field>
          <Field label="Mode">{brand.brief.colors_direction.mode}</Field>
        </article>
      )}

      {layout?.kind === 'layout' && (
        <article className={styles.doc}>
          <Head
            title="Layout brief"
            state={layout.accepted ? 'accepted' : 'ready'}
          />
          <h2 className={styles.name}>{layout.brief.name}</h2>
          {/* Which theme this arranges AGAINST. Recorded in the artifact, not
              only in the code, so a generation's provenance never has to be
              guessed later. */}
          <Field label="Against">
            {layout.brief.app} · {layout.brief.theme_run}
          </Field>
          <Field label="Layout">{layout.brief.layout_direction.short_desc}</Field>
          <Field label="Layout, in full">
            {layout.brief.layout_direction.long_desc}
          </Field>
          <Field label="Motion">{layout.brief.motion_direction.short_desc}</Field>
          <Field label="Motion, in full">
            {layout.brief.motion_direction.long_desc}
          </Field>
        </article>
      )}
    </div>
  );
}

function Head({ title, state }: { title: string; state: string }) {
  return (
    <header className={styles.head}>
      <span>{title}</span>
      <span className={state === 'accepted' ? styles.ok : styles.you}>{state}</span>
    </header>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <p className={styles.value}>{children}</p>
    </div>
  );
}
