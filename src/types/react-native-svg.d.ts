declare module 'react-native-svg' {
  export interface SvgProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    fill?: string;
  }
  export interface PathProps {
    d?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'miter' | 'round' | 'bevel';
  }
  export const Svg: React.FC<SvgProps>;
  export const Path: React.FC<PathProps>;
}