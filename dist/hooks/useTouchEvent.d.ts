interface State {
    start: number;
    end: number;
    isLeft: boolean;
    isRight: boolean;
    isMoving: boolean;
}
declare function useTouchEvent(): [(node: HTMLElement) => void, State];
export default useTouchEvent;
