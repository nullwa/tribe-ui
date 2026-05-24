'use client'
import { type FC, type ReactNode, type ComponentProps, useRef, useState, useCallback } from 'react'
import { cva, tm, type VariantProps } from '@/common/utils/tw-merge'
import { SpinnerGapIcon, XIcon } from '@phosphor-icons/react'

type Props = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof wrapperStyles> & {
    label?: string
    hint?: string
    affix?: ReactNode
    suffix?: ReactNode
    loading?: boolean
    clearable?: boolean
  }

const Input: FC<Props> = ({
  label,
  required = false,
  hint,

  state = 'default',
  size = 'md',
  radius = 'md',
  placeholder,
  disabled = false,
  loading = false,
  clearable = false,
  affix,
  suffix,
  className,
  value,
  defaultValue,
  onChange,
  id,
  ...rest
}) => {
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

  // showClear drives visibility only — the button is always mounted when clearable=true
  const showClear = clearable && !disabled && !loading && String(currentValue).length > 0
  const hasRightSlot = !!(suffix || clearable || loading)

  const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  return (
    // min-w-0 prevents a long hint from stretching the outer container
    <div className='flex flex-col gap-1 min-w-0'>
      {label && (
        <label htmlFor={inputId} className={tm(labelStyles({ state, size }))}>
          {label}
          {required && (
            <span aria-hidden='true' className='ml-0.5 text-red-500'>
              *
            </span>
          )}
        </label>
      )}

      <div data-disabled={disabled} data-loading={loading} className={tm(wrapperStyles({ state, size, radius }), className)}>
        {/* ── Affix (left) ─────────────────────────────────────── */}
        {affix && <span className={tm(affixStyles({ size }), affixPadding[size ?? 'md'].left, 'pointer-events-none select-none')}>{affix}</span>}

        {/* ── Native input ─────────────────────────────────────── */}
        <input
          ref={inputRef}
          id={inputId}
          required={required}
          placeholder={placeholder}
          className={tm(
            inputStyles({ size }),
            // Strip the side padding that the adjacent slot already provides
            affix ? inputGap[size ?? 'md'].left : '',
            hasRightSlot ? inputGap[size ?? 'md'].right : '',
          )}
          disabled={disabled || loading}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          aria-invalid={state === 'error'}
          aria-busy={loading}
          aria-label={label ? undefined : rest['aria-label']}
          {...rest}
        />

        {/* ── Right slot (loading / clear / suffix) ────────────── */}
        {hasRightSlot && (
          <span className={tm(affixStyles({ size }), affixPadding[size ?? 'md'].right, 'gap-1.5')}>
            {loading ? (
              <SpinnerGapIcon className={spinnerStyles({ size })} aria-hidden />
            ) : (
              <>
                {/* Always mounted when clearable — visibility toggled to prevent layout shift */}
                {clearable && (
                  <button type='button' tabIndex={-1} onClick={handleClear} aria-label='Clear input' className={tm(clearButtonStyles({ size }), !showClear && 'invisible pointer-events-none')}>
                    <XIcon weight='bold' />
                  </button>
                )}
                {suffix}
              </>
            )}
          </span>
        )}
      </div>

      {/* ── Hint ─────────────────────────────────────────────────── */}
      {hint && (
        <p className={tm(hintStyles({ state, size }), 'wrap-break-word min-w-0')} role={state === 'error' ? 'alert' : undefined}>
          {hint}
        </p>
      )}
    </div>
  )
}

// ─── Spacing maps ─────────────────────────────────────────────────────────────
//
// Rule: outer padding (edge → icon) mirrors the input's own px.
//       inner gap  (icon → cursor) is half the outer padding.
//
//  sm  outer=8px  inner=4px   input-px=8px
//  md  outer=10px inner=6px   input-px=10px
//  lg  outer=12px inner=8px   input-px=12px

const affixPadding = {
  sm: { left: 'pl-2 pr-0', right: 'pr-2 pl-0' },
  md: { left: 'pl-2.5 pr-0', right: 'pr-2.5 pl-0' },
  lg: { left: 'pl-3 pr-0', right: 'pr-3 pl-0' },
} as const

// Replaces the side of input's normal px when the slot is present
const inputGap = {
  sm: { left: 'pl-1', right: 'pr-1' },
  md: { left: 'pl-1.5', right: 'pr-1.5' },
  lg: { left: 'pl-2', right: 'pr-2' },
} as const

// ─── Styles ───────────────────────────────────────────────────────────────────

const wrapperStyles = cva(
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
          'focus-within:border-amber-500 dark:focus-within:border-amber-400',
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
        sm: 'text-xs px-2',
        md: 'text-sm px-2.5',
        lg: 'text-sm px-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const affixStyles = cva(['flex items-center justify-center shrink-0', 'text-neutral-400 dark:text-neutral-500', 'transition-colors duration-150', 'group-focus-within/input:text-neutral-500 dark:group-focus-within/input:text-neutral-400'], {
  variants: {
    size: {
      sm: '[&_svg]:size-3.5',
      md: '[&_svg]:size-4',
      lg: '[&_svg]:size-4.5',
    },
  },
  defaultVariants: { size: 'md' },
})

const spinnerStyles = cva('animate-spin text-neutral-400 dark:text-neutral-500', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-4.5',
    },
  },
  defaultVariants: { size: 'md' },
})

const clearButtonStyles = cva(
  [
    'flex items-center justify-center rounded-full cursor-pointer',
    'text-neutral-400 dark:text-neutral-500',
    'hover:text-neutral-600 dark:hover:text-neutral-300',
    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    'active:scale-90',
    'transition-all duration-100',
  ],
  {
    variants: {
      size: {
        sm: 'size-3.5 [&_svg]:size-2.5',
        md: 'size-4   [&_svg]:size-3',
        lg: 'size-4.5 [&_svg]:size-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const labelStyles = cva('font-medium leading-none', {
  variants: {
    state: {
      default: 'text-neutral-700 dark:text-neutral-300',
      error: 'text-red-600    dark:text-red-400',
      success: 'text-emerald-600 dark:text-emerald-400',
      warning: 'text-amber-600  dark:text-amber-400',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: { state: 'default', size: 'md' },
})

const hintStyles = cva('leading-snug', {
  variants: {
    state: {
      default: 'text-neutral-400 dark:text-neutral-500',
      error: 'text-red-500    dark:text-red-400',
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

// ─── Export ───────────────────────────────────────────────────────────────────

Input.displayName = 'Input'
export { Input }
export type { Props as InputProps }
