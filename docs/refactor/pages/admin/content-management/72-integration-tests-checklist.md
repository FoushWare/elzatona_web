# 72 — Integration Tests Checklist (RTL)

## Rendering

- [ ] Page renders.
- [ ] Loading -> loaded.
- [ ] Error -> error UI + retry behavior (if any).

## Search & filters

- [ ] Typing in search reduces cards/plans shown.

## Cards flow

- [ ] Expand/collapse card.
- [ ] Delete card confirmation -> service called -> list refresh.

## Plans flow

- [ ] Expand/collapse plan.
- [ ] Open plan cards modal.
- [ ] Add card to plan -> UI updates.

## Questions assignment

- [ ] Open topic questions modal.
- [ ] Select questions -> submit -> assignment reflected.

## Missing parts checklist

- [ ] Confirm stable DOM hooks (data-testid) needed for robust tests.
