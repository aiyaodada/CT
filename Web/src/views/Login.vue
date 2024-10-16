<template>
  <!--  <div class="box df jcsb fdrr">-->
  <!--    <el-card class="box-card  asc">-->
  <!--      <h2 class="title">登录</h2>-->
  <!--      <el-form ref="ruleForm" :model="form" :rules="rules">-->
  <!--        <el-form-item label="账号" prop="userName">-->
  <!--          <el-input v-model="form.userName" placeholder="账号"></el-input>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="密码" prop="password">-->
  <!--          <el-input type="password" v-model="form.password" placeholder="密码"></el-input>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item class="box-btn df jcsb fdrr">-->
  <!--          <el-button type="primary" @click="login()">登录</el-button>-->
  <!--        </el-form-item>-->
  <!--      </el-form>-->
  <!--    </el-card>-->
  <!--  </div>-->
  <div class="box df jcsb">
    <el-card class="box-card asc" style="margin: 0 auto">
      <h2 class="title">登录</h2>
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            show-password
            type="password"
            v-model="form.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="df fdrr color-primary cp" @click="toRegister()">
          暂未账号？立马注册
        </div>
        <el-form-item class="box-btn df jcsb fdrr">
          <el-button type="primary" @click="login()">登录</el-button>
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
    async login() {
      // await this.$confirm(`是否登录?`);
      // 如果没正常输入数据报错是正常的
      await this.$refs.ruleForm.validate();
      let data = await this.$request.post("/user/login", this.form);
      this.$setToken(data);
      // await this.onGetUserInfo();
      this.$message.success("登录成功");
      localStorage.setItem("email", this.form.email);
      await this.$router.push("/");
    },
    async onGetUserInfo() {
      let result = await this.$request(`/sysUser/getInfo`);
      this.$setUserPermission(result.permissions);
      this.$setUserRole(result.roles);
      this.$setUserInfo(result.user);
    },
    toRegister() {
      this.$router.push("/register");
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
