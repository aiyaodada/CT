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
        >上传文件
      </el-button>
      <el-form-item label="文件夹">
        <el-select v-model="params.folderId" placeholder="文件夹" clearable class="w-100">
          <el-option
            v-for="(item, index) in listDataFolder.records"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="params.filePrefix" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="可见类型">
        <el-select
          v-model="params.folderVisible"
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
      class="cp"
      :data="tableData.records"
      border
      style="width: 100%; border-radius: 10px"
      size="mini"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }"
    >
      <el-table-column prop="filePrefix" label="名称">
        <template slot-scope="scope">
          <div class="color-primary" @click="onOpen(scope.row)">
            {{ scope.row.filePrefix }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="folderName" label="文件名称" />
      <el-table-column prop="fileSuffix" label="文件类型" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column width="180" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="onCopy(`${scope.row.filePath}?token=${$getToken()}`)"
            size="mini"
            >复制链接</el-button
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

    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="color-danger mb-20 cp">请先选择文件夹再上传图片 否则上传不上去！</div>
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="文件夹">
          <el-select v-model="form.folderId" placeholder="文件夹" clearable class="w-100">
            <el-option
              v-for="(item, index) in listDataFolder.records"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <UpLoad
            v-model="form.file"
            :form="form"
            :limit="1"
            message="最多上传一张图片"
          ></UpLoad>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini">确 定</el-button>
      </span> -->
    </el-dialog>

    <el-dialog
      :title="dialogFile.title"
      :visible.sync="dialogFileVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <div
          class="color-primary mb-20 cp"
          v-if="dialogFile.folderVisible == 0"
          @click="onCopy(dialogFile.pathUrl)"
        >
          {{ `${dialogFile.pathUrl}` }}
        </div>
        <div
          class="color-primary mb-20 cp"
          v-if="dialogFile.folderVisible == 1"
          @click="onCopy(`${dialogFile.pathUrl}?token=${$getToken()}`)"
        >
          {{ `${dialogFile.pathUrl}?token=${$getToken()}` }}
        </div>
      </div>
      <OpenImages
        :classStyle="`height: 500px;`"
        :url="
          dialogFile.folderVisible == 0
            ? dialogFile.pathUrl
            : `${dialogFile.pathUrl}?token=${$getToken()}`
        "
      ></OpenImages>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFileVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="mini">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import OpenImages from "@/components/OpenImages.vue";
import UpLoad from "@/components/UpLoad.vue";
export default {
  name: "Class",
  components: { OpenImages, UpLoad },
  data() {
    return {
      tableData: {},
      // 查询参数
      params: {
        pageNum: 1,
        pageSize: 10,
        folderId: "",
        filePrefix: "",
        folderVisible: "",
      },
      // 弹出框
      dialogVisible: false,
      dialogFileVisible: false,
      // 弹窗填充数据
      form: {},
      dialogFile: {
        title: "",
        pathUrl: "",
        folderVisible: null,
      },
      listDataFolder: {},
    };
  },
  async mounted() {
    await this.onSearch();
    await this.onSearchFolder();
  },
  methods: {
    async onSearchFolder() {
      this.listDataFolder = await this.$request.get(
        `/folder?pageNum=${1}&pageSize=${99999}`
      );
    },
    onOpen(data) {
      this.dialogFile.title = data.filePrefix + data.fileSuffix;
      this.dialogFile.pathUrl = data.filePath;
      this.dialogFile.folderVisible = data.folderVisible;
      this.dialogFileVisible = true;
    },
    async onCopy(url) {
      navigator.clipboard.writeText(`${url}`);
      this.$message.success("复制成功");
    },
    async onSearch() {
      let { pageNum, pageSize, folderId, filePrefix, folderVisible } = this.params;
      this.tableData = await this.$request.get(
        `/file?pageNum=${pageNum}&pageSize=${pageSize}&folderId=${folderId}&filePrefix=${filePrefix}&folderVisible=${folderVisible}`
      );
    },
    // 添加
    onAdd() {
      this.form = { folderId: "", file: null };
      this.dialogVisible = true;
    },
    // 编辑
    onEdit(data) {
      this.form = { ...data };
      this.dialogVisible = true;
    },
    // 提交
    async onSubmit() {
      // await this.$refs.form.validate();
      // 判断有没有id如果有就代表修改，没有就代表添加
      if (this.form.id != null) {
        await this.$request.patch(`/file/${this.form.id}`, { ...this.form });
      } else {
        await this.$request.post("/file", { ...this.form });
      }
      this.dialogVisible = false;
      await this.$message.success("操作成功");
      await this.onSearch();
    },
    // 删除
    async onDelete(data) {
      await this.$confirm(`是否确认删除${data.filePrefix + data.fileSuffix}?`);
      await this.$request.delete(`/file/${data.id}`);
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
    async handleClose(done) {
      //   this.$confirm("确认关闭？")
      //     .then((_) => {
      done();
      await this.onSearch();
      // })
      // .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
