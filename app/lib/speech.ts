/**
 * Prefer male en-US voice for instructions (used across the app for headline/instruction speech).
 */
export function getInstructionVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const lower = (s: string | undefined) => (s || "").toLowerCase();
  const nameHas = (v: SpeechSynthesisVoice, needle: string) =>
    lower(v.name).includes(needle);

  const preferredMaleEnUS = [
    "google us english male",
    "daniel",
    "alex",
    "fred",
    "ralph",
    "evan",
    "aaron",
    "david",
    "mark",
    "tom",
    "paul",
    "bruce",
  ];

  for (const pref of preferredMaleEnUS) {
    const found = voices.find((v) => nameHas(v, pref));
    if (found && (found.lang === "en-US" || found.lang?.startsWith("en")))
      return found;
  }

  let v = voices.find(
    (vv) =>
      (vv.lang === "en-US" || vv.lang?.startsWith("en")) &&
      lower(vv.name).includes("male")
  );
  if (!v)
    v = voices.find(
      (vv) => vv.lang === "en-US" && !lower(vv.name).includes("female")
    );
  if (!v) v = voices.find((vv) => vv.lang === "en-US");
  if (!v) v = voices.find((vv) => vv.lang?.startsWith("en"));
  return v || null;
}
