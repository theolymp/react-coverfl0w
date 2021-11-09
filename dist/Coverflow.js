import { __awaiter, __generator, __spreadArrays } from "tslib";
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
    var _g = useState([]), elementInfoList = _g[0], setElementInfoList = _g[1];
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
    useEffect(function () {
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
    if (!elementInfoList.length) {
        return null;
    }
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: (className !== null && className !== void 0 ? className : '') + " coverflow-wrapper", ref: ref },
            React.createElement("div", { ref: coverflowRef, className: "coverflow", style: {
                    transform: "translateX(-" + (leftEdgeList[currentIndex] + ((_a = elementInfoList[currentIndex]) === null || _a === void 0 ? void 0 : _a.width) / 2) + "px)",
                } }, elementInfoList.map(function (imageInfo, index) {
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
                        React.createElement("div", { dangerouslySetInnerHTML: { __html: element.outerHTML }, className: "coverflow__element", style: {
                                height: height + "px",
                                width: width + "px",
                                opacity: "" + opacity,
                            } }))));
            })))));
};
export default Coverflow;
//# sourceMappingURL=Coverflow.js.map