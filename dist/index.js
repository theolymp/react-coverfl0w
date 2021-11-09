

function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var TOUCH_START = 'touchStart';
var TOUCH_MOVE = 'touchMove';
var TOUCH_END = 'touchEnd';
var initialState = {
    start: 0,
    end: 0,
    isLeft: false,
    isRight: false,
    isMoving: false,
};
function reducer(state, action) {
    switch (action.type) {
        case TOUCH_START:
            return __assign(__assign({}, state), { start: action.payload, isMoving: false });
        case TOUCH_MOVE:
            if (state.start - action.payload > 70) {
                return __assign(__assign({}, state), { isRight: true, isLeft: false, isMoving: true, end: action.payload });
            }
            if (state.start - action.payload < -70) {
                return __assign(__assign({}, state), { isRight: false, isLeft: true, isMoving: true, end: action.payload });
            }
            return __assign(__assign({}, state), { isMoving: true, end: action.payload });
        case TOUCH_END:
            return __assign(__assign({}, state), { isRight: false, isLeft: false, isMoving: false });
        default:
            throw new Error();
    }
}
function useTouchEvent() {
    var _a = React.useState(null), el = _a[0], setEl = _a[1];
    // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
    var ref = React.useCallback(function (node) {
        if (node !== null) {
            setEl(node);
        }
    }, []);
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    React.useEffect(function () {
        if (el !== null) {
            var handleTouchStart_1 = function (e) {
                dispatch({ type: TOUCH_START, payload: e.targetTouches[0].clientX });
            };
            var handleTouchMove_1 = function (e) {
                dispatch({ type: TOUCH_MOVE, payload: e.targetTouches[0].clientX });
            };
            var handleTouchEnd_1 = function () {
                dispatch({ type: TOUCH_END });
            };
            // Add event listener
            el.addEventListener('touchstart', handleTouchStart_1, { passive: false });
            el.addEventListener('touchmove', handleTouchMove_1, { passive: false });
            el.addEventListener('touchend', handleTouchEnd_1, { passive: false });
            // Remove event listener on cleanup
            return function () {
                el.addEventListener('touchstart', handleTouchStart_1);
                el.addEventListener('touchmove', handleTouchMove_1);
                el.addEventListener('touchend', handleTouchEnd_1);
            };
        }
        return null;
    }, [el]);
    return [ref, state];
}

// Taken from useHooks site
function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    var _a = React.useState(false), keyPressed = _a[0], setKeyPressed = _a[1];
    // If pressed key is our target key then set to true
    function downHandler(_a) {
        var key = _a.key;
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    // If released key is our target key then set to false
    var upHandler = function (_a) {
        var key = _a.key;
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    // Add event listeners
    React.useEffect(function () {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return function () {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    var _a = React.useState({
        width: undefined,
        height: undefined
    }), windowSize = _a[0], setWindowSize = _a[1];
    React.useEffect(function () {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

var ROTATION = 45;
var OPACITY_ORDER = [1, 0.8, 0.5, 0.2];
var SCALE_ORDER = [1, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

var clamp = function (value, lowBound, highBound) { return Math.max(lowBound, Math.min(highBound, value)); };

// @TODO: these types don't actually work.. at all...
var allSettled = function (promises) {
    var wrappedPromises = promises.map(function (p) {
        return Promise.resolve(p).then(function (val) { return ({ status: "fulfilled", value: val }); }, function (err) { return ({ status: "rejected", reason: err }); });
    });
    return Promise.all(wrappedPromises);
};

var fetchElement = function (element) {
    return new Promise(function (resolve, reject) {
        if (element.tagName === 'IMG') {
            var img = element;
            img.onload = function () { return resolve(element); };
            img.onerror = function () { return reject('oops'); };
            img.setAttribute('src', element.getAttribute('src'));
            return;
        }
        var images = element.getElementsByTagName('img');
        var tasks = [];
        var _loop_1 = function (i) {
            var element_1 = images[i];
            tasks.push(new Promise(function (res, rej) {
                element_1.onload = function () { return res(element_1); };
                element_1.onerror = function () { return rej('oops'); };
                element_1.setAttribute('src', element_1.getAttribute('src'));
            }));
        };
        for (var i = 0; i < images.length; i++) {
            _loop_1(i);
        }
        if (tasks.length < 1) {
            resolve(element);
            return;
        }
        allSettled(tasks).then(function () { return resolve(element); }).catch(function () { return reject('subimg oops'); });
    });
};
var fetchElements = function (elements) {
    var promises = elements.map(fetchElement);
    return allSettled(promises);
};

// https://stackoverflow.com/questions/1106339/resize-image-to-fit-in-bounding-box
var resizeImage = function (coverHeight, coverWidth, element) {
    var _a = element.getBoundingClientRect(), height = _a.height, width = _a.width;
    height = height || coverHeight;
    width = width || coverWidth;
    console.log(height, width);
    var widthScale = coverWidth / width;
    var heightScale = coverHeight / height;
    var scale = Math.min(widthScale, heightScale);
    return {
        height: height * scale,
        width: width * scale,
    };
};

___$insertStyle(".main {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n\n.coverflow-wrapper {\n  width: 100%;\n  height: 100%;\n}\n\n.coverflow {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1);\n  touch-action: none;\n  left: 50%;\n}\n.coverflow__image-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  perspective: 100vw;\n  transform: translateZ(0);\n  transition: left 500ms cubic-bezier(0.215, 0.61, 0.355, 1), width 500ms cubic-bezier(0.215, 0.61, 0.355, 1);\n  pointer-events: none;\n  user-select: none;\n}\n.coverflow__image-container--visible:not(.coverflow__image-container--active):hover > button {\n  box-shadow: none;\n}\n@media (min-width: 768px) {\n  .coverflow__image-container--visible:not(.coverflow__image-container--active):hover > button {\n    box-shadow: 0 1px 25px 10px rgba(255, 255, 255, 0.5);\n  }\n}\n.coverflow__button {\n  transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 500ms cubic-bezier(0.215, 0.61, 0.355, 1);\n  background: none;\n  border: none;\n  margin: 0;\n  padding: 0;\n  outline: none;\n}\n.coverflow__element {\n  display: block;\n  transform: translateZ(0);\n  transition: opacity 500ms cubic-bezier(0.215, 0.61, 0.355, 1);\n}");

var isPromiseResolution = function (promise) {
    return promise.value !== undefined;
};
var Coverflow = function (props) {
    var _a;
    var className = props.className, elements = props.elements, slidesPerSide = props.slidesPerSide, _b = props.rotation, rotation = _b === void 0 ? ROTATION : _b, _c = props.opacityInterval, opacityInterval = _c === void 0 ? OPACITY_ORDER : _c, _d = props.scaleInterval, scaleInterval = _d === void 0 ? SCALE_ORDER : _d;
    /**
     * Sliders per side
     */
    var diff = slidesPerSide + 1 - opacityInterval.length;
    var isSlidesGreaterThanOpacityLength = diff >= 0;
    var slidesGreaterThanOpacityLength = React.useMemo(function () { return function () { return __spreadArray(__spreadArray(__spreadArray([], opacityInterval, true), Array(diff).fill(opacityInterval[opacityInterval.length - 1]), true), [0]); }; }, [diff, opacityInterval]);
    var slidesLessThanOpacityLength = React.useMemo(function () { return function () { return __spreadArray(__spreadArray([], opacityInterval.slice(0, slidesPerSide + 1), true), [0]); }; }, [
        opacityInterval,
        slidesPerSide,
    ]);
    var opacityIntervalOverride = React.useMemo(function () {
        return slidesPerSide
            ? isSlidesGreaterThanOpacityLength
                ? slidesGreaterThanOpacityLength()
                : slidesLessThanOpacityLength()
            : OPACITY_ORDER;
    }, [isSlidesGreaterThanOpacityLength, slidesGreaterThanOpacityLength, slidesLessThanOpacityLength, slidesPerSide]);
    var coverflowRef = React.useRef();
    var _e = React.useState([]), leftEdgeList = _e[0], setLeftEdgeList = _e[1];
    var _f = React.useState([]), elementsList = _f[0], setElementsList = _f[1];
    var _g = React.useState([]), elementInfoList = _g[0], setElementInfoList = _g[1];
    var _h = React.useState(0), currentIndex = _h[0], setCurrentIndex = _h[1];
    var _j = useWindowSize(), height = _j.height, width = _j.width;
    var leftArrowKeyPress = useKeyPress('ArrowLeft');
    var rightArrowKeyPress = useKeyPress('ArrowRight');
    var _k = useTouchEvent(), ref = _k[0], _l = _k[1], isMoving = _l.isMoving, isLeft = _l.isLeft, isRight = _l.isRight;
    React.useEffect(function () {
        if (isMoving && isLeft) {
            setCurrentIndex(function (currentIndex) { return (currentIndex > 0 ? currentIndex - 1 : currentIndex); });
        }
        if (isMoving && isRight) {
            setCurrentIndex(function (currentIndex) { return (currentIndex < elementsList.length - 1 ? currentIndex + 1 : currentIndex); });
        }
    }, [isMoving, isLeft, isRight, elementsList.length]);
    /**
     * Arrow Keys
     */
    React.useEffect(function () {
        if (leftArrowKeyPress) {
            setCurrentIndex(function (currentIndex) { return (currentIndex > 0 ? currentIndex - 1 : currentIndex); });
        }
        if (rightArrowKeyPress) {
            setCurrentIndex(function (currentIndex) { return (currentIndex < elementsList.length - 1 ? currentIndex + 1 : currentIndex); });
        }
    }, [leftArrowKeyPress, rightArrowKeyPress, elementsList.length]);
    console.log('elements: ', elements);
    var detachedElements = [];
    if (elements instanceof Array) {
        detachedElements = elements;
    }
    else {
        for (var i = 0; i < elements.length; i++) {
            detachedElements.push(elements[i]);
        }
    }
    detachedElements.filter(function (x) { return !!x.parentElement; }).forEach(function (x) { return x.parentElement.removeChild(x); });
    /**
     * Image fetch
     */
    React.useEffect(function () {
        var fetch = function (originalElementList) { return __awaiter(void 0, void 0, void 0, function () {
            var fetchedElements, succeededElements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchElements(originalElementList)];
                    case 1:
                        fetchedElements = _a.sent();
                        console.log('Fetched Elements: ', fetchedElements);
                        succeededElements = fetchedElements
                            .filter(function (_a) {
                            var status = _a.status;
                            return status === 'fulfilled';
                        })
                            .map(function (item) {
                            if (isPromiseResolution(item)) {
                                return item.value;
                            }
                            return undefined;
                        });
                        setElementsList(succeededElements);
                        setCurrentIndex(Math.floor(succeededElements.length / 2));
                        return [2 /*return*/];
                }
            });
        }); };
        fetch(detachedElements);
    }, [elements]);
    /**
     * Sizing / Edges
     */
    React.useLayoutEffect(function () {
        var leftEdgeList = []; // raw image no scale applied
        var elementInfoList = [];
        var edge = 0;
        var coverflowHeight = coverflowRef.current !== undefined ? coverflowRef.current.getBoundingClientRect().height : 0;
        var coverflowWidth = coverflowRef.current !== undefined ? coverflowRef.current.getBoundingClientRect().width : 0;
        elementsList.forEach(function (element, index) {
            var elementInfo = {};
            var distanceFromMiddle = index - currentIndex;
            var absDistanceFromMiddle = Math.abs(index - currentIndex);
            var scale = scaleInterval[clamp(absDistanceFromMiddle, 0, scaleInterval.length - 1)];
            var imageDimension = resizeImage(coverflowHeight, coverflowWidth, element);
            var scaledWidth = imageDimension.width * scale;
            leftEdgeList.push(edge);
            var rotate = index > currentIndex ? -rotation : index === currentIndex ? 0 : rotation;
            var zIndex = 100 - absDistanceFromMiddle;
            var opacity = opacityIntervalOverride[clamp(absDistanceFromMiddle, 0, opacityIntervalOverride.length - 1)];
            var isVisible = opacityIntervalOverride[absDistanceFromMiddle] !== 0 &&
                opacityIntervalOverride[absDistanceFromMiddle] !== undefined;
            elementInfo.isCurrentImage = index === currentIndex;
            elementInfo.isVisible = isVisible;
            elementInfo.height = imageDimension.height;
            elementInfo.width = imageDimension.width;
            elementInfo.scaledWidth = scaledWidth;
            elementInfo.zIndex = zIndex;
            elementInfo.scale = scale;
            elementInfo.rotate = rotate;
            elementInfo.opacity = opacity;
            elementInfo.element = element;
            // LEFT HAND SIDE
            if (distanceFromMiddle < 0) {
                // we only want to move 20% so they overlap
                edge += scaledWidth * 0.2;
            }
            else {
                // RIGHT HAND SIDE
                var nextImage = elementsList[index + 1] || null;
                if (nextImage) {
                    var nextImageDistanceFromCenter = index + 1 - currentIndex;
                    var nextScale = scaleInterval[clamp(Math.abs(nextImageDistanceFromCenter), 0, scaleInterval.length - 1)];
                    var nextImageDimension = resizeImage(coverflowHeight, coverflowWidth, nextImage);
                    var nextImageScaledWidth = nextImageDimension.width * nextScale;
                    edge += scaledWidth - nextImageScaledWidth + nextImageScaledWidth * 0.2;
                }
                else {
                    edge += scaledWidth;
                }
            }
            elementInfoList.push(elementInfo);
        });
        setElementInfoList(elementInfoList);
        setLeftEdgeList(leftEdgeList);
    }, [currentIndex, elementsList, height, width, scaleInterval, opacityIntervalOverride]);
    var handleButtonClick = function (index, href) {
        if (index === void 0) { index = 0; }
        if (index === currentIndex && href) {
            window.open(href, '_blank');
        }
        setCurrentIndex(index);
    };
    if (!elementInfoList.length) {
        return null;
    }
    return (React__default["default"].createElement("div", { className: "main" },
        React__default["default"].createElement("div", { className: (className !== null && className !== void 0 ? className : '') + " coverflow-wrapper", ref: ref },
            React__default["default"].createElement("div", { ref: coverflowRef, className: "coverflow", style: {
                    transform: "translateX(-" + (leftEdgeList[currentIndex] + ((_a = elementInfoList[currentIndex]) === null || _a === void 0 ? void 0 : _a.width) / 2) + "px)",
                } }, elementInfoList.map(function (imageInfo, index) {
                var zIndex = imageInfo.zIndex, href = imageInfo.href, element = imageInfo.element, scaledWidth = imageInfo.scaledWidth, width = imageInfo.width, height = imageInfo.height, rotate = imageInfo.rotate, opacity = imageInfo.opacity, scale = imageInfo.scale, isCurrentImage = imageInfo.isCurrentImage, isVisible = imageInfo.isVisible;
                var leftPosition = leftEdgeList[index];
                return (React__default["default"].createElement("div", { key: index, className: "coverflow__image-container " + (isVisible ? 'coverflow__image-container--visible' : '') + " " + (isCurrentImage ? 'coverflow__image-container--active' : ''), style: {
                        zIndex: zIndex,
                        left: leftPosition + "px",
                        width: scaledWidth + "px",
                        height: height + "px",
                    } },
                    React__default["default"].createElement("button", { className: "coverflow__button", tabIndex: isCurrentImage && href ? 0 : -1, onClick: function () {
                            if (isVisible) {
                                handleButtonClick(index, href);
                            }
                        }, style: {
                            transform: "scale(" + scale + ") rotateY(" + rotate + "deg)",
                            pointerEvents: isVisible ? 'all' : 'none',
                            cursor: "" + (isCurrentImage && href ? 'pointer' : ''),
                        } },
                        React__default["default"].createElement("div", { dangerouslySetInnerHTML: { __html: element.outerHTML }, className: "coverflow__element", style: {
                                height: height + "px",
                                width: width + "px",
                                opacity: "" + opacity,
                            } }))));
            })))));
};

exports["default"] = Coverflow;
//# sourceMappingURL=index.js.map
