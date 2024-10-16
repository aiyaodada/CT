<template>
  <div>
    <el-tag class="tag cp"
            v-for="page in visitedValue"
            :key="page.url"
            closable
            @close="removeTag(page)"
            @click="onTag(page)"
    >
      {{ page.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    visitedValue: {
      type: Array,
      required: true
    }
  },
  mounted() {
  },
  methods: {
    // 跳转
    onTag(page) {
      this.$router.push(page.url)
    },
    // 移除标签
    removeTag(page) {
      // 获取下标
      const index = this.visitedValue.indexOf(page);
      // 如果还有数据就不是-1
      if (index !== -1) {
        // 根据下标删除
        this.visitedValue.splice(index, 1)
      }
      // 判断有没有数据没有数据是undefined
      if (this.visitedValue.at(index)) {
        this.onTag(this.visitedValue.at(index))
      } else if (index != 0) { // 判断下标是不是0
        this.onTag(this.visitedValue.at(index - 1))
      }else{
        this.$router.push("/")
      }
    },
  },
}
</script>

<style scoped>
.tag {
  margin: 2px;
}
</style>