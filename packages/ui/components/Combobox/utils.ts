import type { ComboboxOption, ComboboxValue, GroupOption } from './type';

export function transToGroupOption(options: ComboboxOption[] = [], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      '': options,
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || '';
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

export function isOptionsExist(groupOption: GroupOption, targetOption: ComboboxOption[]) {
  for (const [, value] of Object.entries(groupOption)) {
    if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
      return true;
    }
  }
  return false;
}

export function findOptionsByValues(
  values: ComboboxValue | ComboboxValue[] = [],
  arrayDefaultOptions: ComboboxOption[] = [],
  arrayOptions?: ComboboxOption[],
): ComboboxOption[] {
  const allOptions = [...arrayDefaultOptions, ...(arrayOptions || [])];
  const valueArray = Array.isArray(values) ? values : [values];
  return valueArray
    .map((value) => allOptions.find((opt) => opt.value === value))
    .filter((option): option is ComboboxOption => option !== undefined);
}
