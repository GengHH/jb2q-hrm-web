<template>
  <div id="indexHeader">
    <el-row>
      <el-col :sm="24" :md="6" :lg="8" :xl="8" class="bg-purple">
        <img src="@/assets/img/logo.png" alt="">
        <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
        <img class="logo3" src="@/assets/img/logo3.png" alt="">
      </el-col>
      <el-col :sm="24" :md="18" :lg="16" :xl="16" class="bg-purple">
        <el-breadcrumb separator="">
          <el-breadcrumb-item v-for="nvaIndex in navList" :key="nvaIndex.id" :to="{ path: nvaIndex.path }">
            {{ nvaIndex.nvaText }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"HeaderIndex",
  props:{
    navList: Array
  },
  data(){
    return {
      inco:true,
    }
  }
}
</script>

<style lang='scss'>
#indexHeader {
  position: relative;
  height: 60px;
  width: 100%;
  padding: 0 5%;
  background-color: $g-mian-color;
  color: $g-white-color !important;
  .el-row{
    width: 100%;
    height: 100%;
    img {
      float: left;
      width: 30px;
      height: 32px;
      position: relative;
      top: 14px;
      display: block;
    }
    img:last-child {
      width: 194px;
      height: 32px;
    }
  }

  .bg-purple {
    //background: #d3dce6;
  }
  .bg-purple-light {
    //background: #e5e9f2;
  }
  .el-col{
    height: 100%;
    .el-breadcrumb{
      line-height: 60px;
      height: 100%;
    }
    

    .el-breadcrumb__item{
      font {
        color: #333;
        size: 16px;
      }
      height:60px;
      padding:0 10px;
      float: right;
      text-align: right;
    }
    .el-breadcrumb__item:hover{
      border-bottom: 2px solid red;
    }
  }
}
</style>