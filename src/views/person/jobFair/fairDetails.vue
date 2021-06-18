<template>
  <div id="indexBody">
    <el-row :gutter="40" class="fair-box" style="height:240px">
      <el-col :span="12" style="padding: 10px;" class="img-box">
        <img
          v-if="fairItem.propagandaImage || fairItem.propagandaImage === ''"
          class="fair-img"
          :src="'data:image/jpg;base64,' + fairItem.propagandaImage"
          @error="defImg"
          alt="未加载"
        />
      </el-col>
      <el-col :span="12">
        <!-- <b class="fair-title">2020高校毕业生全国网络联合招聘 </b> -->
        <p class="fair-title">
          <b>{{ fairItem.meetName }}</b>
          <span
            v-if="fairItem.meetType === '1' || fairItem.meetType === '2'"
            class="span-line"
            >线上</span
          >
          <span v-if="fairItem.meetType === '2'" class="span-line2">线下</span>
        </p>
        <p class="line30">
          <span class="orange-font"> <i class="el-icon-time"></i></span>
          {{ fairItem.startTime }}
          至
          {{ fairItem.endTime }}
        </p>
        <p class="line30">
          <span class="gray-font"
            ><i class="el-icon-office-building"></i> 主办单位：</span
          >{{ fairItem.mainCorpName }}
        </p>
        <p class="line30">
          <span class="gray-font"> <i class="el-icon-user"></i> 联系人：</span
          >{{ fairItem.contactName }}
        </p>
        <p class="line30">
          <span class="gray-font"
            ><i class="el-icon-phone-outline"></i> 联系电话：</span
          >{{ fairItem.contactPhone }}
        </p>
        <p class="line30">
          <span class="gray-font">
            <i class="el-icon-location-outline"></i> 招聘地点：</span
          >{{ fairItem.address }}
          <span class="blue-font" style="color:#7386f1">
            <i class="icon iconfont">&#xe654;</i>
            <span @click="showMap">附近交通</span></span
          >
        </p>
      </el-col>
    </el-row>
    <!-- 公司和职位信息 -->
    <el-tabs
      id="jobInfoGloriette"
      v-model="activeName"
      @tab-click="jobHandleClick"
    >
      <el-tab-pane :label="paneCorp" name="corporation">
        <!-- <FairBoxShow v-for="index in showList" :key="index.id"></FairBoxShow> -->
        <el-input
          placeholder="请输入公司名称进行检索"
          prefix-icon="el-icon-search"
          v-model="input1"
          @keyup.enter.native="queryCorporations"
        >
        </el-input>
        <div class="no-data" v-if="!corporations.length">暂无数据</div>
        <!-- 展示栏 -->
        <el-row :gutter="20" v-else style="padding: 20px 5px;">
          <el-col
            :sm="24"
            :md="12"
            :lg="8"
            :xl="6"
            v-for="(item, index) in corporations"
            :key="index"
          >
            <div class="corp-box">
              <h2>{{ item.corpName }}</h2>
              <p>
                <span class="gray-font"
                  ><i class="el-icon-school"></i>{{ item.cid }}</span
                >
              </p>
              <div class="corp-info">
                <p class="corp-info-tag gray-font">
                  <span>{{
                    item.industryTypeText ? item.industryTypeText : '无'
                  }}</span>
                  <span>{{
                    item.districtCodeText ? item.districtCodeText : '无'
                  }}</span>
                  <span>{{
                    item.corpNatureText ? item.corpNatureText : '无'
                  }}</span>
                </p>
                <p>
                  <span class="gray-font">
                    <i class="el-icon-location-outline">{{
                      item.unitResidence ? item.unitResidence : '无'
                    }}</i>
                  </span>
                </p>
                <el-row class="corp-info-count">
                  <el-col :span="18">
                    <span class="count orange-font">
                      {{ item.positionCount ? item.positionCount : '0' }} </span
                    >个在招职位
                  </el-col>
                  <el-col :span="6" style="text-align:right">
                    <p class="gray-font corp-detials-btn">
                      <i class="el-icon-view" @click="showCorpDetails(item.cid)"
                        >详情</i
                      >
                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="panePosition" name="position">
        <!-- <FairBoxShow v-for="index in showList" :key="index.id"></FairBoxShow> -->
        <el-input
          placeholder="请输入职位名称进行检索"
          prefix-icon="el-icon-search"
          v-model="input2"
          @keyup.enter.native="queryPositions"
        >
        </el-input>
        <div class="no-data" v-if="!positions.length">暂无数据</div>
        <div style="padding: 20px 0;" v-else>
          <PerSearchJob
            :jobData="positions"
            @deliveryResume="deliveryResume(arguments)"
            @showJobDetials="showJobDetial(arguments)"
          ></PerSearchJob>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-button id="listMore" class="more-btn white-btn" @click="showMore"
      >加载更多</el-button
    > -->

    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog
      v-if="detailsDialog"
      width="75%"
      :visible.sync="detailsDialog"
      :before-close="detailsHandleClose"
    >
      <job-details
        :positionData="onePosition"
        :index="detailsIndex"
        @uploadResume="uploadResume"
        @perfectResume="perfectResume"
        @deliveryResume="deliveryResume(arguments)"
      ></job-details>
      <!-- <job-details
        :positionData="onePosition"
        :index="detailsIndex"
        @perfectResume="perfectResume"
        @uploadResume="uploadResume"
        @deliveryResume="deliveryResume(arguments)"
        @favorJob="favorJob(arguments)"
        @callPositionCorp="callPositionCorp(arguments)"
      ></job-details> -->
    </el-dialog>
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
import PerSearchJob from '@/components/person/PerSearchJob';
import JobDetails from '@/views/person/jobDetails.vue';
import { getDicText, niceScrollUpdate } from '@/utils';
import {
  queryMeetingSchedule,
  queryMeetingCorporationList,
  queryMeetingPositionList,
  queryCorporationPositionInfo,
  doApplyFor
} from '@/api/personApi';
export default {
  name: 'personApp',
  components: {
    PlMap,
    PerSearchJob,
    JobDetails
  },
  data() {
    return {
      meetId: '',
      fairItem: {},
      defaultImg: require('@/assets/images/break-img.svg'),
      activeName: 'corporation',
      input1: '',
      input2: '',
      qx1: '',
      qx2: '',
      mapDialog: false,
      pointList: ['长宁区就业促进中心(长宁区武夷路517号)'],
      totalCount: 0,
      fairInfo: [
        {
          id: '1',
          isFlipped: false,
          mainCorpName: '中国是大法官到时sdfsdfsdfsdf代光华a',
          contactName: '张三',
          contactPhone: '13333343434',
          address: '中国是大法官到时代光华a（防守打法胜多负少）',
          meetType: '1'
        }
      ],
      item: {
        meetId: '3',
        meetName: '招聘会名称测试12222',
        meetIntroduce: '招聘会名称',
        meetType: '1',
        startTime: '2021-04-25 00:00:00',
        endTime: '2021-04-30 00:00:00',
        address: '天山路1800号',
        boothCount: '60',
        traffic: '地铁2，3，4，15号线',
        mainCorpName: '万达信息',
        contactName: '令狐冲',
        contactPhone: '123123122312',
        propagandaImage: 'MQ==',
        districtCode: '06,09',
        onTop: '1',
        releaseStatus: '1',
        applyStatus: '1',
        userId: '-1        ',
        releaseTime: '2021-04-28 15:13:27',
        endApplyTime: '',
        meetIdList: []
      },
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      corporations: [],
      positions: [],
      detailsIndex: '',
      detailsDialog: false,
      positionDetailsId: ''
    };
  },
  computed: {
    paneCorp() {
      return this.corporations.length
        ? '招聘公司（' + this.corporations.length + '）'
        : '招聘公司';
    },
    panePosition() {
      return this.positions.length
        ? '招聘职位（' + this.positions.length + '）'
        : '招聘职位';
    },
    /**
     *当前操作的职位信息
     */
    onePosition() {
      let that = this;
      return this.positionDetailsId
        ? this.positions.find(function(i) {
            return i.positionId === that.positionDetailsId;
          })
        : {};
    }
  },
  created() {
    //根据url上的参数查询职位信息
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      this.meetId = this.$route.query.meetId || '';
      this.queryFairDetail();
      this.queryCorporations();
      this.queryPositions();
    }
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    jobHandleClick(tab) {
      console.log(tab);
    },
    /**
     *  懒加载信息
     */
    showMore() {},
    /**
     *  查询指定的某个招聘会具体信息
     */
    queryFairDetail() {
      let params = {
        meetId: this.meetId
      };
      queryMeetingSchedule(params).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.fairItem = queryRes.result.data || {};
        }
      });
    },
    /**
     *  查询所有单位信息
     */
    queryCorporations() {
      let params = {
        meetId: this.meetId,
        positionName: this.input1,
        districtCode: ''
      };
      queryMeetingCorporationList(params).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.corporations = queryRes.result.data || [];
          if (queryRes.result.data.length === 0) {
            // this.$message({ type: 'success', message: '未查询到结果' });
          } else {
            this.corporations.forEach(item => {
              // 转换字典
              if (item.districtCode) {
                item.districtCodeText = getDicText(
                  this.$store.getters['dictionary/ggjbxx_qx'],
                  item.districtCode
                );
              }
              if (item.industryType) {
                item.industryTypeText = getDicText(
                  this.$store.getters['dictionary/recruit_industry_type'],
                  item.industryType
                );
              }
              if (item.corpNature) {
                item.corpNatureText = getDicText(
                  this.$store.getters['dictionary/recruit_work_nature'],
                  item.corpNature
                );
              }
            });
          }
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
    },
    /**
     *  查询所有职位信息
     */
    queryPositions() {
      let params = {
        meetId: this.meetId,
        positionName: this.input2
      };
      queryMeetingPositionList(params).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.positions = queryRes.result.data || [];
          if (queryRes.result.data.length === 0) {
            // this.$message({ type: 'success', message: '未查询到结果' });
          } else {
            this.positions.forEach(item => {
              // 转换字典
              if (item.workArea) {
                item.workAreaText = getDicText(
                  this.$store.getters['dictionary/ggjbxx_qx'],
                  item.workArea
                );
              }
              if (item.eduRequire) {
                item.eduRequireText = getDicText(
                  this.$store.getters['dictionary/recruit_edu'],
                  item.eduRequire
                );
              }
              if (item.workNature) {
                item.workNatureText = getDicText(
                  this.$store.getters['dictionary/recruit_work_nature'],
                  item.workNature
                );
              }
              if (item.corpNature) {
                item.corpNatureText = getDicText(
                  that.$store.getters['dictionary/recruit_corp_nature'],
                  item.corpNature
                );
              }
              if (item.industryType) {
                item.industryTypeText = getDicText(
                  that.$store.getters['dictionary/recruit_industry_type'],
                  item.industryType
                );
              }
            });
          }
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
    },
    /**
     * 投递简历
     */
    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) + '' || '';
      //投递简历
      let res = await doApplyFor({
        meetId: this.meetId,
        positionId: positionId,
        pid: this.$store.getters['person/pid']
      });
      if (res.status === 200) {
        // TODO 不显示本条数据
        this.positions.splice(index, 1);
        this.$message({ type: 'success', message: '简历投递成功' });
      } else {
        this.$message({
          type: 'error',
          message: '简历投递失败'
        });
      }
    },
    /**
     * 展示职位详情
     */
    showJobDetial(arg) {
      //显示岗位详细信息
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      this.detailsIndex = index;
      this.detailsDialog = true;
      this.positionDetailsId = positionId;
    },
    perfectResume() {
      //完善简历
      this.$router.push('/personInfo');
    },
    uploadResume() {
      //上传简历
      this.$alert('此功能暂时未开放，请稍候！');
    },
    /**
     * 展示地图
     */
    showMap() {
      // this.pointList = [];
      // this.pointList.push(this.fairInfo.address);
      this.mapDialog = true;
    },
    mapHandleClose() {
      this.mapDialog = false;
    },
    /**
     * 查看招聘会详情
     */
    showFairDetails() {},
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    detailsHandleClose() {
      this.detailsDialog = false;
    },
    /**
     *显示单位详情
     */
    showCorpDetails(cid) {
      this.$router.push({
        path: '/corpDetails',
        query: { id: cid }
      });
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
  .fair-box {
    //min-height: 300px;
    margin-bottom: 20px;
    .el-col {
      height: 300px;
      //margin: 10px 0;
      height: 100%;
    }
  }
  .img-box {
    background-color: rgba(235, 231, 231, 0.4);
    .fair-img {
      //width: 100%;
      margin: 0 auto;
      height: 100%;
    }
  }

  ::v-deep .el-radio-button__inner {
    border: 0px;
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
  .fair-title {
    font-size: 20px;
    font-weight: 800;
    // margin: 20px 0;
    padding: 20px 0;
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

  .corp-box {
    width: 100%;
    min-height: 180px;
    padding: 10px 30px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
    &:hover {
      border: 1px solid #fc7a43;
    }
    h2 {
      margin: 10px 0 5px 0;
      font-family: 宋体, Arial, Verdana, sans-serif;
    }
    .corp-info {
      width: 100%;
      font-size: 14px;
      margin-top: 15px;
      line-height: 24px;
    }
    .corp-info-tag {
      span {
        display: inline-block;
        padding: 5px 8px;
        margin: 0 3px;
        border-radius: 15px;
        background-color: #f4f4f4;
      }
    }
    .corp-info-count {
      margin: 10px 0;
      span.count {
        display: inline-block;
        padding: 5px 8px;
        margin: 0 3px;
        border-radius: 50%;
        background-color: #f4f4f4;
      }
      // &:after {
      //   content: '';
      //   height: 0;
      //   line-height: 0;
      //   display: block;
      //   visibility: hidden;
      //   clear: both;
      // }
    }
    .corp-detials-btn {
      padding: 5px 0;
    }
    .corp-detials-btn:hover {
      color: #20c997;
      //color: #333;
      cursor: pointer;
    }
  }

  #listMore {
    //width: 100%;
    display: block;
    margin: 20px auto;
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
.no-data {
  width: 100%;
  margin: 100px 0;
  text-align: center;
}
</style>
