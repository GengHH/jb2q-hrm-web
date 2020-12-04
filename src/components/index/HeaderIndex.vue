<template>
  <div id="indexHeader">

    <el-row>
      <el-col :span="8" class="bg-purple"></el-col>
      <el-col :span="8" class="bg-purple-light"></el-col>
      <el-col :span="8" class="bg-purple">
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
      navList2:[
        {id:'2',path:'',nvaText:'活动管理'},
        {id:'3',path:'',nvaText:'活动列表'},
        {id:'1',path:'/',nvaText:'首页'},
      ],
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
  background-color: $index-header-back-color;

  .el-row{
    width: 100%;
    height: 100%;
  }

  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
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