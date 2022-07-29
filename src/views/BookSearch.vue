<template>
  <div id="search">
    
    <el-form :inline="true" >
      <el-form-item label="キーワード">
        <el-input type="text" size="large" v-model="keyword" v-on:keydown.enter.prevent v-on:keydown.enter="onclick" placeholder="書籍を探してね"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onclick">検索</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <BookInfo v-for="(b, index) of books"
      v-bind:linkable="true" 
      v-bind:book="b" 
      v-bind:index="index + 1" 
      v-bind:key="b.isbn"
    >
    </BookInfo>

  </div>
</template>


<script>
import BookInfo from '@/views/BookInfo.vue';

export default {
  name: 'BookSearch', // コンポーネント名
  // booksは登録済みレビュー情報(配列)
  data(){
    return {
      keyword: '',
      books: []
    }
  },
  // ローカルコンポーネントを登録
  components: {
    BookInfo
  },
  methods: {
    // 検索ボタンをクリックしたとき
    onclick: function() {
      // google APIにリクエストを送る
      //this.$htttp('https://www.googleapis.com/books/v1/volumes?q=${this.keyword}')
      this.$htttp(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${this.keyword}&affiliateId=17ec84c9.a3747518.17ec84ca.980799cb&applicationId=1059923126131606337`)

      // 応答データをJSONデータとして取得
      .then((response) => {
        return response.json();
      })
      //.catch(error => console.log('失敗'))
      // JSON文字列の内容をbooksプロパティ(配列)に格納
      .then((data) => {
        this.books = []
        for (let b of data.Items) {
          const item   = b.Item
          const author = item.author;
          const price  = item.itemPrice;
          const img    = item.mediumImageUrl;
          const title  = item.title;
          const id     = item.isbn;
          const publisher     = item.publisherName;
          const published     = item.salesDate;
          const linkurl     = item.affiliateUrl;
          this.books.push({
            id: id,                               // ID値
            title: title,              // 書籍名
            author: author,  // 著者 => 存在する時「,」で連結、存在しない時空白
            price: price, 
            publisher: publisher,      // 出版社
            published: published,  // 刊行日
            image: img ? img : '',       // 表紙画像
            linkurl:linkurl
          })
        }
        //console.log(this.books.length)
      })
    }
  }
}
</script>

<style scoped>
  #search form{
    margin-top: 15px;
  }
</style>