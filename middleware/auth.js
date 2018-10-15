import firebase from 'firebase/app'
import 'firebase/auth'

export default function (context) {
  // インデックス画面では何もしない
  if (context.route.path === '/') return;

  // ストアに認証情報があるかどうか問い合わせる
  if (!context.store.getters['auth/isAuthenticated']) {
    return new Promise((resolve, reject) => {

      // 認証情報がない場合、Firebase Authenticationに問い合わせ
      firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          // サインインしている場合はストアに情報を保存
          let userDoc = {
            userId: user.uid,
            name: user.displayName,
            iconURL: user.photoURL
          }
          context.store.commit('auth/setUser', userDoc)
        } else {
          // サインインしていない場合・サインアウトした場合
          // ストアの情報をクリアした上でインデックス画面に飛ばす
          context.store.commit('auth/setUser', null)
          context.redirect('/')
        }
        return resolve();
      })
    })
  }
}