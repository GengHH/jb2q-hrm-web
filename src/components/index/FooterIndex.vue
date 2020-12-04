<template>
  <div id="indexFooter">
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8">
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
  name:"FooterIndex",
  data(){
    return {
      inco:true,
      navList:[
        {id:'1',path:'/',nvaText:'首页'},
        {id:'2',path:'',nvaText:'活动管理'},
        {id:'3',path:'',nvaText:'活动列表'}
      ],
    }
  }
}
</script>

<style lang='scss'>
#indexFooter {
  height: 120px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: $g-white-color;
  z-index: 999;

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
  }
}

</style>