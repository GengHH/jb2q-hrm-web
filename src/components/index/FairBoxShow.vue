<template>
  <!--S 特色专栏部分 -->
  <div class="activity-box-module">
    <el-row>
      <el-col :span="7" class="pr">
        <img width="300" src="../../assets/img/img04.png" alt="">
        <div v-if="online" class="float-div"><i class="circle-sty"></i> 进行中</div>
        <div v-if="offline" class="float-div2"><i class="circle-sty"></i> 未开始</div>
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="18">
        <p class="black-font">
          “助跑就业，青春有梦”——2020年长宁区高校毕业生专场招聘会
          <span v-if="online" class="span-line">线上</span>
          <span v-if="offline" class="span-line2">线下</span>
        </p>
          <el-row class="mat-15">
            <el-col  :span="18">
              <p class="six-hui  line30 or-font"><i class="icon iconfont six-hui">&#xe651;</i> 2020-11-26 9:00  至 2020-11-28 18:00</p>
              <p class="six-hui  line30 mat-15"><i class="icon iconfont">&#xe652;</i> 剩余展位 ：<i class="or-font">16</i> 人</p>
              <p class="six-hui  line30"><i class="icon iconfont">&#xe650;</i> 招聘地点：长宁区就业促进中心(长宁区武夷路517号)  
                <el-link class="blue-font" :underline="false"> 
                <i class="icon iconfont">&#xe654;</i> 附近交通</el-link>
              </p>
            </el-col>
            <el-col  :span="6">
              <el-button class="release-btn font-size18 mat-15" type="primary" ><i class="icon iconfont font-size20">&#xe653;</i> 单位报名</el-button>
              
            </el-col>
          </el-row>
      </el-col>
    </el-row>
  </div>
  <!--E 特色专栏部分 -->
</template>

<script>
export default {
  name:'ActivityBoxShow',
  props:{
    activityInfo: Object
  },
  data(){
    return{
      online:true,
      offline:false
    }
  }
}
</script>

<style lang='scss' scoped>
.activity-box-module {
  border-bottom: 1px solid #ededed;
  padding: 30px 0;
  .el-row {
    width: 100%;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .black-font {
    font-size: 20px;
    color: #000000;
    line-height: 30px;
  }
  .line30 {
    line-height: 30px;
  }
  .mat-15 {
    margin-top: 15px;
  }

  .ul-style {
    text-align: left;
    padding-left: 20px;
    .float-div,.float-div2 {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 5px 10px;
      border-radius: 0 15px 15px 0;
      font-size: 16px;
      color: #fff;
    }
    .float-div {
      background: rgba(252,111,61,0.9);
    }
    .float-div2 {
      background: rgba(71,102,164,0.9);
    }
    .black-font {
      font-size: 20px;
      color: #000000;
      line-height: 30px;
      .span-line,.span-line2 {
        padding: 3px 7px;
        font-size: 16px;
        color: #fff;
        border-radius: 5px;
      }
      .span-line {
        background-color: #fc7a43;
      }
      .span-line2 {
        background-color: #4766a4;
      }
    }
  }
  // .six-hui {
  //   font-size: 16px;
  //   color: #868686;
  // }
  // .or-font {
  //   color: #fda749 !important;
  // }
  // .font-size18 {
  //   font-size: 18px;
  // }
  // .release-btn {
  //   background-color: #fc7a43;
  //   font-size: 14px;
  //   color: #fff;
  //   border-color: #fc7a43;
  // }
}
</style>