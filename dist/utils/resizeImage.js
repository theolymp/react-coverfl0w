// https://stackoverflow.com/questions/1106339/resize-image-to-fit-in-bounding-box
var resizeImage = function (coverHeight, coverWidth, element) {
    var _a = element.getBoundingClientRect(), height = _a.height, width = _a.width;
    var widthScale = coverWidth / width;
    var heightScale = coverHeight / height;
    var scale = Math.min(widthScale, heightScale);
    return {
        height: height * scale,
        width: width * scale,
    };
};
export default resizeImage;
//# sourceMappingURL=resizeImage.js.map