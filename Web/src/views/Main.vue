<template>
  <div class="box">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside>
          <Aside @tag="tag"></Aside>
        </el-aside>
        <el-main>
          <Tag :visitedValue="visitedValue"></Tag>
          <router-view style="padding: 20px"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import Tag from '@/components/Tag.vue'

export default {
  name: "Main",
  components: {
    Aside,
    Header,
    Tag
  },
  data() {
    return {
      visitedValue:[]
    }
  },
  mounted() {
    // console.log(this.$request.baseURL);
  },
  methods: {
    tag(value){
      this.visitedValue = value
    }
  }
}
</script>

<style scoped>
.box, section {
  width: 100%;
  height: 100%;
}

aside {
}

.el-header, .el-footer {
  line-height: 60px;
}

.el-header {
  padding: 0px;
}

>>> .el-aside {
  /*text-align: center;*/
  width: 250px !important;
  height: 100%;
}

.el-main {
  background: #f5f5f5;
  padding: 0!important;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>