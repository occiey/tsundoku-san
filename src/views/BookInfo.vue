<template>
  <div class="item_list border-b">
    <div class="flex item p-6 border-t">
      <div class="w-32 sm:w-64" v-bind:class="{ linkable: linkable }" v-on:click="onclick">
        <img v-bind:src="book.image" v-bind:alt="book.title" class="w-full">
      </div>
      <div class="w-full pl-4 sm:pl-6">
        <ul class="mb-3">
          <li class="text-2xl mb-2">{{ book.title }}</li>
          <li class="text-xs text-gray-400 mb-2">{{ book.author }} 著</li>
          <li class="text-2xl">{{ book.price }} <span class="text-lg">円</span></li>
        </ul>
        <div class="flex">
          <a class="btn _btn-primary rounded-md py-2 px-3 text-sm mr-2" v-if="flag" v-bind:href="book.linkurl" v-bind:underline="false" target="_blank">買おうかな</a>
          <div class="btn _btn-gray rounded-md py-2 px-3 text-sm cursor-pointer" v-if="flag" v-on:click="onremove">取り消し</div>
        </div>
      </div>
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
  .linkable {
    cursor: pointer;
  }
</style>