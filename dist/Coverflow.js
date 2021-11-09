var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useTouchEvent from './hooks/useTouchEvent';
import useKeyPress from './hooks/useKeyPress';
import useWindowSize from './hooks/useWindowSize';
import { OPACITY_ORDER, ROTATION, SCALE_ORDER } from './utils/constants';
import clamp from './utils/clamp';
import fetchElements from './utils/fetchImages';
import resizeElement from './utils/resizeImage';
import './styles.scss';
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
    var slidesGreaterThanOpacityLength = useMemo(function () { return function () { return __spreadArrays(opacityInterval, Array(diff).fill(opacityInterval[opacityInterval.length - 1]), [0]); }; }, [diff, opacityInterval]);
    var slidesLessThanOpacityLength = useMemo(function () { return function () { return __spreadArrays(opacityInterval.slice(0, slidesPerSide + 1), [0]); }; }, [
        opacityInterval,
        slidesPerSide,
    ]);
    var opacityIntervalOverride = useMemo(function () {
        return slidesPerSide
            ? isSlidesGreaterThanOpacityLength
                ? slidesGreaterThanOpacityLength()
                : slidesLessThanOpacityLength()
            : OPACITY_ORDER;
    }, [isSlidesGreaterThanOpacityLength, slidesGreaterThanOpacityLength, slidesLessThanOpacityLength, slidesPerSide]);
    var coverflowRef = useRef();
    var _e = useState([]), leftEdgeList = _e[0], setLeftEdgeList = _e[1];
    var _f = useState([]), elementsList = _f[0], setElementsList = _f[1];
    var _g = useState([]), imageInfoList = _g[0], setElementInfoList = _g[1];
    var _h = useState(0), currentIndex = _h[0], setCurrentIndex = _h[1];
    var _j = useWindowSize(), height = _j.height, width = _j.width;
    var leftArrowKeyPress = useKeyPress('ArrowLeft');
    var rightArrowKeyPress = useKeyPress('ArrowRight');
    var _k = useTouchEvent(), ref = _k[0], _l = _k[1], isMoving = _l.isMoving, isLeft = _l.isLeft, isRight = _l.isRight;
    useEffect(function () {
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
    useEffect(function () {
        if (leftArrowKeyPress) {
            setCurrentIndex(function (currentIndex) { return (currentIndex > 0 ? currentIndex - 1 : currentIndex); });
        }
        if (rightArrowKeyPress) {
            setCurrentIndex(function (currentIndex) { return (currentIndex < elementsList.length - 1 ? currentIndex + 1 : currentIndex); });
        }
    }, [leftArrowKeyPress, rightArrowKeyPress, elementsList.length]);
    var detachedElements = [];
    if (elements instanceof Array) {
        detachedElements = elements;
    }
    else {
        for (var i in elements) {
            detachedElements.push(elements[i]);
        }
    }
    detachedElements.filter(function (x) {
        var res = !!x.parentElement;
        console.log(res);
        return res;
    }).forEach(function (x) { x.parentElement.removeChild(x); });
    /**
     * Image fetch
     */
    useEffect(function () {
        var fetch = function (originalElementList) { return __awaiter(void 0, void 0, void 0, function () {
            var fetchedElements, succeededElements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchElements(originalElementList)];
                    case 1:
                        fetchedElements = _a.sent();
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
    useLayoutEffect(function () {
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
            var imageDimension = resizeElement(coverflowHeight, coverflowWidth, element);
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
                    var nextImageDimension = resizeElement(coverflowHeight, coverflowWidth, nextImage);
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
    if (!imageInfoList.length) {
        return null;
    }
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: (className !== null && className !== void 0 ? className : '') + " coverflow-wrapper", ref: ref },
            React.createElement("div", { ref: coverflowRef, className: "coverflow", style: {
                    transform: "translateX(-" + (leftEdgeList[currentIndex] + ((_a = imageInfoList[currentIndex]) === null || _a === void 0 ? void 0 : _a.width) / 2) + "px)",
                } }, imageInfoList.map(function (imageInfo, index) {
                var zIndex = imageInfo.zIndex, href = imageInfo.href, element = imageInfo.element, scaledWidth = imageInfo.scaledWidth, width = imageInfo.width, height = imageInfo.height, rotate = imageInfo.rotate, opacity = imageInfo.opacity, scale = imageInfo.scale, isCurrentImage = imageInfo.isCurrentImage, isVisible = imageInfo.isVisible;
                var leftPosition = leftEdgeList[index];
                return (React.createElement("div", { key: index, className: "coverflow__image-container " + (isVisible ? 'coverflow__image-container--visible' : '') + " " + (isCurrentImage ? 'coverflow__image-container--active' : ''), style: {
                        zIndex: zIndex,
                        left: leftPosition + "px",
                        width: scaledWidth + "px",
                        height: height + "px",
                    } },
                    React.createElement("button", { className: "coverflow__button", tabIndex: isCurrentImage && href ? 0 : -1, onClick: function () {
                            if (isVisible) {
                                handleButtonClick(index, href);
                            }
                        }, style: {
                            transform: "scale(" + scale + ") rotateY(" + rotate + "deg)",
                            pointerEvents: isVisible ? 'all' : 'none',
                            cursor: "" + (isCurrentImage && href ? 'pointer' : ''),
                        } },
                        React.createElement("div", { className: "coverflow__element", style: {
                                height: height + "px",
                                width: width + "px",
                                opacity: "" + opacity,
                            } }, { element: element }))));
            })))));
};
export default Coverflow;
//# sourceMappingURL=Coverflow.js.map