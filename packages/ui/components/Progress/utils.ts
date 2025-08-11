import lodash from 'lodash';
import { RECOVERY, VARIANTS } from './constant';

const getPercent = (percent: number) => {
  if (lodash.isNumber(percent)) {
    if (percent <= 0) {
      return 0;
    }
    return percent > 100 ? 100 : percent;
  }
};

const formatPercent = ({
  percent = 0,
  segmentation,
}: {
  used?: number;
  total?: number;
  percent?: number;
  segmentation?: Record<string, number>;
}) => {
  if (!lodash.isEmpty(segmentation)) {
    let count = 0;
    lodash.forIn(segmentation, (value) => {
      count += getPercent(value) || 0;
    });
    return getPercent(count);
  }
  return getPercent(percent);
};

const getBgColor = (color: string, segmentation?: Record<string, number>) => {
  // 如果多色条，default 不需要跟随 oem 进行换肤
  if (!lodash.isEmpty(segmentation)) {
    return (
      {
        ...VARIANTS,
        default: RECOVERY,
      }[color]?.bgColor || 'bg-progress-normal'
    );
  }

  return VARIANTS[color]?.bgColor || 'bg-progress-normal';
};

export { formatPercent, getBgColor };
