import allSettled from './allSettled';
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
        for (var i in images) {
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
export default fetchElements;
//# sourceMappingURL=fetchImages.js.map