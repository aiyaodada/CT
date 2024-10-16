<template>
  <div>
    <el-image
        :style="classStyle"
        :src="$getFiles(url).split(',')[0]"
        :preview-src-list="$getFiles(url).split(',')" lazy>
    </el-image>
  </div>
</template>

<script>
export default {
  name: "OpenImages",
  props: ['url','classStyle'],
  data() {
    return {
      srcList: []
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; 只有当 srcList 至少有一个元素时才渲染 el-image 组件 &ndash;&gt;-->
<!--    <el-image-->
<!--        v-if="srcList.length > 0"-->
<!--        style="width: 32px; height: 32px"-->
<!--        :src="srcList[0].url"-->
<!--        :preview-src-list="srcList.map(item => item.url)">-->
<!--    </el-image>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "OpenImages",-->
<!--  props: ['url'],-->
<!--  data() {-->
<!--    return {-->
<!--      srcList: []-->
<!--    }-->
<!--  },-->
<!--  async mounted() {-->
<!--    await this.getFullPath(this.url);-->
<!--  },-->
<!--  methods: {-->
<!--    async getFullPath(val) {-->
<!--      const parts = val.split(",");-->
<!--      const urls = await Promise.all(parts.map(async (v) => {-->
<!--        const fileUrls = await this.$getFiles(v);  // 确保等待getFiles函数完成-->
<!--        return fileUrls.map(fileUrl => ({-->
<!--          response: `${v}`,-->
<!--          url: fileUrl-->
<!--        }));-->
<!--      }));-->
<!--      let data = urls.flat();  // Flatten the array if each $getFiles returns an array-->
<!--      this.srcList = data;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->