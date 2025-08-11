const getAttrs = (style, svgAttrs) => {
  const baseAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 'size',
    height: 'size',
    viewBox: `0 0 ${svgAttrs.width} ${svgAttrs.height}`,
  };
  const fillAttrs = {
    fill: 'color',
    otherProps: '...otherProps',
  };
  const strokeAttrs = {
    fill: 'none',
    stroke: 'color',
    strokeWidth: 1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    otherProps: '...otherProps',
  };
  return { ...baseAttrs, ...(style === 'fill' ? fillAttrs : strokeAttrs) };
};

const getElementCode = (ComponentName, attrs, svgAttrs, svgCode) =>
  `import React, { ForwardedRef, SVGProps } from 'react';

  const ${ComponentName} = React.forwardRef(({color = '${svgCode?.toString()?.includes('div') ? 'none' : 'currentColor'}', size= ${svgAttrs.width}, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg ${attrs} ref={ref}>
        ${svgCode}
      </svg>
    )
  });

  ${ComponentName}.displayName = '${ComponentName}';

  export default ${ComponentName}
`;

export { getAttrs, getElementCode };
