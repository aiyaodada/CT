<template>
  <div class="box df jcsb">
    <div class="logo">朝阳床图 - 开源免费版</div>
    <div class="box-container">
      <div class="df jcsb">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            当前登录账号：{{ email }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import yangUtils from "@/utils/yangUtils";
export default {
  name: "Header",
  data() {
    return {
      email: "",
    };
  },
  mounted() {
    this.email = localStorage.getItem("email");
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("是否退出登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            yangUtils.removeToken();
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  background-color: #fff;
}

.box-container {
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}

.box-right {
  width: 20%;
}

.logout {
  color: #4d5259;
}
.el-dropdown-link {
  cursor: pointer;
  color: #4d5259;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.logo {
  margin: 0px 16px;
  font-weight: bold;
  color: #4d5259;
  font-size: 23px;
}
</style>
