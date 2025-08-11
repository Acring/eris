'use client';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import type { Mode, UseFormReturn } from 'react-hook-form';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { cn } from '../../lib/utils';
import FieldGroup from './FieldGroup';
import Field from './Field';
import Errors from './Errors';
import FormContext from './FormContext';

export interface FormProps {
  defaultValues: Record<string, any>;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onSubmit?: (data: any, e?: React.BaseSyntheticEvent) => void | Promise<any>;
  onSubmitError?: (error: any, e?: React.BaseSyntheticEvent) => void;
  mode?: Mode;
  reValidateMode?: Exclude<Mode, 'onTouched' | 'all'>;
  schema?: AnyObjectSchema;
  warningSchema?: AnyObjectSchema;
  className?: string;
  context?: Record<string, any>;
}

interface FormWithStatics extends React.ForwardRefExoticComponent<FormProps> {
  FieldGroup: typeof FieldGroup;
  Field: typeof Field;
  Errors: typeof Errors;
  Controller: typeof Controller;
  useWatch: typeof useWatch;
  useForm: typeof useForm;
  useFormContext: typeof useFormContext;
  useFieldArray: typeof useFieldArray;
  useFormState: typeof useFormState;
}

const Form = forwardRef((props: FormProps, ref) => {
  const {
    defaultValues,
    children,
    onSubmit,
    onSubmitError,
    mode,
    reValidateMode,
    schema,
    warningSchema,
    context,
    className,
  } = props;

  const methods: UseFormReturn = useForm({
    mode,
    reValidateMode,
    defaultValues,
    resolver: schema && yupResolver(schema),
    context,
  });

  const handleSubmit = useMemo(() => {
    return onSubmit ? methods.handleSubmit(onSubmit, onSubmitError) : undefined;
  }, [methods, onSubmit, onSubmitError]);

  const errors = methods.formState.errors;

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (Object.keys(errors).length === 0 && handleSubmit) {
        return handleSubmit();
      }
      if (Object.keys(errors).length > 0) {
        return;
      }
      throw new Error('handleSubmit is not a function');
    },
  }));

  return (
    <FormProvider {...methods}>
      <FormContext warningSchema={warningSchema}>
        <form
          className={cn('h-full', className)}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit?.();
          }}
        >
          {children}
        </form>
      </FormContext>
    </FormProvider>
  );
}) as FormWithStatics;

Form.displayName = 'Form';

Form.FieldGroup = FieldGroup;
Form.Field = Field;
Form.Errors = Errors;
Form.Controller = Controller;
Form.useWatch = useWatch;
Form.useForm = useForm;
Form.useFormContext = useFormContext;
Form.useFieldArray = useFieldArray;
Form.useFormState = useFormState;

export default Form;
