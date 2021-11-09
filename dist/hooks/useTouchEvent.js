import { __assign } from "tslib";
import { useCallback, useEffect, useReducer, useState } from 'react';
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
    var _a = useState(null), el = _a[0], setEl = _a[1];
    // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
    var ref = useCallback(function (node) {
        if (node !== null) {
            setEl(node);
        }
    }, []);
    var _b = useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    useEffect(function () {
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
export default useTouchEvent;
//# sourceMappingURL=useTouchEvent.js.map