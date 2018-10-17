export default async function (context) {
  if (!context.store.getters['auth/isAuthenticated']) {
    // 未認証の場合認証を行いユーザ情報をストアに格納する
    await context.store.dispatch('auth/loginCheck')

    // 認証に失敗した場合、インデックスページにリダイレクトする
    if (!context.store.getters['auth/isAuthenticated'] && context.route.path !== '/') context.redirect('/')
  }
}