import type { Meta, StoryObj } from '@storybook/nextjs'
import { Badge } from '@/common/ui/badge'
import { Check, Warning, Heart, Star, Bell, Tag, XCircle } from '@phosphor-icons/react'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A compact status indicator supporting semantic states, visual variants, counts and leading/trailing content.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Main badge label.',
      table: { category: 'Content' },
    },

    count: {
      control: 'number',
      description: 'Optional numeric value displayed after the label.',
      table: { category: 'Content' },
    },

    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'brand', 'error', 'success', 'warning', 'info'],
      description: 'Semantic colour state.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },

    variant: {
      control: { type: 'inline-radio' },
      options: ['solid', 'filled', 'outline', 'ghost'],
      description: 'Visual appearance.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'solid' },
      },
    },

    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },

    radius: {
      control: { type: 'inline-radio' },
      options: ['none', 'sm', 'md', 'lg', 'rounded'],
      description: 'Corner radius.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'none' },
      },
    },

    affix: {
      control: false,
      description: 'Content rendered before the label.',
      table: { category: 'Slots' },
    },

    suffix: {
      control: false,
      description: 'Content rendered after the label/count.',
      table: { category: 'Slots' },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof Badge>

// ─── Baseline ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Badge',
  },
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const VariantSolid: Story = {
  name: 'Variant / Solid',
  args: {
    label: 'Solid',
    variant: 'solid',
  },
}

export const VariantFilled: Story = {
  name: 'Variant / Filled',
  args: {
    label: 'Filled',
    variant: 'filled',
  },
}

export const VariantOutline: Story = {
  name: 'Variant / Outline',
  args: {
    label: 'Outline',
    variant: 'outline',
  },
}

export const VariantGhost: Story = {
  name: 'Variant / Ghost',
  args: {
    label: 'Ghost',
    variant: 'ghost',
  },
}

// ─── States ──────────────────────────────────────────────────────────────────

export const StateDefault: Story = {
  name: 'State / Default',
  args: {
    label: 'Default',
    state: 'default',
  },
}

export const StateBrand: Story = {
  name: 'State / Brand',
  args: {
    label: 'New',
    state: 'brand',
  },
}

export const StateError: Story = {
  name: 'State / Error',
  args: {
    label: 'Failed',
    state: 'error',
    affix: <XCircle weight='fill' />,
  },
}

export const StateSuccess: Story = {
  name: 'State / Success',
  args: {
    label: 'Active',
    state: 'success',
    affix: <Check weight='bold' />,
  },
}

export const StateWarning: Story = {
  name: 'State / Warning',
  args: {
    label: 'Pending',
    state: 'warning',
    affix: <Warning weight='fill' />,
  },
}

export const StateInfo: Story = {
  name: 'State / Info',
  args: {
    label: 'Preview',
    state: 'info',
  },
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: {
    label: 'Small',
    size: 'sm',
  },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: {
    label: 'Medium',
    size: 'md',
  },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: {
    label: 'Large',
    size: 'lg',
  },
}

// ─── Radius ──────────────────────────────────────────────────────────────────

export const RadiusNone: Story = {
  name: 'Radius / None',
  args: {
    label: 'Sharp',
    radius: 'none',
  },
}

export const RadiusFull: Story = {
  name: 'Radius / Full',
  args: {
    label: 'Pill',
    radius: 'rounded',
  },
}

// ─── Content ─────────────────────────────────────────────────────────────────

export const WithCount: Story = {
  name: 'Content / Count',
  args: {
    label: 'Notifications',
    count: 12,
  },
}

export const CountOnly: Story = {
  name: 'Content / Count only',
  args: {
    count: 99,
  },
}

// ─── Icons ───────────────────────────────────────────────────────────────────

export const Affix: Story = {
  name: 'Icons / Affix',
  args: {
    label: 'Featured',
    affix: <Star weight='fill' />,
  },
}

export const Suffix: Story = {
  name: 'Icons / Suffix',
  args: {
    label: 'Favorites',
    suffix: <Heart weight='fill' />,
  },
}

export const AffixAndSuffix: Story = {
  name: 'Icons / Both sides',
  args: {
    label: 'Tagged',
    affix: <Tag weight='fill' />,
    suffix: <Check weight='bold' />,
  },
}

export const IconOnly: Story = {
  name: 'Icons / Icon only',
  render: () => (
    <div className='flex items-center gap-2'>
      <Badge affix={<Heart weight='fill' />} />
      <Badge affix={<Star weight='fill' />} state='brand' />
      <Badge affix={<Bell weight='fill' />} variant='outline' />
      <Badge affix={<Check weight='bold' />} state='success' />
    </div>
  ),
}

// ─── Composition ─────────────────────────────────────────────────────────────

export const Grid: Story = {
  name: 'Composition / Full grid',
  render: () => (
    <div className='grid w-max grid-cols-4 gap-3'>
      {(['default', 'brand', 'error', 'success', 'warning', 'info'] as const).flatMap((state) =>
        (['solid', 'filled', 'outline', 'ghost'] as const).map((variant) => <Badge key={`${state}-${variant}`} state={state} variant={variant} label={`${state}`} />),
      )}
    </div>
  ),
}

export const SizeComparison: Story = {
  name: 'Composition / Size comparison',
  render: () => (
    <div className='flex items-center gap-3'>
      <Badge size='sm' label='Small' affix={<Bell weight='fill' />} />
      <Badge size='md' label='Medium' affix={<Bell weight='fill' />} />
      <Badge size='lg' label='Large' affix={<Bell weight='fill' />} />
    </div>
  ),
}

export const RadiusComparison: Story = {
  name: 'Composition / Radius comparison',
  render: () => (
    <div className='flex items-center gap-2'>
      {(['none', 'sm', 'md', 'lg', 'rounded'] as const).map((radius) => (
        <Badge key={radius} radius={radius} label='Badge' affix={<Tag weight='fill' />} />
      ))}
    </div>
  ),
}

export const NotificationExamples: Story = {
  name: 'Composition / Notification examples',
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge label='Inbox' count={3} />
      <Badge label='Alerts' count={12} state='warning' />
      <Badge label='Messages' count={99} state='brand' />
      <Badge label='Errors' count={2} state='error' />
    </div>
  ),
}
