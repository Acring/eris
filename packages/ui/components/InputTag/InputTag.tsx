'use client';
import type {
  ChangeEvent,
  HTMLAttributes,
  MutableRefObject,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
} from 'react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ErrorLine16 } from '@xsky/eris-icons';
import { cva } from 'class-variance-authority';
import { InputContainerVariants } from '../Input/index';
import { cn, useFocus, useFitContentWidth } from '../../lib/utils';
import IconButton from '../IconButton/IconButton';
import { Tag } from '../Tag';
import type { ScrollAreaProps } from '../ScrollArea';
import { ScrollArea } from '../ScrollArea';
import Tooltip, { type TooltipProps } from '../Tooltip/Tooltip';

const keepFocus = (e: MouseEvent<HTMLDivElement>) => {
  const targetElement = e.target as Element;
  targetElement.tagName !== 'INPUT' && e.preventDefault();
};

const inputTagVariants = cva(cn(''), {
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-text',
    },
  },
});

const inputTagScrollAreaVariants = cva(cn('flex items-center px-[8px]'), {
  variants: {
    size: {
      sm: cn('py-[1px]'),
      md: cn('py-[4px]'),
      lg: cn('py-[9px]'),
    },
    showCloseTag: {
      true: 'pl-[8px] pr-[28px]',
      false: '',
    },
  },
});

export const backgroundInput = cva('', {
  variants: {
    disabled: {
      true: cn('bg-grey-50'),
      false: '',
    },
    inColorBackground: {
      true: cn('bg-form-bg-normal'),
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      inColorBackground: true,
      className: cn('bg-form-bg-disable'),
    },
    {
      disabled: true,
      inColorBackground: false,
      className: cn('bg-grey-50'),
    },
    {
      disabled: false,
      inColorBackground: true,
      className: cn('bg-form-bg-normal'),
    },
  ],
});

export interface RenderedTagProps {
  value: string;
  closable: boolean;
  onClose: () => void;
}

export interface TagsInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'type' | 'onChange' | 'onBlur'> {
  beforeAddValidate?: (tag: string, existingTags: string[]) => boolean;
  disableBackspaceRemove?: boolean;
  disableGenOnBlur?: boolean;
  disabled?: boolean;
  error?: boolean;
  isEditOnRemove?: boolean;
  name?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>, tags: string[]) => void;
  onChange?: (tags: string[]) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onRemoved?: (tag: string) => void;
  onClear?: (tags: string[]) => void;
  onExisting?: (tag: string) => void;
  placeholder?: string;
  renderTag?: (tagProps: RenderedTagProps, index: number, tagClass: string) => JSX.Element;
  separators?: string[];
  showClear?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tagClassName?: string;
  value?: string[];
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  inColorBackground?: boolean;
  maxHeight?: ScrollAreaProps['maxHeight'];
}

const useInputFitContentWidth = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const contentWidth = useFitContentWidth({
    label: value,
    fontSize: inputRef.current ? parseInt(getComputedStyle(inputRef.current).fontSize) : 0,
    fontWeight: inputRef.current ? parseInt(getComputedStyle(inputRef.current).fontWeight) : 0,
  });

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return {
    contentWidth,
    handleChange,
    inputRef,
  };
};

const defaultSeparators = ['Enter'];

/**
 * Owner: 许小静
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=18085-177055&mode=design
 *
 * 标签输入框组件
 */
const TagInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      beforeAddValidate,
      disableBackspaceRemove,
      disableGenOnBlur,
      disabled = false,
      error = false,
      isEditOnRemove,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyUp,
      onRemoved,
      onClear,
      onExisting,
      placeholder,
      renderTag,
      separators,
      showClear = true,
      size = 'md',
      tagClassName,
      value,
      className,
      tooltip,
      tooltipProps,
      inColorBackground = false,
      maxHeight = 100,
      ...otherProps
    },
    ref,
  ) => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const { focused, onBlur: onInnerBlur, onFocus: onInnerFocus } = useFocus();
    const {
      contentWidth,
      handleChange: fitContentValueChange,
      inputRef,
    } = useInputFitContentWidth();
    const scrollBarRef = useRef<HTMLDivElement>(null);

    const showCloseTag = tags.length > 0 && showClear;

    const handleSetTags = (tags: string[]) => {
      setTags(tags);
      onChange?.(tags);
    };

    const setValueSetWidth = useCallback(
      (value: string) => {
        fitContentValueChange(value);
        setInputValue(value);
      },
      [fitContentValueChange],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setValueSetWidth(e.target.value);
      },
      [setValueSetWidth],
    );

    const scrollToBottom = () => {
      scrollBarRef.current?.scrollTo({
        top: 99999,
        behavior: 'smooth',
      });
    };

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onInnerFocus();
        onFocus?.(e);
        scrollToBottom();
      },
      [onFocus, onInnerFocus],
    );

    const handleSetValue = (text: string, tags: string[]) => {
      if (beforeAddValidate && !beforeAddValidate(text, tags)) return;

      if (tags.includes(text)) {
        onExisting && onExisting(text);
        return;
      }

      handleSetTags([...tags, text]);
      setValueSetWidth('');
    };

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onInnerBlur();
        onBlur?.(e, tags);
        const text = e.currentTarget.value;
        if (text && !disableGenOnBlur) {
          handleSetValue(text, tags);
        }
      },
      [onBlur, onInnerBlur, tags, disableGenOnBlur],
    );

    const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();

      const text = e.currentTarget.value;

      if (!text && !disableBackspaceRemove && tags.length && e.key === 'Backspace') {
        handleSetTags(tags.slice(0, -1));
        const value = isEditOnRemove ? `${tags.at(-1)} ` : '';
        setValueSetWidth(value);
      }

      if (text && (separators || defaultSeparators).includes(e.key)) {
        e.preventDefault();
        handleSetValue(text, tags);
      }
    };

    const onTagRemove = (text: string) => {
      const updatedTags = tags.filter((tag) => tag !== text);
      handleSetTags(updatedTags);
      onRemoved && onRemoved(text);
    };

    useEffect(() => {
      if (value !== undefined) {
        setTags(value);
      }
    }, [value]);

    const onClearAllTags = () => {
      onClear?.(tags);
      handleSetTags([]);
    };

    const renderMergedTag = (tag: string, index: number) => {
      const closable = !disabled;
      const tagClassResult = cn('mr-[4px]', tagClassName, {
        'border-stroke-border-2 border-[1px] border-solid': disabled,
      });

      if (renderTag && typeof renderTag === 'function') {
        const tagProps = {
          value: tag,
          closable,
          onClose: () => {
            onTagRemove(tag);
          },
        };
        return renderTag(tagProps, index, tagClassResult);
      }

      return (
        <Tag
          className={tagClassResult}
          disabledClose={disabled}
          key={tag}
          onClose={() => {
            onTagRemove(tag);
          }}
          onMouseDown={keepFocus}
          showClose
          size="md"
        >
          {tag}
        </Tag>
      );
    };

    const main = (
      <div
        className={cn(
          InputContainerVariants({
            hasTooltip: false,
            size: 'md',
            error,
            focused,
            disabled,
            fitContent: false,
            className: 'text-body group h-auto p-0',
          }),
          inputTagVariants({
            disabled,
          }),
          backgroundInput({
            disabled,
            inColorBackground,
          }),
          'input-tag flex flex-wrap items-center',
          className,
        )}
        data-testid="InputTag-root"
        onClick={(e) => {
          !focused && inputRef.current?.focus();
          onClick?.(e);
          scrollToBottom();
        }}
        onMouseDown={(e) => {
          // 点击右侧空白区域时，保持聚焦
          focused && keepFocus(e);
        }}
        ref={ref}
        {...otherProps}
      >
        <ScrollArea
          className={cn(
            inputTagScrollAreaVariants({
              size,
              showCloseTag,
            }),
          )}
          maxHeight={maxHeight}
          ref={scrollBarRef}
          thumbSize="thin"
          width="100%"
        >
          {tags.map(renderMergedTag)}
          <input
            className={cn(
              'min-w-[3px] border-0 p-0 leading-[24px] outline-none ',
              'placeholder:text-body placeholder:text-text-4 placeholder:font-normal',
              'bg-transparent',
            )}
            data-testid="InputTag-input"
            disabled={disabled}
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleOnKeyUp}
            onKeyUp={onKeyUp}
            placeholder={!tags.length ? placeholder : ''}
            ref={(e: HTMLInputElement | null) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                (ref as MutableRefObject<HTMLInputElement | null>).current = e;
              }
              (inputRef as MutableRefObject<HTMLInputElement | null>).current = e;
            }}
            style={{
              width: tags.length === 0 ? '100%' : contentWidth,
            }}
            type="text"
            value={inputValue}
          />
        </ScrollArea>
        {showCloseTag ? (
          <IconButton
            className="absolute right-[8px] hidden h-[20px] cursor-pointer items-center p-[2px] group-hover:inline"
            data-testid="InputTag-clear"
          >
            <ErrorLine16 onClick={onClearAllTags} />
          </IconButton>
        ) : null}
      </div>
    );

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          {main}
        </Tooltip>
      );
    }

    return main;
  },
);

TagInput.displayName = 'TagInput';

export default TagInput;
