<template>
  <!--S 首页招聘会部分 -->
  <div class="fair-box-module">
    <el-row>
      <el-col :sm="2" :md="4" :lg="6" class="pr">
        <img
          v-if="fairInfo.propagandaImage || fairInfo.propagandaImage === ''"
          class="fair-img"
          :src="'data:image/jpg;base64,' + fairInfo.propagandaImage"
          @error="defImg"
          alt="未加载"
        />
        <!-- <div v-if="online" class="float-div">
          <i class="circle-sty"></i>进行中
        </div>
        <div v-if="offline" class="float-div2">
          <i class="circle-sty"></i>未开始
        </div> -->
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="18">
        <p class="black-font">
          {{ fairInfo.meetName }}
          <span
            v-if="fairInfo.meetType === '1' || fairInfo.meetType === '2'"
            class="span-line"
            >线上</span
          >
          <span v-if="fairInfo.meetType === '2'" class="span-line2">线下</span>
        </p>
        <el-row class="mat-15 details-info">
          <el-col :span="18">
            <p class="line30 or-font">
              <i class="icon iconfont ">&#xe651;</i>{{ fairInfo.startTime }} 至
              {{ fairInfo.endTime }}
            </p>
            <!-- <p class="line30 mat-15">
              <i class="icon iconfont">&#xe652;</i> 剩余展位 ：<i
                class="or-font"
                >16</i
              >
              个
            </p> -->
            <p class="line30">
              <i class="icon iconfont">&#xe650;</i>
              招聘地点：{{ fairInfo.address }}
              <el-link class="blue-font" :underline="false">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap(fairInfo)">附近交通</span></el-link
              >
            </p>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button
              class="release-btn font-size18 mat-15"
              type="primary"
              @click="showFairDetails(fairInfo)"
              ><i class="icon iconfont font-size20">&#xe653;</i>
              查看详情</el-button
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
      defaultImg: require('@/assets/images/break-img.svg'),
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)']
    };
  },
  methods: {
    /**
     * 展示地图
     */
    showMap(fairInfo) {
      this.pointList = [];
      this.pointList.push(fairInfo.address);
      this.mapDialog = true;
    },
    /**
     * 关闭地图
     */
    mapHandleClose() {
      this.mapDialog = false;
    },
    /**
     * 查看招聘会详情
     */
    showFairDetails(fairInfo) {
      this.$router.push({
        path: '/fairDetails',
        query: { meetId: fairInfo.meetId }
      });
    },
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
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
    img {
      background-color: #fafafa;
    }
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
