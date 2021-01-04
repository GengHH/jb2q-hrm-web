<template>
  <div id="seek-box">
    <el-input
      id="seek-box-input"
      class="input-with-select"
      v-model="input"
      :placeholder="placeholder"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select> -->
      <el-button slot="append" icon="el-icon-search">搜索</el-button>
      <!-- <el-button slot="append" class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</el-button> -->
    </el-input>
    <!-- <div class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</div> -->
    <!-- <el-button @click="test">test</el-button> -->
  </div>
</template>

<script>
/**
 * 通用的查询框组件
 */
export default {
  name: 'BaseSearch',
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  component: {},
  data() {
    return {
      input: '',
      select: '',
      selectOne: false
    };
  },
  methods: {
    test: function() {
      this.placeholder = 'hahahhahaahhhah';
    }
  }
};
</script>

<style lang="scss">
#seek-box {
  text-align: right;
  position: relative;
  margin-top: 14px;
  margin-bottom: 20px;

  .el-input {
    width: 100%;

    .el-input-group__prepend {
      padding-left: 0px;
      padding-right: 0px;
      border: 0;
      background-color: #fff;
    }

    #seek-box-input {
      height: 50px;
      border: 0;
      //padding-right: 86px;
      &:hover,
      &:focus {
        //border:1px solid #fc7a43 !important;
      }
    }
    .el-input-group__append {
      width: 175px;
      border: 0;
      .el-button {
        display: block;
        margin: 0 auto;
        font-size: 16px;
      }
    }

    .el-select {
      width: 140px;
      margin: 0 20px;
    }

    .el-select:first-child {
      //border-right: 1px solid #dcdfe6;
    }

    .el-select:last-child {
      margin-right: 0px;
    }
  }

  // .seek-btn span{
  //   border: 0;
  //   background: #ff9954 linear-gradient(to right,#ff9854,#fc703d);
  //   color: #fff;
  //   display: inline-block;
  //   position: absolute;
  //   top: 1px;
  //   right: 1px;
  //   width: 84px;
  //   height: 38px;
  //   border-radius: 0 4px 4px 0;
  //   text-align: center;
  //   line-height: 38px;

  //   img{
  //     display: inline-block;
  //     position: relative;
  //     top: 2px;
  //     margin-right: 5px;
  //   }
  //}

  .el-input-group__append {
    color: #fff;
    background: #ff9954 linear-gradient(to right, #ff9854, #fc703d);
  }
}
</style>
