export interface Image {
    src: string;
    href?: string;
    alt?: string;
}
export interface CoverflowProps {
    className?: string;
    elements: Element[] | NodeListOf<Element> | HTMLCollection;
    slidesPerSide?: number;
    rotation?: number;
    opacityInterval?: number[];
    scaleInterval?: number[];
}
export interface ElementInfo {
    isCurrentImage: boolean;
    isVisible: boolean;
    height: number;
    width: number;
    scaledWidth: number;
    zIndex: number;
    scale: number;
    rotate: number;
    opacity: number;
    element: Element;
    href: string;
}
