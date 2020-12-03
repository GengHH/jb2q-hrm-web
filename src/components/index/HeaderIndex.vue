<template>
  <div id="indexHeader">
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">123</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">456</div></el-col>
      <el-col :span="8">
        <el-breadcrumb separator="">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"HeaderIndex",
  data(){
    return {
      inco:true,
      indeNavList:['123','456','789'],
    }
  }
}
</script>

<style lang='scss'>

#indexHeader {
  position: relative;
  height: 60px;
  width: 100%;
  background-color: $g-color;

  .el-row{
    width: 100%;
    height: 100%;
  }
  .el-col{
    height: 100%;
    .grid-content,.el-breadcrumb{
      line-height: 60px;
      height: 100%;
    }
    
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
  }
}
</style>