// @TODO: these types don't actually work.. at all...
var allSettled = function (promises) {
    var wrappedPromises = promises.map(function (p) {
        return Promise.resolve(p).then(function (val) { return ({ status: "fulfilled", value: val }); }, function (err) { return ({ status: "rejected", reason: err }); });
    });
    return Promise.all(wrappedPromises);
};
export default allSettled;
//# sourceMappingURL=allSettled.js.map