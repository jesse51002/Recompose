// The brand brief, as a document.
//
// It gets its own tab rather than a card in the transcript because it IS a
// document — five fields of prose — and a 380px column is not where anyone
// reads one. The transcript keeps a short card that says a brief is ready and
// opens this.
//
// **There is one brief now.** A layout brief used to render beside this one,
// proposed by the same interview. The layout agent authors its own at the
// start of its run, having actually opened the generated images, so there is
// nothing for a person to approve here and nothing to show until it exists —
// at which point it is a file in the design folder, not a session record.

import type { SessionView } from '../studio/sessionFold';

import styles from './BriefSheet.module.css';

export function BriefSheet({ view }: { view: SessionView }) {
  // The LAST brief in the transcript, accepted or not: a revised proposal
  // supersedes the one before it, and showing the superseded one would be
  // showing a document nobody is going to act on.
  const brand = [...view.entries].reverse().find((e) => e.kind === 'brief');

  if (brand === undefined) {
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
