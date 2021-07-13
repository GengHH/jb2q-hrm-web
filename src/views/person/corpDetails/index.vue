<template>
  <div id="indexBody" class="content-box">
    <!--S 公司详情上半部分 -->
    <div class="infor-job">
      <div class="middle-box">
        <el-row>
          <el-col :span="19">
            <el-row>
              <el-col :span="4">
                <!-- <img
                  class="fl ico_rz logos"
                  src="../../../assets/images/logos.png"
                  alt=""
                /> -->

                <img
                  v-if="corpInfo.logo"
                  class="fl ico_rz logos"
                  :src="'data:image/jpg;base64,' + corpInfo.logo"
                  @error="defImg"
                  alt="未加载"
                />
                <img
                  v-else
                  class="fl ico_rz logos"
                  :src="defaultImg"
                  alt="未加载"
                />
              </el-col>
              <el-col :span="20">
                <div class="job-title">
                  {{ corpInfo.corpName }}
                  <img
                    src="../../../assets/images/ico_rz.png"
                    alt=""
                    class="ico_rz"
                  />
                </div>
                <div class="sixteen-opacity mat-15">
                  <span>上海 {{ corpInfo.districtCodeText }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ corpInfo.industryTypeText }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ corpInfo.corpNatureText }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span title="设立日期">
                    {{
                      corpInfo.establishDate
                        ? corpInfo.establishDate.substr(0, 4) +
                          '-' +
                          corpInfo.establishDate.substr(4, 2) +
                          '-' +
                          corpInfo.establishDate.substr(6, 2)
                        : '未知'
                    }}</span
                  >
                  <el-divider direction="vertical"></el-divider>
                  <span
                    >招聘
                    {{
                      corpInfo.recruitNum ? corpInfo.recruitNum : '0'
                    }}人</span
                  >
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" class="padd-l">
            <el-button
              type="primary"
              class="white-btn mat-15"
              @click="attentionCorp"
              ><i v-if="corpInfo.favor" class="el-icon-star-off">关注单位</i>
              <i v-else class="el-icon-star-on">取消关注单位</i>
            </el-button>
            <div class="font12">
              <el-link :underline="false" @click="perfectResume"
                ><img
                  class="ico_rz"
                  src="../../../assets/images/ico-01.png"
                  alt=""
                />完善在线简历</el-link
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 公司和职位信息 -->
    <el-tabs
      id="jobInfoGloriette"
      v-model="activeName"
      @tab-click="jobHandleClick"
    >
      <el-tab-pane label="公司详情" name="corporation">
        <!--E  职位详情上半部分-->
        <el-row id="jobSearchBox">
          <el-col :span="19" class="middle-box padd-lr bor-r">
            <div class="title-border mat-15">经营范围</div>
            <div class="little-tit  mat-15">
              <p class="introduce little-tit">
                {{ corpInfo.businessRange ? corpInfo.businessRange : '无' }}
              </p>
            </div>
            <div class="title-border mat-15">公司介绍</div>
            <div class="little-tit  mat-15">
              <p class="introduce little-tit">
                <!-- 金仕达科技有限公司是一家专业的房地产服务机构,公司成立以来,在同行和客户中赢得了良好的口碑。
                经过公司同仁共同努力和社会各界的鼎力支持，我们的规模逐渐壮大。
                公司拥有一流的销售团队、良好的渠道关系，致力于为客户提供一手房代理、二手房交易、
                以及房地产相关咨询等专业、完美、全面的不...金仕达科技有限公司是一家专业的房地产服务机构,公司成立以来,在同行和客户中赢得了良好的口碑。
                经过公司同仁共同努力和社会各界的鼎力支持，我们的规模逐渐壮大。
                公司拥有一流的销售团队、良好的渠道关系，致力于为客户提供一手房代理、二手房交易 -->
                {{ corpInfo.introduce }}
              </p>
              <span class="look-all"
                >查看全部<i class="el-icon-arrow-down"></i
              ></span>
            </div>
            <div class="title-border mat-30">
              单位地址：（{{
                corpInfo.unitResidence ? corpInfo.unitResidence : '无'
              }}）
            </div>
            <div class="map-box">
              <pl-map :pointList="pointList"></pl-map>
            </div>
            <div class="title-border mat-15">
              看过该职位的人还看了
              <span class="fr fourteen-opacity">更多职位 > </span>
            </div>
            <el-row>
              <el-col :span="8">
                <div class="img-div clearfix">
                  <img
                    class="fl"
                    src="../../../assets/images/img1.png"
                    alt=""
                  />
                  <div class="job-right fl">
                    <p class="font-sixteen">营销代表</p>
                    <p class="font-eighteen font-or">8k-10k</p>
                    <p class="four-opacity">希达软件</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="clearfix img-div">
                  <img
                    class="fl"
                    src="../../../assets/images/img2.png"
                    alt=""
                  />
                  <div class="job-right fl">
                    <p class="font-sixteen">招聘专员</p>
                    <p class="font-eighteen font-or">6k-8k</p>
                    <p class="four-opacity">迈恒房地产</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="clearfix img-div">
                  <img
                    class="fl"
                    src="../../../assets/images/img3.png"
                    alt=""
                  />
                  <div class="job-right fl">
                    <p class="font-sixteen">销售代表</p>
                    <p class="font-eighteen font-or">5k-8k</p>
                    <p class="four-opacity">金仕达科技</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" class="padd-l ">
            <div class="module2 mat-30">
              <p class="fourteen-opacity">
                <b style="font-size: 16px;">
                  看过该公司的人还看过
                </b>
              </p>
              <div class="module-li">
                <p class="fourteen-opacity">
                  中国某某保险集团
                </p>
                <p class="four-opacity">
                  有<span class="font-or">21</span>个待招职位
                </p>
              </div>
              <div class="module-li">
                <p class="fourteen-opacity">
                  中国某某保险集团
                </p>
                <p class="four-opacity">
                  有<span class="font-or">21</span>个待招职位
                </p>
              </div>
              <div class="module-li">
                <p class="fourteen-opacity">
                  中国某某保险集团
                </p>
                <p class="four-opacity">
                  有<span class="font-or">21</span>个待招职位
                </p>
              </div>
              <div class="module-li">
                <p class="fourteen-opacity">
                  中国某某保险集团
                </p>
                <p class="four-opacity">
                  有<span class="font-or">21</span>个待招职位
                </p>
              </div>
              <div class="module-li">
                <p class="fourteen-opacity">
                  中国某某保险集团
                </p>
                <p class="four-opacity">
                  有<span class="font-or">21</span>个待招职位
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="panePosition" name="panePosition">
        <per-search-job
          v-if="queryResult.length"
          ref="searchJobList"
          :jobData="queryResult"
          :total="queryResultTotal"
          showPager
          @deliveryResume="deliveryResume(arguments)"
          @favorJob="favorJob(arguments)"
          @showJobDetials="showJobDetial(arguments)"
          @callPositionCorp="callPositionCorp(arguments)"
        ></per-search-job>
      </el-tab-pane>
    </el-tabs>
    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog
      width="75%"
      v-if="detailsDialog"
      :visible.sync="detailsDialog"
      :before-close="detailsHandleClose"
    >
      <job-details
        :positionData="onePosition"
        :index="detailsIndex"
        @perfectResume="perfectResume"
        @uploadResume="uploadResume"
        @deliveryResume="deliveryResume(arguments)"
        @favorJob="favorJob(arguments)"
        @callPositionCorp="callPositionCorp(arguments)"
      ></job-details>
    </el-dialog>
    <!-- 聊天框 弹窗部分 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="wchatDialog"
      :before-close="wchatHandleClose"
    >
      <pl-wchat :targetObjId="targetObjId"></pl-wchat>
    </el-dialog>
  </div>
</template>

<script>
import PerSearchJob from '@/components/person/PerSearchJob.vue';
import JobDetails from '@/views/person/jobDetails.vue';
import { loadCorpInfo } from '@/api/corporationApi';
import {
  queryCorpPositionList,
  doDeliveryResume,
  attentionOrFavor
} from '@/api/personApi';
import { getDicText, niceScrollUpdate } from '@/utils';
import PlMap from '@/components/common/BaseMap';
export default {
  name: 'CorpDetails',
  components: {
    PlMap,
    PerSearchJob,
    JobDetails
  },
  data() {
    return {
      defaultImg: require('@/assets/images/break-img.svg'),
      cid: '',
      activeName: 'corporation',
      corpInfo: {},
      positions: [],
      wchatDialog: false,
      targetObjId: '',
      queryResult: [],
      queryResultTotal: 0,
      detailsIndex: '',
      detailsDialog: false,
      positionDetailsId: '',
      positionDetailsRecId: ''
    };
  },
  created() {
    //根据url上的参数查询职位信息
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      this.cid = this.$route.query.id;
      //查询单位信息
      this.loadCorpInfo();
      this.queryJobs();
    }
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  computed: {
    panePosition() {
      return this.positions.length
        ? '招聘职位（' + this.positions.length + '）'
        : '招聘职位';
    },
    describeList() {
      return this.corpInfo.describe.split('\n');
    },
    pointList() {
      return this.corpInfo?.unitResidence ? [this.corpInfo.unitResidence] : [];
    }
  },
  methods: {
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    jobHandleClick() {},
    /**
     * 查询单位信息 （使用的是单位模块下的接口）
     * TODO
     */
    async loadCorpInfo() {
      let that = this;
      let queryRes = await loadCorpInfo({ cid: this.cid });
      if (queryRes && queryRes.status === 200) {
        let item = queryRes.result.data;
        // 转换字典
        if (item.districtCode) {
          item.districtCodeText = getDicText(
            that.$store.getters['dictionary/ggjbxx_qx'],
            item.districtCode
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
        this.corpInfo = item;
      } else if (queryRes) {
        this.$message.error('查询单位信息失败');
      }
    },
    /**
     * 查询职位信息列表
     */
    async queryJobs() {
      let that = this;
      let queryRes = await queryCorpPositionList({
        cid: this.cid,
        pid: this.$store.getters['person/pid'],
        pageParam: {
          pageSize: that.$refs.searchJobList?.pageSize || 10,
          pageIndex: that.$refs.searchJobList?.currentPage - 1 || 0
        }
      });
      if (queryRes && queryRes.status === 200) {
        queryRes.result.pageresult.data.forEach(item => {
          // 转换字典
          if (item.workArea) {
            item.workAreaText = getDicText(
              that.$store.getters['dictionary/ggjbxx_qx'],
              item.workArea
            );
          }
          if (item.eduRequire) {
            item.eduRequireText = getDicText(
              that.$store.getters['dictionary/recruit_edu'],
              item.eduRequire
            );
          }
          if (item.workNature) {
            item.workNatureText = getDicText(
              that.$store.getters['dictionary/recruit_work_nature'],
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
        this.$set(this, 'queryResult', queryRes.result.pageresult.data);
        this.$set(
          this,
          'queryResultTotal',
          Number(queryRes.result.pageresult.total) || 0
        );
      } else if (queryRes) {
        this.$set(this, 'queryResult', []);
        this.$set(this, 'queryResultTotal', 0);
        this.$message({
          showClose: true,
          message: '查询职位信息失败',
          type: 'error'
        });
      }
    },
    showJobDetial(arg) {
      console.log(arg);
      //显示岗位详细信息
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let recId = (arg && arg[2]) || '';
      this.detailsIndex = index;
      this.detailsDialog = true;
      this.positionDetailsId = positionId;
      this.positionDetailsRecId = recId;
    },
    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';

      //向职位投递简历
      let res = await doDeliveryResume({
        positionId: positionId,
        pid: this.$store.getters['person/pid']
      });
      if (res.status === 200) {
        // 更换按钮
        // this.queryResult.splice(index, 1);
        this.queryResult[index].applyFor = true;
        this.$message({ type: 'success', message: '简历投递成功' });
      } else {
        this.$message({
          type: 'error',
          message: '简历投递失败'
        });
      }
    },
    async favorJob(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let orginFavorType = arg[2];
      let recId = arg[3] || '';
      if (!orginFavorType) {
        let res = await attentionOrFavor('2', {
          id: [positionId],
          pid: this.$store.getters['person/pid'],
          status: true
        });
        if (res.status === 200) {
          // 修改按钮状态

          this.queryResult[index].favor = true;

          this.$message({ type: 'success', message: '收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '收藏职位失败' });
        }
      } else {
        //取消收藏职位
        let res = await attentionOrFavor('2', {
          id: [positionId],
          pid: this.$store.getters['person/pid'],
          status: false
        });
        if (res.status === 200) {
          // 修改按钮状态

          this.queryResult[index].favor = false;

          this.$message({ type: 'success', message: '取消收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏职位失败' });
        }
      }
    },
    /**
     * 个人关注or取消关注单位
     */
    async attentionCorp() {
      let queryRes = await attentionOrFavor('1', {
        id: [this.cid],
        pid: this.$store.getters['person/pid'],
        status: this.queryResult.attention
      });
      if (queryRes && queryRes.status === 200) {
        // this.corpInfo = queryRes.result.data;
        this.$message.success(
          this.queryResult.attention ? '关注成功' : '取消关注成功'
        );
        //TODO更新按钮样式
        this.queryResult.attention = !this.queryResult.attention;
      } else if (queryRes) {
        this.$message.error(
          this.queryResult.attention ? '关注失败' : '取消关注失败'
        );
      }
    },
    callPositionCorp(arg) {
      let index = arg[0];
      let corpId = (arg && arg[1]) || '';
      this.targetObjId = corpId;
      this.wchatDialog = true;
    },
    wchatHandleClose() {
      this.wchatDialog = false;
    },
    perfectResume() {
      this.$router.push('/resumeMgr');
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
  .infor-job {
    background: #ffffff;
    padding: 20px 30px;
  }
  .middle-box {
    margin: 0 auto;
    //width: 1136px;
    position: relative;
    .job-title {
      font-size: 32px;
      color: #333;
      margin-top: 20px;
    }
    .font12 .el-link {
      margin-right: 5px;
    }
    .font12 img {
      position: relative;
      top: 3px;
      margin-right: 3px;
    }
    .ico_rz {
      display: inline-block;
    }
  }
  #jobSearchBox {
    padding-top: 20px;
    border-top: 1px dotted #dfdfdf;
    .title-border {
      font-size: 18px;
      color: #000;
      height: 26px;
      position: relative;
    }
    .little-tit {
      font-size: 14px;
      color: #656565;
      line-height: 30px;
    }
    .look-all {
      font-size: 14px;
      color: #1660c6;
      float: right;
    }
    .title-border {
      font-size: 18px;
      color: #000;
      height: 26px;
      position: relative;
      &::before {
        content: '';
        width: 35px;
        height: 4px;
        background: #fc7a43;
        position: absolute;
        left: 0;
        top: 22px;
        border-radius: 4px;
      }
    }
    .map-box img {
      width: 100%;
    }
    .img-div {
      border: 1px solid #ebebeb;
      margin-right: 15px;
      padding: 14px;
      box-sizing: border-box;
      margin-top: 25px;
      border-radius: 4px;
      img {
        display: inline-block;
      }
      .job-right {
        display: inline-block;
        margin-left: 15px;
        p {
          line-height: 30px;
        }
      }
    }
  }

  .header-box {
    margin-top: 20px;
    .head-img {
      width: 71px;
      height: 71px;
      border-radius: 50%;
      display: block;
      float: left;
    }
    .right-div {
      display: inline-block;
      margin-left: 15px;
      .sixteen-opacity {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.7);
      }
      .or-br {
        border-color: #fc6f3d !important;
      }

      .gray-btn,
      .gray-btn:hover {
        color: #fc6f3d;
        background-color: transparent;
        border-color: #d1d1d1;
        padding: 3px 10px;
        border-radius: 20px;
      }
    }
  }
  .logos {
    width: 82px;
    height: 82px;
    border-radius: 14px;
    margin-right: 16px;
  }
  .name-p {
    line-height: 25px;
    padding-top: 10px;
  }

  .module1 {
    margin-top: 30px;
    p {
      line-height: 30px;
    }
    img {
      display: inline-block;
      position: relative;
      top: 3px;
      margin-right: 5px;
    }
  }
  .module2 {
    .fourteen-opacity {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
    }
    .module-li {
      margin-top: 20px;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 10px;
      p {
        line-height: 30px;
      }
    }
    .more {
      margin-right: 30px;
    }
  }
  .mat-15 {
    margin-top: 15px;
  }
  .mat-30 {
    margin-top: 30px;
  }
  // .white-btn {
  //   color: #fc6f3d;
  //   background-color: #fff;
  //   border-color: #ff9954;
  // }
  // .release-btn {
  //   background-color: #fc7a43;
  //   font-size: 14px;
  //   color: #fff;
  //   border-color: #fc7a43;
  // }
  .font12 {
    font-size: 12px;
    color: #656565;
    margin-top: 15px;
  }
  .mat-50 {
    margin-top: 50px;
  }
  .padd-l {
    padding-left: 30px;
  }
  .bor-r {
    border-right: 1px solid #eaeaea;
  }

  .padd-lr {
    // padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
