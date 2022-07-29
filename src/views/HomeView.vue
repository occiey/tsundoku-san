<template>
  <div class="list">
    <!-- 書籍情報を一覧表示 (キーはid) -->
    <p>{{ bookCount }}件の本が積まれています。</p>
    <BookInfo v-for="(b, i) of books"
      v-bind:linkable="true" 
      v-bind:flag="true"
      v-bind:book="b" 
      v-bind:index="i + 1" 
      v-bind:key="b.isbn"
      v-on:click="onremove"
    >
    </BookInfo>
    <div>
      <el-pagination background layout="prev, pager, next"
        v-bind:total="bookCount" v-bind:page-size="2" v-on:current-change="onchange">
      </el-pagination>
    </div>
    <div>
      <el-button type="primary" v-on:click="onclear">積んだ本をすべて削除</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { CLEAR_BOOK } from '@/store/mutation-types'
import BookInfo from '@/views/BookInfo.vue';

export default {
  name: 'TopPage', // コンポーネント名
  // booksは登録済みレビュー情報(配列)
  data(){
    return {
      books: [],
      page: 1
    }
  },
  // ローカルコンポーネントを登録
  components: {
    BookInfo
  },
  // ゲッターを算出プロパティに紐付け
  // mapGettersはvuexのstoreで定義した関数をコンポーネント側で使用したい時にマップ(同期)させる。
  // するとコンポーネント側で同名で使用することができる
  // ここではbookCoutというオブジェクト(値)とgetRangeByPageというメソッドを取得している。
  computed: {
    // ゲッターを、スプレッド演算子（object spread operator）を使って computed に組み込む
    ...mapGetters(['bookCount', 'getRangeByPage'])
  },
  methods: {
    ...mapActions([CLEAR_BOOK]),
    // ページが更新された時に、現在ページ用のレビュー情報を再セット
    onchange(page) {
      this.books = this.getRangeByPage(page)
      this.page = page
    },
    onremove(){
      this.books = this.getRangeByPage(this.page)
    },
    onclear(){
      this[CLEAR_BOOK]()
      this.books = this.getRangeByPage(1)
    }
  },
  // 初期化(マウント)時に1ページ目のレビューを取得
  mounted(){
    this.books = this.getRangeByPage(1)
    //const store = JSON.parse(localStorage.getItem("book-recorder")); // JSON形式に戻す
  }
}
</script>
