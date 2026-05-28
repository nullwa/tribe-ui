'use client'
import { type FC, type ComponentProps } from 'react'
import { Avatar as Primitive } from '@base-ui/react/avatar'

import { cva, tm, type VariantProps } from '@/common/utils/tw-merge'

type Props = ComponentProps<'img'> &
  VariantProps<typeof styles> & {
    src?: string
    fallback: string
  }

const Avatar: FC<Props> = ({ src, fallback, size = 'sm', radius = 'rounded', className, ...rest }) => {
  return (
    <Primitive.Root data-slot='avatar' className={tm(styles({ size, radius, className }))}>
      <Primitive.Image data-slot='avatar-image' src={src} className='size-full object-cover' {...rest} />
      <Primitive.Fallback data-slot='avatar-fallback' className={tm('bg-neutral-200 dark:bg-neutral-700 text-gray-950 dark:text-gray-300 text-secondary flex size-full text-sm items-center justify-center')}>
        {fallback}
      </Primitive.Fallback>
    </Primitive.Root>
  )
}

// #region styles
const styles = cva(['select-none relative overflow-hidden shrink-0 flex items-center justify-center cursor-pointer'], {
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
