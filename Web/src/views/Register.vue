<template>
  <div class="box df jcsb">
    <el-card class="box-card asc" style="margin: 0 auto">
      <h2 class="title">注册</h2>
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            show-password
            type="password"
            v-model="form.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="df fdrr color-primary cp" @click="toLogin()">已有账号？立马注册</div>
        <el-form-item class="box-btn df jcsb fdrr">
          <el-button type="primary" @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    async register() {
      // 如果没正常输入数据报错是正常的
      await this.$refs.ruleForm.validate();
      let data = await this.$request.post("/user/register", { ...this.form });
      this.$message.success("注册成功");
      await this.$router.push("/login");
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}

.box-card {
  width: 480px;
}

.title {
  margin: 10px 0px;
  text-align: center;
}
</style>
