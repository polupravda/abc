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
"[project]/app/elements/Card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CardLight": (()=>CardLight)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const CardLight = ({ children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative w-fit h-fit rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-2xl p-10 min-w-[60vw] ${className || ""}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/elements/Card.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
_c = CardLight;
var _c;
__turbopack_context__.k.register(_c, "CardLight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/Button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Button = ({ text, icon: IconComponent, className, ...props })=>{
    // Define the classes for the icon and its wrapper as seen in your InstructionButton
    const iconWrapperClasses = "flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-1 shadow-md/20";
    const iconClasses = "w-8 h-8 fill-white drop-shadow-md/20"; // Default classes for the icon
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `py-3 pr-6 pl-3 flex items-center gap-2 shadow-lg/20 text-purple-300 bg-gradient-to-br from-purple-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded-full focus:outline-none transition-colors ${className || ""}`,
        ...props,
        children: [
            IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: iconWrapperClasses,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                    className: iconClasses
                }, void 0, false, {
                    fileName: "[project]/app/elements/Button.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/elements/Button.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-bold text-lg text-white drop-shadow-md/30",
                children: text
            }, void 0, false, {
                fileName: "[project]/app/elements/Button.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/elements/Button.tsx",
        lineNumber: 21,
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
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/FeedbackSuccessAnimation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
const FeedbackSuccessAnimation = ({ show })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-2.png",
                alt: "Astro Dude 2",
                width: 300,
                height: 300,
                className: `absolute rotate-160 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-100 ${show ? "-top-[5%] -left-[5%] opacity-100" : "-top-[10%] -left-[10%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-1.png",
                alt: "Astro Dude 1",
                width: 350,
                height: 350,
                className: `absolute -rotate-140 drop-shadow-lg/20 transition-all duration-200 ease-in-out ${show ? "-top-[10%] -right-[8%] opacity-100" : "-top-[15%] -right-[12%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-5.png",
                alt: "Astro Dude 5",
                width: 350,
                height: 350,
                className: `absolute -rotate-18 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-80 ${show ? "top-[40%] -right-[10%] opacity-100" : "top-[45%] -right-[15%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-3.png",
                alt: "Astro Dude 3",
                width: 400,
                height: 400,
                className: `absolute rotate-18 drop-shadow-lg/20 transition-all duration-200 ease-in-out ${show ? "top-[40%] -left-[10%] opacity-100" : "top-[45%] -left-[15%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dudes.png",
                alt: "Astro Dudes Group",
                width: 4096,
                height: 1820,
                className: `absolute w-[85vw] drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-100 ${show ? "-bottom-[25%] opacity-100" : "-bottom-[40%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-3.png" // Note: Duplicate astro-dude-3, alt changed for uniqueness
                ,
                alt: "Astro Dude 3 (top-center)",
                width: 300,
                height: 300,
                className: `absolute rotate-180 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-80 ${show ? "-top-[10%] right-[50%] opacity-100" // Adjusted right to center it more (50% - half of its width approx)
                 : "-top-[15%] right-[55%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-4.png",
                alt: "Astro Dude 4",
                width: 250,
                height: 250,
                className: `absolute rotate-160 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-120 ${show ? "-top-[8%] right-[40%] opacity-100" : "-top-[13%] right-[45%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/images/astro-dude-6.png",
                alt: "Astro Dude 6",
                width: 300,
                height: 300,
                className: `absolute rotate-200 drop-shadow-lg/20 transition-all duration-200 ease-in-out ${show ? "-top-[8%] right-[20%] opacity-100" : "-top-[13%] right-[25%] opacity-0"}`,
                priority: true
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccessAnimation.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_c = FeedbackSuccessAnimation;
const __TURBOPACK__default__export__ = FeedbackSuccessAnimation;
var _c;
__turbopack_context__.k.register(_c, "FeedbackSuccessAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/elements/BouncingMicrophone.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
const BouncingMicrophone = ({ isVisible })=>{
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-full p-8 shadow-xl animate-bounce-custom relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"
                        }, void 0, false, {
                            fileName: "[project]/app/elements/BouncingMicrophone.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/microphone.svg",
                            alt: "Microphone",
                            width: 80,
                            height: 80,
                            className: "relative z-10 pulse-mic text-red-500",
                            style: {
                                filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/elements/BouncingMicrophone.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/elements/BouncingMicrophone.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 bg-white px-8 py-4 rounded-full shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl font-bold text-blue-600",
                        children: "I'm listening..."
                    }, void 0, false, {
                        fileName: "[project]/app/elements/BouncingMicrophone.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/elements/BouncingMicrophone.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/elements/BouncingMicrophone.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/elements/BouncingMicrophone.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
};
_c = BouncingMicrophone;
const __TURBOPACK__default__export__ = BouncingMicrophone;
var _c;
__turbopack_context__.k.register(_c, "BouncingMicrophone");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/const/words.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "threeLetterWords": (()=>threeLetterWords)
});
const threeLetterWords = [
    "CAT",
    "DOG",
    "SUN",
    "RUN",
    "BIG",
    "TOP",
    "HOT",
    "POT",
    "RED",
    "BED",
    "HEN",
    "PEN",
    "PIG",
    "WIN",
    "SIT",
    "FIT",
    "MIX",
    "FIX",
    "JOY",
    "KEY",
    "FLY",
    "SKY",
    "DRY",
    "CRY",
    "TRY",
    "MAP",
    "TAP",
    "CAP",
    "MAT",
    "RAT",
    "BAT",
    "HAT",
    "FUN",
    "NUN",
    "MUD",
    "BUD",
    "BUG",
    "HUG",
    "RUG",
    "JUG",
    "LEG",
    "PEG",
    "FIN",
    "BIN",
    "ZIP",
    "LIP",
    "TIP",
    "RIP",
    "JAM",
    "YAM"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/gameBoards/GameBoardBlending.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$HeadlineInstruction$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/HeadlineInstruction.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/Button.tsx [app-client] (ecmascript)"); // Assuming a generic Button
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FeedbackSuccessAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FeedbackSuccessAnimation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$BouncingMicrophone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/BouncingMicrophone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$const$2f$words$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/const/words.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icons$2f$LoudspeakerIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/icons/LoudspeakerIcon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const GameBoardBlending = ()=>{
    _s();
    const [currentWord, setCurrentWord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lettersOfCurrentWord, setLettersOfCurrentWord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccessContainer, setShowSuccessContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [startSuccessAnimation, setStartSuccessAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const instructionUtteranceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const successSoundAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const letterSoundAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Ref for letter sounds
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const successAppearTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const successDurationTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const successHideTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const successSoundFiles = Array.from({
        length: 12
    }, (_, i)=>`/sounds/success/success-${i + 1}.aac`);
    const clearAllTimeouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[clearAllTimeouts]": ()=>{
            if (successAppearTimeoutRef.current) clearTimeout(successAppearTimeoutRef.current);
            if (successDurationTimeoutRef.current) clearTimeout(successDurationTimeoutRef.current);
            if (successHideTimeoutRef.current) clearTimeout(successHideTimeoutRef.current);
        }
    }["GameBoardBlending.useCallback[clearAllTimeouts]"], []);
    const playSuccessSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[playSuccessSound]": ()=>{
            // Ensure other sounds are stopped
            if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause();
            if (successSoundAudioRef.current) successSoundAudioRef.current.pause();
            const randomIndex = Math.floor(Math.random() * successSoundFiles.length);
            const soundToPlay = successSoundFiles[randomIndex];
            const audio = new Audio(soundToPlay);
            successSoundAudioRef.current = audio;
            audio.play().catch({
                "GameBoardBlending.useCallback[playSuccessSound]": (err)=>console.error("Error playing success sound:", err)
            }["GameBoardBlending.useCallback[playSuccessSound]"]);
            audio.onended = ({
                "GameBoardBlending.useCallback[playSuccessSound]": ()=>{
                    if (successSoundAudioRef.current === audio) successSoundAudioRef.current = null;
                }
            })["GameBoardBlending.useCallback[playSuccessSound]"];
            audio.onerror = ({
                "GameBoardBlending.useCallback[playSuccessSound]": ()=>{
                    if (successSoundAudioRef.current === audio) successSoundAudioRef.current = null;
                }
            })["GameBoardBlending.useCallback[playSuccessSound]"];
        }
    }["GameBoardBlending.useCallback[playSuccessSound]"], [
        successSoundFiles
    ]);
    const playLetterSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[playLetterSound]": (letter)=>{
            if ("object" !== "undefined" && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            if (successSoundAudioRef.current) successSoundAudioRef.current.pause(); // Stop success sound if playing
            const soundSrc = `/sounds/phonics/${letter.toLowerCase()}.m4a`;
            const audioRefToUse = letterSoundAudioRef;
            if (audioRefToUse.current) {
                audioRefToUse.current.pause();
                audioRefToUse.current.onended = null;
                audioRefToUse.current.onerror = null;
            }
            const audio = new Audio(soundSrc);
            audioRefToUse.current = audio;
            audio.onended = ({
                "GameBoardBlending.useCallback[playLetterSound]": ()=>{
                    if (audioRefToUse.current === audio) audioRefToUse.current = null;
                }
            })["GameBoardBlending.useCallback[playLetterSound]"];
            audio.onerror = ({
                "GameBoardBlending.useCallback[playLetterSound]": (event)=>{
                    console.error(`Audio element error for ${soundSrc}:`, event);
                    if (audioRefToUse.current === audio) audioRefToUse.current = null;
                }
            })["GameBoardBlending.useCallback[playLetterSound]"];
            audio.play().catch({
                "GameBoardBlending.useCallback[playLetterSound]": (error)=>{
                    if (error.name === "AbortError") {
                    // console.log(`Play attempt on ${soundSrc} was aborted.`);
                    } else {
                        console.error(`Error starting sound ${soundSrc}:`, error);
                    }
                    if (audioRefToUse.current === audio) {
                        audioRefToUse.current = null;
                    }
                }
            }["GameBoardBlending.useCallback[playLetterSound]"]);
        }
    }["GameBoardBlending.useCallback[playLetterSound]"], []);
    const generateNewWord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[generateNewWord]": ()=>{
            clearAllTimeouts();
            setShowSuccessContainer(false);
            setStartSuccessAnimation(false);
            setIsListening(false);
            const randomIndex = Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$const$2f$words$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["threeLetterWords"].length);
            const newWord = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$const$2f$words$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["threeLetterWords"][randomIndex];
            setCurrentWord(newWord);
            setLettersOfCurrentWord(newWord.split(""));
        }
    }["GameBoardBlending.useCallback[generateNewWord]"], [
        clearAllTimeouts
    ]);
    const speakWord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[speakWord]": (wordToSpeak)=>{
            if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause(); // Stop letter sound
            if (successSoundAudioRef.current) successSoundAudioRef.current.pause(); // Stop success sound
            if ("object" !== "undefined" && window.speechSynthesis) {
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                }
                const utterance = new SpeechSynthesisUtterance(wordToSpeak);
                instructionUtteranceRef.current = utterance;
                const voices = window.speechSynthesis.getVoices();
                let preferredVoice = voices.find({
                    "GameBoardBlending.useCallback[speakWord].preferredVoice": (v)=>v.lang === "en-US" && v.name.toLowerCase().includes("female")
                }["GameBoardBlending.useCallback[speakWord].preferredVoice"]);
                if (!preferredVoice) preferredVoice = voices.find({
                    "GameBoardBlending.useCallback[speakWord]": (v)=>v.lang === "en-US"
                }["GameBoardBlending.useCallback[speakWord]"]);
                if (preferredVoice) utterance.voice = preferredVoice;
                utterance.onend = ({
                    "GameBoardBlending.useCallback[speakWord]": ()=>{
                        instructionUtteranceRef.current = null;
                        setTimeout({
                            "GameBoardBlending.useCallback[speakWord]": ()=>generateNewWord()
                        }["GameBoardBlending.useCallback[speakWord]"], 100);
                    }
                })["GameBoardBlending.useCallback[speakWord]"];
                utterance.onerror = ({
                    "GameBoardBlending.useCallback[speakWord]": (event)=>{
                        console.error("SpeechSynthesis Error:", event);
                        instructionUtteranceRef.current = null;
                        setTimeout({
                            "GameBoardBlending.useCallback[speakWord]": ()=>generateNewWord()
                        }["GameBoardBlending.useCallback[speakWord]"], 100);
                    }
                })["GameBoardBlending.useCallback[speakWord]"];
                window.speechSynthesis.speak(utterance);
            } else {
                setTimeout({
                    "GameBoardBlending.useCallback[speakWord]": ()=>generateNewWord()
                }["GameBoardBlending.useCallback[speakWord]"], 100);
            }
        }
    }["GameBoardBlending.useCallback[speakWord]"], [
        generateNewWord
    ]);
    const handleSpeechRecognition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[handleSpeechRecognition]": ()=>{
            if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause(); // Stop letter sound before listening
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognitionAPI) {
                console.warn("Speech Recognition API is not supported in this browser.");
                speakWord(currentWord);
                return;
            }
            if (recognitionRef.current && isListening) {
                recognitionRef.current.stop();
            }
            const recognition = new SpeechRecognitionAPI();
            recognitionRef.current = recognition;
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.continuous = false;
            setIsListening(true);
            recognition.onresult = ({
                "GameBoardBlending.useCallback[handleSpeechRecognition]": (event)=>{
                    const transcript = event.results[0][0].transcript.trim().toUpperCase();
                    setIsListening(false);
                    if (recognitionRef.current === recognition) recognitionRef.current = null;
                    if (transcript === currentWord) {
                        setShowSuccessContainer(true);
                        setStartSuccessAnimation(false);
                        playSuccessSound(); // This already stops letter sounds
                        successAppearTimeoutRef.current = setTimeout({
                            "GameBoardBlending.useCallback[handleSpeechRecognition]": ()=>{
                                setStartSuccessAnimation(true);
                            }
                        }["GameBoardBlending.useCallback[handleSpeechRecognition]"], 50);
                        successDurationTimeoutRef.current = setTimeout({
                            "GameBoardBlending.useCallback[handleSpeechRecognition]": ()=>{
                                setStartSuccessAnimation(false);
                            }
                        }["GameBoardBlending.useCallback[handleSpeechRecognition]"], 3050);
                        successHideTimeoutRef.current = setTimeout({
                            "GameBoardBlending.useCallback[handleSpeechRecognition]": ()=>{
                                generateNewWord();
                            }
                        }["GameBoardBlending.useCallback[handleSpeechRecognition]"], 3050 + 300);
                    } else {
                        speakWord(currentWord); // This already stops letter sounds
                    }
                }
            })["GameBoardBlending.useCallback[handleSpeechRecognition]"];
            recognition.onerror = ({
                "GameBoardBlending.useCallback[handleSpeechRecognition]": (event)=>{
                    setIsListening(false);
                    if (recognitionRef.current === recognition) recognitionRef.current = null;
                    console.error("Speech Recognition Error:", event.error, event.message);
                    if (event.error === "no-speech" || event.error === "audio-capture" || event.error === "not-allowed") {
                        speakWord(currentWord);
                    } else {
                        speakWord(currentWord);
                    }
                }
            })["GameBoardBlending.useCallback[handleSpeechRecognition]"];
            recognition.onend = ({
                "GameBoardBlending.useCallback[handleSpeechRecognition]": ()=>{
                    if (isListening) {
                        setIsListening(false);
                    }
                    if (recognitionRef.current === recognition) {
                        recognitionRef.current = null;
                    }
                }
            })["GameBoardBlending.useCallback[handleSpeechRecognition]"];
            recognition.start();
        }
    }["GameBoardBlending.useCallback[handleSpeechRecognition]"], [
        currentWord,
        playSuccessSound,
        generateNewWord,
        speakWord,
        isListening
    ]);
    const triggerListen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardBlending.useCallback[triggerListen]": ()=>{
            if ("object" !== "undefined" && window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause(); // Ensure letter sound stops
            handleSpeechRecognition();
        }
    }["GameBoardBlending.useCallback[triggerListen]"], [
        handleSpeechRecognition
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameBoardBlending.useEffect": ()=>{
            generateNewWord();
            const currentRec = recognitionRef.current;
            const synth = ("TURBOPACK compile-time truthy", 1) ? window.speechSynthesis : ("TURBOPACK unreachable", undefined);
            const utterance = instructionUtteranceRef.current;
            const successAudio = successSoundAudioRef.current;
            const letterAudio = letterSoundAudioRef.current; // Capture for cleanup
            return ({
                "GameBoardBlending.useEffect": ()=>{
                    clearAllTimeouts();
                    if (currentRec) {
                        currentRec.abort();
                    }
                    if (synth && synth.speaking && utterance === instructionUtteranceRef.current) {
                        synth.cancel();
                    }
                    if (successAudio) {
                        successAudio.pause();
                    }
                    if (letterAudio) {
                        letterAudio.pause();
                    }
                }
            })["GameBoardBlending.useEffect"];
        }
    }["GameBoardBlending.useEffect"], [
        generateNewWord,
        clearAllTimeouts
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameBoardBlending.useEffect": ()=>{
            const handleKeyDown = {
                "GameBoardBlending.useEffect.handleKeyDown": (event)=>{
                    if (event.code === "Space") {
                        event.preventDefault();
                        if (!isListening && !showSuccessContainer) {
                            triggerListen();
                        }
                    }
                }
            }["GameBoardBlending.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "GameBoardBlending.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKeyDown);
                }
            })["GameBoardBlending.useEffect"];
        }
    }["GameBoardBlending.useEffect"], [
        triggerListen,
        isListening,
        showSuccessContainer
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full flex flex-col items-center justify-center relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$BouncingMicrophone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isVisible: isListening
            }, void 0, false, {
                fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            showSuccessContainer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FeedbackSuccessAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    show: startSuccessAnimation
                }, void 0, false, {
                    fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                    lineNumber: 341,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-auto max-h-[80vh] mb-10 flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$HeadlineInstruction$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadlineInstruction"], {
                        headlineText: "Blend the sounds to make a word!",
                        instructionText: "Click letters to hear their sounds. Blend them to make a word. Click the button or press Space to speak.",
                        className: `transition-opacity duration-300 ${isListening || showSuccessContainer && startSuccessAnimation ? "opacity-0" : "opacity-100"}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardLight"], {
                        className: `transition-opacity duration-300 ${isListening || showSuccessContainer && startSuccessAnimation ? "opacity-0" : "opacity-100"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center items-center space-x-2 md:space-x-4 my-8 px-4",
                                children: lettersOfCurrentWord.map((letter, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-[12rem] font-bold text-fuchsia-950 focus:outline-none rounded-lg p-2 transition-transform hover:scale-105 active:scale-95",
                                        onClick: ()=>playLetterSound(letter),
                                        "aria-label": `Play sound for letter ${letter}`,
                                        children: index === 0 ? letter : letter.toLowerCase()
                                    }, `${currentWord}-${index}`, false, {
                                        fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mt-8 mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: triggerListen,
                                    disabled: isListening || showSuccessContainer,
                                    text: "Speak Word",
                                    "aria-label": "Speak the word",
                                    className: "px-8 py-4 text-xl font-semibold",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icons$2f$LoudspeakerIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                }, void 0, false, {
                                    fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/gameBoards/GameBoardBlending.tsx",
        lineNumber: 337,
        columnNumber: 5
    }, this);
};
_s(GameBoardBlending, "iMqILiemG2zKTMGSTCiYoEKsR2k=");
_c = GameBoardBlending;
const __TURBOPACK__default__export__ = GameBoardBlending;
var _c;
__turbopack_context__.k.register(_c, "GameBoardBlending");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/games/blending/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BlendingPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$gameBoards$2f$GameBoardBlending$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/gameBoards/GameBoardBlending.tsx [app-client] (ecmascript)");
"use client";
;
;
function BlendingPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col items-center justify-center bg-white relative h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$gameBoards$2f$GameBoardBlending$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/games/blending/page.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/games/blending/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = BlendingPage;
var _c;
__turbopack_context__.k.register(_c, "BlendingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_97e185c7._.js.map