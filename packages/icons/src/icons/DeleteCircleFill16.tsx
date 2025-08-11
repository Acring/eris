import React, { ForwardedRef, SVGProps } from 'react';

  const DeleteCircleFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM6.88335 5.45001V5.00836H9.11669V5.45001H6.88335ZM10.2167 4.65836V5.45001H11.9584V6.55001H11.3625V11.3334C11.3625 11.7522 11.023 12.0917 10.6042 12.0917H5.39585C4.97704 12.0917 4.63752 11.7522 4.63752 11.3334V6.55001H4.04169V5.45001H5.78335V4.65836C5.78335 4.24414 6.11914 3.90836 6.53335 3.90836L9.46669 3.90836C9.8809 3.90836 10.2167 4.24414 10.2167 4.65836ZM5.73752 6.55001H10.2625V10.9917L5.73752 10.9917V6.55001ZM9.6 10.2V9H6.4V10.2H9.6Z"/>
      </svg>
    )
  });

  DeleteCircleFill16.displayName = 'DeleteCircleFill16';

  export default DeleteCircleFill16
