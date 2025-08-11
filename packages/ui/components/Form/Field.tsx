'use client';
import { AsteriskLine16 } from '@xsky/eris-icons';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { has, isEmpty } from 'lodash';
import { Spinner } from '../Spinner';
import Error from './Errors';
import { cn } from '../../lib/utils';
import { useFormContext } from './FormContext';
import Warning from './Warning';

export interface FieldProps {
  children?: React.ReactNode;
  name?: string;
  errors?: FieldErrors;
  isValidating?: boolean;
  label?: React.ReactElement | string;
  required?: boolean;
  titleRight?: React.ReactElement | string;
  helpText?: React.ReactNode;
  className?: string;
}

export interface FieldRefValue {
  labelRef: HTMLDivElement | null;
}

const Field = forwardRef<FieldRefValue, FieldProps>((props, ref) => {
  const {
    children,
    label,
    required = false,
    errors = {},
    isValidating,
    name,
    titleRight,
    helpText,
    className,
    ...rest
  } = props;

  const labelRef = useRef<HTMLDivElement>(null);
  const warningSchema = useFormContext();

  useImperativeHandle(ref, () => ({
    labelRef: labelRef.current,
  }));

  const hasError = name && !isEmpty(errors) && has(errors, name);
  const hasWarning =
    name && !isEmpty(warningSchema?.warningMessage) && has(warningSchema?.warningMessage, name);

  return (
    <div className={cn('PFormField-container', className)} {...rest}>
      {/* 标题区域 */}
      {label || titleRight ? (
        <div className="flex justify-between items-center" ref={labelRef}>
          {label ? (
            <div className="CharonTypography text-text-2 text-body font-normal">
              <div className="flex items-center pb-[4px] text-text-2">
                {label}
                {required ? <AsteriskLine16 className="text-danger-normal" /> : null}
              </div>
            </div>
          ) : null}
          {titleRight ? (
            <div className="text-offline-normal flex-1">
              <div className="flex items-center mb-[4px]">{titleRight}</div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* 输入区域 */}
      <div className="relative">
        {children}
        {isValidating ? (
          <Spinner className="absolute right-1 top-1/2 -translate-y-1/2 bg-white z-10" size="sm" />
        ) : null}
      </div>

      {/* 错误和警告信息 */}
      {hasError ? (
        <Error errors={errors} name={name} />
      ) : hasWarning ? (
        <Warning name={name} warningMessage={warningSchema?.warningMessage} />
      ) : null}

      {/* 帮助文本 */}
      {helpText && !hasError ? (
        <div className="text-text-3 text-body font-normal mt-[4px]">{helpText}</div>
      ) : null}
    </div>
  );
});

Field.displayName = 'Field';

export default Field;
