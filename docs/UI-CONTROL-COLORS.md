# UI control colors

Colors used in UI controls only (buttons, scoreboard, cards, toggles, pills, form inputs, overlays, menu labels). Not game assets (e.g. shapes, rocket, number visualizers).

---

## Custom hex

| Hex       | Use |
|-----------|-----|
| **#375B25** | Scoreboard: pill background, focus ring offset |
| **#D88C28** | Scoreboard: score badge background, reset button focus ring |
| **#13220C** | Scoreboard: score number text |
| **#DB034B** | GameMenu: “Games” label (red) on menu card |

---

## Tailwind colors (by component)

### Scoreboard (`ScoreDisplay`)
- Pill: `#375B25` (see Custom hex)
- Score badge: `#D88C28`, text `#13220C`
- Label & reset icon: `text-white`, `text-white/90` hover
- Focus: `ring-[#D88C28]`, `ring-offset-[#375B25]`

### Buttons (`Button`, `ButtonIcon`, `ButtonSpeak`)
- Button body: `from-purple-400 to-purple-600`, hover `from-purple-500 to-purple-700`, `text-purple-300`
- Icon wrapper: `from-amber-400 to-amber-600`
- Icon: `text-white`
- Label (Button): `text-white`

### NumberPill
- Pill: `bg-indigo-600`, `text-white`
- Inner value badge: `bg-amber-300`, `text-indigo-900`

### Which Picture Number pill (in-game)
- Pill: `bg-indigo-600`, `text-white`
- Badge: `bg-amber-300`, `text-indigo-900`

### Cards
- **CardLight**: `from-blue-100 to-indigo-200`

### Toggle
- Panel: `bg-indigo-100`, hover `bg-indigo-200`
- Title: `text-slate-800`
- Chevron: `text-slate-600`
- Border: `border-indigo-200`
- Focus: `focus:ring-indigo-400`

### Choice / answer buttons (multiple game boards)
- Default: `bg-white`, `border-indigo-300`, hover `border-indigo-500`, `hover:bg-indigo-50`
- Focus: `focus:ring-indigo-400`
- Disabled: `disabled:opacity-50`

### LetterCard (default)
- Base gradient: `from-rose-300 to-rose-400`
- Text: `text-sky-950`
- Focus: `focus:ring-rose-400`
- Selected: `from-violet-400 to-violet-500`, `ring-violet-500`

### HeadlineInstruction
- Title: `text-sky-950`

### MathProblem (inputs / labels)
- Text: `text-sky-950`, `text-sky-900`
- Input border: `border-indigo-500`, focus `border-indigo-300`

### FailureOverlay
- Backdrop: `bg-neutral-800` (with opacity)
- Message: `text-red-400`

### FeedbackAnimation (correct/incorrect modal)
- Correct: `bg-green-50`, `text-green-600`, `border-green-200`
- Incorrect: `bg-red-50`, `text-red-600`, `border-red-200`
- Backdrop: `bg-black/10`

### BouncingMicrophone
- Backdrop: `bg-black/10`
- Card: `bg-white`
- Ping: `bg-red-500`
- Mic icon: `text-red-500`
- Text: `text-blue-800`
- Button: `bg-white`, `text-slate-700`

### Slider
- Label: `text-sky-950`

### GameMenu (card labels only – UI text)
- Various: `text-amber-500`, `text-[#DB034B]`, `text-fuchsia-100`, `text-cyan-400`, `text-lime-400`, `text-emerald-400`, `text-sky-300`, `text-neutral-100`
- Icon: `text-neutral-100`

### GameBoardWhichPictureNumber – prompt pill
- Same as NumberPill: `indigo-600`, `amber-300`, `indigo-900`

### GameBoardPlusMinusNumber – number input container
- `bg-white`, `border-indigo-300`, hover `border-indigo-500`, `hover:bg-indigo-50`, `focus:ring-indigo-400`

### GameBoardMultiplication – inputs
- Input: `bg-white`, `border-sky-200`, `text-sky-900`, `focus:ring-sky-400`
- Table cell (UI): `bg-blue-900`, `border-blue-950`

### GameBoardContinuePattern – choice buttons & labels
- Choice button: same as “Choice / answer buttons” above (`white`, `indigo-300/500/50`, `ring-indigo-400`)
- Pattern label: `text-sky-800`
- Wrong label: `text-red-500`
- Option label: `text-sky-900`

### GameBoardOrdinalNumbers
- Same choice button pattern; ordinal label `text-sky-800`, `text-sky-900`

### GameBoardLetterSoundMatch
- Prompt: `text-yellow-400`

### NumberPictureGrid (selected state)
- Selected: `bg-pink-400`, `border-pink-500`
- Unselected: `bg-amber-300`, `border-amber-400`

### ShapeArrayRow (shape icon in UI)
- Icon: `text-indigo-500`

### GamePageLayout
- Main: `bg-white`

### GameBoardBlending – overlay & button
- Overlay: `bg-white/80`
- Overlay text: `text-gray-800`
- Input: `text-fuchsia-950`
- Button (generic): uses shared button styles elsewhere

---

## Summary palette (Tailwind tokens)

| Token | Typical UI use |
|-------|----------------|
| **indigo-50, 100, 200, 300, 400, 500, 600, 900** | Cards, toggles, choice buttons, pills, borders, focus rings |
| **amber-300, 400, 500, 600** | Icon wrappers, NumberPill badge, menu accents |
| **purple-300–700** | Primary action buttons (gradient) |
| **rose-300, 400** | LetterCard default gradient, focus |
| **violet-400, 500** | LetterCard selected state |
| **sky-800, 900, 950** | Headlines, labels, inputs, slider |
| **slate-600, 800** | Toggle text |
| **white** | Buttons, cards, inputs, overlays |
| **red-400, 50, 600** | Failure/incorrect feedback, wrong answer |
| **green-50, 600** | Correct feedback |
| **blue-100, 800, 950** | Card gradient, BouncingMicrophone text, table cell |
| **neutral-800** | Failure overlay backdrop |
| **black/10** | Backdrop overlays |
| **pink-400, 500** | NumberPictureGrid selected |
| **fuchsia-100, 950** | Menu label, Blending input |
| **yellow-400** | LetterSoundMatch prompt |
| **gray-300, 800** | Blending overlay |

---

## Custom hex summary

- **#375B25** – Scoreboard green (pill, ring offset)
- **#D88C28** – Scoreboard amber (badge, focus ring)
- **#13220C** – Scoreboard score text
- **#DB034B** – GameMenu “Games” red label

---

## Score panel – suggested palettes (4c3aed, f9d455, 9440f3, df8e10)

Pick one set and use it in `ScoreDisplay.tsx` for pill, badge, score text, and focus ring.

### Option A – Indigo pill + gold badge (recommended)
- **Pill background:** `#4c3aed` (indigo)
- **“Score:” + reset icon:** `text-white` (already good contrast on #4c3aed)
- **Score badge background:** `#f9d455` (gold)
- **Score number text:** `#1a0b2e` (dark purple, readable on gold)
- **Focus ring:** `#f9d455`, **ring offset:** `#4c3aed`

### Option B – Violet pill + orange badge
- **Pill background:** `#9440f3` (violet)
- **“Score:” + reset icon:** `text-white`
- **Score badge background:** `#df8e10` (orange)
- **Score number text:** `#1a0b2e`
- **Focus ring:** `#df8e10`, **ring offset:** `#9440f3`

### Option C – Indigo pill + orange badge
- **Pill background:** `#4c3aed`
- **“Score:” + reset icon:** `text-white`
- **Score badge background:** `#df8e10`
- **Score number text:** `#1a0b2e`
- **Focus ring:** `#f9d455`, **ring offset:** `#4c3aed`

**Note:** `#1a0b2e` is a dark purple that fits the palette; you can swap it for `#13220C` or `#1a1a1a` if you prefer.

---

## Green / teal / turquoise / cyan (in codebase)

Colors in this family already used in the app (UI controls + feedback/game visuals). Useful if you want a green/teal score panel or to unify with these.

### Tailwind tokens in UI controls
| Token | Where used |
|-------|------------|
| **green-50** | FeedbackAnimation (correct modal background) |
| **green-200** | FeedbackAnimation (correct modal border) |
| **green-500** | GameBoardBlending (selected state), Slider submit button bg |
| **green-600** | FeedbackAnimation (correct text), Slider (submit hover, message) |
| **emerald-400** | GameMenu: “×” (multiplication) label |
| **emerald-500** | GameBoardContinuePattern (pattern option label) |
| **cyan-400** | GameMenu: “BLEND” label |
| **cyan-800** | Slider: positive-number text |

### Hex greens / teals in the app
| Hex | Where used |
|-----|------------|
| **#06b6d4** | Slider: track gradient (positive half) – Tailwind `cyan-500` |
| **#56AB2F** | FeedbackFailure SVG: gradient stop, stroke (darker green) |
| **#76C893** | FeedbackFailure SVG: leaf fill (mid green) |
| **#A8E063** | FeedbackFailure SVG: gradient stop (lighter green) |
| **#007A00** | FeedbackSuccess SVG: green dot (traffic-light style) |

### Suggested green/teal/turquoise hex for score panel (or other UI)
You can use these for a score pill or badge if you want to move toward green/teal instead of purple/gold:

| Hex | Description |
|-----|-------------|
| **#0d9488** | Teal-600 – strong teal pill |
| **#0f766e** | Teal-700 – darker teal |
| **#14b8a6** | Teal-500 – brighter teal/turquoise |
| **#06b6d4** | Cyan-500 – already in app (Slider); turquoise-cyan |
| **#0891b2** | Cyan-600 – deeper cyan |
| **#059669** | Emerald-600 – green (not teal) |
| **#10b981** | Emerald-500 – brighter emerald |
| **#2dd4bf** | Teal-400 – light turquoise accent (badge) |

### Scoreboard – Green/teal/cyan + other (suggested combinations)

Pick one set for the score pill, “Score:” label, score badge, score number, and focus ring.

**Option A – Teal + gold (recommended)**  
- **Pill:** `#0d9488` (teal)  
- **“Score:” + reset icon:** white  
- **Score badge:** `#f9d455` (gold)  
- **Score number:** `#042f2e` (dark teal, readable on gold)  
- **Focus ring:** `#14b8a6`, **ring offset:** `#0d9488`  

**Option B – Cyan + amber**  
- **Pill:** `#0891b2` (cyan)  
- **“Score:” + reset icon:** white  
- **Score badge:** `#fbbf24` (amber)  
- **Score number:** `#0c4a6e` (dark cyan)  
- **Focus ring:** `#06b6d4`, **ring offset:** `#0891b2`  

**Option C – Teal + light turquoise (all-cool)**  
- **Pill:** `#0f766e` (darker teal)  
- **“Score:” + reset icon:** white  
- **Score badge:** `#2dd4bf` (light turquoise)  
- **Score number:** `#042f2e`  
- **Focus ring:** `#2dd4bf`, **ring offset:** `#0f766e`  

**Option D – Emerald + coral (green + warm)**  
- **Pill:** `#059669` (emerald)  
- **“Score:” + reset icon:** white  
- **Score badge:** `#fb7185` (rose-400) or `#f97316` (orange)  
- **Score number:** `#052e16` (dark green)  
- **Focus ring:** `#10b981`, **ring offset:** `#059669`  

*Option A is applied in `ScoreDisplay.tsx` by default; change hex values there to try B, C, or D.*
