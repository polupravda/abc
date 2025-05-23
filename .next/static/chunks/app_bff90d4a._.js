(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/icons/LoudspeakerIcon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
// Loudspeaker Icon SVG Component
const LoudspeakerIcon = ({ className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: className || "w-6 h-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.903A9.7 9.7 0 0 0 1.5 12c0 .898.121 1.768.35 2.597.343 1.24 1.518 1.903 2.66 1.903h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.555-2.25-4.685a.75.75 0 0 0-.916 1.192A2.99 2.99 0 0 1 16.084 12a2.99 2.99 0 0 1-1.666 2.493.75.75 0 0 0 .916 1.192C17.714 15.555 18.584 13.857 18.584 12Z"
            }, void 0, false, {
                fileName: "[project]/app/icons/LoudspeakerIcon.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19.816 7.192a.75.75 0 0 0-1.06 1.06A5.502 5.502 0 0 1 21.084 12a5.502 5.502 0 0 1-2.328 3.748.75.75 0 1 0 1.06 1.06A6.993 6.993 0 0 0 22.584 12a6.993 6.993 0 0 0-2.768-4.808Z"
            }, void 0, false, {
                fileName: "[project]/app/icons/LoudspeakerIcon.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/icons/LoudspeakerIcon.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, this);
_c = LoudspeakerIcon;
const __TURBOPACK__default__export__ = LoudspeakerIcon;
var _c;
__turbopack_context__.k.register(_c, "LoudspeakerIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/ButtonIcon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ButtonIcon": (()=>ButtonIcon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ButtonIcon = ({ icon: IconComponent, className, ...props })=>{
    // Define the classes for the icon and its wrapper as seen in your InstructionButton
    const iconWrapperClasses = "flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-1 shadow-md/20";
    const iconClasses = "w-8 h-8 fill-white drop-shadow-md/20"; // Default classes for the icon
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `py-3 px-3 flex items-center gap-2 shadow-lg/20 text-purple-300 bg-gradient-to-br from-purple-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded-full focus:outline-none transition-colors ${className || ""}`,
        ...props,
        children: IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: iconWrapperClasses,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                className: iconClasses
            }, void 0, false, {
                fileName: "[project]/app/elements/ButtonIcon.tsx",
                lineNumber: 27,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/elements/ButtonIcon.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/elements/ButtonIcon.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}; // Example of how to use this Button component:
 // import LoudspeakerIcon from '../icons/LoudspeakerIcon';
 //
 // const MyPageComponent = () => {
 //   return (
 //     <Button
 //       text="My Action"
 //       icon={LoudspeakerIcon}
 //       onClick={() => console.log('Button clicked!')}
 //     />
 //   );
 // };
_c = ButtonIcon;
var _c;
__turbopack_context__.k.register(_c, "ButtonIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/InstructionButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "InstructionButton": (()=>InstructionButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icons$2f$LoudspeakerIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/icons/LoudspeakerIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$ButtonIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/ButtonIcon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const InstructionButton = ({ instructions })=>{
    _s();
    const instructionUtteranceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playInstructions = ()=>{
        if ("object" !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(instructions);
            instructionUtteranceRef.current = utterance;
            const voices = window.speechSynthesis.getVoices();
            let preferredVoice = voices.find((v)=>v.lang === "en-US" && v.name.toLowerCase().includes("female"));
            if (!preferredVoice) preferredVoice = voices.find((v)=>v.lang === "en-US");
            if (!preferredVoice) preferredVoice = voices.find((v)=>v.lang.startsWith("en"));
            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.pitch = 1;
            utterance.rate = 1;
            utterance.onend = ()=>{
                instructionUtteranceRef.current = null;
            };
            utterance.onerror = ()=>{
                instructionUtteranceRef.current = null;
            };
            window.speechSynthesis.speak(utterance);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$ButtonIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonIcon"], {
        onClick: playInstructions,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icons$2f$LoudspeakerIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        title: "Play Instructions"
    }, void 0, false, {
        fileName: "[project]/app/elements/InstructionButton.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
};
_s(InstructionButton, "OqsdcNicPwYCNRH38QPYunQge9A=");
_c = InstructionButton;
var _c;
__turbopack_context__.k.register(_c, "InstructionButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/HeadlineInstruction.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadlineInstruction": (()=>HeadlineInstruction)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$InstructionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/InstructionButton.tsx [app-client] (ecmascript)");
;
;
const HeadlineInstruction = ({ headlineText, instructionText, children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full flex gap-3 items-center mb-4 ${className || ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl md:text-4xl font-bold text-sky-950",
                children: headlineText
            }, void 0, false, {
                fileName: "[project]/app/elements/HeadlineInstruction.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            instructionText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$InstructionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstructionButton"], {
                        instructions: instructionText
                    }, void 0, false, {
                        fileName: "[project]/app/elements/HeadlineInstruction.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/elements/HeadlineInstruction.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/elements/HeadlineInstruction.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
};
_c = HeadlineInstruction;
var _c;
__turbopack_context__.k.register(_c, "HeadlineInstruction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/Slider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const Slider = ()=>{
    _s();
    const min = -15;
    const max = 15;
    const range = max - min;
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const getValueFromPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Slider.useCallback[getValueFromPosition]": (clientY)=>{
            const track = trackRef.current;
            if (!track) return 0;
            const { top, height } = track.getBoundingClientRect();
            let ratio = (clientY - top) / height;
            ratio = Math.max(0, Math.min(1, ratio));
            const raw = max - ratio * range;
            return Math.round(raw);
        }
    }["Slider.useCallback[getValueFromPosition]"], [
        max,
        range
    ]);
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Slider.useCallback[handlePointerMove]": (e)=>{
            e.preventDefault();
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            setValue(getValueFromPosition(clientY));
        }
    }["Slider.useCallback[handlePointerMove]"], [
        getValueFromPosition
    ]);
    const stopDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Slider.useCallback[stopDrag]": ()=>{
            document.removeEventListener("mousemove", handlePointerMove);
            document.removeEventListener("touchmove", handlePointerMove);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchend", stopDrag);
        }
    }["Slider.useCallback[stopDrag]"], [
        handlePointerMove
    ]);
    const startDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Slider.useCallback[startDrag]": (e)=>{
            e.preventDefault();
            document.addEventListener("mousemove", handlePointerMove);
            document.addEventListener("touchmove", handlePointerMove);
            document.addEventListener("mouseup", stopDrag);
            document.addEventListener("touchend", stopDrag);
            // initial position update
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            setValue(getValueFromPosition(clientY));
        }
    }["Slider.useCallback[startDrag]"], [
        getValueFromPosition,
        handlePointerMove,
        stopDrag
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Slider.useEffect": ()=>{
            return ({
                "Slider.useEffect": ()=>{
                    stopDrag();
                }
            })["Slider.useEffect"];
        }
    }["Slider.useEffect"], [
        stopDrag
    ]);
    const pointerPosPercent = (max - value) / range * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex items-center select-none",
        style: {
            height: "80vw",
            width: "4rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: trackRef,
                className: "absolute left-1/2 top-0 -translate-x-1/2",
                style: {
                    width: "4px",
                    height: "100%",
                    background: "linear-gradient(to bottom, blue 0%, blue 50%, red 50%, red 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/app/elements/Slider.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            Array.from({
                length: range + 1
            }, (_, i)=>max - i).map((num)=>{
                const pos = (max - num) / range * 100;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `absolute ${num >= 0 ? "text-blue-500" : "text-red-500"}`,
                    style: {
                        top: `${pos}%`,
                        left: "2rem",
                        transform: "translateY(-50%)"
                    },
                    children: num
                }, num, false, {
                    fileName: "[project]/app/elements/Slider.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseDown: startDrag,
                onTouchStart: startDrag,
                style: {
                    position: "absolute",
                    top: `${pointerPosPercent}%`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    background: "#444",
                    cursor: "grab"
                }
            }, void 0, false, {
                fileName: "[project]/app/elements/Slider.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/elements/Slider.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
};
_s(Slider, "iGRa4wZm/YxPKwoDxF7Ax2zMey4=");
_c = Slider;
const __TURBOPACK__default__export__ = Slider;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/VerticalSlider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const VerticalSlider = ({ value, onChange, min = -15, max = 15, step = 1, height = "400px" })=>{
    _s();
    const range = max - min;
    const getPositionFromValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VerticalSlider.useCallback[getPositionFromValue]": (val)=>{
            if (range === 0) return 0;
            const percentage = (val - min) / range * 100;
            return Math.max(0, Math.min(100, 100 - percentage)); // Inverted for top-down slider
        }
    }["VerticalSlider.useCallback[getPositionFromValue]"], [
        min,
        range
    ]);
    const getValueFromPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VerticalSlider.useCallback[getValueFromPosition]": (yPosition, trackHeight)=>{
            if (trackHeight === 0) return min;
            const percentage = 100 - yPosition / trackHeight * 100; // Inverted
            const rawValue = percentage / 100 * range + min;
            // Snap to the nearest step
            const numSteps = Math.round((rawValue - min) / step);
            let snappedValue = min + numSteps * step;
            snappedValue = Math.max(min, Math.min(max, snappedValue));
            return snappedValue;
        }
    }["VerticalSlider.useCallback[getValueFromPosition]"], [
        min,
        max,
        step,
        range
    ]);
    const pointerPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VerticalSlider.useMemo[pointerPosition]": ()=>getPositionFromValue(value)
    }["VerticalSlider.useMemo[pointerPosition]"], [
        value,
        getPositionFromValue
    ]);
    const handleTrackClick = (event)=>{
        const trackRect = event.currentTarget.getBoundingClientRect();
        const yPosition = event.clientY - trackRect.top;
        const newValue = getValueFromPosition(yPosition, trackRect.height);
        onChange(newValue);
    };
    const numberLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VerticalSlider.useMemo[numberLabels]": ()=>{
            const labels = [];
            for(let i = min; i <= max; i += 1){
                if (i === 0 || i === min || i === max || i % 5 === 0) {
                    labels.push({
                        value: i,
                        position: getPositionFromValue(i),
                        color: i > 0 ? "text-blue-600 font-semibold" : i < 0 ? "text-red-600 font-semibold" : "text-gray-800 font-bold"
                    });
                }
            }
            return labels;
        }
    }["VerticalSlider.useMemo[numberLabels]"], [
        min,
        max,
        getPositionFromValue
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-inner",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative pr-2",
                style: {
                    height
                },
                children: numberLabels.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute right-full mr-2 transform -translate-y-1/2 text-xs whitespace-nowrap ${label.color}`,
                        style: {
                            top: `${label.position}%`
                        },
                        children: label.value
                    }, label.value, false, {
                        fileName: "[project]/app/elements/VerticalSlider.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/elements/VerticalSlider.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-full cursor-pointer group shadow-sm",
                style: {
                    width: "16px",
                    height
                },
                onClick: handleTrackClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 w-full bg-red-400 rounded-b-full",
                        style: {
                            top: `${getPositionFromValue(0)}%`,
                            height: `${100 - getPositionFromValue(0)}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/elements/VerticalSlider.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 left-0 w-full bg-blue-400 rounded-t-full",
                        style: {
                            height: `${getPositionFromValue(0)}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/elements/VerticalSlider.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 w-full h-full",
                        children: Array.from({
                            length: (max - min) / step + 1
                        }).map((_, index)=>{
                            const stepValue = min + index * step;
                            const stepPosition = getPositionFromValue(stepValue);
                            // Make ticks at 0, min, max, and multiples of 5 more prominent
                            const isMajorTick = stepValue === 0 || stepValue === min || stepValue === max || stepValue % 5 === 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute left-1/2 transform -translate-x-1/2 h-px ${isMajorTick ? "w-3 bg-gray-600" : "w-2 bg-gray-400"}`,
                                style: {
                                    top: `${stepPosition}%`
                                }
                            }, stepValue, false, {
                                fileName: "[project]/app/elements/VerticalSlider.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/elements/VerticalSlider.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-full shadow-lg group-hover:ring-4 group-hover:ring-indigo-300 focus:outline-none ring-indigo-500 ring-offset-2 transition-all",
                        style: {
                            top: `${pointerPosition}%`
                        },
                        role: "slider",
                        "aria-valuenow": value,
                        "aria-valuemin": min,
                        "aria-valuemax": max,
                        "aria-orientation": "vertical"
                    }, void 0, false, {
                        fileName: "[project]/app/elements/VerticalSlider.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/elements/VerticalSlider.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/elements/VerticalSlider.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
};
_s(VerticalSlider, "CuIeaBaFTT/VDc32EM1+xhLU00w=");
_c = VerticalSlider;
const __TURBOPACK__default__export__ = VerticalSlider;
var _c;
__turbopack_context__.k.register(_c, "VerticalSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$HeadlineInstruction$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/HeadlineInstruction.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/Slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$VerticalSlider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/VerticalSlider.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
const GameBoardGreaterOrLess = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full flex flex-col items-center justify-center relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$HeadlineInstruction$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadlineInstruction"], {
                headlineText: "Greater or Less?",
                instructionText: "Game content coming soon!"
            }, void 0, false, {
                fileName: "[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$VerticalSlider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: 0,
                        onChange: ()=>console.log("changed")
                    }, void 0, false, {
                        fileName: "[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
_c = GameBoardGreaterOrLess;
const __TURBOPACK__default__export__ = GameBoardGreaterOrLess;
var _c;
__turbopack_context__.k.register(_c, "GameBoardGreaterOrLess");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/games/greater-or-less/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$gameBoards$2f$GameBoardGreaterOrLess$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/gameBoards/GameBoardGreaterOrLess.tsx [app-client] (ecmascript)");
"use client";
;
;
// import BackgroundSpace from "../../components/BackgroundSpace"; // Temporarily removed
const GreaterOrLessPage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "h-screen w-screen overflow-hidden flex items-center bg-white justify-center relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$gameBoards$2f$GameBoardGreaterOrLess$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/games/greater-or-less/page.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/games/greater-or-less/page.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/games/greater-or-less/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
_c = GreaterOrLessPage;
const __TURBOPACK__default__export__ = GreaterOrLessPage;
var _c;
__turbopack_context__.k.register(_c, "GreaterOrLessPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_bff90d4a._.js.map