<template>
  <div>
    <el-table
        ref="table"
        class="table"
        stripe
        border
        fit
        :header-cell-style="{background:'#409EFF',color:'#ffffff'}"
        :data="tableData">
      <el-table-column
          v-for="(column, index) in columns"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :fixed="column.fixed ? 'right' : ''"
          :width="column.width"
      >
        <template slot-scope="scope">
          <slot :name="column.prop" v-bind="scope">{{ scope.row[column.prop] }}</slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <div class="df jcsb fdrr">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 50, 100, 150, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageNum: {
      type: Number,
      default: 1
    }
  },
  methods: {
    loadData(){
      let {page, size, url, data} = this;
      console.log(url)
      this.$refs.table.loadData();
    },
    handleCurrentChange(val) {
      this.$emit('update:pageNum', val);
      this.$emit('page-change', val); // 当页码改变时触发
    },
    handleSizeChange(val) {
      this.$emit('update:pageSize', val);
      this.$emit('size-change', val); // 当每页数据量改变时触发
    },
    // editRow(index, row) {
    //   this.$emit('edit', index, row);
    // },
    // viewRow(index, row) {
    //   this.$emit('view', index, row);
    // },
    // deleteRow(index, row) {
    //   this.$emit('delete', index, row);
    // },
    // onEdit(index, row) {
    //   console.log('编辑', index, row);
    // },
    // onView(index, row) {
    //   console.log('查看', index, row);
    // },
    // onDelete(index, row) {
    //   console.log('删除', index, row);
    //   this.data.splice(index, 1);
    // },
  },
};
</script>

<style scoped>
>>>.el-table{
  border-radius: 8px;
}
>>>.el-table__cell{
  padding: 4px 0px;
}
</style>
