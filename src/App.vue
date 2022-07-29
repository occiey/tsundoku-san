<template>
  <div id="app">
    <h2>積読さん</h2>
    <el-menu mode="horizontal" background-color="#545c64" text-color="#fff">
      <el-menu-item index="1">
        <router-link to="/">積んだ本</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/search">本を探す</router-link>
      </el-menu-item>
      <!-- <el-submenu index="3">
        <template v-slot:title>SUPPORT</template>
        <el-menu-item index="3-1">
          <a href="https://wings.msn.to/" target="help">Author</a>
        </el-menu-item>
        <el-menu-item index="3-2">
          <a href="https://www.sbcr.jp" target="help">Publisher</a>
        </el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
    <router-view></router-view>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 800px;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  margin-bottom: 15px;
}
</style>
