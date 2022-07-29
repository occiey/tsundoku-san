<template>
  <header class="pt-16 px-8">
    <h1 class="flex justify-center w-32 mx-auto">
      <img v-bind:src="require('./assets/images/logo.png')" alt="積読さん">
    </h1>
    <nav>
      <ul class="flex justify-center pt-8 px-8">
        <li><router-link class="btn _btn-gray rounded-full p-2 px-6 mr-2" to="/">積んだ本</router-link></li>
        <li><router-link class="btn _btn-gray rounded-full p-2 px-6" to="/search">本を探す</router-link></li>
      </ul>
    </nav>
    <p class="flex justify-center pt-8 px-8 text-center">積読さんはただ気になる本を積むだけのメモサイトです。</p>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>
