import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
require('./assets/css/scss/style.scss')
require('./assets/css/tailwind.css')

const app = createApp(App)

// (app.config)vueアプリ配下で利用できるvue用のメンバーを設定
// メンバー名を$htttpとして、javascriptのfetchメソッドを紐付け。
// javascriptのfetchのまま使用も可能だがVueオブジェクトのメソッドとしておくことで、後々メリットがある。
// Vueオブジェクトにインスタンスのプロパティを追加するときは接頭辞に「$」を付けて既存のプロパティやメソッドとの衝突を防ぐ
// 「$http」はあくまで任意なので「$hoge」としても良い。
app.config.globalProperties.$htttp = (url, opts) => { return fetch(url, opts)}

// ElementPlusの有効化
installElementPlus(app)
// Vuex(store)とVue router(router)を組み込み、アプリをマウント
app.use(store).use(router).mount('#app')