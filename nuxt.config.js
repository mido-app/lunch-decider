module.exports = {
  mode: 'spa',
  modules: [
    ['bootstrap-vue/nuxt', { css: false }]
  ],
  plugins: [
    '~/plugins/firebase'
  ],
  css: [
    '@/assets/scss/app.scss'
  ]
}
