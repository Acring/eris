import React, { ForwardedRef, SVGProps } from 'react';

  const MonitoringRolesFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.32139 2.24805H2.47445C2.15666 2.24805 1.83887 2.57205 1.83887 2.89605V5.56965H5.57352L7.32178 2.24805H7.32139ZM9.54633 4.35445H14.314V2.89605C14.314 2.57205 13.9962 2.24805 13.6784 2.24805H7.55993L8.59295 5.97445L9.54633 4.35405V4.35445ZM6.05021 6.37966H1.83887V7.67606H8.27516L7.24213 4.03046L6.05021 6.37966ZM14.3933 7.67606H8.6722L10.023 5.16486H14.3933V7.67606ZM1.83887 13.3469V8.56726H14.3937V13.3469C14.3937 13.6709 14.0759 13.9949 13.7581 13.9949H2.47445C2.15666 13.9949 1.83887 13.6709 1.83887 13.3469ZM3.90452 11.7265H10.8175V10.9973H3.90452V11.7265ZM12.248 11.7265C12.0094 11.7265 11.8505 11.5645 11.8505 11.3213C11.8505 11.0781 12.0094 10.9161 12.248 10.9161C12.4865 10.9161 12.6454 11.0781 12.6454 11.3213C12.6454 11.5645 12.4865 11.7265 12.248 11.7265Z"/>
      </svg>
    )
  });

  MonitoringRolesFill16.displayName = 'MonitoringRolesFill16';

  export default MonitoringRolesFill16
