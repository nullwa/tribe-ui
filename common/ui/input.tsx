'use client'
import { type FC, type ReactNode, type ComponentProps, useState, useCallback, useRef } from 'react'
import { tm, cva, type VariantProps } from '@/common/utils/tw-merge'

import { XIcon, SpinnerIcon } from '@phosphor-icons/react'

type Props = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof styles> & {
    label?: string
    hint?: string
    messages?: string[]
    affix?: ReactNode
    suffix?: ReactNode
    loading?: boolean
    clearable?: boolean
  }

const Input: FC<Props> = ({ id, label, required, placeholder, hint, messages, affix, suffix, clearable, loading, disabled, value, defaultValue, onChange, state, size, radius, className, ...rest }) => {
  const hasAddon = Boolean(affix || suffix || clearable)

  const inputRef = useRef<HTMLInputElement>(null)
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    },
    [isControlled, onChange],
  )

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue('')
    const nativeInput = inputRef.current
    if (nativeInput) {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(nativeInput, '')
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    inputRef.current?.focus()
  }, [isControlled, onChange])

  return (
    <div className='flex flex-col gap-1'>
      {/* label */}
      {label && (
        <label htmlFor={id} className={tm(labelStyles({ state, size }))}>
          {label}
          {required && (
            <span aria-hidden='true' className='text-red-500'>
              *
            </span>
          )}
        </label>
      )}
      {/* input */}
      <div data-addon={Boolean(affix || suffix || clearable)} data-disabled={disabled} data-loading={loading} className={tm(styles({ state, size, radius }), className)}>
        <div className={tm(addonStyles({ size }), !hasAddon && 'px-1')}>{affix}</div>
        <input
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled || loading}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          aria-invalid={state === 'error'}
          aria-busy={loading}
          aria-label={label ? undefined : rest['aria-label']}
          className={tm(inputStyles({ size }))}
          {...rest}
        />
        {/* clear button */}
        {clearable && (
          <button type='button' onClick={handleClear} aria-label='Clear input' className={tm(clearButtonStyles({ size }), !(clearable && !disabled && !loading && String(currentValue).length > 0) && 'invisible pointer-events-none')}>
            <XIcon weight='bold' />
          </button>
        )}
        <div className={tm(addonStyles({ size }), !hasAddon && 'px-1')}>{loading ? <SpinnerIcon className={tm(spinnerStyles({ size }))} /> : suffix}</div>
      </div>
      {/* hint */}
      {hint && (
        <p className={tm(hintStyles({ size }), 'wrap-break-word')} role={state === 'error' ? 'alert' : undefined}>
          {hint}
        </p>
      )}
      {/* messages */}
      {messages && messages.length > 0 && (
        <ul className='flex flex-col'>
          {messages.map((message, index) => (
            <li key={index} className={tm(messageStyles({ state, size }), 'wrap-break-word')}>
              - {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// #region styles
const styles = cva(
  [
    'group/input flex items-center overflow-hidden',
    'border-2 outline-none bg-white dark:bg-neutral-900',
    'transition-[border-color,box-shadow] duration-150',
    'focus-within:ring-2 focus-within:ring-offset-0',
    'data-[disabled=true]:bg-neutral-50 dark:data-[disabled=true]:bg-neutral-800/60',
    'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
  ],
  {
    variants: {
      state: {
        default: [
          'border-neutral-200 dark:border-neutral-700',
          'hover:border-neutral-300 dark:hover:border-neutral-600',
          'focus-within:border-neutral-400 dark:focus-within:border-neutral-500',
          'focus-within:ring-neutral-400/20 dark:focus-within:ring-neutral-500/20',
        ],
        error: ['border-red-300 dark:border-red-600/70', 'hover:border-red-400 dark:hover:border-red-500', 'focus-within:border-red-500 dark:focus-within:border-red-400', 'focus-within:ring-red-500/20 dark:focus-within:ring-red-400/20'],
        success: [
          'border-emerald-300 dark:border-emerald-600/70',
          'hover:border-emerald-400 dark:hover:border-emerald-500',
          'focus-within:border-emerald-500 dark:focus-within:border-emerald-400',
          'focus-within:ring-emerald-500/20 dark:focus-within:ring-emerald-400/20',
        ],
        warning: [
          'border-amber-300 dark:border-amber-600/70',
          'hover:border-amber-400 dark:hover:border-amber-500',
          'focus-within:border-amber-600 dark:focus-within:border-amber-400',
          'focus-within:ring-amber-500/20 dark:focus-within:ring-amber-400/20',
        ],
      },
      size: {
        sm: 'h-7',
        md: 'h-8',
        lg: 'h-9',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
      radius: 'md',
    },
  },
)

const addonStyles = cva(
  [
    'flex items-center justify-center h-full',
    'pointer-events-none select-none',
    'text-neutral-600/60 dark:text-neutral-500',
    'transition-colors duration-150',
    'group-focus-within/input:text-neutral-500 dark:group-focus-within/input:text-neutral-400',
  ],
  {
    variants: {
      size: {
        sm: 'px-1.5 [&_svg]:size-3.5 text-xs',
        md: 'px-2 [&_svg]:size-4 text-sm',
        lg: 'px-2.5 [&_svg]:size-4.5 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const inputStyles = cva(
  [
    'flex-1 h-full min-w-0 bg-transparent outline-none border-none ring-0 ring-offset-0',
    'text-neutral-900 dark:text-neutral-50',
    'placeholder:text-neutral-400/70 dark:placeholder:text-neutral-500',
    'disabled:cursor-not-allowed',
    'transition-colors duration-150',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs placeholder:text-xs',
        md: 'text-sm placeholder:text-sm',
        lg: 'text-sm placeholder:text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const clearButtonStyles = cva(
  [
    'flex items-center justify-center rounded-full cursor-pointer',
    'text-neutral-600/60 dark:text-neutral-500',
    'hover:text-neutral-600 dark:hover:text-neutral-300',
    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    'active:scale-90 ml-1.5',
    'transition-all duration-100',
  ],
  {
    variants: {
      size: {
        sm: 'size-3 [&_svg]:size-2.5',
        md: 'size-3.5 [&_svg]:size-3',
        lg: 'size-4 [&_svg]:size-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const spinnerStyles = cva('animate-spin text-neutral-600/60 dark:text-neutral-500', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-4.5',
    },
  },
  defaultVariants: { size: 'md' },
})

const labelStyles = cva('flex items-center gap-1 font-medium leading-none first-letter:uppercase', {
  variants: {
    state: {
      default: 'text-neutral-700 dark:text-neutral-300',
      error: 'text-red-600 dark:text-red-400',
      success: 'text-emerald-600 dark:text-emerald-400',
      warning: 'text-amber-600 dark:text-amber-400',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: { state: 'default', size: 'md' },
})

const hintStyles = cva('leading-snug text-neutral-500 first-letter:uppercase', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-xs',
    },
  },
  defaultVariants: { size: 'md' },
})

const messageStyles = cva('leading-snug', {
  variants: {
    state: {
      default: 'text-neutral-400 dark:text-neutral-500',
      error: 'text-red-600 dark:text-red-400',
      success: 'text-emerald-600 dark:text-emerald-400',
      warning: 'text-amber-600  dark:text-amber-400',
    },
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-xs',
    },
  },
  defaultVariants: { state: 'default', size: 'md' },
})
// #endregion

Input.displayName = 'Input'
export { Input }
