import type { Meta, StoryObj } from '@storybook/nextjs'
import { Input } from '@/common/ui/input'
import { MagnifyingGlass, Envelope, LockSimple, User, CurrencyDollar, At, Globe, Eye } from '@phosphor-icons/react'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible text input with support for labels, hints, affixes, suffixes, validation states, loading, and a clearable mode.',
      },
    },
  },
  argTypes: {
    // ── Content ──────────────────────────────────────────────────────────────
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
    hint: {
      control: { type: 'text' },
      description: 'Helper / validation message rendered below the input, colour-matched to `state`.',
      table: { category: 'Content' },
    },
    // ── Appearance ───────────────────────────────────────────────────────────
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'Visual validation state — drives border, label, and hint colour.',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
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
    // ── Behaviour ────────────────────────────────────────────────────────────
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
    // ── Slots ─────────────────────────────────────────────────────────────────
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

// ─── Label & hint ─────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
}

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    required: true,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    hint: 'Must be at least 8 characters long.',
  },
}

export const WithMessages: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    state: 'error',
    messages: ['Must be at least 8 characters', 'Must contain an uppercase letter', 'Must contain a number'],
  },
}

// ─── Validation states ────────────────────────────────────────────────────────

export const StateError: Story = {
  name: 'State / Error',
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    state: 'error',
    hint: 'Please enter a valid email address.',
  },
}

export const StateSuccess: Story = {
  name: 'State / Success',
  args: {
    label: 'Username',
    defaultValue: 'johndoe',
    state: 'success',
    hint: 'Username is available!',
  },
}

export const StateWarning: Story = {
  name: 'State / Warning',
  args: {
    label: 'Username',
    defaultValue: 'john',
    state: 'warning',
    hint: 'Short usernames are often taken quickly.',
  },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: {
    size: 'sm',
    label: 'Small',
    placeholder: 'Small input…',
  },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: {
    size: 'md',
    label: 'Medium',
    placeholder: 'Medium input…',
  },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: {
    size: 'lg',
    label: 'Large',
    placeholder: 'Large input…',
  },
}

// ─── Radius ───────────────────────────────────────────────────────────────────

export const RadiusNone: Story = {
  name: 'Radius / None',
  args: { placeholder: 'No radius…', radius: 'none' },
}

export const RadiusFull: Story = {
  name: 'Radius / Full',
  args: { placeholder: 'Fully rounded…', radius: 'rounded' },
}

// ─── Affixes & suffixes ───────────────────────────────────────────────────────

export const WithAffix: Story = {
  name: 'Slots / Affix',
  args: {
    label: 'Search',
    placeholder: 'Search anything…',
    affix: <MagnifyingGlass weight='regular' />,
  },
}

export const WithSuffix: Story = {
  name: 'Slots / Suffix',
  args: {
    label: 'Website',
    placeholder: 'yoursite',
    suffix: <span>.com</span>,
  },
}

export const WithBoth: Story = {
  name: 'Slots / Affix + Suffix',
  args: {
    label: 'Price',
    placeholder: '0.00',
    type: 'number',
    affix: <CurrencyDollar weight='regular' />,
    suffix: <span>USD</span>,
  },
}

export const AffixIcon: Story = {
  name: 'Slots / Common icons',
  render: () => (
    <div className='flex flex-col gap-3 w-72'>
      <Input placeholder='Search…' affix={<MagnifyingGlass weight='regular' />} />
      <Input placeholder='you@example.com' affix={<Envelope weight='regular' />} type='email' />
      <Input placeholder='Password' affix={<LockSimple weight='regular' />} type='password' />
      <Input placeholder='Username' affix={<User weight='regular' />} />
      <Input placeholder='@handle' affix={<At weight='regular' />} />
      <Input placeholder='https://…' affix={<Globe weight='regular' />} />
      <Input placeholder='Password' suffix={<Eye weight='regular' />} type='password' />
    </div>
  ),
}

// ─── Behaviour ────────────────────────────────────────────────────────────────

export const Clearable: Story = {
  args: {
    label: 'Search',
    defaultValue: 'Remove me',
    clearable: true,
    affix: <MagnifyingGlass weight='regular' />,
  },
}

export const Loading: Story = {
  args: {
    label: 'Checking availability…',
    defaultValue: 'johndoe',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Read-only field',
    defaultValue: 'Cannot edit this',
    disabled: true,
  },
}

export const DisabledWithAffix: Story = {
  name: 'Disabled / With affix',
  args: {
    label: 'Email',
    defaultValue: 'locked@example.com',
    disabled: true,
    affix: <Envelope weight='regular' />,
  },
}

// ─── Composition ─────────────────────────────────────────────────────────────

/** A realistic sign-up form to see inputs in context. */
export const SignUpForm: Story = {
  name: 'Composition / Sign-up form',
  render: () => (
    <div className='flex flex-col gap-4 w-80'>
      <Input label='Full name' placeholder='Jane Doe' required affix={<User weight='regular' />} />
      <Input label='Email address' placeholder='jane@example.com' type='email' required affix={<Envelope weight='regular' />} state='error' hint='That email is already in use.' />
      <Input label='Password' placeholder='••••••••' type='password' required affix={<LockSimple weight='regular' />} hint='Minimum 8 characters.' />
      <Input label='Website' placeholder='yoursite' affix={<Globe weight='regular' />} suffix={<span>.com</span>} />
    </div>
  ),
}

/** All three sizes stacked for quick visual comparison. */
export const SizeComparison: Story = {
  name: 'Composition / Size comparison',
  render: () => (
    <div className='flex flex-col gap-3 w-72'>
      <Input size='sm' placeholder='Small' affix={<MagnifyingGlass weight='regular' />} clearable defaultValue='Small value' />
      <Input size='md' placeholder='Medium' affix={<MagnifyingGlass weight='regular' />} clearable defaultValue='Medium value' />
      <Input size='lg' placeholder='Large' affix={<MagnifyingGlass weight='regular' />} clearable defaultValue='Large value' />
    </div>
  ),
}

/** All four validation states at a glance. */
export const StateComparison: Story = {
  name: 'Composition / State comparison',
  render: () => (
    <div className='flex flex-col gap-3 w-72'>
      <Input label='Default' placeholder='Neutral…' />
      <Input label='Error' defaultValue='bad-input' state='error' hint='Something went wrong.' />
      <Input label='Success' defaultValue='valid-input' state='success' hint='Looks great!' />
      <Input label='Warning' defaultValue='risky-input' state='warning' hint='Proceed with caution.' />
    </div>
  ),
}
