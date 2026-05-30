import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  showPanel: true,
  panelPosition: 'left',
  theme: create({
    base: 'dark',
    brandTitle: '@nullwa/ui',
    brandImage: './logo.png',
    brandUrl: 'https://github.com/nullwa/ui',
    appBorderRadius: 2,
    inputBorderRadius: 2,
    fontBase: "'Geist', sans-serif",
    fontCode: "'Geist', monospace",
  }),
  previewTabs: {
    canvas: 'Playground',
  },
  navSize: 300,
})
