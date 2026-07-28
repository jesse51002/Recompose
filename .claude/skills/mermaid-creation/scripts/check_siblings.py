#!/usr/bin/env python3
"""Verify a Mermaid flowchart obeys the sibling rule: every edge connects two
boxes that share the same direct parent (root, or the same subgraph).

Usage:
    python3 check_siblings.py graph.mmd
    python3 check_siblings.py README.md      # extracts the first ```mermaid block

Exit code 0 = clean (0 violations), 1 = violations found, 2 = usage/parse error.
Also flags illegal `direction LR` — allowed inside a leaf subgraph, never at top level
or in a subgraph that nests another (see illegal_lr).
"""
import re
import sys


def extract(text: str) -> str:
    """Return the mermaid source: a fenced ```mermaid block if present, else the
    whole file."""
    m = re.search(r"```mermaid\n(.*?)\n```", text, re.S)
    return m.group(1) if m else text


def parents(lines):
    """Map every declared node/subgraph id -> its direct parent id ('root' or a
    subgraph id)."""
    parent, stack = {}, ["root"]

    def decl(nid, par):
        parent.setdefault(nid, par)

    for raw in lines:
        s = raw.strip()
        m = re.match(r"subgraph\s+([A-Za-z0-9_]+)", s)
        if m:
            decl(m.group(1), stack[-1])
            stack.append(m.group(1))
            continue
        if s == "end":
            if len(stack) > 1:
                stack.pop()
            continue
        if s.startswith(("%%", "classDef", "class ", "style ", "direction", "flowchart", "graph ")):
            continue
        # node declarations of the form  ID["label"] / ID(label) / ID{label}.
        # Consume the WHOLE bracketed label so words inside it (e.g. a label that
        # mentions "FastApiBackend (live)") are NOT mistaken for new node ids.
        for nid in re.findall(
            r"(?<![A-Za-z0-9_])([A-Za-z0-9_]+)\s*(?:\[[^\]]*\]|\([^)]*\)|\{[^}]*\})", s
        ):
            decl(nid, stack[-1])
    return parent


def illegal_lr(lines):
    """Return the scopes where `direction LR` is NOT permitted.

    House rule (amended 2026-07-28): the OUTER flow is always top-down, but
    `direction LR` is allowed inside a **leaf subgraph** — one that contains only
    plain nodes and no nested subgraph. Laying a handful of leaf nodes out
    horizontally keeps a long vertical chart inside the rule-10 aspect ratio;
    the thing the original ban existed to prevent was wrapping *tiers* of
    systems in LR, which sprawls past 10000px. That case is still illegal.

    Illegal = `direction LR` at the top level, or in a subgraph that has a
    nested subgraph inside it.
    """
    has_child, stack, lr_scope = set(), ["root"], []
    for raw in lines:
        s = raw.strip()
        m = re.match(r"subgraph\s+([A-Za-z0-9_]+)", s)
        if m:
            has_child.add(stack[-1])          # the enclosing scope owns a subgraph
            stack.append(m.group(1))
            continue
        if s == "end":
            if len(stack) > 1:
                stack.pop()
            continue
        if s.startswith("direction") and "LR" in s:
            lr_scope.append(stack[-1])
    return [sc for sc in lr_scope if sc == "root" or sc in has_child]


# edge forms: A --> B | A -.-> B | A --- B | A ~~~ B, each with optional |label|
EDGE = re.compile(r"([A-Za-z0-9_]+)\s*(?:-\.->|-->|---|~~~)(?:\|[^|]*\|)?\s*([A-Za-z0-9_]+)")
# Mermaid inline-text dashed form:  A -. "txt" .-> B
EDGE_TXT = re.compile(r'([A-Za-z0-9_]+)\s*-\.\s*"[^"]*"\s*\.->\s*([A-Za-z0-9_]+)')


def edges(lines):
    for raw in lines:
        s = raw.strip()
        if s.startswith(("subgraph", "end", "%%", "classDef", "class ", "style ",
                         "direction", "flowchart", "graph ")):
            continue
        s2 = re.sub(r"\[[^\]]*\]", "", s)  # strip [labels] so words inside don't match
        if not any(t in s2 for t in ("--", "~~", "-.")):
            continue
        for a, b in EDGE.findall(s2) + EDGE_TXT.findall(s2):
            yield a, b


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    text = open(sys.argv[1], encoding="utf-8").read()
    src = extract(text)
    lines = src.splitlines()

    bad_lr = illegal_lr(lines)
    if bad_lr:
        print(f"⚠️  {len(bad_lr)}× illegal `direction LR` — allowed only inside a LEAF "
              f"subgraph (one containing no nested subgraph). Offending scope(s): "
              f"{', '.join(bad_lr)}.")

    if "~~~" in src:
        n = src.count("~~~")
        print(f"⚠️  {n}× `~~~` found — Mermaid 10+ only; it BLANKS Mermaid-9 previewers "
              f"(GitHub / VS Code Markdown-Mermaid / Obsidian). Stack items as a single node "
              f"with <br/> lines instead.")

    parent = parents(lines)
    violations, total = [], 0
    for a, b in edges(lines):
        total += 1
        pa, pb = parent.get(a, "??"), parent.get(b, "??")
        if pa != pb:
            violations.append((a, pa, b, pb))

    print(f"edges checked: {total}")
    if violations:
        print(f"❌ {len(violations)} sibling-rule violation(s) — endpoints with different parents:")
        for a, pa, b, pb in violations:
            print(f"   {a} (parent={pa})  ->  {b} (parent={pb})")
        return 1
    print("✓ no violations — every arrow connects siblings (same parent).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
