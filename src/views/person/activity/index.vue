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
    <!-- 状态 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding:8px 10px;">
        状态：</el-col
      >
      <el-col :sm="21" :md="22" :lg="22" :xl="23">
        <el-radio-group v-model="applyStatus" size="medium" @change="query">
          <el-radio-button label="1">未报名</el-radio-button>
          <el-radio-button label="2">已报名</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 排序 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding:8px 10px;">
        排序：</el-col
      >
      <el-col :sm="21" :md="22" :lg="22" :xl="23">
        <el-radio-group v-model="order" size="medium" @change="query">
          <el-radio-button label="1">最新</el-radio-button>
          <el-radio-button label="2">最热</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- 展示栏 -->
    <el-row :gutter="20">
      <el-col
        :sm="24"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="(item, index) in activityInfo"
        :key="index"
      >
        <pl-flipper
          class="card"
          width="100%"
          minHeight="340px"
          :flipped="item.isFlipped"
          @mouseenter="item.isFlipped = !item.isFlipped"
          @mouseleave="item.isFlipped = !item.isFlipped"
        >
          <div class="card__pattern" slot="front">
            <p
              v-if="item.actType === '01'"
              class="activity-type activity-type-one"
            >
              <span class="span-line">{{ item.actTypeText }}</span>
            </p>
            <p
              v-if="item.actType === '02'"
              class="activity-type activity-type-two"
            >
              <span class="span-line">{{ item.actTypeText }}</span>
            </p>
            <p
              v-if="item.actType === '03'"
              class="activity-type activity-type-three"
            >
              <span class="span-line">{{ item.actTypeText }}</span>
            </p>
            <p
              v-if="item.actType === '04'"
              class="activity-type activity-type-four"
            >
              <span class="span-line">{{ item.actTypeText }}</span>
            </p>
            <p
              v-if="item.actType === '05'"
              class="activity-type activity-type-four"
            >
              <span class="span-line">{{ item.actTypeText }}</span>
            </p>
            <img
              v-if="item.propagandaImage || item.propagandaImage === ''"
              class="activity-img"
              :src="'data:image/jpg;base64,' + item.propagandaImage"
              @error="defImg"
              alt="未加载"
            />
          </div>
          <div class="card__face" slot="back">
            <!-- <b class="activity-title">2020高校毕业生全国网络联合招聘 </b> -->
            <p class="activity-title">
              <b>{{ item.actName }}</b>
              <span v-if="item.expertJoin" class="span-line">{{
                item.expertJoin === '1' ? '专家' : '非专家'
              }}</span>
            </p>
            <p class="line30">
              <span class="gray-font"
                ><i class="el-icon-office-building"></i> 区县：</span
              >{{ item.districtCodeText }}
            </p>
            <p class="line30" title="活动起止时间">
              <span class="orange-font">
                <i class="el-icon-time"></i>
                {{ item.actStartTime }}
                至
                {{ item.actEndTime }}
              </span>
            </p>
            <p class="line30">
              <span class="gray-font"
                ><i class="el-icon-user"></i> 最大自主报名人数：</span
              >{{ item.selfApplyMax }}
            </p>
            <p class="line30">
              <span class="gray-font">
                <i class="el-icon-user"></i> 最大推荐报名人数：</span
              >{{ item.recApplyMax }}
            </p>
            <p class="line30" title="报名起止时间">
              <span class="orange-font">
                <i class="el-icon-time"></i>
                {{ item.applyStartTime }}
                至
                {{ item.applyEndTime }}
              </span>
            </p>
            <p class="line30 long-text" :title="item.content">
              <span class="gray-font"
                ><i class="el-icon-tickets"></i> 主要内容：</span
              >{{ item.content }}
            </p>
            <p class="line30">
              <span class="gray-font">
                <i class="el-icon-location-outline"></i> 活动地点：</span
              >{{ item.actAddress }}
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
                  <span
                    class="shop-edit-btn"
                    v-if="item.apply === '0'"
                    @click="applyActivity(item)"
                    ><i class="el-icon-view"></i>报名参加</span
                  >
                  <span class="shop-edit-btn" v-else
                    ><i class="el-icon-view"></i>已报名</span
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
import PlMap from '@/components/common/BaseMap';
import { queryActivityList, doApplyActivity } from '@/api/personApi';
import plFlipper from '@/components/common/BaseFlipper.vue';
import { getDicText, niceScrollUpdate } from '@/utils';
export default {
  name: 'personApp',
  components: {
    plFlipper,
    PlMap
  },
  data() {
    return {
      loading: false,
      defaultImg: require('@/assets/images/break-img.svg'),
      qx: '',
      order: '1',
      applyStatus: '1',
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)'],
      totalCount: 0,
      activityInfo: [],
      dicQx: this.$store.getters['dictionary/ggjbxx_qx']
    };
  },
  computed: {},
  mounted() {
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
        pid: this.$store.getters['person/pid'],
        pageParam: {
          pageIndex: 0,
          pageSize: 120
        },
        districtCode: this.qx || '',
        order: this.order || '1',
        applyStatus: this.applyStatus || '1'
        //pageIndex: this.$refs.page.currentPage - 1 || 0,
        //pageSize: this.$refs.page.pageSize,
        //date: this.date,
        //address: this.address,
        //type: this.type
      };
      this.loading = true;
      queryActivityList(params).then(queryRes => {
        console.log(queryRes);
        if (queryRes && queryRes.status === 200) {
          this.totalCount = queryRes.result.pageresult.total || 0;
          queryRes.result.pageresult.data.forEach(i => {
            i.districtCodeText = getDicText(
              this.$store.getters['dictionary/ggjbxx_qx'],
              i.districtCode
            );
            i.isFlipped = false;
          });
          queryRes.result.pageresult.data.forEach(item => {
            // 转换字典
            if (item.actType) {
              item.actTypeText = getDicText(
                this.$store.getters['dictionary/recruit_special_activity_type'],
                item.actType
              );
            }
          });
          this.activityInfo = queryRes.result.pageresult.data || [];
          if (
            !this.totalCount ||
            (this.totalCount && Number(this.totalCount) === 0)
          ) {
            this.$message({ type: 'success', message: '未查询到结果' });
          }
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
        this.loading = false;
      });
    },
    /**
     * 展示地图
     */
    showMap(item) {
      this.pointList = [];
      this.pointList.push(item.actAddress);
      this.mapDialog = true;
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    /**
     * 报名参加特色活动
     */
    async applyActivity(item) {
      let applyRes = await doApplyActivity({
        pid: this.$store.getters['person/pid'],
        actId: item.actId
      });
      if (applyRes && applyRes.status == 200) {
        this.$message({ type: 'success', message: '报名成功' });
      } else if (applyRes) {
        this.$message({ type: 'error', message: '报名失败' });
      }
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
  .activity-img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
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
  .activity-type {
    position: absolute;
    top: 10px;

    color: #fff;
    padding: 8px 15px;
    border-radius: 0 16px 16px 0;
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
  .long-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-break: break-all;
    overflow: hidden;
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
