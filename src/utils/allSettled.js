"use strict";
exports.__esModule = true;
// @TODO: these types don't actually work.. at all...
var allSettled = function (promises) {
    var wrappedPromises = promises.map(function (p) {
        return Promise.resolve(p).then(function (val) { return ({ status: 'fulfilled', value: val }); }, function (err) { return ({ status: 'rejected', reason: err }); });
    });
    // @ts-expect-error - typescript isn't smart enough to see the disjoint here
    return Promise.all(wrappedPromises);
};
exports["default"] = allSettled;
