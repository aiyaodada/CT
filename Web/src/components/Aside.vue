<template>
  <div style="width: 250px; height: 100%">
    <el-menu
      style="height: 100%"
      :default-active="$router.currentRoute.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#fff"
      text-color="#4d5259"
      active-text-color="#ffd04b"
      :router="true"
      :unique-opened="true"
    >
      <!--      <div v-for="item in list" :key="item.name">-->
      <!--        <el-menu-item v-if="!item.children" :index="item.path" @click="handleMenuSelect(item.name,item.path)">-->
      <!--          <i :class="item.icon"></i>-->
      <!--          <span slot="title">{{ item.name }}</span>-->
      <!--        </el-menu-item>-->

      <!--        <el-submenu v-else-if="item.children" :index="item.name">-->
      <!--          <template slot="title">-->
      <!--            <i :class="item.icon"></i>-->
      <!--            <span>{{ item.name }}</span>-->
      <!--          </template>-->

      <!--          <div v-for="children in item.children" :key="children.name">-->
      <!--            <el-menu-item class="itemChildren" :index="children.path"-->
      <!--                          @click="handleMenuSelect(children.name,children.path)">-->
      <!--              <i :class="children.icon"></i>-->
      <!--              <span slot="title">{{ children.name }}</span>-->
      <!--            </el-menu-item>-->
      <!--          </div>-->
      <!--        </el-submenu>-->
      <!--      </div>-->

      <div v-for="item in listData" :key="item.name">
        <el-menu-item
          v-if="!item.data"
          :index="item.url"
          @click="handleMenuSelect(item.name, item.url)"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>

          <div v-for="itemChildren in item.data">
            <el-menu-item
              class="itemChildren"
              v-if="!itemChildren.data"
              :index="itemChildren.url"
              @click="handleMenuSelect(itemChildren.name, itemChildren.url)"
              >{{ itemChildren.name }}
            </el-menu-item>
            <el-submenu v-else :key="itemChildren.name" :index="itemChildren.name">
              <template slot="title">
                <span>{{ itemChildren.name }}</span>
              </template>
              <el-menu-item v-for="itemCC in itemChildren.data" :index="itemCC.url">{{
                itemCC.name
              }}</el-menu-item>
            </el-submenu>
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Aside",
  data() {
    return {
      list: [],
      listData: [
        {
          icon: "el-icon-s-home",
          name: "首页",
          url: "/home",
        },{
          icon: "el-icon-picture",
          name: "公共图库",
          url: "/publicFile",
        },{
          icon: "el-icon-folder",
          name: "文件夹",
          url: "/folder",
        },{
          icon: "el-icon-picture",
          name: "文件",
          url: "/file",
        },
        // {
        //   name: '订单管理',
        //   icon: "el-icon-s-order",
        //   url: '/trade'
        // }, {
        //   icon: "el-icon-s-tools",
        //   name: '系统设置',
        //   data: [{
        //     name: '管理账号',
        //     url: '/account'
        //   }]
        // }
      ],
      visitedPages: [],
    };
  },
  mounted() {
    this.list = router.options.routes[2].children;
    console.log(router.options.routes);
    this.handleMenuSelect(this.$router.currentRoute.name, this.$router.currentRoute.path);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuSelect(name, path) {
      // nameurl存入到arr
      let arr = { name, path };
      // 是否满足指定条件
      let urlBash = this.visitedPages.some((v) => v.path === path);
      // 取反如果有就是true然后取反就是false
      if (!urlBash) {
        // 添加进去
        this.visitedPages.push(arr);
      }
      this.$emit("tag", this.visitedPages);
    },
  },
};
</script>

<style scoped>
.el-menu {
  border: 0px;
}

.logo {
  margin: 16px;
  font-weight: bold;
  color: #eeeeee;
  font-size: 23px;
}

.itemChildren {
  padding: 0px 16px;
  background: #dedede !important;
}

.itemChildren:hover {
  background: #dedede !important;
  color: #fff !important;
}

.is-active {
  border-right: 3px solid #33cabb;
  color: #409eff !important;
}
</style>
