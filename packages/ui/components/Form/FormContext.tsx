import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

const FormContext = React.createContext<any>(null);

function FormProvider({
  children,
  warningSchema,
  context,
}: {
  children: React.ReactNode;
  warningSchema?: AnyObjectSchema;
  context?: Record<string, any>;
}) {
  const defaultValues = useWatch();
  const [warningMessage, setWarningMessage] = useState<any>(undefined);

  const warningResolver = useMemo(() => {
    if (warningSchema) {
      return yupResolver(warningSchema)(defaultValues, context, {
        fields: {},
        shouldUseNativeValidation: undefined,
      });
    }
    return undefined;
  }, [context, defaultValues, warningSchema]);

  useEffect(() => {
    const fetchWarningMessage = async () => {
      if (warningResolver) {
        const result = await warningResolver;
        setWarningMessage(result.errors);
      } else {
        setWarningMessage(undefined);
      }
    };

    fetchWarningMessage();
  }, [warningResolver]);

  return <FormContext.Provider value={{ warningMessage }}>{children}</FormContext.Provider>;
}

function useFormContext() {
  return React.useContext(FormContext);
}

export { useFormContext };
export default FormProvider;
