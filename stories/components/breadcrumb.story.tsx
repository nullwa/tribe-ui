import type { Meta, StoryObj } from '@storybook/nextjs'
import { Breadcrumb } from '@/common/ui/breadcrumb'
import { House, Laptop, Folder, File, GearSix, Users, ChartBar, Database, Globe, ShoppingCart } from '@phosphor-icons/react'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A breadcrumb navigation component that provides a trail for users to follow back to the starting or entry point of a website.',
      },
    },
  },
  argTypes: {
    // ── Content ──────────────────────────────────────────────────────────────
    items: {
      control: false,
      description: 'Array of breadcrumb items, each with a `title`, `path`, optional `icon`, and optional `isDisabled` flag.',
      table: { category: 'Content' },
    },
    separator: {
      control: { type: 'text' },
      description: 'Custom separator rendered between items. Defaults to "/".',
      table: { category: 'Content', defaultValue: { summary: '/' } },
    },
    ellipsis: {
      control: { type: 'number', min: 0 },
      description: 'Number of middle items to collapse behind an expandable ellipsis. Set to 0 to disable.',
      table: { category: 'Content', defaultValue: { summary: '0' } },
    },
    // ── Appearance ───────────────────────────────────────────────────────────
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'filled', 'outline'],
      description: 'Visual style of the breadcrumb container.',
      table: { category: 'Appearance', defaultValue: { summary: 'filled' } },
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
      description: 'Border-radius of the breadcrumb container.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof Breadcrumb>

// ─── Shared fixtures ─────────────────────────────────────────────────────────

const baseItems = [
  { title: 'Home', path: '/', icon: <House weight='fill' /> },
  { title: 'Settings', path: '/settings', icon: <GearSix weight='fill' /> },
  { title: 'Users', path: '/settings/users' },
  { title: 'Profile', path: '/settings/users/profile' },
]

const longItems = [
  { title: 'Home', path: '/', icon: <House weight='fill' /> },
  { title: 'Dashboard', path: '/dashboard', icon: <ChartBar weight='fill' /> },
  { title: 'Projects', path: '/dashboard/projects' },
  { title: 'Alpha', path: '/dashboard/projects/alpha' },
  { title: 'Data', path: '/dashboard/projects/alpha/data', icon: <Database weight='fill' /> },
  { title: 'Reports', path: '/dashboard/projects/alpha/data/reports' },
]

// ─── Baseline ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    items: baseItems,
    variant: 'filled',
    size: 'md',
    radius: 'md',
    ellipsis: 0,
    separator: '/',
  },
}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const VariantDefault: Story = {
  name: 'Variant / Default',
  args: { items: baseItems, variant: 'default' },
}

export const VariantFilled: Story = {
  name: 'Variant / Filled',
  args: { items: baseItems, variant: 'filled' },
}

export const VariantOutline: Story = {
  name: 'Variant / Outline',
  args: { items: baseItems, variant: 'outline' },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { items: baseItems, size: 'sm' },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { items: baseItems, size: 'md' },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { items: baseItems, size: 'lg' },
}

// ─── Radius ───────────────────────────────────────────────────────────────────

export const RadiusNone: Story = {
  name: 'Radius / None',
  args: { items: baseItems, variant: 'filled', radius: 'none' },
}

export const RadiusFull: Story = {
  name: 'Radius / Full',
  args: { items: baseItems, variant: 'filled', radius: 'rounded' },
}

// ─── Separators ───────────────────────────────────────────────────────────────

export const SeparatorSlash: Story = {
  name: 'Separator / Slash',
  args: { items: baseItems, separator: '/' },
}

export const SeparatorChevron: Story = {
  name: 'Separator / Chevron',
  args: { items: baseItems, separator: '›' },
}

export const SeparatorDot: Story = {
  name: 'Separator / Dot',
  args: { items: baseItems, separator: '·' },
}

export const SeparatorDash: Story = {
  name: 'Separator / Dash',
  args: { items: baseItems, separator: '—' },
}

// ─── Icons ────────────────────────────────────────────────────────────────────

export const IconsNone: Story = {
  name: 'Icons / None',
  args: {
    items: [
      { title: 'Home', path: '/' },
      { title: 'Products', path: '/products' },
      { title: 'Laptops', path: '/products/laptops' },
      { title: 'Asus TUF A14', path: '/products/laptops/asus-tuf-a14' },
    ],
  },
}

export const IconsAll: Story = {
  name: 'Icons / All items',
  args: {
    items: [
      { title: 'Home', path: '/', icon: <House weight='fill' /> },
      { title: 'Store', path: '/store', icon: <ShoppingCart weight='fill' /> },
      { title: 'Laptops', path: '/store/laptops', icon: <Laptop weight='fill' /> },
      { title: 'Asus TUF A14', path: '/store/laptops/asus-tuf-a14', icon: <Globe weight='fill' /> },
    ],
  },
}

export const IconsMixed: Story = {
  name: 'Icons / First only',
  args: {
    items: [
      { title: 'Home', path: '/', icon: <House weight='fill' /> },
      { title: 'Documents', path: '/documents' },
      { title: 'Reports', path: '/documents/reports' },
      { title: 'Q4 Summary', path: '/documents/reports/q4' },
    ],
  },
}

// ─── States ───────────────────────────────────────────────────────────────────

export const StateDisabled: Story = {
  name: 'State / Disabled item',
  args: {
    items: [
      { title: 'Home', path: '/', icon: <House weight='fill' /> },
      { title: 'Projects', path: '/projects' },
      { title: 'Archived', path: '/projects/archived', isDisabled: true },
      { title: 'Old Report', path: '/projects/archived/old-report' },
    ],
  },
}

export const StateShort: Story = {
  name: 'State / Single item',
  args: {
    items: [{ title: 'Home', path: '/', icon: <House weight='fill' /> }],
  },
}

export const StateTwoItems: Story = {
  name: 'State / Two items',
  args: {
    items: [
      { title: 'Home', path: '/', icon: <House weight='fill' /> },
      { title: 'Dashboard', path: '/dashboard' },
    ],
  },
}

// ─── Ellipsis ─────────────────────────────────────────────────────────────────

export const EllipsisCollapsed: Story = {
  name: 'Ellipsis / Collapsed (1)',
  args: { items: longItems, ellipsis: 1 },
}

export const EllipsisCollapsedMore: Story = {
  name: 'Ellipsis / Collapsed (3)',
  args: { items: longItems, ellipsis: 3 },
}

export const EllipsisExceeded: Story = {
  name: 'Ellipsis / Count exceeds middle',
  args: { items: longItems, ellipsis: 99 },
}

// ─── Composition ─────────────────────────────────────────────────────────────

/** All 3 variants at a glance. */
export const VariantComparison: Story = {
  name: 'Composition / Variant comparison',
  render: () => (
    <div className='flex flex-col gap-3'>
      {(['default', 'filled', 'outline'] as const).map((variant) => (
        <Breadcrumb key={variant} variant={variant} items={baseItems} />
      ))}
    </div>
  ),
}

/** All three sizes for visual alignment check. */
export const SizeComparison: Story = {
  name: 'Composition / Size comparison',
  render: () => (
    <div className='flex flex-col gap-3'>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Breadcrumb key={size} size={size} variant='filled' items={baseItems} />
      ))}
    </div>
  ),
}

/** All five radius options side-by-side. */
export const RadiusComparison: Story = {
  name: 'Composition / Radius comparison',
  render: () => (
    <div className='flex flex-col gap-3'>
      {(['none', 'sm', 'md', 'lg', 'rounded'] as const).map((radius) => (
        <Breadcrumb key={radius} radius={radius} variant='filled' items={baseItems} />
      ))}
    </div>
  ),
}

/** Realistic file-explorer path. */
export const FileExplorer: Story = {
  name: 'Composition / File explorer',
  render: () => (
    <Breadcrumb
      variant='outline'
      separator='›'
      items={[
        { title: 'Root', path: '/', icon: <Database weight='fill' /> },
        { title: 'projects', path: '/projects', icon: <Folder weight='fill' /> },
        { title: 'alpha', path: '/projects/alpha', icon: <Folder weight='fill' /> },
        { title: 'src', path: '/projects/alpha/src', icon: <Folder weight='fill' /> },
        { title: 'index.ts', path: '/projects/alpha/src/index.ts', icon: <File weight='fill' /> },
      ]}
    />
  ),
}

/** Deep path with ellipsis collapse. */
export const DeepNavigation: Story = {
  name: 'Composition / Deep navigation',
  render: () => (
    <Breadcrumb
      variant='filled'
      ellipsis={2}
      items={[
        { title: 'Home', path: '/', icon: <House weight='fill' /> },
        { title: 'Organisation', path: '/org' },
        { title: 'Team Alpha', path: '/org/alpha' },
        { title: 'Projects', path: '/org/alpha/projects' },
        { title: 'Data Pipeline', path: '/org/alpha/projects/pipeline', icon: <Database weight='fill' /> },
        { title: 'Settings', path: '/org/alpha/projects/pipeline/settings', icon: <GearSix weight='fill' /> },
      ]}
    />
  ),
}

/** Admin panel header with users context. */
export const AdminPanel: Story = {
  name: 'Composition / Admin panel',
  render: () => (
    <div className='flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900'>
      <Breadcrumb
        variant='default'
        separator='/'
        items={[
          { title: 'Admin', path: '/admin', icon: <GearSix weight='fill' /> },
          { title: 'Users', path: '/admin/users', icon: <Users weight='fill' /> },
          { title: 'Edit Profile', path: '/admin/users/edit' },
        ]}
      />
    </div>
  ),
}
