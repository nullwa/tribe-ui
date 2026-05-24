import '../styles/globals.css'
import type { Preview, StoryContext } from '@storybook/nextjs'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light mode' },
          { value: 'dark', icon: 'moon', title: 'Dark mode' },
        ],
        dynamicTitle: false,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context: StoryContext) => {
      const { theme } = context.globals
      return (
        <div data-theme={theme} className={`relative p-4 min-h-40 flex items-center justify-center bg-white dark:bg-neutral-950`}>
          <Story />
        </div>
      )
    },
  ],
}

export default preview
