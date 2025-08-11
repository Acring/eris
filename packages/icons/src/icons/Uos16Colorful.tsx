import React, { ForwardedRef, SVGProps } from 'react';

  const Uos16Colorful = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M4.52462 5.74804C4.34839 5.74804 4.20553 5.8909 4.20553 6.06713V8.01402C4.20553 8.93008 3.46291 9.67269 2.54685 9.67269C1.63079 9.67269 0.888176 8.93008 0.888176 8.01402V6.06713C0.888176 5.8909 0.745315 5.74804 0.569088 5.74804C0.392861 5.74804 0.25 5.8909 0.25 6.06713V8.01402C0.25 9.28253 1.27834 10.3109 2.54685 10.3109C3.81537 10.3109 4.8437 9.28253 4.8437 8.01402V6.06713C4.8437 5.8909 4.70084 5.74804 4.52462 5.74804Z" fill="url(#paint0_linear_1_841)"/><path fillRule="evenodd" clipRule="evenodd" d="M8.51974 6.28466H7.64207C6.93716 6.28466 6.36572 6.8561 6.36572 7.56101V8.43869C6.36572 9.1436 6.93716 9.71504 7.64207 9.71504H8.51974C9.22465 9.71504 9.79609 9.1436 9.79609 8.43869V7.56101C9.79609 6.8561 9.22465 6.28466 8.51974 6.28466ZM7.64207 5.64648C6.5847 5.64648 5.72754 6.50365 5.72754 7.56101V8.43869C5.72754 9.49605 6.5847 10.3532 7.64207 10.3532H8.51974C9.5771 10.3532 10.4343 9.49605 10.4343 8.43869V7.56101C10.4343 6.50365 9.5771 5.64648 8.51974 5.64648H7.64207Z" fill="url(#paint1_linear_1_841)"/><path opacity="0.8" fillRule="evenodd" clipRule="evenodd" d="M15.216 6.35986L12.6342 6.35986C12.2724 6.35986 11.979 6.65322 11.979 7.0151C11.979 7.37698 12.2724 7.67034 12.6342 7.67034L13.2248 7.67034C13.2297 7.67011 13.2346 7.67 13.2396 7.67L14.4566 7.67C15.1709 7.67 15.75 8.24908 15.75 8.96342C15.75 9.67775 15.1709 10.2568 14.4566 10.2568L11.8489 10.2568C11.6727 10.2568 11.5298 10.114 11.5298 9.93775C11.5298 9.76152 11.6727 9.61866 11.8489 9.61866L14.4566 9.61866C14.8185 9.61866 15.1118 9.3253 15.1118 8.96342C15.1118 8.60154 14.8185 8.30818 14.4566 8.30818H14.1315C14.1267 8.3084 14.1217 8.30851 14.1168 8.30851L12.6342 8.30851C11.9199 8.30851 11.3408 7.72943 11.3408 7.0151C11.3408 6.30076 11.9199 5.72168 12.6342 5.72168H15.216C15.3922 5.72168 15.5351 5.86454 15.5351 6.04077C15.5351 6.217 15.3922 6.35986 15.216 6.35986Z" fill="url(#paint2_linear_1_841)"/><defs><linearGradient id="paint0_linear_1_841" x1="-1.22353" y1="7.55004" x2="5.85164" y2="7.59628" gradientUnits="userSpaceOnUse"><stop stopColor="#275FF2"/><stop offset="0.541679" stopColor="#59C7C4"/><stop offset="1" stopColor="#65C3CF"/></linearGradient><linearGradient id="paint1_linear_1_841" x1="5.72754" y1="7.50787" x2="10.9743" y2="7.47734" gradientUnits="userSpaceOnUse"><stop stopColor="#5A95EC"/><stop offset="0.280535" stopColor="#3A6AE9"/><stop offset="0.667248" stopColor="#59C7C4"/><stop offset="1" stopColor="#65CFA3"/></linearGradient><linearGradient id="paint2_linear_1_841" x1="11.3408" y1="6.95297" x2="15.5787" y2="8.25835" gradientUnits="userSpaceOnUse"><stop stopColor="#53DB79"/><stop offset="1" stopColor="#2CA3FF"/></linearGradient></defs>
      </svg>
    )
  });

  Uos16Colorful.displayName = 'Uos16Colorful';

  export default Uos16Colorful
