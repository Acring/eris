import React from 'react';
import lodash from 'lodash';

export interface WarningProps {
  name: string;
  warningMessage: Record<string, any>;
}

const Warning = (props: WarningProps) => {
  const { name, warningMessage } = props;
  const message = lodash.get(warningMessage, name);
  return (
    <div className="PFormField-FormWarning CharonTypography text-warning-normal text-body font-normal">
      <div className="mt-[4px] break-all text-warning-normal">
        {message && typeof message.message === 'string' ? message.message : ''}
      </div>
    </div>
  );
};

Warning.displayName = 'Warning';

export default Warning;
