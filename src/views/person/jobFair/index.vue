<template>
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <!-- 区县 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding:8px 10px;">
        区县：</el-col
      >
      <el-col :sm="21" :md="22" :lg="22" :xl="23">
        <el-radio-group v-model="qx" size="medium" @change="query">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in dicQx"
            :key="index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 排序 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding:8px 10px;">
        排序：</el-col
      >
      <el-col :sm="17" :md="18" :lg="18" :xl="19">
        <el-radio-group v-model="order" size="medium" @change="query">
          <el-radio-button label="1">最新</el-radio-button>
          <el-radio-button label="2">最热</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :sm="4" :md="4" :lg="4" :xl="4" style="text-align:right">
        <el-radio-group v-model="layoutRadio" size="medium" id="layoutRadio">
          <el-radio-button label="1"
            ><i class="el-icon-s-unfold"></i
          ></el-radio-button>
          <el-radio-button label="2"
            ><i class="el-icon-s-grid"></i
          ></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <template v-if="layoutRadio === '1'">
      <FairBoxShow
        v-for="(item, index) in fairInfo"
        :fairInfo="item"
        :key="index"
      ></FairBoxShow>
    </template>
    <!-- 展示栏 -->
    <el-row :gutter="20" v-else>
      <el-col
        :sm="24"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="(item, index) in fairInfo"
        :key="index"
      >
        <pl-flipper
          class="card"
          width="100%"
          minHeight="270px"
          :flipped="item.isFlipped"
          @mouseenter="item.isFlipped = !item.isFlipped"
          @mouseleave="item.isFlipped = !item.isFlipped"
        >
          <div class="card__pattern" slot="front">
            <img
              v-if="item.propagandaImage || item.propagandaImage === ''"
              class="fair-img"
              :src="'data:image/jpg;base64,' + item.propagandaImage"
              @error="defImg"
              alt="未加载"
            />
            <!-- <div v-else class="unload-img">
              <i  class="el-icon-picture-outline"></i>
            </div> -->
            <!-- <img
              class="fair-img"
              src="../../../assets/img/img04.png"
              alt="未加载"
            /> -->
          </div>
          <div class="card__face" slot="back">
            <!-- <b class="fair-title">2020高校毕业生全国网络联合招聘 </b> -->
            <p class="fair-title">
              <b>{{ item.meetName }}</b>
              <span
                v-if="item.meetType === '1' || item.meetType === '2'"
                class="span-line"
                >线上</span
              >
              <span v-if="item.meetType === '2'" class="span-line2">线下</span>
            </p>
            <p class="line30">
              <span class="orange-font"> <i class="el-icon-time"></i></span>
              {{ item.startTime }}
              至
              {{ item.endTime }}
            </p>
            <p class="line30">
              <span class="gray-font"
                ><i class="el-icon-office-building"></i> 主办单位：</span
              >{{ item.mainCorpName }}
            </p>
            <p class="line30">
              <span class="gray-font">
                <i class="el-icon-user"></i> 联系人：</span
              >{{ item.contactName }}
            </p>
            <p class="line30">
              <span class="gray-font"
                ><i class="el-icon-phone-outline"></i> 联系电话：</span
              >{{ item.contactPhone }}
            </p>
            <p class="line30">
              <span class="gray-font">
                <i class="el-icon-location-outline"></i> 招聘地点：</span
              >{{ item.address }}
              <span class="blue-font" style="color:#7386f1">
                <i class="icon iconfont">&#xe654;</i>
                <span @click="showMap(item)">附近交通</span></span
              >
            </p>
            <el-divider class="back-divider"></el-divider>
            <div class="back-detail-btn">
              <el-row>
                <!-- <el-col :span="18" class="gray-font" title="开店申请时间"
                  ><i class="el-icon-time"></i
                  >{{ item.applyTime ? item.applyTime : '无' }}</el-col
                > -->
                <el-col :span="24" style="text-align:center">
                  <span class="shop-edit-btn" @click="showFairDetails(item)"
                    ><i class="el-icon-view"></i>查看详情</span
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </pl-flipper>
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
</template>

<script>
import FairBoxShow from '@/components/person/FairBoxShow.vue';
import PlMap from '@/components/common/BaseMap';
import { queryMeetingList } from '@/api/personApi';
import plFlipper from '@/components/common/BaseFlipper.vue';
import { getDicText, niceScrollUpdate } from '@/utils';
export default {
  name: 'personApp',
  components: {
    FairBoxShow,
    plFlipper,
    PlMap
  },
  data() {
    return {
      loading: false,
      defaultImg: require('@/assets/images/break-img.svg'),
      qx: '',
      order: '1',
      layoutRadio: '1',
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)'],
      totalCount: 0,
      fairInfo: [],
      dicQx: this.$store.getters['dictionary/ggjbxx_qx']
    };
  },
  computed: {},
  created() {
    //初始化查询招聘会信息
    this.query();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    /**
     *  查询招聘会信息
     */
    query() {
      let params = {
        pageParam: {
          pageIndex: 0,
          pageSize: 120
        },
        districtCode: this.qx || '',
        order: this.order || '1'
        //pageIndex: this.$refs.page.currentPage - 1 || 0,
        //pageSize: this.$refs.page.pageSize,
        //date: this.date,
        //address: this.address,
        //type: this.type
      };
      this.loading = true;
      queryMeetingList(params).then(queryRes => {
        console.log(queryRes);
        if (queryRes && queryRes.status === 200) {
          this.totalCount = queryRes.result.pageresult.total || 0;
          queryRes.result.pageresult.data.forEach(i => {
            i.isFlipped = false;
          });
          this.fairInfo = queryRes.result.pageresult.data || [];
          if (
            !this.totalCount ||
            (this.totalCount && Number(this.totalCount) === 0)
          ) {
            this.$message.success('未查询到结果');
          }
        } else if (queryRes) {
          this.$message.error('查询失败');
        }
        this.loading = false;
      });
    },
    /**
     * 展示地图
     */
    showMap(item) {
      this.pointList = [];
      this.pointList.push(item.address);
      this.mapDialog = true;
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    /**
     * 查看招聘会详情
     */
    showFairDetails(item) {
      this.$router.push({
        path: '/fairDetails',
        query: { meetId: item.meetId }
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
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-width: 1360px;
  margin: 0 auto;
  padding-top: 60px;
  background-color: $g-white-color;
  .el-col {
    margin: 10px 0;
  }
  .fair-img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  ::v-deep .el-radio-button__inner {
    border: 0px;
  }
  .unload-img {
    width: 100%;
    height: 100%;
    background-color: rgba(187, 187, 187, 0.4);
    position: relative;
    .el-icon-picture-outline:before {
      font-size: 10rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #efefef;
    }
  }
  .back-divider {
    width: 100%;
    margin: 10px 0;
    position: absolute;
    bottom: 30px;
  }
  .back-detail-btn {
    position: absolute;
    display: block;
    width: 100%;
    bottom: 0;
    color: #999;
    &:hover {
      color: #fc7a43;
    }
  }
  #layoutRadio {
    ::v-deep .el-radio-button__orig-radio + .el-radio-button__inner {
      background-color: #f1f1f1;
    }
    ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #fc7a43;
    }
  }
  ::v-deep .el-radio-button:first-child,
  ::v-deep .el-radio-button:last-child {
    .el-radio-button__inner {
      border-radius: 0;
    }
  }
  ::v-deep .el-radio-button__inner {
    padding: 8px 10px;
  }
}
</style>

<style lang="scss">
.card {
  &__face,
  &__pattern {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
    cursor: pointer;
  }
  // &__face {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   height: 100%;
  //   padding: 15px;
  // }
  p {
    padding: 0px 10px;
  }
  .fair-title {
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
  .orange-font {
    color: #fc7a43;
  }
  .gray-font {
    color: #999;
  }
  .line30 {
    line-height: 30px;
  }
}
</style>
