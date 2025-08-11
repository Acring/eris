import React, { ForwardedRef, SVGProps } from 'react';

  const AssociatedDark20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.44062 11.9264C6.43857 11.8658 6.43754 11.8048 6.43754 11.7437C6.43754 8.81312 8.81322 6.43744 11.7438 6.43744C11.8049 6.43744 11.8657 6.43847 11.9263 6.44052C11.2571 5.09059 9.86506 4.16256 8.25625 4.16256C5.99533 4.16256 4.1625 5.99539 4.1625 8.25631C4.1625 9.86518 5.0906 11.2573 6.44062 11.9264ZM6.67668 13.3235C4.51753 12.6511 2.95001 10.6368 2.95001 8.25631C2.95001 5.32576 5.3257 2.95007 8.25625 2.95007C10.6366 2.95007 12.6509 4.51748 13.3233 6.67652C15.4825 7.34886 17.05 9.36321 17.05 11.7437C17.05 14.6742 14.6743 17.0499 11.7438 17.0499C9.36339 17.0499 7.3491 15.4825 6.67668 13.3235Z" fill="#9275FF"/><path fillRule="evenodd" clipRule="evenodd" d="M8.24607 12.3488C10.5103 12.3488 12.3459 10.5133 12.3459 8.24906C12.3459 7.59993 12.195 6.98604 11.9264 6.44053C11.8657 6.43847 11.8048 6.43744 11.7436 6.43744C8.81303 6.43744 6.43735 8.81312 6.43735 11.7437C6.43735 11.8063 6.43843 11.8688 6.44059 11.9309C6.98534 12.1985 7.59815 12.3488 8.24607 12.3488Z" fill="#E5E0FF"/>
      </svg>
    )
  });

  AssociatedDark20Colorful.displayName = 'AssociatedDark20Colorful';

  export default AssociatedDark20Colorful
