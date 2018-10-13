module.exports = {
  mode: 'spa',
  modules: [
    ['bootstrap-vue/nuxt', { css: false }]
  ],
  router: {
    middleware: 'auth'
  },
  plugins: [
    '~/plugins/firebase'
  ],
  css: [
    '@/assets/scss/app.scss'
  ]
}
