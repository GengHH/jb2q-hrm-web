<template>
  <div class="seek-box">
    <el-input class="input-with-select" v-model="input" placeholder="请输入内容">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <div>|</div>
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <!-- <el-button slot="append" class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</el-button> -->
    </el-input>
    <div class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</div>
  </div>
</template>

<script>
export default {
  name: "BaseSearch",
  component:{},
  data(){
    return {
      input:'',
      select: '1'
    };
  }
}
</script>

<style lang='scss'>
.seek-box{
	text-align: right;
	position: relative;
	margin-top: 14px;
  margin-bottom: 20px;
  
  .el-input{
    width: 100%;
    
    .input-with-select > .el-input-group__prepend{
      padding-right: 0px;        
      input{
        padding-right: 86px;
      }
    }

    .input-with-select:hover,.input-with-select:focus{
      border-color: #fc7a43 !important;
    }

    .el-select{
      width: 140px;
      margin: 0 20px;
    }

    .el-select:first-child{
      border-right: 1px solid #dcdfe6;
    }

    .el-select:last-child{
      margin-right: 0px;
    }
  }
 

  .seek-btn span{
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