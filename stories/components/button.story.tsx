import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@/common/ui/button'
import { Plus, Trash, PaperPlaneTilt, ArrowRight, ArrowLeft, DownloadSimple, Check, Warning, Pencil, SignIn, Heart } from '@phosphor-icons/react'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible button with support for multiple states, variants, sizes, icons, and a loading mode.',
      },
    },
  },
  argTypes: {
    // ── Content ──────────────────────────────────────────────────────────────
    label: {
      control: { type: 'text' },
      description: 'Text displayed on the button. Defaults to "click me" if omitted.',
      table: { category: 'Content' },
    },
    // ── Appearance ───────────────────────────────────────────────────────────
    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'brand', 'error', 'success', 'warning', 'info'],
      description: 'Visual colour state of the button.',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['solid', 'filled', 'outline', 'ghost', 'link'],
      description: 'Visual style of the button.',
      table: { category: 'Appearance', defaultValue: { summary: 'solid' } },
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
      description: 'Border-radius of the button.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    // ── Behaviour ────────────────────────────────────────────────────────────
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button — non-interactive with reduced opacity.',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a spinner and locks interaction.',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    // ── Slots ─────────────────────────────────────────────────────────────────
    icon: {
      control: false,
      description: 'ReactNode rendered on the left of the label.',
      table: { category: 'Slots' },
    },
    iconRight: {
      control: false,
      description: 'ReactNode rendered on the right of the label.',
      table: { category: 'Slots' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

// ─── Baseline ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Click me',
    state: 'default',
    variant: 'solid',
    size: 'md',
    radius: 'md',
    disabled: false,
    loading: false,
  },
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const VariantSolid: Story = {
  name: 'Variant / Solid',
  args: { label: 'Solid', variant: 'solid' },
}

export const VariantFilled: Story = {
  name: 'Variant / Filled',
  args: { label: 'Filled', variant: 'filled' },
}

export const VariantOutline: Story = {
  name: 'Variant / Outline',
  args: { label: 'Outline', variant: 'outline' },
}

export const VariantGhost: Story = {
  name: 'Variant / Ghost',
  args: { label: 'Ghost', variant: 'ghost' },
}

export const VariantLink: Story = {
  name: 'Variant / Link',
  args: { label: 'Link', variant: 'link' },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const StateDefault: Story = {
  name: 'State / Default',
  args: { label: 'Default', state: 'default' },
}

export const StateBrand: Story = {
  name: 'State / Brand',
  args: { label: 'Brand', state: 'brand' },
}

export const StateError: Story = {
  name: 'State / Error',
  args: { label: 'Delete account', state: 'error', icon: <Trash weight='bold' /> },
}

export const StateSuccess: Story = {
  name: 'State / Success',
  args: { label: 'Confirmed', state: 'success', icon: <Check weight='bold' /> },
}

export const StateWarning: Story = {
  name: 'State / Warning',
  args: { label: 'Proceed anyway', state: 'warning', icon: <Warning weight='bold' /> },
}

export const StateInfo: Story = {
  name: 'State / Info',
  args: { label: 'Learn more', state: 'info' },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { label: 'Small', size: 'sm' },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { label: 'Medium', size: 'md' },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { label: 'Large', size: 'lg' },
}

// ─── Radius ───────────────────────────────────────────────────────────────────

export const RadiusNone: Story = {
  name: 'Radius / None',
  args: { label: 'Sharp', radius: 'none' },
}

export const RadiusFull: Story = {
  name: 'Radius / Full',
  args: { label: 'Pill', radius: 'rounded' },
}

// ─── Icons ────────────────────────────────────────────────────────────────────

export const IconLeft: Story = {
  name: 'Icons / Left',
  args: { label: 'New item', icon: <Plus weight='bold' /> },
}

export const IconRight: Story = {
  name: 'Icons / Right',
  args: { label: 'Continue', iconRight: <ArrowRight weight='bold' /> },
}

export const IconBoth: Story = {
  name: 'Icons / Both sides',
  args: { label: 'Send', icon: <ArrowLeft weight='bold' />, iconRight: <PaperPlaneTilt weight='bold' /> },
}

export const IconOnly: Story = {
  name: 'Icons / Icon only',
  render: () => (
    <div className='flex items-center gap-2'>
      <Button icon={<Plus weight='bold' />} aria-label='Add' />
      <Button icon={<Trash weight='bold' />} state='error' aria-label='Delete' />
      <Button icon={<Pencil weight='bold' />} variant='outline' aria-label='Edit' />
      <Button icon={<DownloadSimple weight='bold' />} variant='ghost' aria-label='Download' />
      <Button icon={<Heart weight='bold' />} state='brand' radius='rounded' aria-label='Like' />
    </div>
  ),
}

// ─── Behaviour ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { label: 'Saving…', loading: true },
}

export const Disabled: Story = {
  args: { label: 'Unavailable', disabled: true },
}

export const DisabledWithIcon: Story = {
  name: 'Disabled / With icon',
  args: { label: 'Cannot submit', disabled: true, icon: <PaperPlaneTilt weight='bold' /> },
}

// ─── Composition ─────────────────────────────────────────────────────────────

/** All 6 states × 5 variants at a glance. */
export const Grid: Story = {
  name: 'Composition / Full grid',
  render: () => (
    <div className='grid w-max grid-cols-5 gap-3'>
      {(['default', 'brand', 'error', 'success', 'warning', 'info'] as const).map((state) =>
        (['solid', 'filled', 'outline', 'ghost', 'link'] as const).map((variant) => <Button key={`${state}-${variant}`} state={state} variant={variant} label={`${state} ${variant}`} />),
      )}
    </div>
  ),
}

/** All three sizes with icon + label for visual alignment check. */
export const SizeComparison: Story = {
  name: 'Composition / Size comparison',
  render: () => (
    <div className='flex items-center gap-3'>
      <Button size='sm' label='Small' icon={<DownloadSimple weight='bold' />} />
      <Button size='md' label='Medium' icon={<DownloadSimple weight='bold' />} />
      <Button size='lg' label='Large' icon={<DownloadSimple weight='bold' />} />
    </div>
  ),
}

/** Realistic action bar mixing states and variants. */
export const ActionBar: Story = {
  name: 'Composition / Action bar',
  render: () => (
    <div className='flex items-center gap-2'>
      <Button label='Cancel' variant='outline' />
      <Button label='Save draft' variant='filled' icon={<Pencil weight='bold' />} />
      <Button label='Publish' state='brand' icon={<PaperPlaneTilt weight='bold' />} />
    </div>
  ),
}

/** Destructive confirmation pattern. */
export const DestructiveConfirm: Story = {
  name: 'Composition / Destructive confirm',
  render: () => (
    <div className='flex items-center gap-2'>
      <Button label='Keep account' variant='outline' />
      <Button label='Delete permanently' state='error' icon={<Trash weight='bold' />} />
    </div>
  ),
}

/** Sign-in CTA with all radius options. */
export const RadiusComparison: Story = {
  name: 'Composition / Radius comparison',
  render: () => (
    <div className='flex items-center gap-2'>
      {(['none', 'sm', 'md', 'lg', 'rounded'] as const).map((radius) => (
        <Button key={radius} radius={radius} label='Sign in' icon={<SignIn weight='bold' />} />
      ))}
    </div>
  ),
}
