import React from 'react';
import { useConfigProvider } from '@xsky/eris-ui/ConfigProvider';

// 计算色相角度
function getHueRotate(from: string, to: string): number {
  // 简单实现：只取 HSL 的 hue 值
  function hexToHue(hex: string): number {
    // 省略边界处理
    const rgb = hex
      .replace('#', '')
      .match(/.{2}/g)!
      .map((x) => parseInt(x, 16) / 255);
    const [r, g, b] = rgb;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0;
    if (max === min) h = 0;
    else if (max === r) h = (60 * ((g - b) / (max - min)) + 360) % 360;
    else if (max === g) h = (60 * ((b - r) / (max - min)) + 120) % 360;
    else h = (60 * ((r - g) / (max - min)) + 240) % 360;
    return h;
  }
  return Math.round(hexToHue(to) - hexToHue(from));
}

export interface ThemedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  originColor?: string; // 原始主色，hex 格式
  enableAutoThemeColor?: boolean;
}
const ThemedImage: React.FC<ThemedImageProps> = ({
  originColor = '#6035EB',
  style,
  enableAutoThemeColor = true,
  ...props
}) => {
  const customContext = useConfigProvider();
  const themeColor = customContext?.themeColor;
  const hue = enableAutoThemeColor && themeColor ? getHueRotate(originColor, themeColor) : 0;

  return (
    <img
      {...props}
      alt={props.alt ?? ''}
      style={{
        filter: `hue-rotate(${hue}deg)`,
        ...style,
      }}
    />
  );
};

ThemedImage.displayName = 'ThemedImage';

export default ThemedImage;
