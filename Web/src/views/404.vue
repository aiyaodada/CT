<template>
  <div class="_404">
    <h2 class="m-0">抱歉，页面未找到，<span>{{countDown}}</span>s后自动跳转到
      <a href="javascript:;" @click="goHome">首页</a>
    </h2>
    <img src="../../public/404.png" alt="">
  </div>
</template>

<script>
export default {
  name: "NF404",
  data() {
    return {
      countDown: 5,
      timer: null
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
      clearInterval(this.timer)
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.countDown > 0 ? this.countDown-- : this.goHome()
    }, 1000)
  }
}
</script>

<style>
body {
  background-color: #dceebc;
}

._404 {
  width: 30%;
  margin: 5rem auto;
}

._404 img {
  width: 30rem;
}

._404 a {
  color: #010101;
}

._404 a:hover {
  color: skyblue;
}
</style>