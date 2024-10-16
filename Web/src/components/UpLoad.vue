<template>
  <div>
    <el-upload
      ref="upload"
      action=""
      multiple
      :limit="limit || 1"
      :file-list="uploadList"
      :http-request="onUpLoadFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :list-type="listType || 'picture-card'"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <!--      @click="dialogUploadImage = true"-->
    </el-upload>
    <el-dialog :visible.sync="dialogUploadImage" :append-to-body="true">
      <el-image
        style="width: 100%"
        :src="`${$getFiles(value)}?token=${$getToken()}`"
        :preview-src-list="[`${$getFiles(value)}?token=${$getToken()}`]"
      >
      </el-image>
    </el-dialog>
    <!--    color:#888;-->
    <div class="color_danger" style="font-size: 75%">
      {{ message != null ? message : `最多上传${limit}张图片` }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "limit", "listType", "message", "folder", "form"],
  data() {
    return {
      dialogUploadImage: false,
      uploadList: [],
      srcList: [],
    };
  },
  async mounted() {
    await this.getFullPath(this.value);
  },
  methods: {
    getFullPath(val) {
      this.uploadList = !val
        ? []
        : val.split(",").map((v) => ({
            response: `${v}`,
            url: `${this.$getFiles(`${v}?token=${this.$getToken()}`)}`,
          }));
      // console.log(this.uploadList);
    },
    // 渲染图片
    // async getFullPath(val) {
    //   if (!val) {
    //     this.uploadList = [];
    //     return;
    //   }
    //   const parts = val.split(",");
    //   const urls = await Promise.all(parts.map(async (v) => {
    //     const fileUrls = await this.$getFiles(v);  // 确保等待getFiles函数完成
    //     return fileUrls.map(fileUrl => ({
    //       response: `${v}`,
    //       url: fileUrl
    //     }));
    //   }));
    //   let data = urls.flat();  // Flatten the array if each $getFiles returns an array
    //
    //   this.uploadList = data.map(v => ({
    //     response: `${v}`,
    //     url: `${v.url}`
    //   }));
    // },
    // 图片上传
    async onUpLoadFile(e) {
      if (!this.form.folderId) {
        this.$message.error("请先选择文件夹");
        this.value = null;
        return;
      }

      let fd = new FormData();
      fd.append("file", e.file);
      fd.append("folderId", this.form.folderId);
      // console.log(e)
      // console.log(`1->${window.URL.createObjectURL(new Blob(e.file, { type: 'image/jpeg' }))}`)
      let file = await this.$request.post(`/file`, fd);
      this.$message.success("上传成功");
      this.$emit("input", !this.value ? file : this.value + "," + file);
    },
    handlePictureCardPreview(file) {
      this.dialogUploadImage = true;
    },
    handleUploadSuccess(res) {
      this.$emit("input", !this.value ? res : this.value + "," + res);
    },
    beforeAvatarUpload(file) {
      const isImage = file.type.startsWith("image/");
      const isLt300M = file.size / 1024 / 1024 < 300;

      if (!isImage) {
        this.$message.error("上传的文件必须是图片格式!");
      }
      if (!isLt300M) {
        this.$message.error("上传的图片大小不能超过 300MB!");
      }

      return isImage && isLt300M;
    },
    handleRemove(res) {
      let path = this.uploadList
        .filter((v) => v.response !== res.response)
        .map((v) => v.response)
        .join(",");
      this.$emit("input", path);
    },
  },
  watch: {
    value(val) {
      this.getFullPath(val);
    },
  },
};
</script>

<style scoped></style>
