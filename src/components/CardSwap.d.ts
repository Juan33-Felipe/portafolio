import type { CSSProperties, ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';

export interface CardSwapItem {
  title?: string;
  image?: string;
  icon?: ReactNode;
  alt?: string;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export interface CardSwapRef {
  next: () => void;
  prev: () => void;
}

export interface CardSwapProps {
  items?: CardSwapItem[];
  children?: ReactNode;
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  depth?: number;
  skewAmount?: number;
  visibleCards?: number;
  delay?: number;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  speed?: number;
  bounce?: number;
  parallax?: number;
  hoverSpread?: number;
  dim?: number;
  cardRadius?: number;
  intro?: boolean;
  theme?: 'dark' | 'light';
  onCardClick?: (index: number) => void;
  onChange?: (index: number) => void;
  className?: string;
}

export declare const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

declare const CardSwap: ForwardRefExoticComponent<CardSwapProps & RefAttributes<CardSwapRef>>;
export default CardSwap;
