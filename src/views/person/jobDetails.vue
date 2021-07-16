<template>
  <div
    id="jobSearchView"
    :class="[{ 'content-box': asPage }]"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-button
      id="complaintBtn"
      v-if="!realData.isComplaint"
      @click="complaint = !complaint"
    >
      投诉
      <i v-if="complaint" class="arrow el-icon-arrow-up"></i>
      <i v-else class="arrow el-icon-arrow-down"></i>
    </el-button>
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
              <span style="display:inline-block;position: relative;top: 2px;">{{
                realData.corpName
              }}</span>
              <img
                src="../../assets/images/ico_rz.png"
                alt=""
                class="ico_rz"
                style="height: .9em;position: relative;top: 3px;"
              /><i
                v-if="realData.follow"
                class="star-btn el-icon-star-off"
                @click="attentionCorp"
                >关注单位</i
              >
              <i v-else class="star-btn el-icon-star-on" @click="attentionCorp"
                >取消关注单位</i
              >
            </p>
            <p class="four-opacity mat-15">更新于 {{ realData.releaseTime }}</p>
          </el-col>
          <el-col :span="5" class="padd-l">
            <el-row :gutter="20" v-if="!disabled">
              <el-col :span="12">
                <el-button
                  type="primary"
                  class="white-btn mat-15"
                  @click="
                    favorJob(
                      realData.favor,
                      index,
                      realData.positionId,
                      realData.recId
                    )
                  "
                  ><i v-if="realData.favor" class="el-icon-star-on">已收藏</i>
                  <i v-else class="el-icon-star-off">收藏</i></el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                  v-if="realData.applyFor"
                  class="release-btn mat-15"
                  @click="deliveryResume2"
                >
                  <i class="el-icon-position"></i>已投递</el-button
                >
                <el-button
                  v-else
                  type="primary"
                  class="release-btn mat-15"
                  @click="
                    deliveryResume(
                      realData.favor,
                      index,
                      realData.positionId,
                      realData.recId
                    )
                  "
                >
                  <i class="el-icon-position"></i>投简历</el-button
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" class="font12" v-if="!disabled">
              <el-col :span="24">
                <el-link :underline="false" @click="perfectResume"
                  ><img
                    class="ico_rz"
                    src="../../assets/images/ico-01.png"
                    alt=""
                  />完善在线简历</el-link
                >
              </el-col>
              <!-- <el-col :span="12">
                <el-link :underline="false" @click="uploadResume"
                  ><img
                    class="ico_rz"
                    src="../../assets/images/ico-02.png"
                    alt=""
                  />上传附件简历</el-link
                > 
              </el-col> -->
            </el-row>
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
        <!-- <div class="title-border">职位描述</div>
        <p class="mat-15 little-tit">岗位职责 TODO：</p>
        <p class="little-tit">
          1、负责公司房产的营销推广，并做好相应的渠道开拓，并维护好渠道及客户关系；
        </p>
        <p class="little-tit">
          2、负责区域市场开拓、巡访责任范围内的区域市场，寻求市场及项目开发机会。
        </p>
        <p class="little-tit">3、开发商的约见、接洽、商务谈判</p>
        <p class="little-tit">
          4、根据开发商合作意向程度，有重点地选择开发商进行接洽和谈判事宜，争取合作机会。
        </p>
        <p class="little-tit">
          5、巩固已开发项目的同时维护原有项目使工作有延续性。
        </p>
        <p class="little-tit">
          6、根据本区域市场状况及具体个案，确定目标项目进行接洽。
        </p>
        <p class="little-tit">任职要求 TODO：</p>
        <p class="little-tit">1.有房产相关经验（有车者优先）</p>
        <p class="little-tit">2.责任心强，业绩能力突出，致力于从事销售工作；</p>
        <p class="little-tit">
          3.具有良好的沟通能力，责任心强，能承受工作压力以及团队合作精神；
        </p>
        <p class="little-tit">
          4.处理突发事件应变能力强，客户管理能力强，执行力强。
        </p>
        <p class="little-tit">待遇：</p>
        <p class="little-tit">底薪5k+业绩提成+满勤+公司福利 做六休一</p>
        <p class="little-tit">固定团建，弹性工作</p> 
        <div class="title-border mat-15">公司介绍</div>-->
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
          <!-- <p class="introduce little-tit">
            金仕达科技有限公司是一家专业的房地产服务机构,公司成立以来,在同行和客户中赢得了良好的口碑。
            经过公司同仁共同努力和社会各界的鼎力支持，我们的规模逐渐壮大。
            公司拥有一流的销售团队、良好的渠道关系，致力于为客户提供一手房代理、二手房交易、
            以及房地产相关咨询等专业、完美、全面的不...金仕达科技有限公司是一家专业的房地产服务机构,公司成立以来,在同行和客户中赢得了良好的口碑。
            经过公司同仁共同努力和社会各界的鼎力支持，我们的规模逐渐壮大。
            公司拥有一流的销售团队、良好的渠道关系，致力于为客户提供一手房代理、二手房交易
          </p> -->
          <!-- <span class="look-all"
            >查看全部<i class="el-icon-arrow-down"></i
          ></span> -->
        </div>
        <div class="title-border mat-30">
          工作地址：（{{ realData.workAddress }}）
        </div>
        <div class="map-box">
          <!-- <img src="../../assets/images/map.png" alt="" /> -->
          <pl-map :pointList="pointList"></pl-map>
        </div>
        <div class="title-border mat-15">
          看过该职位的人还看了 TODO
          <!-- <span class="fr fourteen-opacity">更多职位 > </span> -->
        </div>
        <el-row>
          <el-col :span="8">
            <div class="img-div clearfix">
              <img class="fl" src="../../assets/images/img1.png" alt="" />
              <div class="job-right fl">
                <p class="font-sixteen">营销代表</p>
                <p class="font-eighteen font-or">8k-10k</p>
                <p class="four-opacity">希达软件</p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="clearfix img-div">
              <img class="fl" src="../../assets/images/img2.png" alt="" />
              <div class="job-right fl">
                <p class="font-sixteen">招聘专员</p>
                <p class="font-eighteen font-or">6k-8k</p>
                <p class="four-opacity">迈恒房地产</p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="clearfix img-div">
              <img class="fl" src="../../assets/images/img3.png" alt="" />
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
        <p class="sixteen-opacity">
          职位发布者<el-button
            type="primary"
            class="gray-btn or-br mat-15 orange-font"
            @click="callPositionCorp(realData.cid || realData.corpId)"
            ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
          >
        </p>
        <div class="header-box clearfix">
          <img src="../../assets/images/dw.svg" class="head-img" alt="" />
          <div class="fl mat-15 right-div ">
            <p class="sixteen-opacity">
              <!-- {{ realData.releaseUserId }} -->
            </p>
            <p>
              <!-- <span class="dqzx-span">当前在线</span> -->
            </p>
            <!-- <el-button
              type="primary"
              class="gray-btn or-br mat-15 orange-font"
              @click="callPositionCorp(realData.cid || realData.corpId)"
              ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
            > -->
          </div>
        </div>
        <!-- <div class="mat-30 clearfix" style="border-top: 1px dotted #ccc;padding-top: 20px;">
          <img
            class="fl ico_rz logos"
            src="../../assets/images/logos.png"
            alt=""
          />
          <p class="font-sixteen font-or name-p">{{ realData.corpName }}</p>
        </div> -->
        <!-- <div class="module1">
          <p class="four-opacity">
            <img src="../../assets/images/ico01.png" alt="" /> 互联网
          </p>
          <p class="four-opacity">
            <img src="../../assets/images/ico02.png" alt="" /> 上市
          </p>
          <p class="four-opacity">
            <img src="../../assets/images/ico03.png" alt="" /> 1000-9999人
          </p>
          <p class="four-opacity">
            <img src="../../assets/images/ico04.png" alt="" />
            https://www.jinshida.com/
          </p>
        </div>
        <div class="module2 mat-30">
          <p class="fourteen-opacity">
            相似职位 <span class="more fr four-opacity">更多</span>
          </p>
          <div class="module-li">
            <p class="fourteen-opacity">
              U3D游戏客户端主程 <span class="font-or">10-11k</span>
            </p>
            <p class="four-opacity">重庆聚心动 · 重庆</p>
          </div>
          <div class="module-li">
            <p class="fourteen-opacity">
              U3D游戏客户端主程 <span class="font-or">10-11k</span>
            </p>
            <p class="four-opacity">重庆聚心动 · 重庆</p>
          </div>
          <div class="module-li">
            <p class="fourteen-opacity">
              U3D游戏客户端主程 <span class="font-or">10-11k</span>
            </p>
            <p class="four-opacity">重庆聚心动 · 重庆</p>
          </div>
          <div class="module-li">
            <p class="fourteen-opacity">
              U3D游戏客户端主程 <span class="font-or">10-11k</span>
            </p>
            <p class="four-opacity">重庆聚心动 · 重庆</p>
          </div>
          <div class="module-li">
            <p class="fourteen-opacity">
              U3D游戏客户端主程 <span class="font-or">10-11k</span>
            </p>
            <p class="four-opacity">重庆聚心动 · 重庆</p>
          </div>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PlMap from '@/components/common/BaseMap';
import {
  queryPositionDetail,
  queryRecommendDetai,
  sendComplaintSms,
  doComplaint,
  attentionOrFavor
} from '@/api/personApi';
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
          // { type: 'number', message: '请输数字', trigger: 'blur' }
          //{ min: 6, max: 6, message: '请输六位验证码', trigger: 'blur' }
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
      return this.positionData?.workAddress
        ? [this.positionData.workAddress]
        : [];
    }
  },
  watch: {
    complaint: function(val) {
      this._.throttle(niceScrollUpdate, 500)();
    }
  },
  created() {
    //根据url上的参数查询职位信息
    if (
      this.$route.query &&
      Object.keys(this.$route.query).length > 0 &&
      this.$route.query.positionId
    ) {
      let positionId = this.$route.query.positionId;
      if (this.$route.path.includes('positionDetails')) {
        this.asPage = true;
      }
      //查询单位信息
      this.queryPositionDetail(positionId);
    } else if (this.positionData.recId) {
      //如果是推荐的职位
      this.queryPositionDetials(
        this.positionData.recId,
        this.positionData.positionId
      );
    } else {
      //直接传入的数据
      this.realData = { ...this.positionData };
    }
  },
  methods: {
    perfectResume() {
      // this.$emit('perfectResume');
      this.$router.push('/resumeMgr');
    },
    uploadResume() {
      this.$emit('uploadResume');
    },
    deliveryResume(favor, index, positionId, recId) {
      //投递简历
      this.$confirm('确认向该职位投递简历？')
        .then(() => {
          this.$emit('deliveryResume', index, positionId, recId); //通知父组件改变。
        })
        .catch(err => {
          console.log(err);
        });
    },
    deliveryResume2() {
      this.$alert('已向改职位投递过简历，无法再次投递');
    },
    favorJob(favor, index, positionId, recId) {
      //收藏或者取消收藏职位
      let str = favor ? '确认取消收藏该职位？' : '确认收藏该职位？';
      this.$confirm(str)
        .then(() => {
          this.$emit('favorJob', index, positionId, favor, recId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 沟通单位
     */
    callPositionCorp(cid) {
      //  console.log(
      //   '%c 🍔 arg: ',
      //   'font-size:20px;background-color: #465975;color:#fff;',
      //   arg
      // );
      // let index = arg[0];
      // let corpId = (arg && arg[1]) || '';
      // let positionId = (arg && arg[2]) || '';
      // let positionName = (arg && arg[3]) || '';
      // let corpName = (arg && arg[4]) || '';

      this.$emit(
        'callPositionCorp',
        this.index,
        cid,
        this.realData.positionId,
        this.realData.positionName,
        this.realData.corpName
      );
    },
    /**
     * 获取职位的详细信息
     */
    async queryPositionDetail(positionId) {
      this.loading = true;
      let queryRes = await queryPositionDetail({
        positionId: positionId || '',
        pid: this.$store.getters['person/pid'] || ''
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
    },
    /**
     * 查询推荐的职位的详细信息
     */
    async queryPositionDetials(recId, positionId) {
      let that = this;
      this.loading = true;
      let res = await queryRecommendDetai({
        recId: recId,
        positionId: positionId,
        pid: this.$store.getters['person/pid']
      });
      if (res && res.status === 200) {
        let item = res.result.data;
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
        if (item.workYearNeed) {
          item.workYearNeedText = getDicText(
            that.$store.getters['dictionary/recruit_work_year'],
            item.workYearNeed
          );
        }
        if (item.salaryPayType) {
          item.salaryPayTypeText =
            '元/' +
            getDicText(
              that.$store.getters['dictionary/recruit_salary_pay_type'],
              item.salaryPayType
            );
        }
        this.realData = item;
      } else if (res) {
        this.$message.error('获取职位详细信息失败');
      }
      this.loading = false;
    },
    /**
     *获取短信验证码
     */
    async getMessage(done) {
      //获取短信验证码
      let that = this;
      if (!this.complaintParams.contactPhone) {
        this.$alert('手机号不能为空');
      } else if (!phonePattern.test(this.complaintParams.contactPhone)) {
        this.$alert('手机号格式不正确');
      } else {
        this.loading = true;
        let smsResult = await sendComplaintSms({
          contactPhone: that.complaintParams.contactPhone
        });
        if (smsResult && smsResult.status === 200) {
          //采用倒计时方法
          that.$message.success('证码已发送至手机');
          const TIME_COUNT = 60;
          if (!that.timer) {
            that.count = TIME_COUNT;
            that.verifyCodeShow = false;
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= TIME_COUNT) {
                that.count--;
              } else {
                that.verifyCodeShow = true;
                clearInterval(that.timer);
                that.timer = null;
              }
            }, 1000);
          }
        } else if (smsResult) {
          that.$message.error('获取验证码失败');
        }
        this.loading = false;
      }
      done();
    },
    /**
     *投诉职位
     */
    async doComplaint() {
      if (!this.realData) {
        this.$alert('缺少数据，无法投诉');
        return;
      }
      this.complaintParams.cid = this.realData.corpId || '';
      this.complaintParams.corpName = this.realData.corpName || '';
      this.complaintParams.positionId = this.realData.positionId || '';
      this.loading = true;
      let doRes = await doComplaint(this.complaintParams);
      if (doRes && doRes.status === 200) {
        this.$message.success('投诉成功');
        this.realData.isComplaint = true;
      } else if (doRes) {
        this.$message.error('投诉失败');
      }
      this.loading = false;
    },
    /**
     * 个人关注or取消关注单位
     */
    async attentionCorp() {
      this.loading = true;
      let queryRes = await attentionOrFavor('1', {
        id: [this.realData.corpId],
        pid: this.$store.getters['person/pid'],
        status: this.realData.follow
      });
      if (queryRes && queryRes.status === 200) {
        // this.corpInfo = queryRes.result.data;
        this.$message.success(
          this.realData.follow ? '关注成功' : '取消关注成功'
        );
        //更新按钮样式
        this.realData.follow = !this.realData.follow;
      } else if (queryRes) {
        this.$message.error(this.realData.follow ? '关注失败' : '取消关注失败');
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
        // margin-left: 15px;
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
      // .or-br {
      //   border-color: #fc6f3d !important;
      // }

      // .orange-font {
      //   color: #fc6f3d;
      // }
    }
  }
  .gray-btn {
    color: #fc6f3d;
    background-color: transparent;
    border-color: #d1d1d1;
    padding: 3px 10px;
    border-radius: 20px;
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
