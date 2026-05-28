import type { Meta, StoryObj } from '@storybook/nextjs'
import { Avatar } from '@/common/ui/avatar'

const IMAGE = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&h=256&fit=crop'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a user profile image with an automatic fallback when the image is unavailable.',
      },
    },
  },
  args: {
    src: IMAGE,
    fallback: 'WS',
    size: 'md',
    radius: 'rounded',
    alt: 'User avatar',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL.',
      table: {
        category: 'Content',
      },
    },
    fallback: {
      control: 'text',
      description: 'Content displayed when the image cannot be loaded.',
      table: {
        category: 'Content',
      },
    },
    alt: {
      control: 'text',
      description: 'Accessible image description.',
      table: {
        category: 'Accessibility',
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Controls avatar dimensions.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },
    radius: {
      control: 'inline-radio',
      options: ['rounded', 'squared'],
      description: 'Avatar border radius.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'rounded' },
      },
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof Avatar>

// ─── Baseline ────────────────────────────────────────────────────────────────

export const Default: Story = {}

// ─── Content ─────────────────────────────────────────────────────────────────

export const WithImage: Story = {
  name: 'Content / Image',
  args: {
    src: IMAGE,
    fallback: 'WS',
  },
}

export const FallbackOnly: Story = {
  name: 'Content / Fallback',
  args: {
    src: undefined,
    fallback: 'WS',
  },
}

export const LongFallback: Story = {
  name: 'Content / Long fallback',
  args: {
    src: undefined,
    fallback: 'W',
  },
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: {
    size: 'sm',
  },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: {
    size: 'md',
  },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: {
    size: 'lg',
  },
}

// ─── Radius ──────────────────────────────────────────────────────────────────

export const RadiusRounded: Story = {
  name: 'Radius / Rounded',
  args: {
    radius: 'rounded',
  },
}

export const RadiusSquared: Story = {
  name: 'Radius / Squared',
  args: {
    radius: 'squared',
  },
}

// ─── Composition ─────────────────────────────────────────────────────────────

export const SizeComparison: Story = {
  name: 'Composition / Size comparison',
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar size='sm' src={IMAGE} fallback='WS' />
      <Avatar size='md' src={IMAGE} fallback='WS' />
      <Avatar size='lg' src={IMAGE} fallback='WS' />
    </div>
  ),
}

export const RadiusComparison: Story = {
  name: 'Composition / Radius comparison',
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar radius='rounded' src={IMAGE} fallback='WS' />
      <Avatar radius='squared' src={IMAGE} fallback='WS' />
    </div>
  ),
}

export const UserList: Story = {
  name: 'Composition / User list',
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-3'>
        <Avatar src={IMAGE} fallback='WS' />
        <span>Wala Sebii</span>
      </div>

      <div className='flex items-center gap-3'>
        <Avatar fallback='JD' />
        <span>John Doe</span>
      </div>

      <div className='flex items-center gap-3'>
        <Avatar radius='squared' fallback='AM' />
        <span>Alice Martin</span>
      </div>
    </div>
  ),
}

export const Team: Story = {
  name: 'Composition / Team',
  render: () => (
    <div className='flex -space-x-2'>
      <Avatar src={IMAGE} fallback='A' />
      <Avatar fallback='B' />
      <Avatar fallback='C' />
      <Avatar fallback='D' />
    </div>
  ),
}
