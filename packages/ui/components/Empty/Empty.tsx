import React from 'react';
import AlertEmptySvgLg from '../../assets/alert_empty_lg.svg?url';
import AlertEmptySvgMd from '../../assets/alert_empty_md.svg?url';
import AlertEmptySvgSm from '../../assets/alert_empty_sm.svg?url';
import EmptySvgLg from '../../assets/empty_lg.svg?url';
import EmptySvgMd from '../../assets/empty_md.svg?url';
import EmptySvgSm from '../../assets/empty_sm.svg?url';
import SearchEmptySvgLg from '../../assets/search_empty_lg.svg?url';
import SearchEmptySvgMd from '../../assets/search_empty_md.svg?url';
import SearchEmptySvgSm from '../../assets/search_empty_sm.svg?url';
import WarningSvgLg from '../../assets/warning_empty_lg.svg?url';
import WarningSvgMd from '../../assets/warning_empty_md.svg?url';
import WarningSvgSm from '../../assets/warning_empty_sm.svg?url';

import t from '../../i18n';
import { cn } from '@/lib/utils';
import { ThemedImage } from '../ThemedImage';

interface EmptyProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'default' | 'search' | 'alert' | 'warning';
  image?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

type SM = string | { src: string };
type MD = string | { src: string };
type LG = string | { src: string };

interface ImageSourceType {
  sm: SM;
  md: MD;
  lg: LG;
  enableOem?: boolean;
}

const IMAGE_SOURCES: Record<string, ImageSourceType> = {
  default: {
    sm: EmptySvgSm,
    md: EmptySvgMd,
    lg: EmptySvgLg,
    enableOem: true,
  },
  search: {
    sm: SearchEmptySvgSm,
    md: SearchEmptySvgMd,
    lg: SearchEmptySvgLg,
    enableOem: true,
  },
  alert: {
    sm: AlertEmptySvgSm,
    md: AlertEmptySvgMd,
    lg: AlertEmptySvgLg,
    enableOem: false, // 状态插图不支持 oem
  },
  warning: {
    sm: WarningSvgSm,
    md: WarningSvgMd,
    lg: WarningSvgLg,
    enableOem: false, // 状态插图不支持 oem
  },
};

const SIZE_LAYOUTS: Record<string, number> = {
  sm: 80,
  md: 128,
  lg: 180,
};
const DEFAULT_IMAGE_SIZE = 'lg';
const DEFAULT_IMAGE_TYPE = 'default';

export default function Empty(props: EmptyProps) {
  const {
    image,
    description = t('暂无内容'),
    className,
    size = DEFAULT_IMAGE_SIZE,
    type = DEFAULT_IMAGE_TYPE,
  } = props;

  const defaultSrc =
    IMAGE_SOURCES[type][size] || IMAGE_SOURCES[DEFAULT_IMAGE_TYPE][DEFAULT_IMAGE_SIZE]; // default

  const enableOem = !!IMAGE_SOURCES[type].enableOem;

  const svgUrl = typeof defaultSrc === 'string' ? defaultSrc : defaultSrc.src;
  const layout = SIZE_LAYOUTS[size];

  return (
    <div className={cn('flex w-full items-center text-center', className)} data-testid="Empty-root">
      <div className="flex h-fit w-full flex-col items-center">
        {image ?? (
          <ThemedImage
            alt="empty"
            enableAutoThemeColor={enableOem}
            height={layout}
            src={svgUrl}
            width={layout}
          />
        )}

        <div className="text-text-3">{description}</div>
      </div>
    </div>
  );
}
