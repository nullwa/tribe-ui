import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@/common/ui/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      type: 'string',
      control: { type: 'text' },
      description: 'The text to be displayed on the button. if not provided, it will default to "click me".',
    },
    state: {
      type: 'string',
      control: { type: 'select' },
      options: ['default', 'brand', 'error', 'success', 'warning', 'info'],
      description: 'The state of the button, which determines its visual style.',
    },
    variant: {
      type: 'string',
      control: { type: 'select' },
      options: ['solid', 'filled', 'outline', 'ghost', 'link'],
      description: 'The variant of the button, which determines its visual style.',
    },
    size: {
      type: 'string',
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button, which determines its dimensions and font size.',
    },
    radius: {
      type: 'string',
      control: { type: 'inline-radio' },
      options: ['none', 'sm', 'md', 'lg', 'rounded'],
      description: 'The border radius of the button, which determines how rounded the corners are.',
    },
    disabled: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Whether the button is disabled or not. A disabled button is non-interactive and typically has a faded appearance.',
    },
    loading: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state. A loading button typically shows a spinner or some indication that an action is in progress.',
    },
    icon: { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

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

export const Grid: Story = {
  render: () => (
    <div className='grid w-max grid-cols-5 gap-4'>
      <Button state='default' variant='solid'>
        Default Solid
      </Button>
      <Button state='default' variant='filled'>
        Default Filled
      </Button>
      <Button state='default' variant='outline'>
        Default Outline
      </Button>
      <Button state='default' variant='ghost'>
        Default Ghost
      </Button>
      <Button state='default' variant='link'>
        Default Link
      </Button>
      <Button state='brand' variant='solid'>
        Brand Solid
      </Button>
      <Button state='brand' variant='filled'>
        Brand Filled
      </Button>
      <Button state='brand' variant='outline'>
        Brand Outline
      </Button>
      <Button state='brand' variant='ghost'>
        Brand Ghost
      </Button>
      <Button state='brand' variant='link'>
        Brand Link
      </Button>
      <Button state='error' variant='solid'>
        Error Solid
      </Button>
      <Button state='error' variant='filled'>
        Error Filled
      </Button>
      <Button state='error' variant='outline'>
        Error Outline
      </Button>
      <Button state='error' variant='ghost'>
        Error Ghost
      </Button>
      <Button state='error' variant='link'>
        Error Link
      </Button>
      <Button state='success' variant='solid'>
        Success Solid
      </Button>
      <Button state='success' variant='filled'>
        Success Filled
      </Button>
      <Button state='success' variant='outline'>
        Success Outline
      </Button>
      <Button state='success' variant='ghost'>
        Success Ghost
      </Button>
      <Button state='success' variant='link'>
        Success Link
      </Button>
      <Button state='warning' variant='solid'>
        Warning Solid
      </Button>
      <Button state='warning' variant='filled'>
        Warning Filled
      </Button>
      <Button state='warning' variant='outline'>
        Warning Outline
      </Button>
      <Button state='warning' variant='ghost'>
        Warning Ghost
      </Button>
      <Button state='warning' variant='link'>
        Warning Link
      </Button>
      <Button state='info' variant='solid'>
        Info Solid
      </Button>
      <Button state='info' variant='filled'>
        Info Filled
      </Button>
      <Button state='info' variant='outline'>
        Info Outline
      </Button>
      <Button state='info' variant='ghost'>
        Info Ghost
      </Button>
      <Button state='info' variant='link'>
        Info Link
      </Button>
    </div>
  ),
}
