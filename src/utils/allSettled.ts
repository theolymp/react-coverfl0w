export interface PromiseResolution<T> {
  status: "fulfilled";
  value: T;
}

export interface PromiseRejection {
  status: "rejected";
  reason: Error;
}

export type PromiseResult<T> = PromiseResolution<T> | PromiseRejection;

// @TODO: these types don't actually work.. at all...
const allSettled = <T>(promises: Promise<T>[]): Promise<PromiseResult<T>[]> => {
  let wrappedPromises = promises.map(p =>
    Promise.resolve(p).then(
      val => ({ status: "fulfilled", value: val }) as PromiseResolution<T>,
      (err: Error) => ({ status: "rejected", reason: err }) as PromiseRejection
    )
  );

  return Promise.all(wrappedPromises);
};

export default allSettled;
