(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

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
"[project]/app/components/gameBoards/GameBoardMultiplication.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/elements/Card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
const clamp = (value, min, max)=>Math.min(max, Math.max(min, value));
const MAX_DIMENSION = 100;
const MIN_DIMENSION = 1;
const GRID_GAP_PX = 6; // keep in sync with style gap: "6px"
const WRAPPER_PADDING_PX = 12; // p-3 => 12px padding on each side
const GameBoardMultiplication = ()=>{
    _s();
    const [x, setX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [y, setY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    const [xDraft, setXDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("3");
    const [yDraft, setYDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("4");
    const [cellSize, setCellSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(24);
    const [gridHeightPx, setGridHeightPx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(360);
    const gridWrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleXChange = (event)=>{
        const raw = event.target.value;
        const numericOnly = raw.replace(/\D/g, "");
        if (numericOnly.length === 0) {
            setXDraft("");
            return;
        }
        const parsed = parseInt(numericOnly, 10);
        const committed = clamp(isNaN(parsed) ? x : parsed, MIN_DIMENSION, MAX_DIMENSION);
        setX(committed);
        setXDraft(String(committed));
    };
    const handleYChange = (event)=>{
        const raw = event.target.value;
        const numericOnly = raw.replace(/\D/g, "");
        if (numericOnly.length === 0) {
            setYDraft("");
            return;
        }
        const parsed = parseInt(numericOnly, 10);
        const committed = clamp(isNaN(parsed) ? y : parsed, MIN_DIMENSION, MAX_DIMENSION);
        setY(committed);
        setYDraft(String(committed));
    };
    const handleXBlur = ()=>{
        if (xDraft === "") {
            setXDraft(String(x));
            return;
        }
        const parsed = parseInt(xDraft, 10);
        const committed = clamp(isNaN(parsed) ? x : parsed, MIN_DIMENSION, MAX_DIMENSION);
        setX(committed);
        setXDraft(String(committed));
    };
    const handleYBlur = ()=>{
        if (yDraft === "") {
            setYDraft(String(y));
            return;
        }
        const parsed = parseInt(yDraft, 10);
        const committed = clamp(isNaN(parsed) ? y : parsed, MIN_DIMENSION, MAX_DIMENSION);
        setY(committed);
        setYDraft(String(committed));
    };
    const recomputeCellSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardMultiplication.useCallback[recomputeCellSize]": ()=>{
            const wrapper = gridWrapperRef.current;
            if (!wrapper) return;
            const rect = wrapper.getBoundingClientRect();
            const availableWidth = rect.width;
            const availableHeight = rect.height;
            if (!availableWidth || !availableHeight) return;
            // Subtract wrapper padding and grid gaps to keep content within bounds
            const usableWidth = Math.max(0, availableWidth - 2 * WRAPPER_PADDING_PX);
            const usableHeight = Math.max(0, availableHeight - 2 * WRAPPER_PADDING_PX);
            const totalHorizontalGaps = Math.max(0, x - 1) * GRID_GAP_PX;
            const totalVerticalGaps = Math.max(0, y - 1) * GRID_GAP_PX;
            const perCellWidth = (usableWidth - totalHorizontalGaps) / x;
            const perCellHeight = (usableHeight - totalVerticalGaps) / y;
            const size = Math.floor(Math.min(perCellWidth, perCellHeight));
            setCellSize(clamp(size, 4, 64));
        }
    }["GameBoardMultiplication.useCallback[recomputeCellSize]"], [
        x,
        y
    ]);
    const recomputeGridHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameBoardMultiplication.useCallback[recomputeGridHeight]": ()=>{
            const wrapper = gridWrapperRef.current;
            if (!wrapper) return;
            const viewport = (window.visualViewport?.height ?? window.innerHeight) || 0;
            const top = wrapper.getBoundingClientRect().top;
            const desired = Math.max(160, Math.floor(viewport - top - 24));
            setGridHeightPx(desired);
        }
    }["GameBoardMultiplication.useCallback[recomputeGridHeight]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameBoardMultiplication.useEffect": ()=>{
            recomputeCellSize();
        }
    }["GameBoardMultiplication.useEffect"], [
        x,
        y,
        recomputeCellSize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameBoardMultiplication.useEffect": ()=>{
            if (!gridWrapperRef.current) return;
            const ro = new ResizeObserver({
                "GameBoardMultiplication.useEffect": ()=>{
                    recomputeGridHeight();
                    recomputeCellSize();
                }
            }["GameBoardMultiplication.useEffect"]);
            ro.observe(gridWrapperRef.current);
            const onResize = {
                "GameBoardMultiplication.useEffect.onResize": ()=>{
                    recomputeGridHeight();
                    recomputeCellSize();
                }
            }["GameBoardMultiplication.useEffect.onResize"];
            window.addEventListener("resize", onResize);
            // Kick once after paint
            setTimeout({
                "GameBoardMultiplication.useEffect": ()=>{
                    recomputeGridHeight();
                    recomputeCellSize();
                }
            }["GameBoardMultiplication.useEffect"], 0);
            return ({
                "GameBoardMultiplication.useEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener("resize", onResize);
                }
            })["GameBoardMultiplication.useEffect"];
        }
    }["GameBoardMultiplication.useEffect"], [
        recomputeCellSize,
        recomputeGridHeight
    ]);
    const cells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GameBoardMultiplication.useMemo[cells]": ()=>x * y
    }["GameBoardMultiplication.useMemo[cells]"], [
        x,
        y
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full flex flex-col items-center justify-center relative overflow-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-auto max-h-[80vh] mb-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full mx-auto max-w-[90vw]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mb-4 min-h-[3.25rem]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: MIN_DIMENSION,
                                        max: MAX_DIMENSION,
                                        value: xDraft,
                                        onChange: handleXChange,
                                        onBlur: handleXBlur,
                                        className: "w-24 rounded-md border border-sky-200 bg-white px-3 py-2 text-2xl font-bold text-sky-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400",
                                        "aria-label": "X dimension"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-indigo-600 text-white shadow-lg/20 flex items-center gap-2 select-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-xl md:text-2xl",
                                            children: [
                                                y,
                                                " × ",
                                                x,
                                                " ="
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-0.5 rounded-md bg-amber-300 text-indigo-900 font-extrabold text-2xl md:text-3xl",
                                            children: x * y
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: MIN_DIMENSION,
                                        max: MAX_DIMENSION,
                                        value: yDraft,
                                        onChange: handleYChange,
                                        onBlur: handleYBlur,
                                        className: "w-24 rounded-md border border-sky-200 bg-white px-3 py-2 text-2xl font-bold text-sky-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400",
                                        "aria-label": "Y dimension"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$elements$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardLight"], {
                                    className: "w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: gridWrapperRef,
                                        className: "w-full mx-auto rounded-lg p-3 overflow-y-auto overflow-x-hidden",
                                        style: {
                                            height: `${gridHeightPx}px`,
                                            maxHeight: "70vh"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid place-content-center",
                                            style: {
                                                gridTemplateColumns: `repeat(${x}, ${cellSize}px)`,
                                                gridAutoRows: `${cellSize}px`,
                                                gap: "6px"
                                            },
                                            "aria-label": `Grid ${x} by ${y}`,
                                            role: "grid",
                                            children: Array.from({
                                                length: cells
                                            }).map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    role: "gridcell",
                                                    className: "bg-blue-900 border border-blue-950 rounded-sm shadow-sm box-border"
                                                }, `cell-${idx}`, false, {
                                                    fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/gameBoards/GameBoardMultiplication.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
};
_s(GameBoardMultiplication, "UJPnQqmiiFlsjICddRjwS/3oALk=");
_c = GameBoardMultiplication;
const __TURBOPACK__default__export__ = GameBoardMultiplication;
var _c;
__turbopack_context__.k.register(_c, "GameBoardMultiplication");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/games/multiplication/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MultiplicationPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$gameBoards$2f$GameBoardMultiplication$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/gameBoards/GameBoardMultiplication.tsx [app-client] (ecmascript)");
"use client";
;
;
function MultiplicationPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen flex-col items-center justify-center bg-white relative h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$gameBoards$2f$GameBoardMultiplication$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/games/multiplication/page.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/games/multiplication/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = MultiplicationPage;
var _c;
__turbopack_context__.k.register(_c, "MultiplicationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_604413c1._.js.map