<template>
  <div class="container">
    <!--  头部添加及搜索  -->
    <el-form inline size="small">
      <el-button
        type="success"
        size="small"
        icon="el-icon-plus"
        style="margin-right: 3em"
        @click="onAdd"
        >添加文件夹
      </el-button>
      <el-form-item label="名称">
        <el-input v-model="params.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="可见类型">
        <el-select
          v-model="params.visible"
          placeholder="可见类型"
          clearable
          class="w-100"
        >
          <el-option label="公共" value="0"></el-option>
          <el-option label="私密" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.records"
      border
      style="width: 100%; border-radius: 10px"
      size="mini"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }"
    >
      <!-- <el-table-column prop="id" label="编号" /> -->
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="visible" label="是否可见">
        <template slot-scope="scope">
          <el-tag :type="scope.row.visible == 0 ? '' : 'warning'">{{
            scope.row.visible == 0 ? "公共" : "私密"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column width="180" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            class="color-warning"
            @click="onEdit(scope.row)"
            size="mini"
            >编辑</el-button
          >
          <el-button
            type="text"
            class="color-danger"
            @click="onDelete(scope.row)"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        size="small"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="Number(tableData.current)"
        :page-sizes="[10, 50, 100]"
        :page-size="Number(tableData.size)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(tableData.total)"
      >
      </el-pagination>
    </div>
    <!--  弹窗  -->
    <el-dialog
      title="产品管理"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="可见类型">
          <el-select
            v-model="form.visible"
            placeholder="可见类型"
            clearable
            class="w-100"
          >
            <el-option label="公共" :value="0"></el-option>
            <el-option label="私密" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Class",
  components: {},
  data() {
    return {
      tableData: {},
      // 查询参数
      params: { pageNum: 1, pageSize: 10, name: "", visible: "" },
      // 弹出框
      dialogVisible: false,
      // 弹窗填充数据
      form: {},
      srcList: [],
      typeList: [],
      classList: [],
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 20, message: "请输入拼音或英文！", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const englishOrNumberPattern = /^[a-zA-Z0-9]+$/;
              if (!englishOrNumberPattern.test(value)) {
                callback(new Error("请输入英文或数字，且不允许出现其他标点符号"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  async mounted() {
    await this.onSearch();
  },
  methods: {
    async onSearch() {
      let { pageNum, pageSize, name, visible } = this.params;
      this.tableData = await this.$request.get(
        `/folder?pageNum=${pageNum}&pageSize=${pageSize}&name=${name}&visible=${visible}`
      );
    },
    // 添加
    onAdd() {
      this.form = { name: "", visible: 0 };
      this.dialogVisible = true;
    },
    // 编辑
    onEdit(data) {
      this.form = { ...data };
      this.dialogVisible = true;
    },
    // 提交
    async onSubmit() {
      await this.$refs.form.validate();
      // 判断有没有id如果有就代表修改，没有就代表添加
      if (this.form.id != null) {
        await this.$request.patch(`/folder/${this.form.id}`, { ...this.form });
      } else {
        await this.$request.post("/folder", { ...this.form });
      }
      this.dialogVisible = false;
      await this.$message.success("操作成功");
      await this.onSearch();
    },
    // 删除
    async onDelete(data) {
      await this.$confirm(`是否确认删除${data.name}?`);
      await this.$request.delete(`/folder/${data.id}`);
      await this.$message.success("操作成功");
      await this.onSearch();
    },
    // ...其他方法
    handlePageChange(newPage) {
      this.params.pageNum = newPage;
      // 如果需要从后端加载数据，此处可以调用
      this.onSearch();
    },
    handleSizeChange(newSize) {
      this.params.pageSize = newSize;
      // 如果需要从后端加载数据，此处可以调用
      this.onSearch();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped></style>
