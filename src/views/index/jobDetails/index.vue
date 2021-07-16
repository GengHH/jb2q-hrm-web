<template>
  <div
    id="jobSearchView"
    :class="[{ 'content-box': asPage }]"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <!-- <el-button
      id="complaintBtn"
      v-if="!realData.isComplaint"
      @click="complaint = !complaint"
    >
      投诉
      <i v-if="complaint" class="arrow el-icon-arrow-up"></i>
      <i v-else class="arrow el-icon-arrow-down"></i>
    </el-button> -->
    <div class="operate-position-header" v-if="complaint">
      <el-form
        ref="complaintForm"
        :rules="rules"
        :model="complaintParams"
        style="width: 96%;margin: 20px auto 0;"
      >
        <el-row class="condition condition-one" :gutter="20">
          <el-col :span="12">
            <el-form-item prop="contactPhone">
              <pl-input
                label="手机号码"
                required
                v-model="complaintParams.contactPhone"
              ></pl-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="verifyCode">
              <el-row :gutter="10">
                <el-col :span="18">
                  <pl-input
                    label="短信验证码"
                    required
                    v-model="complaintParams.verifyCode"
                  ></pl-input>
                </el-col>
                <el-col :span="6" class="text-right">
                  <pl-button
                    v-show="verifyCodeShow"
                    @click="getMessage($event)"
                    style="width: 100%;overflow: hidden;"
                  >
                    发送短信
                  </pl-button>
                  <pl-button v-show="!verifyCodeShow" class="count">
                    {{ count }} s
                  </pl-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="complaintContent" required>
              <pl-input
                required
                type="textarea"
                label="投诉内容（1000字符）"
                v-model="complaintParams.complaintContent"
              ></pl-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="complaint" style="text-align:center;">
        <el-button size="small" @click="doComplaint">
          确认
        </el-button>
      </div>
    </div>
    <!--S 职位详情上半部分 -->
    <div class="infor-job">
      <div class="middle-box">
        <el-row>
          <el-col :span="19">
            <div class="job-title">
              {{ realData.positionName }}
              <i
                v-if="realData.tranBaseSymbol === '1'"
                class="bl-bg i-style font-size16"
                >见习</i
              >
              <span class="font-size24 font-or"
                >{{ realData.salaryMin }}-{{ realData.salaryMax }}</span
              >
              <span class="font-size24 font-or">{{
                realData.salaryPayTypeText
              }}</span>
            </div>
            <div class="sixteen-opacity mat-15">
              <span>上海{{ realData.workAreaText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ realData.eduRequireText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ realData.workNatureText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ realData.workYearNeedText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>招聘{{ Number(realData.recruitNum) }}人</span>
            </div>
            <p class="sixteen-opacity mat-30">
              <span
                style="display:inline-block;position: relative;top: 2px;cursor: pointer;"
                @click="viewCorp(realData.corpId)"
                >{{ realData.corpName }}</span
              >
              <img
                src="../../../assets/images/ico_rz.png"
                alt=""
                class="ico_rz"
                style="height: .9em;position: relative;top: 3px;"
              />
            </p>
            <p class="four-opacity mat-15">更新于 {{ realData.releaseTime }}</p>
          </el-col>
          <el-col :span="5" class="padd-l">
            <!-- <p
              v-if="realData.tranBaseSymbol === '0'"
              class="four-opacity mat-50"
            >
              发布机构:{{ realData.corpName }}
            </p> -->
            <p v-if="realData.recruitType === '2'" class="four-opacity mat-50">
              <span class="gray-font">发布机构：</span
              ><i>{{
                realData.districtCodeText
                  ? realData.districtCodeText + '就业促进中心'
                  : '未知'
              }}</i>
            </p>
            <p
              v-if="realData.agencyRecruit === '1'"
              class="four-opacity mat-50"
            >
              <span class="gray-font">委托代招单位：</span
              ><i>{{
                realData.entrustCorpName ? realData.entrustCorpName : '未知'
              }}</i>
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--E  职位详情上半部分-->
    <el-row id="jobSearchBox">
      <el-col :span="19" class="middle-box padd-lr bor-r">
        <div class="title-border mat-15">公司简介</div>
        <div class="little-tit  mat-15">
          <p class="introduce little-tit">
            {{ realData.introduce ? realData.introduce : '无' }}
          </p>
        </div>
        <div class="title-border mat-15">职位描述</div>
        <div class="little-tit  mat-15">
          <p class="introduce little-tit">
            {{ realData.describe ? realData.describe : '无' }}
          </p>
        </div>
        <div class="title-border mat-30">
          工作地址：（{{ realData.workAddress }}）
        </div>
        <div class="map-box">
          <!-- <img src="../../../assets/images/map.png" alt="" /> -->
          <pl-map :pointList="pointList"></pl-map>
        </div>
        <div class="title-border mat-15">
          看过该职位的人还看了 TODO
          <!-- <span class="fr fourteen-opacity">更多职位 > </span> -->
        </div>
        <el-row>
          <el-col :span="8">
            <div class="img-div clearfix">
              <img class="fl" src="@/assets/images/img1.png" alt="" />
              <div class="job-right fl">
                <p class="font-sixteen">营销代表</p>
                <p class="font-eighteen font-or">8k-10k</p>
                <p class="four-opacity">希达软件</p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="clearfix img-div">
              <img class="fl" src="../../../assets/images/img2.png" alt="" />
              <div class="job-right fl">
                <p class="font-sixteen">招聘专员</p>
                <p class="font-eighteen font-or">6k-8k</p>
                <p class="four-opacity">迈恒房地产</p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="clearfix img-div">
              <img class="fl" src="../../../assets/images/img3.png" alt="" />
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
        <p class="sixteen-opacity">职位发布者</p>
        <div class="header-box clearfix">
          <img src="../../../assets/images/dw.svg" class="head-img" alt="" />
          <div class="fl mat-15 right-div ">
            <p class="sixteen-opacity">
              <!-- {{ realData.releaseUserId }} -->
            </p>
            <p>
              <!-- <span class="dqzx-span">当前在线</span> -->
            </p>
            <!-- <el-button
              type="primary"
              class="gray-btn or-br mat-15"
              @click="callPositionCorp(realData.cid || realData.corpId)"
              ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
            > -->
          </div>
        </div>
        <div class="mat-30 clearfix">
          <!-- <img
            class="fl ico_rz logos"
            src="../../../assets/images/logos.png"
            alt=""
          /> -->
          <img
            class="fl ico_rz logos"
            v-if="realData.logo"
            :src="'data:image/jpg;base64,' + realData.logo"
            @error="defImg"
            alt="未加载"
          />
          <img class="fl ico_rz logos" v-else :src="defaultImg" alt="未加载" />
          <p class="font-sixteen font-or name-p">{{ realData.corpName }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PlMap from '@/components/common/BaseMap';
import { getPositionDetail } from '@/api/indexApi';
import { getDicText, niceScrollUpdate } from '@/utils';
import { phonePattern } from '@/utils/regexp';

export default {
  name: 'JobDetails',
  props: {
    index: {
      type: Number,
      default: null
    },
    positionData: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PlMap
  },
  data() {
    return {
      loading: false,
      defaultImg: require('@/assets/images/break-img.svg'),
      asPage: false,
      realData: {},
      complaint: false,
      complaintParams: {
        complaintId: '',
        positionId: '',
        cid: '',
        corpName: '',
        pid: this.$store.getters['person/pid'] || '',
        xm: this.$store.getters['person/username'] || '',
        contactPhone: '',
        verifyCode: '',
        complaintContent: ''
      },
      count: '',
      verifyCodeShow: true,
      rules: {
        contactPhone: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号码',
            trigger: ['blur', 'change']
          }
        ],
        verifyCode: [
          { required: true, message: '短信验证码不能为空', trigger: 'blur' }
        ],
        complaintContent: [
          { required: true, message: '投诉内容不能为空', trigger: 'blur' },
          {
            max: 1000,
            message: '不能超过1000字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    };
  },
  computed: {
    describeList() {
      return this.realData.describe.split('\n');
    },
    pointList() {
      return this.realData?.workAddress ? [this.realData.workAddress] : [];
    }
  },
  watch: {
    complaint: function(val) {
      this._.throttle(niceScrollUpdate, 500)();
    }
  },
  created() {
    //根据url上的参数查询职位信息
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      let positionId = this.$route.query.id;
      if (this.$route.path.includes('jobDetails')) {
        this.asPage = true;
      }
      //查询单位信息
      this.getPositionDetail(positionId);
    }
    // else if (this.positionData.recId) {
    //   //如果是推荐的职位
    //   this.queryPositionDetials(
    //     this.positionData.recId,
    //     this.positionData.positionId
    //   );
    else {
      //直接传入的数据
      this.realData = { ...this.positionData };
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
    /**
     * 跳转至单位详情界面
     */
    viewCorp(corpId) {
      this.$router.push({
        path: '/corpDetails',
        query: {
          id: corpId
        }
      });
    },
    /**
     * 获取职位的详细信息
     */
    async getPositionDetail(positionId) {
      this.loading = true;
      let queryRes = await getPositionDetail({
        positionId: positionId
      });
      if (queryRes && queryRes.status === 200) {
        let item = queryRes.result.data || {};
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
            this.$store.getters['dictionary/recruit_corp_nature'],
            item.corpNature
          );
        }
        if (item.industryType) {
          item.industryTypeText = getDicText(
            this.$store.getters['dictionary/recruit_industry_type'],
            item.industryType
          );
        }
        if (item.workYearNeed) {
          item.workYearNeedText = getDicText(
            this.$store.getters['dictionary/recruit_work_year'],
            item.workYearNeed
          );
        }
        if (item.salaryPayType) {
          item.salaryPayTypeText =
            '元/' +
            getDicText(
              this.$store.getters['dictionary/recruit_salary_pay_type'],
              item.salaryPayType
            );
        }
        this.realData = item;
      } else if (queryRes) {
        this.$message.error('获取职位详细信息失败');
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.content-box {
  padding-top: 60px;
}
#jobSearchView {
  width: 96%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  background: #ffffff;
  //color: #000;
  //padding: 0;
  padding-bottom: 20px;
  position: relative;
  border-top: 1px solid #eee;
  #complaintBtn {
    width: 160px;
    font-size: 16px;
    padding: 10px 0px;
    box-shadow: 1px 3px 5px #eee;
    border-radius: 0;
    border-top: 0;
    margin: 0 auto;
    display: block;
    position: absolute;
    left: 50%;
    z-index: 99;
    transform: translateX(-80px);
    .arrow {
      -webkit-animation: twinkling 1.5s infinite ease-in-out;
      animation: twinkling 1.5s infinite ease-in-out;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    @-webkit-keyframes twinkling {
      0% {
        opacity: 0.2;
        filter: alpha(opacity=20);
        -webkit-transform: scale(1);
      }
      50% {
        opacity: 1;
        filter: alpha(opacity=100);
        -webkit-transform: scale(1.12);
      }
      100% {
        opacity: 0.2;
        filter: alpha(opacity=20);
        -webkit-transform: scale(1);
      }
    }
    @keyframes twinkling {
      0% {
        opacity: 0.2;
        filter: alpha(opacity=20);
        -webkit-transform: scale(1);
      }
      50% {
        opacity: 1;
        filter: alpha(opacity=100);
        -webkit-transform: scale(1.12);
      }
      100% {
        opacity: 0.2;
        filter: alpha(opacity=20);
        -webkit-transform: scale(1);
      }
    }
  }
  .infor-job {
    background: #ffffff;
    padding: 30px 30px;
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
      font-size: 12px;
      //margin-right: 5px;
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
    padding-left: 30px;
    padding-right: 30px;
  }
  .operate-position-header {
    width: 100%;
    background-color: #f4f4f4;
    text-align: center;
    padding: 14px 0;
    padding-top: 40px;
  }
  .count {
    background-color: #f6f6f6;
  }
  .star-btn {
    color: #fc7a43;
    border: 1px solid #fc7a43;
    padding: 2px 10px;
    margin-left: 10px;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
