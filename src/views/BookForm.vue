<template>
  <div id="form">
    <BookInfo v-bind:book="book"></BookInfo>
    <hr>
    <!-- レビュー入力のためのフォームを準備 -->
    <el-form ref="form" v-bind:model="form" v-bind:rules="rules" label-width="120px">
      <el-form-item label="登録日">
        <el-date-picker type="date" v-model="form.read"></el-date-picker>
      </el-form-item>
      <el-form-item label="メモ" prop="memo">
        <el-input type="textarea" size="large" v-model="form.memo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="prinmary" v-on:click="onsubmit">積読</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { h } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import BookInfo from '@/views/BookInfo.vue'
import { UPDATE_CURRENT, UPDATE_BOOK } from '@/store/mutation-types'

export default {
  name: 'BookForm', // コンポーネント名
  // ローカルコンポーネントを登録
  components: {
    BookInfo
  },
  // booksは登録済みレビュー情報(配列)
  data(){
    return {
      // 選択中の書籍
      book: {},
      // フォームの内容
      form:{
        read: new Date(),
        memo: ''
      },
      // 検証ルール
      rules:{
        memo:[
          { required: false, message: 'メモが未入力です。', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters([ 'current', 'getBookById' ]),
  // ページロード時の処理
  created(){
    // 選択中の書籍がない場合、トップページにリダイレクト
    if (!this.current){
      this.$router.push('/')
    }
    //選択中の書籍をbookプロパティに詰め替え
    this.book = Object.assign({}, this.current)
  },
  // マウント時
  mounted() {
    // 選択中の書籍でストア内の情報を検索
    const b = this.getBookById(this.book.id)
    //既にレビューが存在する場合は、その内容をフォームに反映
    if (b) {
      this.form.read = b.read
      this.form.memo = b.memo
    }
  },
  methods:{
    // アクションとメソッドとを紐付け
    ...mapActions([UPDATE_BOOK, UPDATE_CURRENT]),
    // [登録]ボタンでデータを登録
    onsubmit(){
      // 入力値の検証を実行
      this.$refs['form'].validate(valid => {
        // 検証に成功したらストアにも反映
        if (valid){
          this[UPDATE_BOOK](
            Object.assign({}, this.book, this.form)
          )
          // 選択書籍をクリア
          this[UPDATE_CURRENT](null)
          // 処理成功の通知メッセージを表示
          this.$notify({
            title: 'Reading Recorder',
            message: h('p', {style:'color:#009'},
              'いつか読みたい本を積読しました。'),
            duration: 2000
          })
          // フォームの内容をクリア
          this.form.read = new Date()
          this.form.memo = ''
          // トップページにリダイレクト
          this.$router.push('/')
        }
      })
    }
  }
  
}
</script>
<style scoped>
  #form{
    margin-top: 15px;
  }
</style>
