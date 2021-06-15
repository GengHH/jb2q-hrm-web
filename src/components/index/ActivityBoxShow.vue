<template>
  <!--S 特色专栏部分 -->
  <div class="activity-box-module">
    <el-row>
      <el-col :sm="2" :md="4" :lg="6" class="pr">
        <!-- <img src="../../assets/img/img04.png" alt="" /> -->
        <img
          v-if="
            activityInfo.propagandaImage || activityInfo.propagandaImage === ''
          "
          class="activity-img"
          :src="'data:image/jpg;base64,' + activityInfo.propagandaImage"
          @error="defImg"
          alt="未加载"
        />
        <div
          v-if="activityInfo.actType === '01'"
          class="activity-type activity-type-one"
        >
          <i class="circle-sty"></i
          >{{
            getDicText(
              $store.getters['dictionary/recruit_special_activity_type'],
              activityInfo.actType
            )
          }}
        </div>
        <div
          v-if="activityInfo.actType === '02'"
          class="activity-type activity-type-two"
        >
          <i class="circle-sty"></i
          >{{
            getDicText(
              $store.getters['dictionary/recruit_special_activity_type'],
              activityInfo.actType
            )
          }}
        </div>
        <div
          v-if="activityInfo.actType === '03'"
          class="activity-type activity-type-three"
        >
          <i class="circle-sty"></i
          >{{
            getDicText(
              $store.getters['dictionary/recruit_special_activity_type'],
              activityInfo.actType
            )
          }}
        </div>
        <div
          v-if="activityInfo.actType === '04'"
          class="activity-type activity-type-four"
        >
          <i class="circle-sty"></i
          >{{
            getDicText(
              $store.getters['dictionary/recruit_special_activity_type'],
              activityInfo.actType
            )
          }}
        </div>
        <div
          v-if="activityInfo.actType === '05'"
          class="activity-type activity-type-four"
        >
          <i class="circle-sty"></i
          >{{
            getDicText(
              $store.getters['dictionary/recruit_special_activity_type'],
              activityInfo.actType
            )
          }}
        </div>
      </el-col>
      <el-col class="ul-style" :sm="22" :md="20" :lg="18">
        <p class="activity-title black-font">
          <!-- “助跑就业，青春有梦”——2020年长宁区高校毕业生专场招聘会 -->
          <b>
            {{ activityInfo.actName }}
          </b>
          <span v-if="activityInfo.expertJoin" class="span-line">{{
            activityInfo.expertJoin === '1' ? '专家' : '非专家'
          }}</span>
        </p>
        <el-row class="mat-15 details-info">
          <el-col :span="18">
            <p class="  line30 or-font">
              <i class="icon iconfont ">&#xe651;</i>
              {{ activityInfo.actStartTime }} 至
              {{ activityInfo.actEndTime }}
            </p>
            <p class="  line30 mat-15">
              <i class="icon iconfont">&#xe652;</i> 人数限制 ：<i
                class="or-font"
                >{{ activityInfo.selfApplyMax || 0 }}</i
              >
              人
              <span style="width:50px;display: inline-block;"></span>
              <i class="icon iconfont">&#xe652;</i> 还剩名额 ：<i
                class="or-font"
                >{{ activityInfo.remainingPlaces || 0 }}</i
              >
              人
            </p>
            <p class="  line30">
              <i class="icon iconfont">&#xe650;</i>
              <!-- 活动地点：长宁区就业促进中心(长宁区武夷路517号) -->
              活动地点：{{ activityInfo.actAddress }}
              <el-link class="blue-font" :underline="false">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap(activityInfo.actAddress)"
                  >附近交通</span
                ></el-link
              >
            </p>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button
              class="release-btn font-size18 mat-15"
              type="primary"
              @click="clickDetials(activityInfo.actId)"
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
  <!--E 特色专栏部分 -->
</template>

<script>
import PlMap from '@/components/common/BaseMap';
import { getDicText } from '@/utils';
export default {
  name: 'ActivityBoxShow',
  components: {
    PlMap
  },
  props: {
    activityInfo: Object
  },
  data() {
    return {
      defaultImg: require('@/assets/images/break-img.svg'),
      online: true,
      offline: false,
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)']
    };
  },
  methods: {
    showMap(actAddress) {
      if (actAddress) {
        this.pointList = [];
        this.pointList.push(actAddress);
      }
      this.mapDialog = true;
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg() {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    /**
     *显示详情
     */
    clickDetials(actId) {
      this.$emit('clickDetials', actId);
    },
    getDicText(data, value) {
      return getDicText(data, value);
    }
  }
};
</script>

<style lang="scss" scoped>
.activity-box-module {
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
    .activity-type {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 5px 10px;
      border-radius: 0 15px 15px 0;
      font-size: 16px;
      color: #fff;
      &-one {
        background: rgba(255, 152, 0, 0.6);
      }
      &-two {
        background: rgba(3, 169, 244, 0.6);
      }
      &-three {
        background: rgba(0, 150, 136, 0.6);
      }
      &-four {
        background: rgba(153, 153, 153, 0.6);
      }
    }
  }
  .activity-title {
    font-size: 16px;
    font-weight: 800;
    // margin: 20px 0;
    padding: 20px 10px;
    line-height: 30px;
    b {
      font-family: 宋体, Arial, Verdana, sans-serif;
      font-size: 20px;
      font-weight: 800;
    }
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
  // .black-font {
  //   font-size: 20px;
  //   color: #000000;
  //   line-height: 30px;
  //   .span-line,
  //   .span-line2 {
  //     padding: 3px 7px;
  //     font-size: 16px;
  //     color: #fff;
  //     border-radius: 5px;
  //   }
  //   .span-line {
  //     background-color: #fc7a43;
  //   }
  //   .span-line2 {
  //     background-color: #4766a4;
  //   }
  // }
}
</style>
