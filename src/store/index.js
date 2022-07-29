import { createStore } from 'vuex'
import { UPDATE_CURRENT, UPDATE_BOOK, REMOVE_BOOK, CLEAR_BOOK } from './mutation-types'
import createPersistedState from 'vuex-persistedstate' // VeuxのステートをWebストレージに保存プラグイン

//保存データの設定
export default createStore({
  //初期値
  state: {
    //レビュー+書籍情報
    books: [],
    // 現在編集/選択中の書籍
    current: null
  },
  // 初期値の加工&取得
  // データを扱う処理を予め想定(項目挙げ)をして記述する
  getters: {
    // 登録済みのレビュー数
    bookCount(state){
      return state.books.length
    },
    //すべての登録済みのレビュー情報
    allBooks(state){
      return state.books
    },
    // 指定されたページのレビュー情報(引数はページ番号)
    getRangeByPage(state){
      return page => {
        const SIZE = 2
        return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
      }
    },
    // 指定されたidのレビュー情報
    getBookById(state){
      // 引数idををキーに配列booksを検索
      return id => {
        return state.books.find(book => book.id === id)
      }
    },
    // 現在編集中の書籍
    current(state){
      return state.current;
    },
    //すべての登録済みのレビュー情報
    // clearAll(state){
      
    //   return state.books
    // },
  },
  // 初期値の更新
  mutations: {
    // 編集中の書籍(current)を更新
    [UPDATE_CURRENT](state, payload){
      state.current = payload
    },
    // レビュー情報を更新(引数payloadは更新された書籍情報)
    [UPDATE_BOOK](state, payload){
      // id値(payload.id)で既存のレビューを検索
      const b = this.getters.getBookById(payload.id);
      // idのレビューが存在する場合は 
      if (b) {
        // Object.assign(A, B) オブジェクトA(既存レビュー)をB(更新情報)で上書き
        Object.assign(b, payload) 
      } 
      // 既存の情報がなければ
      else {
        // books配列の末尾にpush(追加) = append
        state.books.push(payload)
      }
    },
    // 書籍を削除
    [REMOVE_BOOK](state, payload){
      //console.log('click', payload.id, payload.title);
      state.books.some(function(book, index){
          if (book.id === payload.id) {
            state.books.splice(index, 1); //indexから1個目をスライス削除
          } 
      });
    },
    // 書籍を削除
    [CLEAR_BOOK](state){
      state.books = []
      state.current = null
    },
  },
  // 非同期処理を伴う処理
  // mutationsに対応する同名のアクション
  actions: {
    [UPDATE_CURRENT]({ commit }, payload) {
      commit(UPDATE_CURRENT, payload)
    },
    [UPDATE_BOOK]({ commit }, payload) {
      commit(UPDATE_BOOK, payload)
    },
    [REMOVE_BOOK]({ commit }, payload) {
      commit(REMOVE_BOOK, payload)
    },
    [CLEAR_BOOK]({ commit }, payload) {
      commit(CLEAR_BOOK, payload)
    }
  },
  // 
  // modules: {
  // },
  // ストレージ保存のためのプラグインを有効化
  plugins:[
    createPersistedState({
      key:'book-recorder',
      storage:localStorage
    })
  ]
})
