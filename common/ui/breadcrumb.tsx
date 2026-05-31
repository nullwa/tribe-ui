'use client'
import Link from 'next/link'
import { type FC, type ReactNode, type ComponentProps, Fragment, useState, useEffect } from 'react'
import { cva, tm, type VariantProps } from '@/common/utils/tw-merge'

type Props = ComponentProps<'nav'> &
  VariantProps<typeof styles> &
  VariantProps<typeof itemStyles> & {
    items: BreadcrumbItem[]
    separator?: ReactNode
    ellipsis?: number
  }

const Breadcrumb: FC<Props> = ({ items, separator = '/', ellipsis = 0, size = 'md', variant = 'filled', radius, className, ...rest }) => {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpanded(false)
  }, [ellipsis, items])

  if (ellipsis < 0) throw new Error('[Breadcrumb] `ellipsis` must be a non-negative number.')

  const total: number = items.length
  const hideCount: number = Math.max(0, Math.floor(ellipsis))
  // middle items are everything between first and last two
  const middleItems = items.slice(1, total - 2)
  const shouldCollapse = hideCount > 0 && middleItems.length > 0 && !expanded

  const visibleItems: BreadcrumbItem[] = shouldCollapse
    ? [
        items[0],
        { title: '__ellipsis__', path: '#' },
        ...middleItems.slice(Math.min(hideCount, middleItems.length)), // clamp: if exceeded, slice all
        items[total - 2],
        items[total - 1],
      ]
    : items

  return (
    <nav aria-label='breadcrumb' data-slot='breadcrumb' className={tm(styles({ size, variant, radius }), className)} {...rest}>
      <ol className='h-full flex items-center gap-1.5'>
        {visibleItems.map((item: BreadcrumbItem, index: number) => {
          const isLast = index === visibleItems.length - 1

          return (
            <Fragment key={index}>
              <li className='flex items-center'>
                {item.title === '__ellipsis__' ? (
                  <button
                    type='button'
                    onClick={() => setExpanded((prev) => !prev)}
                    aria-label={expanded ? 'Collapse breadcrumbs' : 'Show hidden breadcrumbs'}
                    aria-expanded={expanded}
                    className={tm(itemStyles({ size }), 'cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100 px-0.5 rounded')}>
                    &hellip;
                  </button>
                ) : item.isDisabled ? (
                  <Link href={item.path} aria-disabled='true' aria-current={isLast ? 'page' : undefined} tabIndex={-1} className={tm(itemStyles({ size }), 'opacity-40 pointer-events-none cursor-not-allowed dark:opacity-30')}>
                    {item.icon && <span className='shrink-0'>{item.icon}</span>}
                    {item.title}
                  </Link>
                ) : isLast ? (
                  <span className={tm(itemStyles({ size }), 'text-neutral-900 dark:text-neutral-100 cursor-default pointer-events-none')} aria-current='page'>
                    {item.icon && <span className='shrink-0'>{item.icon}</span>}
                    {item.title}
                  </span>
                ) : (
                  <Link href={item.path} className={tm(itemStyles({ size }))}>
                    {item.icon && <span className='shrink-0'>{item.icon}</span>}
                    {item.title}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li aria-hidden='true' className={tm(separatorStyles({ size }))}>
                  {separator}
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

// #region types
type BreadcrumbItem = {
  title?: ReactNode
  path: string
  icon?: ReactNode
  isDisabled?: boolean
}
// #endregion

// #region styles
const styles = cva(['border'], {
  variants: {
    variant: {
      default: 'border-transparent',
      filled: 'bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700',
      outline: 'border-neutral-300 dark:border-neutral-600',
    },
    size: {
      sm: 'h-7 px-2',
      md: 'h-9 px-3.5',
      lg: 'h-9 px-3',
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
    size: 'md',
    radius: 'md',
    variant: 'default',
  },
})

const itemStyles = cva(['inline-flex items-center gap-1.5', 'cursor-pointer', 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'], {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const separatorStyles = cva(['inline-flex items-center', 'text-neutral-400 dark:text-neutral-600 select-none pointer-events-none'], {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
// #endregion

Breadcrumb.displayName = 'Breadcrumb'
export { Breadcrumb, type BreadcrumbItem }
