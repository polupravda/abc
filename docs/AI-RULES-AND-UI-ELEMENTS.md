# AI rules and UI elements

This document describes UI elements, their usage, and conventions for AI-assisted changes in this project.

---

## Voice and instructions

- **Instruction voice:** All spoken instructions (headline/task instructions) use a **male, en-US** voice. Implementation: `app/lib/speech.ts` exports `getInstructionVoice(voices)`; `InstructionButton` and any other instruction speech use it.
- **Single instruction speaker per page:** Each game page should have **one** way to hear the task instruction: the voice control **next to the headline** (see Headline + voice below). Do **not** add a separate "Play hint" or duplicate instruction button in the card body.
- **Hint vs instruction:**
  - **Instruction:** The main task text (e.g. "Which shape is missing?", "What is the sum?"). Shown in the headline and spoken via the button next to the headline. Use for **what the user should do**.
  - **Hint:** Optional **help** content (e.g. extra tips, how to use the game). Use for supplementary guidance, **not** for the primary task instruction. Do not use a full-width "Play hint" button for the same text as the headline instruction.

---

## Headline + voice button

- **Element:** `HeadlineInstruction` (`app/elements/HeadlineInstruction.tsx`).
- **Usage:** Top of a game board: main heading plus an optional **voice button** that speaks the instruction.
- **Props:**
  - `headlineText` (required): The visible heading and the text that can be spoken (e.g. "Continue the pattern. Which shape is missing?").
  - `instructionText` (optional): If provided, a speaker icon button is shown next to the headline; when clicked, it speaks this text using the app’s instruction voice (male, en-US). Usually same as `headlineText`.
  - `className`, `children`: optional.
- **Rules:**
  - Use one headline per game view.
  - Use `instructionText` when the user should be able to hear the task; keep headline and spoken text in sync (same wording).
  - Do not add a second, separate button in the card (e.g. "Play hint") that speaks the same instruction.

---

## Hint element

- **Concept:** “Hint” in this app means **help or supplementary guidance**, not the main task instruction.
- **Usage:**
  - Use for optional tips, clarifications, or “how to play” content.
  - Do **not** use a “Play hint” button to speak the same text as the headline instruction; that duplicates the headline voice button.
  - If a hint is spoken, it should be distinct from the main instruction (e.g. different copy or a separate, optional help flow).
- **Implementation:** There is no single “Hint” component. Use small text, tooltips, or an optional help section as needed. Do not add a second voice button that repeats the headline.

---

## Other UI elements (summary)

- **CardLight:** Light card container for game content (`app/elements/Card.tsx`). Use for the main task area.
- **Button:** Primary action button (`app/elements/Button.tsx`). Use for actions like “Check” or “Next”, not for instruction playback.
- **InstructionButton:** Shown **only** inside `HeadlineInstruction` when `instructionText` is set. Do not place a standalone “Play hint”/instruction button inside the card.
- **FeedbackSuccessAnimation / FeedbackFailure:** Full-screen or overlay feedback for correct/incorrect answers. Use consistently across games.
- **ShapeIcon, SHAPE_TYPES:** Shared shapes for logic/math games (`app/components/ShapeIcon.tsx`).

---

## General rules for AI

1. **One instruction, one voice control:** Each screen has one headline and at most one voice control for the task instruction (the one next to the headline).
2. **Headline and spoken text match:** `headlineText` and `instructionText` (when used) should convey the same instruction; keep wording identical so sighted and spoken users get the same task.
3. **Instruction voice:** Use the shared instruction voice (male, en-US) for all task instructions; use `getInstructionVoice` from `app/lib/speech.ts` when creating new `SpeechSynthesisUtterance` for instructions.
4. **No duplicate “Play hint” for instructions:** If the page already uses `HeadlineInstruction` with `instructionText`, do not add another button that speaks the same text.
5. **Consistency:** Follow existing patterns (e.g. Ordinal Numbers, Continue pattern) for layout: HeadlineInstruction above, CardLight with content below, feedback overlays as in other games.
