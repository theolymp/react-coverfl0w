export interface PromiseResolution<T> {
    status: "fulfilled";
    value: T;
}
export interface PromiseRejection {
    status: "rejected";
    reason: Error;
}
export declare type PromiseResult<T> = PromiseResolution<T> | PromiseRejection;
declare const allSettled: <T>(promises: Promise<T>[]) => Promise<PromiseResult<T>[]>;
export default allSettled;
