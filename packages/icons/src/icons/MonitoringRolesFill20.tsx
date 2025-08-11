import React, { ForwardedRef, SVGProps } from 'react';

  const MonitoringRolesFill20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.15173 2.81006H3.09307C2.69583 2.81006 2.29858 3.21506 2.29858 3.62006V6.96206H6.96691L9.15222 2.81006H9.15173ZM11.9329 5.44306H17.8925V3.62006C17.8925 3.21506 17.4953 2.81006 17.098 2.81006H9.44991L10.7412 7.46806L11.9329 5.44256V5.44306ZM7.56277 7.97457H2.29858V9.59507H10.3439L9.05267 5.03807L7.56277 7.97457ZM17.9916 9.59507H10.8403L12.5288 6.45607H17.9916V9.59507ZM2.29858 16.6836V10.7091H17.9921V16.6836C17.9921 17.0886 17.5948 17.4936 17.1976 17.4936H3.09307C2.69583 17.4936 2.29858 17.0886 2.29858 16.6836ZM4.88065 14.6581H13.5219V13.7466H4.88065V14.6581ZM15.31 14.6581C15.0118 14.6581 14.8132 14.4556 14.8132 14.1516C14.8132 13.8476 15.0118 13.6451 15.31 13.6451C15.6081 13.6451 15.8068 13.8476 15.8068 14.1516C15.8068 14.4556 15.6081 14.6581 15.31 14.6581Z"/>
      </svg>
    )
  });

  MonitoringRolesFill20.displayName = 'MonitoringRolesFill20';

  export default MonitoringRolesFill20
