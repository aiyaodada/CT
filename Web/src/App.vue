<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "/public/css/index";

@font-face {
  /*font-family: 'HarmonyOS';*/
  /*src: url('public/font/HarmonyOS_Sans_SC_Medium.ttf') format('truetype'); !* 相对路径从public目录开始 *!*/
  font-weight: normal;
  font-style: normal;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font-family: 幼圆;
  font-family: "HarmonyOS", sans-serif;
  box-sizing: border-box;
}

ul > li {
  list-style: none;
}

img {
  display: block;
}

a {
  text-decoration: none;
}

.db {
  display: block !important;
}

.df {
  display: flex;
}

.jcsa {
  justify-content: space-around;
}

.jcsb {
  justify-content: space-between;
}

.jcfe {
  justify-content: flex-end;
}

.fdrr {
  flex-direction: row-reverse;
}

/*垂直居中 父元素和子元素需要高宽*/
.asc {
  -webkit-align-self: center;
  align-self: center;
}

.fww {
  flex-wrap: wrap;
}

/*鼠标划上去变成小手指*/
.cp {
  cursor: pointer;
}

.bg-tomato-active {
  background: tomato !important;
}

.bg-tomato {
  background-color: rgba(255, 250, 249, 1) !important;
  border-color: rgba(255, 250, 249, 1) !important;
}

.bg-info {
  background-color: #909399 !important;
  border-color: #909399 !important;
}

.color-white {
  color: #fff !important;
}

.color-primary {
  color: #409eff !important;
}

.color-danger {
  color: #f56c6c !important;
}

.color-success {
  color: #67c23a !important;
}

.color-warning {
  color: #e6a23c !important;
}

.color-info {
  color: #909399 !important;
}

.color-tomato {
  color: tomato;
}

.color-money {
  color: #ff2020 !important;
}

.w-100 {
  width: 100% !important;
}

.w-60 {
  width: 60%;
}

.w-50 {
  width: 50%;
}

.w-40 {
  width: 40%;
}

.w-30 {
  width: 30%;
}

.w-20 {
  width: 20% !important;
}

.m-auto-0 {
  margin: 0 auto;
}

.my-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.mt-10 {
  margin-top: 10px;
}

.mx-10 {
  margin-left: 10px;
  margin-right: 10px;
}

.ml-10 {
  margin-left: 10px;
}

.mr-10 {
  margin-right: 10px;
}

.ml-20 {
  margin-left: 20px;
}

.mr-20 {
  margin-right: 20px;
}

.p-20 {
  padding: 20px;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

/*宽度*/
.w-100 {
  width: 100%;
}

.w-90 {
  width: 90%;
}

.w-85 {
  width: 85%;
}

.w-80 {
  width: 80%;
}

.w-75 {
  width: 75%;
}

.w-70 {
  width: 70%;
}

.w-65 {
  width: 65%;
}

.w-60 {
  width: 60%;
}

.w-55 {
  width: 55%;
}

.w-50 {
  width: 50%;
}

.w-45 {
  width: 45%;
}

.w-40 {
  width: 40%;
}

.w-35 {
  width: 35%;
}

.w-30 {
  width: 30%;
}

.w-25 {
  width: 25%;
}

.w-20 {
  width: 20%;
}

.w-15 {
  width: 15%;
}

.w-10 {
  width: 10%;
}

/*高度*/
.h-100 {
  height: 100%;
}

.h-95 {
  height: 95%;
}

.h-90 {
  height: 90%;
}

.h-85 {
  height: 85%;
}

.h-80 {
  height: 80%;
}

.h-20 {
  height: 20%;
}

.h-10 {
  height: 10%;
}

.oa {
  overflow: auto;
}

.oh {
  overflow: hidden;
}

/* 外边距 */
.m-0 {
  margin: 0px;
}

/* 内边距 */
</style>
