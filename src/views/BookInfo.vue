<template>
  <div class="clearfix">
    <div class="image" v-bind:class="{ linkable: linkable }" v-on:click="onclick">
      <img v-bind:src="book.image" v-bind:alt="book.title">
    </div>
    <div class="details">
      <ul>
        <!-- <li v-if="index">{{ index }}.</li> -->
        <li>{{ book.title }}</li>
        <li>{{ book.author }} 著</li>
        <li>{{ book.price }} 円</li>
      </ul>
      <div v-if="flag" v-bind:href="book.linkurl" :underline="false" target="_blank">買おうかな</div>
      <div v-if="flag" v-on:click="onremove">削除</div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { UPDATE_CURRENT, REMOVE_BOOK } from '@/store/mutation-types'

  export default{
    name: 'BookInfo',
    props: {
      index: { type: Number },
      linkable: { type: Boolean, default: false},
      flag: { type: Boolean, default: false},
      book: { type: Object },
      //allBooks: { type: Object }
    },
    computed: {
      ...mapGetters(['allBooks']),
    },
    methods: { 
      // UPDATE_CURRENTアクションを同名のメソッドに紐付け
      ...mapActions([UPDATE_CURRENT, REMOVE_BOOK]),
      // クリック時に現在の書籍情報をステートに保存&フォームに移動
      onclick(){
        if (this.linkable) {
          this[UPDATE_CURRENT](this.book)
          this.$router.push('/form')
        }
      },
      onremove(){
        this[REMOVE_BOOK](this.book)
      }
    }
  }
</script>


<style scoped>
.linkable:hover {
  cursor: pointer;
  background-color: #ff9;
}

.image {
  float:left;
}

.image img {
  height: 180px;
}

.details {
  float: left;
}

.details li {
  list-style-type: none;
  text-align: left;
}

.clearfix {
  width: 100%;
  margin-bottom: 10px;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
</style>