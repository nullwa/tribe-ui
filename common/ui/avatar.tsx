'use client'

import { type FC, type ComponentProps, useState } from 'react'

import { cva, tm, type VariantProps } from '@/common/utils/tw-merge'

type Props = Omit<ComponentProps<'img'>, 'size'> &
  VariantProps<typeof styles> & {
    src?: string
    fallback: string
  }

const Avatar: FC<Props> = ({ src, fallback, size = 'sm', radius = 'rounded', className, alt, ...rest }) => {
  const [failed, setFailed] = useState(false)
  return (
    <div data-slot='avatar' className={tm(styles({ size, radius, className }))}>
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img data-slot='avatar-image' src={src} alt={alt ?? fallback} onError={() => setFailed(true)} className='size-full object-cover' {...rest} />
      ) : (
        <div data-slot='avatar-fallback' className='bg-neutral-200 dark:bg-neutral-700 text-gray-950 dark:text-gray-300 text-secondary flex size-full items-center justify-center text-sm'>
          {fallback}
        </div>
      )}
    </div>
  )
}

// #region styles
const styles = cva('relative flex shrink-0 select-none items-center justify-center overflow-hidden cursor-pointer', {
  variants: {
    size: {
      sm: 'size-7',
      md: 'size-8',
      lg: 'size-9',
    },
    radius: {
      rounded: 'rounded-full',
      squared: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'rounded',
  },
})
// #endregion

Avatar.displayName = 'Avatar'
export { Avatar }
