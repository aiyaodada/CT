<template>
  <div class="container">
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.userName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="不更改请留空"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit()" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    // 查询
    async onSearch() {
      this.form = await this.$request.get(`/sysUser/getEntityById?id=${1}`)
      this.form.password = ''
    },
    // 提交
    async onSubmit() {
      await this.$request.put("/sysUser/update", {...this.form});
      await this.$message.success("操作成功");
      await this.onSearch();
    }
  }
};
</script>

<style scoped>
</style>