<template>
  <div class="container">

    <!--  头部添加及搜索  -->
    <el-form inline size="small">
      <el-form-item label="姓名">
        <el-input v-model="params.name" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="params.phone" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="params.idCard" placeholder="身份证号" clearable></el-input>
      </el-form-item>
      <el-form-item label="注销/退款">
        <el-select v-model="params.productType" placeholder="注销/退款" clearable>
          <el-option label="注销" value="注销"></el-option>
          <el-option label="退款" value="退款"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <!--        导出-->
        <!--        <el-button type="warning" icon="el-icon-download" @click="onExport">导出</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.records"
      border
      style="width: 100%; border-radius: 10px"
      size="mini"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }"
    >
      <el-table-column prop="tradeNo" label="订单号" width="160" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="idCard" label="身份证号" width="160" />
      <el-table-column prop="sn" label="SN码" width="200" />
      <el-table-column prop="productType" label="类型" />
      <el-table-column prop="payTotal" label="支付金额" />
      <el-table-column prop="payStatus" label="支付状态" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
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
  </div>
</template>

<script>
import yangUtils from "@/utils/yangUtils";
export default {
  name: "Class",
  components: {},
  data() {
    return {
      tableData: [],
      // 分页信息
      pagination: {
        pageSize: 10,
        pageNum: 1,
      },
      // 查询参数
      params: { name: "", phone: "", idCard: "", productType: "" },
    };
  },
  async mounted() {
    await this.onSearch();
  },
  methods: {
    // 查询
    async onSearch() {
      let { name, phone, idCard, productType } = this.params;
      this.tableData = await this.$request.get(
        `/tradeOrder/listQuery?pageSize=${this.pagination.pageSize}&pageNum=${this.pagination.pageNum}&name=${name}&phone=${phone}&idCard=${idCard}&productType=${productType}`
      );
    },
    // ...其他方法
    handlePageChange(newPage) {
      this.pagination.pageNum = newPage;
      // 如果需要从后端加载数据，此处可以调用
      this.onSearch();
    },
    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      // 如果需要从后端加载数据，此处可以调用
      this.onSearch();
    },
  },
};
</script>

<style scoped></style>
