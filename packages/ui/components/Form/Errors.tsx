import React from 'react';
import type { FieldErrors } from 'react-hook-form';
import lodash from 'lodash';

export interface ErrorProps {
  name: string;
  errors: FieldErrors;
}

/**
 * 检查是否为有效的错误对象
 */
function isError(error: any): error is { message: string } {
  return error !== undefined && error.message !== undefined;
}

/**
 * 当errors是一个对象时，获取第一个错误
 */
function getFirstError(errors: Record<string, any>): { message: string } | undefined {
  if (!errors) return undefined;

  for (const key in errors) {
    if (isError(errors[key])) return errors[key];
  }

  return undefined;
}

/**
 * 表单错误显示组件
 */
const Errors: React.FC<ErrorProps> = ({ name, errors }) => {
  const error = lodash.get(errors, name);
  let errorMessage = '';

  if (isError(error)) {
    // 直接错误
    errorMessage = error.message;
  } else if (error) {
    // 嵌套错误对象
    const firstError = getFirstError(error);
    if (firstError) {
      errorMessage = firstError.message;
    }
  }

  return (
    <div className="PFormField-FormErrors CharonTypography text-text-2 text-body font-normal">
      <div className="mt-[4px] break-all text-text-link-danger-normal">{errorMessage}</div>
    </div>
  );
};

Errors.displayName = 'Errors';

export default Errors;
