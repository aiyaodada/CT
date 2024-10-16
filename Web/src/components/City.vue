<template>
  <div>
    <el-cascader class="w-100" :options="options" :props="{value:'label'}" @change="handleChange" placeholder="请选择" clearable/>
    <el-input v-model="address" @input="onAddress" placeholder="请输入详细地址" clearable></el-input>
  </div>
</template>

<script>
import {options} from "@/utils/city";

export default {
  name: "City",
  props: ['value'],
  data() {
    return {
      city: '',
      address: '',
      options: options,
    }
  },
  methods: {
    handleChange(value) {
      this.city = value.join('');
      this.$emit('input', this.city)
    },
    onAddress(value){
      console.log(this.city + value)
      this.$emit('input', this.city + value)
    }
  }
}
</script>

<style scoped>

</style>