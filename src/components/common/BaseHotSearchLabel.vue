<template>
  <div class="seek-box">
    <el-input class="width" v-model="input" placeholder="请输入内容"></el-input>
    <div class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</div>
  </div>
</template>

<script>
/**
 * 首页热门搜素显示组件
 */
export default {
  name: "BaseSearch",
  component:{},
  data(){
    return {
      input:'',
    };
  }
}
</script>

<style lang='scss'>
.seek-box{
	text-align: right;
	position: relative;
	margin-top: 14px;
  margin-bottom: 11px;
  
  .el-input{
    width: 100%;
    
    input{
      padding-right: 86px;
    }

    .el-input__inner:hover,.el-input__inner:focus{
      border-color: #fc7a43 !important;
    }
  }

  .seek-btn{
    border: 0;
    background: #ff9954 linear-gradient(to right,#ff9854,#fc703d);
    color: #fff;
    display: inline-block;
    position: absolute;
    top: 1px;
    right: 1px;
    width: 84px;
    height: 38px;
    border-radius: 0 4px 4px 0;
    text-align: center;
    line-height: 38px;
    
    img{
      display: inline-block;
      position: relative;
      top: 2px;
      margin-right: 5px;
    }
  }
}
</style>