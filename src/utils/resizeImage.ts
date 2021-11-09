// https://stackoverflow.com/questions/1106339/resize-image-to-fit-in-bounding-box
const resizeImage = (coverHeight: number, coverWidth: number, element: Element) => {
  let {height, width} = element.getBoundingClientRect();

  height = height || coverHeight;
  width = width || coverWidth;

  console.log(height, width);
  const widthScale = coverWidth / width;
  const heightScale = coverHeight / height;
  const scale = Math.min(widthScale, heightScale);
  return {
    height: height * scale,
    width: width * scale,
  };
};

export default resizeImage;
