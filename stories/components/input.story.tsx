import type { Meta, StoryObj } from '@storybook/nextjs'
import { Input } from '@/common/ui/input'
import { MagnifyingGlassIcon, UserIcon, MailboxIcon, LockSimpleOpenIcon } from '@phosphor-icons/react'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text input with support for labels, affixes, suffixes, validation states, loading, and a clearable mode.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Visible label rendered above the input.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when the field is empty.',
      table: { category: 'Content' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls height and font size.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    radius: {
      control: { type: 'inline-radio' },
      options: ['none', 'sm', 'md', 'lg', 'rounded'],
      description: 'Border-radius of the wrapper.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'error', 'success'],
      description: 'Visual validation state — drives border and label colour.',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the input and reduces its opacity.',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a spinner and locks the input while an async op is in progress.',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Renders a × button whenever the field has a value.',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    affix: {
      control: false,
      description: 'ReactNode rendered on the left (icon, currency symbol, etc.).',
      table: { category: 'Slots' },
    },
    suffix: {
      control: false,
      description: 'ReactNode rendered on the right (icon, unit, etc.).',
      table: { category: 'Slots' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

// ─── Baseline ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Enter a value…',
    size: 'md',
    radius: 'md',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  name: 'State / Error',
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    state: 'error',
    defaultValue: 'taken_user',
  },
}

export const SuccessState: Story = {
  name: 'State / Success',
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    state: 'success',
    defaultValue: 'available_user',
  },
}

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    label: 'API key',
    defaultValue: 'sk-••••••••••••••••••••',
    disabled: true,
  },
}

export const Loading: Story = {
  name: 'State / Loading',
  args: {
    label: 'Search',
    defaultValue: 'react query',
    loading: true,
    affix: <MagnifyingGlassIcon />,
  },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { size: 'sm', placeholder: 'Small…' },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { size: 'md', placeholder: 'Medium…' },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { size: 'lg', placeholder: 'Large…' },
}

// ─── Radius ───────────────────────────────────────────────────────────────────

export const RadiusNone: Story = {
  name: 'Radius / None',
  args: { radius: 'none', placeholder: 'No radius…' },
}

export const RadiusPill: Story = {
  name: 'Radius / Pill',
  args: { radius: 'rounded', affix: <MagnifyingGlassIcon />, placeholder: 'Pill search…' },
}

// ─── Affix & Suffix ───────────────────────────────────────────────────────────

export const WithAffix: Story = {
  name: 'Slots / Affix (icon)',
  args: {
    label: 'Email',
    affix: <MailboxIcon />,
    placeholder: 'you@example.com',
  },
}

export const WithTextAffix: Story = {
  name: 'Slots / Affix (text)',
  args: {
    label: 'Website',
    affix: <span className='text-xs font-medium text-neutral-400 px-1'>https://</span>,
    placeholder: 'yoursite.com',
  },
}

export const WithSuffix: Story = {
  name: 'Slots / Suffix (unit)',
  args: {
    label: 'Amount',
    suffix: <span className='text-xs font-medium text-neutral-400 pr-2.5'>USD</span>,
    placeholder: '0.00',
    className: 'text-right',
  },
}

export const WithAffixAndSuffix: Story = {
  name: 'Slots / Affix + Suffix',
  args: {
    label: 'Budget',
    affix: <span className='text-xs font-medium text-neutral-400 pl-2.5'>$</span>,
    suffix: <span className='text-xs font-medium text-neutral-400 pr-2.5'>/ mo</span>,
    placeholder: '0',
  },
}

// ─── Clearable ────────────────────────────────────────────────────────────────

export const Clearable: Story = {
  name: 'Behaviour / Clearable',
  args: {
    label: 'Search',
    affix: <MagnifyingGlassIcon />,
    clearable: true,
    defaultValue: 'react hooks',
    placeholder: 'Type to search…',
  },
}

// ─── Composed real-world examples ─────────────────────────────────────────────

export const SearchField: Story = {
  name: 'Composed / Search field',
  args: {
    affix: <MagnifyingGlassIcon />,
    clearable: true,
    radius: 'rounded',
    placeholder: 'Search anything…',
    size: 'md',
  },
}

export const PasswordField: Story = {
  name: 'Composed / Password field',
  args: {
    label: 'Password',
    affix: <LockSimpleOpenIcon />,
    placeholder: '••••••••',
    type: 'password',
  },
}

export const UsernameField: Story = {
  name: 'Composed / Username field',
  args: {
    label: 'Username',
    affix: <UserIcon />,
    clearable: true,
    placeholder: 'johndoe',
    state: 'default',
  },
}
