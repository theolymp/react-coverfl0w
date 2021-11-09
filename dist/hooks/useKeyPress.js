import { useEffect, useState } from 'react';
// Taken from useHooks site
function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    var _a = useState(false), keyPressed = _a[0], setKeyPressed = _a[1];
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
    useEffect(function () {
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
export default useKeyPress;
//# sourceMappingURL=useKeyPress.js.map