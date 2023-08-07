import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Signature Pad",
  base:"/vue-signature-pad/",
  description: "Vue Signature Pad Component",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/vue3-example' },
      { text: 'Support', link: '/team' }
    ],

    search: {
        provider: 'local'
    },

    footer: {
        copyright: 'CC-BY / MIT License | Copyright © 2023 Peng Jie'
    },
    sidebar: [

      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Vue 3 Example', link: '/vue3-example' },
          { text: 'Vue 3 Single Page Component', link: '/vue3-single-page-component-example' },
          { text: 'Vue 2 Example', link: '/vue2-example' },
          { text: 'Call Back Example', link: '/callback-example' }
        ]
      },
      {
          text: 'Support',
          items: [
              {text: 'Teams', link: '/team'},
          ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neighborhood999/vue-signature-pad' }
    ]
  }
})
