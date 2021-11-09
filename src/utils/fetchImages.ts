import allSettled from './allSettled';

const fetchElement = (element : Element) => {
  return new Promise<Element>((resolve, reject) => {
    if(element.tagName === 'IMG')
    {
      const img = element as HTMLImageElement;
      img.onload = () => resolve(element);
      img.onerror = () => reject('oops');
      img.setAttribute('src', element.getAttribute('src'));
      return;
    }

    const images = element.getElementsByTagName('img');
    const tasks = [];
    for(let i = 0; i < images.length; i++){
      const element = images[i] as HTMLImageElement;
      tasks.push(new Promise<HTMLImageElement>((res,rej) => {
        element.onload = () => res(element);
        element.onerror = () => rej('oops');
        element.setAttribute('src', element.getAttribute('src'));
      }))
    }

    if(tasks.length < 1){
      resolve(element);
      return;
    }

    allSettled(tasks).then(() => resolve(element)).catch(() => reject('subimg oops'));
  });
};

const fetchElements = (elements: Element[]) => {
  const promises = elements.map(fetchElement);
  return allSettled(promises);
};

export default fetchElements;
