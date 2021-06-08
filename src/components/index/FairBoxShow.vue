<template>
  <!--S 首页招聘会部分 -->
  <div class="fair-box-module">
    <el-row>
      <el-col :sm="2" :md="4" :lg="6" class="pr">
        <img src="../../assets/img/img04.png" alt="" />
        <div v-if="online" class="float-div">
          <i class="circle-sty"></i>进行中
        </div>
        <div v-if="offline" class="float-div2">
          <i class="circle-sty"></i>未开始
        </div>
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="18">
        <p class="black-font">
          “助跑就业，青春有梦”——2020年长宁区高校毕业生专场招聘会
          <span v-if="online" class="span-line">线上</span>
          <span v-if="offline" class="span-line2">线下</span>
        </p>
        <el-row class="mat-15 details-info">
          <el-col :span="18">
            <p class="  line30 or-font">
              <i class="icon iconfont ">&#xe651;</i> 2020-11-26 9:00 至
              2020-11-28 18:00
            </p>
            <p class="  line30 mat-15">
              <i class="icon iconfont">&#xe652;</i> 剩余展位 ：<i
                class="or-font"
                >16</i
              >
              个
            </p>
            <p class="  line30">
              <i class="icon iconfont">&#xe650;</i>
              招聘地点：长宁区就业促进中心(长宁区武夷路517号)
              <el-link class="blue-font" :underline="false">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap">附近交通</span></el-link
              >
            </p>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button class="release-btn font-size18 mat-15" type="primary"
              ><i class="icon iconfont font-size20">&#xe653;</i>
              单位报名</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 地图弹框 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="mapDialog"
      :before-close="mapHandleClose"
    >
      <pl-map :pointList="pointList"></pl-map>
    </el-dialog>
  </div>
  <!--E 首页招聘会部分 -->
</template>

<script>
import PlMap from '@/components/common/BaseMap';
export default {
  name: 'FairBoxShow',
  components: {
    PlMap
  },
  props: {
    fairInfo: Object
  },
  data() {
    return {
      online: true,
      offline: false,
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)']
    };
  },
  methods: {
    showMap() {
      console.log(123);
      this.mapDialog = true;
    },
    mapHandleClose() {
      this.mapDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.fair-box-module {
  background-color: #ffffff;
  border-bottom: 1px solid #ededed;
  height: 250px;
  padding: 30px 0;
  & > .el-row {
    height: 100%;
    width: 100%;
  }
  img {
    height: 100%;
    width: 100%;
  }

  .line30 {
    line-height: 30px;
  }
  .mat-15 {
    margin-top: 15px;
  }

  .ul-style {
    height: 100%;
    position: relative;
    text-align: left;
    padding-left: 20px;

    .details-info {
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 0;
      .blue-font {
        color: #4766a4;
      }
    }
  }
  .pr {
    height: 100%;
    position: relative;
    .float-div,
    .float-div2 {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 5px 10px;
      border-radius: 0 15px 15px 0;
      font-size: 16px;
      color: #fff;
    }
    .float-div {
      background: rgba(252, 111, 61, 0.9);
    }
    .float-div2 {
      background: rgba(71, 102, 164, 0.9);
    }
  }
  .black-font {
    font-size: 20px;
    color: #000000;
    line-height: 30px;
    .span-line,
    .span-line2 {
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
</style>
