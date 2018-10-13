
export default function (context) {
  // インデックス画面では何もしない
  if (context.route.path === '/') return

  // Sign In済かどうかチェックしまだならインデックスに飛ばす
  if (!context.store.getters['auth/isAuthenticated']) {
    console.log('redirect to sign in')
    context.redirect('/')
  }
}