'use client'
import { type FC, type ReactNode, type ComponentProps, useRef, useState, useCallback } from 'react'
import { cva, tm, type VariantProps } from '@/common/utils/tw-merge'
import { SpinnerGapIcon } from '@phosphor-icons/react'

type Props = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof wrapperStyles> & {
    label?: string
    affix?: ReactNode
    suffix?: ReactNode
    loading?: boolean
    clearable?: boolean
  }

const Input: FC<Props> = ({ label, state = 'default', size = 'md', radius = 'md', placeholder, disabled = false, loading = false, clearable = false, affix, suffix, className, value, defaultValue, onChange, id, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Track value only when `clearable` is used and the component is uncontrolled.
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
    // Synthesise a change event so consumers can react even in controlled mode.
    const nativeInput = inputRef.current
    if (nativeInput) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
      nativeInputValueSetter?.call(nativeInput, '')
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    inputRef.current?.focus()
  }, [isControlled, onChange])

  const showClear = clearable && !disabled && !loading && String(currentValue).length > 0

  const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={inputId} className={tm(labelStyles({ state, size }))}>
          {label}
        </label>
      )}

      <div data-disabled={disabled} data-loading={loading} className={tm(wrapperStyles({ state, size, radius }), className)}>
        {/* Affix (left) */}
        {affix && <span className={tm(affixStyles({ size }), 'pointer-events-none select-none')}>{affix}</span>}

        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          placeholder={placeholder}
          className={inputStyles({ size })}
          disabled={disabled || loading}
          value={isControlled ? value : internalValue}
          defaultValue={isControlled ? undefined : undefined /* controlled via state */}
          onChange={handleChange}
          aria-invalid={state === 'error'}
          aria-busy={loading}
          aria-label={label ? undefined : rest['aria-label']}
          {...rest}
        />

        {/* Suffix / loading / clear */}
        {(suffix || loading || showClear) && (
          <span className={tm(affixStyles({ size }), 'gap-1')}>
            {loading ? (
              <SpinnerGapIcon className={tm('animate-spin', affixStyles({ size }))} />
            ) : (
              <>
                {showClear && (
                  <button type='button' tabIndex={-1} onClick={handleClear} aria-label='Clear input' className={clearButtonStyles({ size })}>
                    ×
                  </button>
                )}
                {suffix}
              </>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

// #region styles
const wrapperStyles = cva(
  [
    'group/input flex items-center placeholder:capitalize overflow-hidden',
    'border-2 outline-none transition-colors duration-150',
    'focus-within:ring-2 focus-within:ring-offset-0',
    'data-[disabled=true]:bg-neutral-100 dark:data-[disabled=true]:bg-neutral-800',
    'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
  ],
  {
    variants: {
      state: {
        default: ['border-neutral-300 dark:border-neutral-600', 'focus-within:border-neutral-400 dark:focus-within:border-neutral-400', 'focus-within:ring-neutral-300/35'],
        error: ['border-red-400 dark:border-red-500', 'focus-within:border-red-500 dark:focus-within:border-red-400', 'focus-within:ring-red-300/35'],
        success: ['border-emerald-400 dark:border-emerald-500', 'focus-within:border-emerald-500 dark:focus-within:border-emerald-400', 'focus-within:ring-emerald-300/35'],
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

const inputStyles = cva(
  [
    'flex-1 h-full min-w-0 bg-transparent outline-none border-none ring-0 ring-offset-0',
    'text-neutral-800 dark:text-neutral-100',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500 placeholder:capitalize',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs placeholder:text-xs px-2',
        md: 'text-sm placeholder:text-sm px-2.5',
        lg: 'text-sm placeholder:text-sm px-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const affixStyles = cva(['flex items-center justify-center shrink-0 px-1.5', 'text-neutral-400 dark:text-neutral-500'], {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: { size: 'md' },
})

const labelStyles = cva('font-medium text-neutral-700 dark:text-neutral-300', {
  variants: {
    state: {
      default: 'text-neutral-700 dark:text-neutral-300',
      error: 'text-red-600 dark:text-red-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: { state: 'default', size: 'md' },
})

const clearButtonStyles = cva(
  ['flex items-center justify-center rounded-full leading-none', 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200', 'hover:bg-neutral-200 dark:hover:bg-neutral-700', 'transition-colors duration-100 cursor-pointer'],
  {
    variants: {
      size: {
        sm: 'size-3.5 text-xs',
        md: 'size-4 text-sm',
        lg: 'size-4.5 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
)
// #endregion

Input.displayName = 'Input'
export { Input }
