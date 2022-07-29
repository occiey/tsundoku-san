import ElementPlus from 'element-plus'
import '../assets/css/element-variables.scss'
import locale from 'element-plus/lib/locale/lang/ja'

// ElementPlusを登録するための関数
export default (app) => {
  app.use(ElementPlus, { locale })
}
