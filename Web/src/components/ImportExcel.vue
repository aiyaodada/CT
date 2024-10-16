<template>
  <div>
    <el-upload
        ref="upload"
        drag
        action=""
        :limit="1"
        :http-request="onImport"
        :before-upload="beforeAvatarUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip text-center" slot="tip">
        <div>只能上传Excel文件！</div>
        <div class="mt-10 cp color_primary" @click="downloadTemplate">下载模板</div>
      </div>
    </el-upload>

  </div>
</template>

<script>
import yangUtils from "@/utils/yangUtils";

export default {
  name: "ImportExcel",
  props: ['url'],
  data() {
    return {}
  },
  moputed() {
    console.log(this.dialog)
  },
  methods: {
    async downloadTemplate() {
      await yangUtils.downloadFile(
          `/${this.url}/exportExcel?id=-1`,
          new Date().format("会员信息模板_yyyyMMdd_hhmmss.xlsx")
      );
    },
    async onImport(e) {
      let fd = new FormData()
      fd.append('file', e.file)
      await this.$request.post(`/${this.url}/importExcel`, fd);
      await this.$message.success("导入成功");
      this.$emit("input", false);
    },
    beforeAvatarUpload(file) {
      // 判断是不是Excel文件
      const isExcel = file.name.endsWith('.xls') || file.name.endsWith('.xlsx');
      if (!isExcel) {
        this.$message.error('只能上传Excel文件!');
      }
      return isExcel;
    },
  },
  // watch()
}
</script>

<style scoped>
>>> .el-upload, >>> .el-upload-dragger {
  width: 100%;
}
</style>