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

## Gradients (pills and buttons)

- **Reference:** `InstructionButton` uses `ButtonIcon`, which applies gradients to the button and icon wrapper.
- **Rules:**
  - Use **`bg-gradient-to-br`** (bottom-right) for pill and button fills instead of flat `bg-*`.
  - Use **two shades** in the gradient: `from-{color}-* to-{color}-*` (e.g. `from-indigo-500 to-indigo-700`, `from-amber-300 to-amber-500`). The second stop is typically darker (higher number or darker hex).
  - **Hover (optional):** For interactive buttons, hover can use a different direction (e.g. `hover:bg-gradient-to-r`) and slightly darker stops (e.g. `hover:from-purple-500 hover:to-purple-700`) for feedback.
- **Where applied:** Scoreboard (`ScoreDisplay`), `NumberPill`, instruction/action buttons (`ButtonIcon`, `Button`). Use the same gradient pattern for any new pill or primary button so the UI stays consistent.

---

## Number input

- **Element:** `NumberInput` (`app/elements/NumberInput.tsx`).
- **Usage:** All numeric input fields (answers, dimensions, etc.). Use this component instead of raw `<input type="number">` so styling and behaviour are consistent.
- **Props:**
  - **size:** `"S"` | `"M"` | `"L"` – preset sizes for wrapper, input, and stepper. Default `"M"`.
  - **className:** Optional Tailwind classes for the **wrapper** (overrides default wrapper styles when provided).
  - **inputClassName:** Optional Tailwind classes for the **input** element (overrides default input size/colour when provided).
  - **showStepper:** `boolean` – show kid-friendly up/down arrow buttons (default `true`).
  - Plus standard number input props: `value`, `onChange`, `onKeyDown`, `onBlur`, `min`, `max`, `step`, `disabled`, `maxLength`, `aria-label`, `ref`, etc.
- **Rules:**
  - Use **NumberInput** for every number input in the app; do not use raw `<input type="number">`.
  - Prefer **size** `S` / `M` / `L` for consistency; use **className** or **inputClassName** only when you need a custom look (e.g. huge headline-style input in MathProblem).
  - Keep **showStepper** `true` so kids can change the value with the up/down arrows.
  - Pass **ref** when the parent needs to focus the input (e.g. after feedback).

---

## Ready button (verify solution)

- **Element:** `ReadyButton` (`app/elements/ReadyButton.tsx`).
- **Usage:** Whenever the user must **verify their problem solution** (submit answer, check result). Use this component so the control is unified across games.
- **Appearance:** A button with a **checkmark icon** (Font Awesome) and the text **"I am ready"**. Below the button, **center-aligned** hint text: **"Or press Enter button"**.
- **Behaviour:** The same handler should run on button click and when the user presses Enter in the associated input (e.g. in math games). Pass that handler as `onClick`. Disable the button when feedback is showing (e.g. `disabled={isFeedbackShowing}`).
- **Rules:**
  - Use **ReadyButton** for all "check my answer" / "submit answer" actions in games. Do not use a generic "Check" or "Check Answer" button without the checkmark and the "Or press Enter button" hint.
  - Keep the label **"I am ready"** and the hint **"Or press Enter button"** so behaviour is consistent and discoverable.
  - Ensure the game also handles **Enter** in the input (or main control) to trigger the same verification logic.

---

## Other UI elements (summary)

- **CardLight:** Light card container for game content (`app/elements/Card.tsx`). Use for the main task area.
- **Button:** Primary action button (`app/elements/Button.tsx`). Use for actions like “Check” or “Next”, for verifying the user's answer use **ReadyButton** instead.
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
6. **Number inputs:** Use the shared `NumberInput` component (`app/elements/NumberInput.tsx`) for all numeric fields; do not use raw `<input type="number">`. Use size S/M/L or className/inputClassName for custom styling. Keep kid-friendly up/down stepper visible unless there is a strong reason to hide it.
7. **Verify solution:** Use the **ReadyButton** component for the action that checks/submits the user’s answer. It shows a checkmark, "I am ready", and "Or press Enter button". Handle Enter in the input (or main control) to run the same verification logic.
8. **Null/zero in games UI:** In game UI, **null** or **undefined** must always be displayed as **0**. Use `toDisplayNumber(value)` (for numbers) or `toDisplayValue(value)` (for string | number) from `app/lib/utils.ts` when rendering scores, pill values, problem operands, slider values, or any other numeric display. Do not render null/undefined as empty or "null"; always show 0.

---

## Learn vs Game (activity types)

- **Learn (variant="learn")**: Concept exploration/teaching. May be interactive, but does not require a correctness check and does not change score.
  - Do not use `ReadyButton`.
  - Prefer clear instructions and demonstrations; optional light interactions without pass/fail feedback.
  - No points added/subtracted in `ScoreContext`.
- **Game**: Practice activity with correctness and scoring.
  - Must provide a way to verify correctness (clicking options or `ReadyButton`).
  - Uses success/failure feedback and updates score via `ScoreContext`.
  - Follow headline + single voice control pattern; use `ReadyButton` for answer submission when applicable.
