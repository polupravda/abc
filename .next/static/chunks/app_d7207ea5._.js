(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/components/NumberVisualizer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const NumberVisualizer = ({ count, circleColor = "bg-yellow-400" })=>{
    if (count < 0 || count > 10) {
        // Max 10 circles for now, can be adjusted
        return null;
    }
    const circles = Array.from({
        length: count
    }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-5 h-5 md:w-6 md:h-6 rounded-full ${circleColor} shadow-sm`
        }, i, false, {
            fileName: "[project]/app/components/NumberVisualizer.tsx",
            lineNumber: 20,
            columnNumber: 5
        }, this));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-5 gap-1 md:gap-2 mt-2 h-16 md:h-20 w-max",
        children: circles
    }, void 0, false, {
        fileName: "[project]/app/components/NumberVisualizer.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
};
_c = NumberVisualizer;
const __TURBOPACK__default__export__ = NumberVisualizer;
var _c;
__turbopack_context__.k.register(_c, "NumberVisualizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/FeedbackSuccess.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const FeedbackSuccess = ({ className })=>{
    // Renamed component
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 150 200",
        xmlns: "http://www.w3.org/2000/svg",
        className: `w-32 h-40 md:w-40 md:h-52 ${className || ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "75",
                cy: "60",
                rx: "55",
                ry: "50",
                fill: "rgba(200, 220, 255, 0.3)",
                stroke: "#AFC8FF",
                strokeWidth: "3"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "75",
                cy: "70",
                rx: "30",
                ry: "32",
                fill: "#FFDFC4"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 50 55 Q 75 30, 100 55 Q 95 65, 75 60 Q 55 65, 50 55 Z",
                fill: "#FF8C00"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "65",
                cy: "70",
                r: "7",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "65",
                cy: "70",
                r: "3",
                fill: "black"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "85",
                cy: "70",
                r: "7",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "85",
                cy: "70",
                r: "3",
                fill: "black"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 68 85 Q 75 90, 82 85",
                stroke: "black",
                strokeWidth: "1.5",
                fill: "none",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "55",
                y: "100",
                width: "40",
                height: "50",
                rx: "10",
                fill: "#F0F0F0",
                stroke: "#A0A0A0",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "53",
                y: "105",
                width: "44",
                height: "10",
                fill: "#5A83F5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "53",
                y: "135",
                width: "44",
                height: "10",
                fill: "#5A83F5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "65",
                y: "118",
                width: "20",
                height: "10",
                fill: "#D0D0D0",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "70",
                cy: "123",
                r: "2",
                fill: "#FF3047"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "75",
                cy: "123",
                r: "2",
                fill: "#FFD700"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "80",
                cy: "123",
                r: "2",
                fill: "#007A00"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "55",
                y1: "110",
                x2: "35",
                y2: "125",
                stroke: "#A0A0A0",
                strokeWidth: "10",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "110",
                x2: "115",
                y2: "125",
                stroke: "#A0A0A0",
                strokeWidth: "10",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "32",
                cy: "128",
                r: "6",
                fill: "#F0F0F0",
                stroke: "#A0A0A0",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "118",
                cy: "128",
                r: "6",
                fill: "#F0F0F0",
                stroke: "#A0A0A0",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "65",
                y1: "150",
                x2: "60",
                y2: "175",
                stroke: "#A0A0A0",
                strokeWidth: "10",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "85",
                y1: "150",
                x2: "90",
                y2: "175",
                stroke: "#A0A0A0",
                strokeWidth: "10",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "52",
                y: "172",
                width: "16",
                height: "8",
                rx: "2",
                fill: "#5A83F5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "82",
                y: "172",
                width: "16",
                height: "8",
                rx: "2",
                fill: "#5A83F5"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 40 50 Q 50 40, 60 45 Q 50 55, 40 50 Z",
                fill: "rgba(255, 255, 255, 0.5)"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackSuccess.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FeedbackSuccess.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = FeedbackSuccess;
const __TURBOPACK__default__export__ = FeedbackSuccess;
var _c;
__turbopack_context__.k.register(_c, "FeedbackSuccess");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
 // Renamed default export
}}),
"[project]/app/components/FeedbackFailure.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const FeedbackFailure = ({ className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 150 150" // Adjusted viewBox for a more square/round monster
        ,
        xmlns: "http://www.w3.org/2000/svg",
        className: `w-32 h-32 md:w-40 md:h-40 ${className || ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: "monsterBodyGradient",
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        fx: "50%",
                        fy: "50%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                style: {
                                    stopColor: "#A8E063",
                                    stopOpacity: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/FeedbackFailure.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                style: {
                                    stopColor: "#56AB2F",
                                    stopOpacity: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/FeedbackFailure.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FeedbackFailure.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                        id: "speckles",
                        x: "0",
                        y: "0",
                        width: "10",
                        height: "10",
                        patternUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "2",
                                cy: "2",
                                r: "0.8",
                                fill: "rgba(0,0,0,0.1)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/FeedbackFailure.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "7",
                                cy: "7",
                                r: "0.6",
                                fill: "rgba(0,0,0,0.05)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/FeedbackFailure.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FeedbackFailure.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "75",
                cy: "75",
                r: "60",
                fill: "url(#monsterBodyGradient)"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "75",
                cy: "75",
                r: "60",
                fill: "url(#speckles)",
                opacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "75",
                cy: "70",
                r: "30",
                fill: "white",
                stroke: "#444",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "75",
                cy: "70",
                r: "18",
                fill: "#FFA500"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "75",
                cy: "70",
                r: "8",
                fill: "black"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "82",
                cy: "62",
                r: "4",
                fill: "rgba(255,255,255,0.7)"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 40 40 Q 20 20, 30 60 C 35 70, 45 65, 40 40 Z",
                fill: "#76C893",
                stroke: "#56AB2F",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 110 40 Q 130 20, 120 60 C 115 70, 105 65, 110 40 Z",
                fill: "#76C893",
                stroke: "#56AB2F",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 45 115 Q 25 135, 50 125 C 60 120, 55 110, 45 115 Z",
                fill: "#76C893",
                stroke: "#56AB2F",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 105 115 Q 125 135, 100 125 C 90 120, 95 110, 105 115 Z",
                fill: "#76C893",
                stroke: "#56AB2F",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 60 95 Q 75 85, 90 95",
                stroke: "black",
                strokeWidth: "2",
                fill: "none",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/FeedbackFailure.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FeedbackFailure.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
};
_c = FeedbackFailure;
const __TURBOPACK__default__export__ = FeedbackFailure;
var _c;
__turbopack_context__.k.register(_c, "FeedbackFailure");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/icons/LoudspeakerIcon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
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
                fileName: "[project]/app/components/icons/LoudspeakerIcon.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M19.816 7.192a.75.75 0 0 0-1.06 1.06A5.502 5.502 0 0 1 21.084 12a5.502 5.502 0 0 1-2.328 3.748.75.75 0 1 0 1.06 1.06A6.993 6.993 0 0 0 22.584 12a6.993 6.993 0 0 0-2.768-4.808Z"
            }, void 0, false, {
                fileName: "[project]/app/components/icons/LoudspeakerIcon.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/icons/LoudspeakerIcon.tsx",
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
"[project]/app/components/useGameLogic.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useGameLogic = (props)=>{
    _s();
    const { instructionText, successSoundFiles, failureSoundFiles = [], generateProblemFn, checkAnswerFn, getProblemPromptSoundFn, onCorrect, onIncorrect, successDuration = 3000, failureDuration = 2500 } = props;
    const [problem, setProblem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFailure, setShowFailure] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isGameActive, setIsGameActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true); // Primarily for LetterSoundMatch type games
    const [feedbackText, setFeedbackText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const instructionUtteranceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // For feedback sounds and problem prompts
    const successTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const failureTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clearAllTimeouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLogic.useCallback[clearAllTimeouts]": ()=>{
            if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
            if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
        }
    }["useGameLogic.useCallback[clearAllTimeouts]"], []);
    const playSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLogic.useCallback[playSound]": (soundSrc)=>{
            if ("object" !== "undefined" && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            if (isMuted && !getProblemPromptSoundFn) {
                // Don't mute problem prompt sounds if they are distinct from feedback
                // This logic might need refinement based on how essential problem sounds are vs feedback sounds
                return;
            }
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.onended = null;
                currentAudioRef.current.onerror = null;
                currentAudioRef.current = null;
            }
            const audio = new Audio(soundSrc);
            currentAudioRef.current = audio;
            audio.play().catch({
                "useGameLogic.useCallback[playSound]": (error)=>{
                    console.error(`Error playing sound ${soundSrc}:`, error);
                    if (currentAudioRef.current === audio) currentAudioRef.current = null;
                }
            }["useGameLogic.useCallback[playSound]"]);
            audio.onended = ({
                "useGameLogic.useCallback[playSound]": ()=>{
                    if (currentAudioRef.current === audio) currentAudioRef.current = null;
                }
            })["useGameLogic.useCallback[playSound]"];
            audio.onerror = ({
                "useGameLogic.useCallback[playSound]": (event)=>{
                    console.error(`Audio element error for ${soundSrc}:`, event);
                    if (currentAudioRef.current === audio) currentAudioRef.current = null;
                }
            })["useGameLogic.useCallback[playSound]"];
        }
    }["useGameLogic.useCallback[playSound]"], [
        isMuted,
        getProblemPromptSoundFn
    ]);
    const playInstructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLogic.useCallback[playInstructions]": ()=>{
            if ("object" !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(instructionText);
                instructionUtteranceRef.current = utterance;
                // Voice selection logic (can be further customized or simplified)
                const voices = window.speechSynthesis.getVoices();
                let preferredVoice = voices.find({
                    "useGameLogic.useCallback[playInstructions].preferredVoice": (v)=>v.lang === "en-US" && v.name.toLowerCase().includes("female")
                }["useGameLogic.useCallback[playInstructions].preferredVoice"]);
                if (!preferredVoice) preferredVoice = voices.find({
                    "useGameLogic.useCallback[playInstructions]": (v)=>v.lang === "en-US"
                }["useGameLogic.useCallback[playInstructions]"]);
                if (!preferredVoice) preferredVoice = voices.find({
                    "useGameLogic.useCallback[playInstructions]": (v)=>v.lang.startsWith("en")
                }["useGameLogic.useCallback[playInstructions]"]);
                if (preferredVoice) utterance.voice = preferredVoice;
                utterance.pitch = 1;
                utterance.rate = 1;
                utterance.onend = ({
                    "useGameLogic.useCallback[playInstructions]": ()=>{
                        instructionUtteranceRef.current = null;
                    }
                })["useGameLogic.useCallback[playInstructions]"];
                utterance.onerror = ({
                    "useGameLogic.useCallback[playInstructions]": ()=>{
                        instructionUtteranceRef.current = null;
                    }
                })["useGameLogic.useCallback[playInstructions]"];
                window.speechSynthesis.speak(utterance);
            }
        }
    }["useGameLogic.useCallback[playInstructions]"], [
        instructionText
    ]);
    const playProblemSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLogic.useCallback[playProblemSound]": ()=>{
            if (problem && getProblemPromptSoundFn) {
                const soundPath = getProblemPromptSoundFn(problem);
                if (soundPath) {
                    playSound(soundPath);
                }
            }
        }
    }["useGameLogic.useCallback[playProblemSound]"], [
        problem,
        getProblemPromptSoundFn,
        playSound
    ]);
    const startNewGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLogic.useCallback[startNewGame]": ()=>{
            clearAllTimeouts();
            setShowSuccess(false);
            setShowFailure(false);
            setIsGameActive(true);
            setFeedbackText("");
            const newProblem = generateProblemFn();
            setProblem(newProblem);
            // Automatically play problem sound if applicable, with a slight delay
            if (getProblemPromptSoundFn && getProblemPromptSoundFn(newProblem)) {
                setTimeout({
                    "useGameLogic.useCallback[startNewGame]": ()=>{
                        if (problem === newProblem) {
                            // ensure problem hasn't changed again quickly
                            playProblemSound();
                        }
                    }
                }["useGameLogic.useCallback[startNewGame]"], 100); // Small delay like in original components
            }
        }
    }["useGameLogic.useCallback[startNewGame]"], [
        generateProblemFn,
        clearAllTimeouts,
        getProblemPromptSoundFn,
        playProblemSound
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGameLogic.useEffect": ()=>{
            startNewGame();
            return ({
                "useGameLogic.useEffect": ()=>{
                    clearAllTimeouts();
                    if (currentAudioRef.current) currentAudioRef.current.pause();
                    if ("object" !== "undefined" && window.speechSynthesis.speaking) {
                        window.speechSynthesis.cancel();
                    }
                }
            })["useGameLogic.useEffect"];
        }
    }["useGameLogic.useEffect"], [
        startNewGame
    ]); // CAREFUL: ensure startNewGame dependencies are stable or memoized properly if it causes loops
    const submitAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGameLogic.useCallback[submitAnswer]": (answer)=>{
            if (!isGameActive || !problem) return;
            if ("object" !== "undefined" && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            setIsGameActive(false); // Deactivate game while checking/showing feedback
            const isCorrect = checkAnswerFn(answer, problem);
            if (isCorrect) {
                setFeedbackText("Correct!"); // Or use a prop for custom message
                setShowSuccess(true);
                if (successSoundFiles.length > 0) {
                    const randomSuccessSound = successSoundFiles[Math.floor(Math.random() * successSoundFiles.length)];
                    playSound(randomSuccessSound);
                }
                if (onCorrect) onCorrect(problem);
                successTimeoutRef.current = setTimeout({
                    "useGameLogic.useCallback[submitAnswer]": ()=>{
                        startNewGame();
                    }
                }["useGameLogic.useCallback[submitAnswer]"], successDuration);
            } else {
                setFeedbackText("Try again!"); // Or use a prop
                setShowFailure(true);
                if (failureSoundFiles && failureSoundFiles.length > 0) {
                    const randomFailureSound = failureSoundFiles[Math.floor(Math.random() * failureSoundFiles.length)];
                    playSound(randomFailureSound);
                }
                if (onIncorrect) onIncorrect(problem, answer);
                failureTimeoutRef.current = setTimeout({
                    "useGameLogic.useCallback[submitAnswer]": ()=>{
                        setShowFailure(false);
                        setIsGameActive(true);
                        setFeedbackText("");
                    // Potentially refocus input or give another try without generating a new problem
                    // This part might need to be handled by the component using the hook
                    }
                }["useGameLogic.useCallback[submitAnswer]"], failureDuration);
            }
        }
    }["useGameLogic.useCallback[submitAnswer]"], [
        isGameActive,
        problem,
        checkAnswerFn,
        successSoundFiles,
        failureSoundFiles,
        playSound,
        startNewGame,
        successDuration,
        failureDuration,
        onCorrect,
        onIncorrect
    ]);
    const toggleMute = ()=>setIsMuted(!isMuted);
    return {
        problem,
        showSuccess,
        showFailure,
        isMuted,
        isGameActive,
        feedbackText,
        playInstructions,
        toggleMute,
        submitAnswer,
        startNewGame,
        playProblemSound
    };
};
_s(useGameLogic, "EhK0gQdcGu4p8NenW0Yumh71rFg=");
const __TURBOPACK__default__export__ = useGameLogic;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/GameBoardMathAddition.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NumberVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/NumberVisualizer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FeedbackSuccess$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FeedbackSuccess.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FeedbackFailure$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FeedbackFailure.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$icons$2f$LoudspeakerIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/icons/LoudspeakerIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useGameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/useGameLogic.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const GameBoardMathAddition = ()=>{
    _s();
    const [userAnswer, setUserAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const generateProblem = ()=>{
        const newNum1 = Math.floor(Math.random() * 11);
        const newNum2 = Math.floor(Math.random() * (11 - newNum1));
        return {
            num1: newNum1,
            num2: newNum2,
            correctAnswer: newNum1 + newNum2
        };
    };
    const checkAnswer = (answer, currentProblem)=>{
        const parsedAnswer = parseInt(answer, 10);
        if (isNaN(parsedAnswer)) return false;
        return parsedAnswer === currentProblem.correctAnswer;
    };
    const { problem, showSuccess, showFailure, isMuted, feedbackText: hookFeedbackText, playInstructions, toggleMute, submitAnswer, startNewGame } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useGameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        instructionText: "Add the numbers together!",
        successSoundFiles: Array.from({
            length: 12
        }, {
            "GameBoardMathAddition.useGameLogic": (_, i)=>`/sounds/success/success-${i + 1}.aac`
        }["GameBoardMathAddition.useGameLogic"]),
        failureSoundFiles: Array.from({
            length: 9
        }, {
            "GameBoardMathAddition.useGameLogic": (_, i)=>`/sounds/failure/failure-${i + 1}.aac`
        }["GameBoardMathAddition.useGameLogic"]),
        generateProblemFn: generateProblem,
        checkAnswerFn: checkAnswer,
        onCorrect: {
            "GameBoardMathAddition.useGameLogic": ()=>{
            // setUserAnswer(""); // Clear input on correct if desired, or hook can expose a resetInput callback
            }
        }["GameBoardMathAddition.useGameLogic"],
        onIncorrect: {
            "GameBoardMathAddition.useGameLogic": ()=>{
                if (inputRef.current) {
                    inputRef.current.select();
                }
            }
        }["GameBoardMathAddition.useGameLogic"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameBoardMathAddition.useEffect": ()=>{
            if (problem && !showSuccess && !showFailure && inputRef.current) {
                inputRef.current.focus();
            }
        }
    }["GameBoardMathAddition.useEffect"], [
        problem,
        showSuccess,
        showFailure
    ]);
    const [displayFeedback, setDisplayFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameBoardMathAddition.useEffect": ()=>{
            setDisplayFeedback(hookFeedbackText);
        }
    }["GameBoardMathAddition.useEffect"], [
        hookFeedbackText
    ]);
    const handleInputChange = (event)=>{
        let value = event.target.value;
        if (value.length > 2) value = value.slice(0, 2);
        setUserAnswer(value);
        if (displayFeedback) setDisplayFeedback("");
    };
    const handleSubmit = ()=>{
        if (userAnswer.trim() === "") {
            setDisplayFeedback("Please enter a number.");
            return;
        }
        submitAnswer(userAnswer);
    };
    const handleKeyDown = (event)=>{
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    const isFeedbackShowing = showSuccess || showFailure;
    if (!problem) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading game..."
        }, void 0, false, {
            fileName: "[project]/app/components/GameBoardMathAddition.tsx",
            lineNumber: 102,
            columnNumber: 12
        }, this);
    }
    const { num1, num2 } = problem;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 bg-neutral-800 rounded-xl shadow-2xl text-center max-w-3xl mx-auto border-2 border-teal-500 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 flex space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: playInstructions,
                        title: "Play Instructions",
                        className: "p-2 text-sky-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-sky-500 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$icons$2f$LoudspeakerIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleMute,
                        className: "px-3 py-1.5 text-sm font-medium text-sky-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-sky-500 transition-colors",
                        children: isMuted ? "Unmute" : "Mute"
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-10 rounded-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FeedbackSuccess$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "animate-bounce-gentle"
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl font-bold text-green-500 mt-4",
                        children: "Correct!"
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this),
            showFailure && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-10 rounded-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FeedbackFailure$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: ""
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl font-bold text-red-500 mt-4",
                        children: displayFeedback || "Try again!"
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mb-8 ${isFeedbackShowing ? "opacity-0" : "opacity-100"} transition-opacity duration-300`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center font-mono font-bold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 text-center text-sky-400 text-9xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: num1
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-none px-3 md:px-4 text-neutral-400 text-6xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 text-center text-sky-400 text-9xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: num2
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-none px-3 md:px-4 text-neutral-400 text-6xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "="
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: inputRef,
                                    type: "number",
                                    value: userAnswer,
                                    onChange: handleInputChange,
                                    onKeyDown: handleKeyDown,
                                    disabled: isFeedbackShowing,
                                    className: "w-full max-w-[200px] text-9xl font-mono font-bold text-sky-400 bg-transparent border-b-4 border-sky-500 focus:border-sky-300 outline-none text-center appearance-none m-0 p-0",
                                    "aria-label": "Enter sum"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex justify-between items-start min-h-[80px] md:min-h-[100px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NumberVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    count: num1 ?? 0,
                                    circleColor: "bg-pink-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-none px-3 md:px-4",
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NumberVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    count: num2 ?? 0,
                                    circleColor: "bg-indigo-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-none px-3 md:px-4",
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            !isFeedbackShowing && displayFeedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl text-yellow-400 mt-4",
                children: displayFeedback
            }, void 0, false, {
                fileName: "[project]/app/components/GameBoardMathAddition.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/GameBoardMathAddition.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
};
_s(GameBoardMathAddition, "AJ3n8pOnEyRUkLwcZqP8eqN3+7Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$useGameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = GameBoardMathAddition;
const __TURBOPACK__default__export__ = GameBoardMathAddition;
var _c;
__turbopack_context__.k.register(_c, "GameBoardMathAddition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/math/addition/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$GameBoardMathAddition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/GameBoardMathAddition.tsx [app-client] (ecmascript)"); // Using alias
"use client";
;
;
const MathAdditionPage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col items-center justify-center bg-neutral-800 p-4 md:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$GameBoardMathAddition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/math/addition/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/math/addition/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
};
_c = MathAdditionPage;
const __TURBOPACK__default__export__ = MathAdditionPage;
var _c;
__turbopack_context__.k.register(_c, "MathAdditionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_d7207ea5._.js.map