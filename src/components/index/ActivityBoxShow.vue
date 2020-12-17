<template>
  <!--S 特色专栏部分 -->
  <div class="activity-box-module">
    <el-row>
      <el-col :sm="2" :md="4" :lg="6">
        <img width="300" src="../../assets/img/img01.png" alt />
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="18">
        <p class="black-font">2020上海某银行校园招聘公告解读备考指导特别讲座</p>
        <p class="six-hui ellipsis line30">这次公司2020上海某银行校园招聘公告解读备考指导特别讲座邀请了某某专家、某某专家为我们讲解...</p>
        <el-row class="mat-15">
          <el-col :span="18">
            <p class="six-hui line30 or-font">
              <i class="icon iconfont six-hui">&#xe651;</i> 2020-11-26 9:00 至 2020-11-28 18:00
            </p>
            <p class="six-hui line30">
              <i class="icon iconfont">&#xe652;</i> 人数限制 ：200 人
            </p>
            <p class="six-hui line30">
              <i class="icon iconfont">&#xe650;</i> 活动地点：长宁区就业促进中心(长宁区武夷路517号)
            </p>
          </el-col>
          <el-col :span="6">
            <el-button class="release-btn font-size18" type="primary">
              <i class="icon iconfont font-size20">&#xe653;</i> 去报名
            </el-button>
            <p class="six-hui line30">
              还剩名额：
              <i class="or-font">8</i> 个
            </p>
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

    }
  }
}
</script>

<style lang='scss' scoped>
  .activity-box-module {
    border-bottom: 1px solid #ededed;
    padding: 30px 0;
    .el-row{
      width: 100%;
    }
    img{
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
    }
    .six-hui {
      font-size: 16px;
      color: #868686;
    }
    .or-font {
        color: #fda749 !important;
    }
    .font-size18 {
      font-size: 18px;
    }
    .release-btn {
      background-color: #fc7a43;
      font-size: 14px;
      color: #fff;
      border-color: #fc7a43;
    }
  }

</style>