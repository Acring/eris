import React, { ForwardedRef, SVGProps } from 'react';

  const EditLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.36036 15.2671L17.3241 6.30332C17.9099 5.71753 17.9099 4.76778 17.3241 4.182L15.2028 2.06068C14.617 1.47489 13.6673 1.47489 13.0815 2.06068L2.12134 13.0208V17.2635H6.11499V17.2671H18.115V15.2671H8.36036ZM14.1422 3.82844L13.1163 4.85429L14.5305 6.26851L15.5564 5.24266L14.1422 3.82844ZM4.12134 13.8493L11.7021 6.26851L13.1163 7.68272L5.53555 15.2635H4.12134V13.8493Z"/>
      </svg>
    )
  });

  EditLine20.displayName = 'EditLine20';

  export default EditLine20
