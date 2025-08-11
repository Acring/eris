import React, { ForwardedRef, SVGProps } from 'react';

  const Update16Colorful = React.forwardRef(({color = 'none', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <g clipPath="url(#paint0_angular_1_773_clip_path)" data-figma-skipParse="true"><g transform="matrix(0.00875 -0.00306249 -0.00306249 -0.00875 7.5625 8.4375)"><foreignObject x="-1159.72" y="-1159.72" width="2319.44" height="2319.44"><div  style={{"background":"conic-gradient(from 90deg,rgba(68, 138, 255, 1) 0deg,rgba(196, 196, 196, 0) 360deg)","height":"100%","width":"100%","opacity":"1"}}/></foreignObject></g></g><path fillRule="evenodd" clipRule="evenodd" d="M8 15C4.134 15 1 11.866 1 8C1 4.13401 4.134 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 12.375C5.58375 12.375 3.625 10.4163 3.625 8C3.625 5.58375 5.58375 3.625 8 3.625C10.4163 3.625 12.375 5.58375 12.375 8C12.375 10.4163 10.4163 12.375 8 12.375Z" data-figma-gradientFill="{&quot;type&quot;:&quot;GRADIENT_ANGULAR&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.26666668057441711,&quot;g&quot;:0.54117649793624878,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.76862746477127075,&quot;g&quot;:0.76862746477127075,&quot;b&quot;:0.76862746477127075,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[],&quot;transform&quot;:{&quot;m00&quot;:17.500007629394531,&quot;m01&quot;:-6.1249866485595703,&quot;m02&quot;:1.8749902248382568,&quot;m10&quot;:-6.1249866485595703,&quot;m11&quot;:-17.500007629394531,&quot;m12&quot;:20.249996185302734},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}"/><defs><clipPath id="paint0_angular_1_773_clip_path"><path fillRule="evenodd" clipRule="evenodd" d="M8 15C4.134 15 1 11.866 1 8C1 4.13401 4.134 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15ZM8 12.375C5.58375 12.375 3.625 10.4163 3.625 8C3.625 5.58375 5.58375 3.625 8 3.625C10.4163 3.625 12.375 5.58375 12.375 8C12.375 10.4163 10.4163 12.375 8 12.375Z"/></clipPath></defs>
      </svg>
    )
  });

  Update16Colorful.displayName = 'Update16Colorful';

  export default Update16Colorful
