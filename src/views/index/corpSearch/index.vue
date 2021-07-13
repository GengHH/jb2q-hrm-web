<template>
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <div>
      <base-search
        placeholder="请输入相关单位名称"
        @clickButton="queryCorps($event)"
      ></base-search>
    </div>
    <!-- S筛选部分 -->
    <div class="filter-content">
      <el-form ref="queryCorpFrom" :model="queryParams">
        <!-- <el-row class="condition condition-one">
          <el-col :span="2">
            <div class="grid-content bg-purple">工作年限：</div>
          </el-col>
          <el-col :span="22">
            <el-radio-group v-model="queryParams.workYearNeed" size="medium">
              <el-radio-button label="">不限</el-radio-button>
              <el-radio-button
                v-for="(item, index) in gznxLists"
                :key="index"
                :label="item.value"
                >{{ item.label }}</el-radio-button
              >
            </el-radio-group>
          </el-col>
        </el-row> -->
        <el-row class="condition condition-two">
          <el-col :span="2">
            <div class="grid-content bg-purple">行业类型：</div>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group
              v-model="queryParams.industry"
              size="medium"
              id="industryRadios"
              class="radio-list-bar"
              @change="industryGroupChange"
            >
              <el-checkbox-button label="">不限</el-checkbox-button>
              <el-checkbox-button
                v-for="(item, index) in hyLists"
                :key="index"
                :label="item.value"
                >{{ item.label }}</el-checkbox-button
              >
            </el-checkbox-group>
          </el-col>
          <el-col :span="2">
            <div
              class="grid-content bg-purple more-ico"
              @click="showMoreRadios($event, 'industryRadios')"
            >
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row class="condition condition-three">
          <el-col :span="2">
            <div class="grid-content bg-purple">职位：</div>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group
              v-model="queryParams.positionTypeList"
              size="medium"
              id="positionsRadios"
              class="radio-list-bar"
              @change="positionGroupChange"
            >
              <el-checkbox-button id="postionsAll" label=""
                >不限</el-checkbox-button
              >
              <el-popover
                v-for="(item, index) in zyLists"
                :key="index"
                placement="bottom"
                width="600"
                trigger="click"
                popper-class="position-popover"
              >
                <el-checkbox-button
                  v-for="(item, idx) in zyListsTwo[index]"
                  :key="idx"
                  :label="item.value"
                  >{{ item.label }}</el-checkbox-button
                >
                <el-button
                  class="show-popover-button"
                  :btnIndex="index"
                  slot="reference"
                  >{{ item.label }}</el-button
                >
              </el-popover>
            </el-checkbox-group>
          </el-col>
          <el-col :span="2">
            <div
              class="grid-content bg-purple more-ico"
              @click="showMoreRadios($event, 'positionsRadios')"
            >
              <span>更多</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
        </el-row>
        <el-row class="condition condition-four">
          <el-col :span="2">
            <div class="grid-content bg-purple">工作性质：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="queryParams.workNature" size="medium">
              <el-radio-button label="">不限</el-radio-button>
              <el-radio-button
                v-for="(item, index) in gzxzLists"
                :key="index"
                :label="item.value"
                >{{ item.label }}</el-radio-button
              >
            </el-radio-group>
          </el-col>
        </el-row> -->
        <el-row class="condition condition-four">
          <el-col :span="2">
            <div class="grid-content bg-purple">单位类型：</div>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="queryParams.positionType" size="medium">
              <el-radio-button label="">不限</el-radio-button>
              <el-radio-button label="01">推荐</el-radio-button>
              <el-radio-button label="02">旗舰店</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <!-- <el-row class="condition condition-five">
          <el-col :span="2">
            <div class="grid-content bg-purple">年龄：</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-purple filter-select">
              <el-row>
                <el-col :span="4">
                  <el-input
                    id="minAge"
                    placeholder="请输入年龄下限"
                    prefix-icon="el-icon-user"
                    v-model.number="queryParams.ageMin"
                    @change="minAgeChange"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="1" class="horizontalLine">-</el-col>
                <el-col :span="4">
                  <el-input
                    id="maxAge"
                    placeholder="请输入年龄上限"
                    prefix-icon="el-icon-user"
                    v-model.number="queryParams.ageMax"
                    @change="maxAgeChange"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="2" class="text-right">薪酬：</el-col>
                <el-col :span="4">
                  <el-input
                    id="minSalary"
                    placeholder="请输入薪酬下限"
                    prefix-icon="el-icon-money"
                    v-model.number="queryParams.salaryMin"
                    @change="minSalaryChange"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="1" class="horizontalLine">-</el-col>
                <el-col :span="4">
                  <el-input
                    id="maxSalary"
                    placeholder="请输入薪酬上限"
                    prefix-icon="el-icon-money"
                    v-model.number="queryParams.salaryMax"
                    @change="maxSalaryChange"
                    clearable
                  >
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row> -->
        <!-- <el-row class="condition condition-six">
          <el-col :span="21" style="padding-left:40px;">
            <div class="grid-content bg-purple filter-select">
              <template>
                <el-checkbox
                  false-label="0"
                  true-label="1"
                  v-model="queryParams.agencyRecruit"
                  >中介代招</el-checkbox
                >
                <el-checkbox
                  false-label="0"
                  true-label="1"
                  v-model="queryParams.tranBaseSymbol"
                  >就业公共服务机构代理招聘</el-checkbox
                >
                <el-select
                  v-model="queryParams.special"
                  clearable
                  placeholder="招聘特定人群"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in tpOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-select
                  v-model="queryParams.eduRequire"
                  clearable
                  placeholder="学历要求"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in xlOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.workArea"
                  clearable
                  placeholder="工作区域"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in qxOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="queryParams.workHour"
                  clearable
                  placeholder="工作班时"
                  class="min-size-select"
                >
                  <el-option
                    v-for="(item, index) in bsOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple more-ico clear-ico"
              @click="clearQueryParams"
            >
              <i class="el-icon-delete"></i>
              <span>清空筛选条件</span>
            </div>
          </el-col>
        </el-row> -->
      </el-form>
    </div>

    <!-- E 筛选部分 -->
    <!-- 查询结果 -->
    <!-- <per-search-job
      v-if="tableData.length"
      ref="searchJobList"
      :jobData="tableData"
      :total="countTotal"
      showPager
      @deliveryResume="deliveryResume(arguments)"
      @favorJob="favorJob(arguments)"
      @showJobDetials="showJobDetial(arguments)"
      @callPositionCorp="callPositionCorp(arguments)"
    ></per-search-job> -->
    <!-- <BaseLoadingSvg v-else></BaseLoadingSvg> -->
    <!-- <div v-else style="text-align:center;margin-top:100px;color:#999;">
      暂时没有职位信息
    </div> -->

    <div class="no-data gray-font" v-if="!tableData.length">暂无数据</div>
    <!-- 展示栏 -->
    <el-row :gutter="20" v-else style="padding: 20px 5px;">
      <el-col
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="corp-box">
          <div class="corp-box-container">
            <div class="clearfix">
              <div
                style="width:100%;float:left;padding-left:90px;min-height:80px;"
              >
                <h2 class="long-text" @click="showCorpDetails(item.cid)">
                  {{ item.corpName }}
                </h2>
                <p>
                  <span
                    class="gray-font"
                    style="display:inline-block;margin-top:10px;"
                    ><i class="el-icon-school"></i>{{ item.cid }}</span
                  >
                </p>
              </div>
              <div style="width:80px;float:left;margin-left:-100%;">
                <img
                  v-if="item.logo"
                  :src="'data:image/jpg;base64,' + item.logo"
                  @error="defImg"
                  alt="未加载"
                  style="width: 80px;height: 80px;"
                />
                <img
                  v-else
                  :src="defaultImg"
                  style="width: 80px;height: 80px;"
                  alt="未加载"
                />
              </div>
              <!-- <div style="clear:both"> -->
              <!-- 内墙法-清除浮动(此时浮动元素的父类不需要添加class-clearfix) -->
              <!-- </div> -->
            </div>
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
        </div>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <BasePagination
      ref="page"
      :showPager="countTotal > 0"
      :totalCount="countTotal"
      @changePage="queryCorps"
    ></BasePagination>
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
import BaseSearch from '@/components/common/BaseSearch.vue';
import PerSearchJob from '@/components/index/IndexSearchJob.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import BaseCorpBoxShow from '@/components/common/BaseCorpBoxShow.vue';
import { getDicText, niceScrollUpdate } from '@/utils';
import { doDeliveryResume, attentionOrFavor } from '@/api/personApi';
import { queryHRFlagshipStoreInfoAll } from '@/api/indexApi';
export default {
  name: 'JobSearch',
  components: {
    BaseSearch,
    PerSearchJob,
    BasePagination,
    BaseCorpBoxShow
  },
  data() {
    return {
      loading: false,
      defaultImg: require('@/assets/images/break-img.svg'),
      detailsIndex: null,
      wchatDialog: false,
      positionDetailsRecId: '',
      queryParams: {
        pid: this.$store.getters['person/pid'],
        age: '',
        industry: [''],
        positionTypeList: [''],
        workNature: '',
        workYearNeed: '',
        workArea: '',
        eduRequire: '',
        //recruitNum: '3',
        tranBaseSymbol: '0',
        special: '',
        agencyRecruit: '0',
        salaryMin: '',
        salaryMax: '',
        ageMin: '',
        ageMax: '',
        workHour: '',
        positionName: '',
        corpName: '',
        positionType: ''
      },
      options: [],
      tableData: [],
      countTotal: 0,
      hyLists: this.$store.getters['dictionary/recruit_industry_type'],
      zyLists: this.$store.getters['dictionary/recruit_position_f_type'],
      qxOptions: this.$store.getters['dictionary/ggjbxx_qx'],
      tpOptions: this.$store.getters['dictionary/recruit_special_people'],
      xlOptions: this.$store.getters['dictionary/recruit_edu'],
      wtOptions: this.$store.getters['dictionary/yesno'],
      zyOptions: this.$store.getters['dictionary/recruit_position_f_type'],
      bsOptions: this.$store.getters['dictionary/recruit_work_hour'],
      gznxLists: this.$store.getters['dictionary/recruit_work_year'],
      gzxzLists: this.$store.getters['dictionary/recruit_work_nature'],
      jobList: [],
      targetObjId: ''
    };
  },
  computed: {
    zyListsTwo() {
      let _data = this.$store.getters['dictionary/recruit_position_s_type'];
      if (_data && _data.length) {
        return Object.values(
          _data.reduce((res, item) => {
            let _code = '' + Number(item.value.substring(0, 2));
            res[_code] ? res[_code].push(item) : (res[_code] = [item]);
            return res;
          }, {})
        );
      }
      return [];
    }
  },
  watch: {
    'queryParams.positionTypeList': function(val, oldVal) {
      //节流，防止数据短时间多次变动照成样式渲染过多而浪费性能
      this._.throttle(() => {
        //监听选中的选项-修改样式
        if (val && val.length) {
          $('.show-popover-button').css({
            backgroundColor: '#fff',
            color: '#606266'
          });
          val.forEach(item => {
            let styleIndex = Number(item.substring(0, 2)) - 1 + '';
            $('.show-popover-button[btnIndex="' + styleIndex + '"]').css({
              backgroundColor: '#fff1ec',
              color: '#fc6f3d'
            });
          });
        }
      }, 500)();
    }
  },
  created() {
    //根据url上的参数查询职位信息
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      // this.queryParams.positionType = this.$route.query.type;
      if (this.$route.query.type === 'flagship') {
        //旗舰店
        this.queryParams.positionType = '02';
        this.queryHRFlagshipStoreInfoAll();
      } else if (this.$route.query.type === 'rec') {
        this.queryParams.positionType = '01';
        //TODO 查询推荐单位
        return;
      } else {
        this.queryParams.positionType = '';
      }
    } else {
      this.queryParams.positionType = '';
      this.queryCorps();
    }
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
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
    minSalaryChange() {
      if (!this.queryParams.salaryMin) {
        return;
      }
      if (isNaN(Number(this.queryParams.salaryMin))) {
        this.$alert('请输入数字');
        this.queryParams.salaryMin = '';
      } else if (
        this.queryParams.salaryMax &&
        this.queryParams.salaryMin > this.queryParams.salaryMax
      ) {
        this.$alert('薪酬下限不得低于薪酬上限');
        this.queryParams.salaryMin = '';
      } else if (
        this.queryParams.salaryMax &&
        this.queryParams.salaryMin * 3 < this.queryParams.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.queryParams.salaryMax = '';
      }
    },
    maxSalaryChange() {
      if (!this.queryParams.salaryMax) {
        return;
      }
      if (isNaN(Number(this.queryParams.salaryMax))) {
        this.$alert('请输入数字');
        this.queryParams.salaryMax = '';
      } else if (
        this.queryParams.salaryMin &&
        this.queryParams.salaryMin > this.queryParams.salaryMax
      ) {
        this.$alert('薪酬上限不得高于薪酬下限');
        this.queryParams.salaryMin = '';
      } else if (
        this.queryParams.salaryMin &&
        this.queryParams.salaryMin * 3 < this.queryParams.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.queryParams.salaryMax = '';
      }
    },
    minAgeChange() {
      if (!this.queryParams.ageMin) {
        return;
      }
      if (this.queryParams.ageMin && isNaN(Number(this.queryParams.ageMin))) {
        this.$alert('请输入数字');
        this.queryParams.ageMin = '';
      } else if (this.queryParams.ageMin < 16) {
        this.$alert('年龄下限不得低于16周岁');
        this.queryParams.ageMin = '';
      } else if (this.queryParams.ageMin > 60) {
        this.$alert('年龄下限不得超过60周岁');
        this.queryParams.ageMin = '';
      }
    },
    maxAgeChange() {
      if (!this.queryParams.ageMax) {
        return;
      }
      if (this.queryParams.ageMax && isNaN(Number(this.queryParams.ageMax))) {
        this.$alert('请输入数字');
        this.queryParams.ageMax = '';
      } else if (this.queryParams.ageMax < 16) {
        this.$alert('年龄上限不得低于16周岁');
        this.queryParams.ageMax = '';
      } else if (this.queryParams.ageMax > 60) {
        this.$alert('年龄下限不得超过60周岁');
        this.queryParams.ageMax = '';
      } else if (
        this.queryParams.ageMin &&
        this.queryParams.ageMin * 3 < this.queryParams.ageMax
      ) {
        this.$alert('年龄上限不得超过年龄下限的三倍');
        this.queryParams.ageMax = '';
      }
    },
    clearQueryParams: function() {
      Object.keys(this.queryParams).forEach(
        key => (this.queryParams[key] = '')
      );
      this.queryParams.tranBaseSymbol = '0';
      this.queryParams.agencyRecruit = '0';
      this.queryParams.industry = [''];
      this.queryParams.positionTypeList = [''];
    },
    /**
     * 根据条件查询旗舰店单位
     */
    async queryHRFlagshipStoreInfoAll(val) {
      let that = this;
      let params = this.$refs['queryCorpFrom']?.model
        ? JSON.parse(JSON.stringify(this.$refs['queryCorpFrom'].model))
        : this.queryParams;
      params.positionName = $.trim(val);
      that.queryParams.positionName = $.trim(val);
      params.pageParam = {
        pageSize: that.$refs.page?.pageSize || 10,
        pageIndex: that.$refs.page?.currentPage - 1 || 0
      };

      //查询所有旗舰店
      this.loading = true;
      let result = await queryHRFlagshipStoreInfoAll(params);
      console.log('result', result);
      if (
        result.status === 200 &&
        result.result.pageresult &&
        result.result.pageresult.total
      ) {
        result.result.pageresult.data.forEach(item => {
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
        this.$set(this, 'tableData', result.result.pageresult.data);
        this.$set(
          this,
          'countTotal',
          Number(result.result.pageresult.total) || 0
        );
      } else {
        this.$set(this, 'tableData', []);
        this.$set(this, 'countTotal', 0);
        this.$message.success('未查询到信息');
      }
      this.loading = false;
    },
    showMoreRadios(event, radiosIndex) {
      let dom = $('#' + radiosIndex);
      let $this = $(event.target);
      if (dom && dom.hasClass('radio-list-bar-more')) {
        dom.removeClass('radio-list-bar-more');
        $this
          .siblings('.el-icon-caret-bottom')
          .css('transform', 'rotate(0deg)');
      } else {
        dom.addClass('radio-list-bar-more');
        $this
          .siblings('.el-icon-caret-bottom')
          .css('transform', 'rotate(180deg)');
      }
      // 更新滚动条
      this._.throttle(niceScrollUpdate, 500)();
    },

    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let recId = (arg && arg[2]) || '';

      //向自己搜索的职位投递简历
      let res = await doDeliveryResume({
        positionId: positionId,
        pid: this.$store.getters['person/pid']
      });
      if (res.status === 200) {
        // 更换按钮
        // this.tableData.splice(index, 1);
        this.tableData[index].applyFor = true;
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
          this.tableData[index].favor = true;
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
          this.tableData[index].favor = false;
          this.$message({ type: 'success', message: '取消收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏职位失败' });
        }
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
    industryGroupChange(newVal) {
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.industry = [''];
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.industry = newVal.filter(item => item !== '');
      }
    },
    positionGroupChange(val) {
      let newVal = val;
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.queryParams.positionTypeList = [''];
      } else if (newVal && newVal.length && newVal.length > 10) {
        this.$alert('最多只可选择10种职位');
        newVal.pop();
        this.queryParams.positionTypeList = newVal;
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.queryParams.positionTypeList = newVal.filter(item => item !== '');
      } else if (!newVal.length) {
        this.queryParams.positionTypeList = [''];
      }
    },
    /**
     *查询单位信息列表
     */
    queryCorps() {
      //根据url上的参数查询职位信息
      if (this.queryParams.positionType === '02') {
        //旗舰店
        this.queryHRFlagshipStoreInfoAll();
      } else if (this.queryParams.positionType === '01') {
        //TODO 查询推荐单位
        return;
      } else {
        //TODO 查询所有单位
        // this.queryCorps();
      }
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
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  padding: 90px 5%;
  background-color: $g-white-color;
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }

  .radio-list-bar {
    overflow: hidden;
    max-height: 40px;
    transition: height 0.5s;
    -webkit-transition: max-height 0.5s;
    ::v-deep .el-checkbox-button__inner {
      border: 0 !important;
      // padding: 10px 20px !important;
      padding: 7px 15px !important;
      border-radius: 0 !important;
    }
  }
  .radio-list-bar-more {
    max-height: 416px !important;
  }
  .el-checkbox-button {
    margin: 6px 0;
  }
  .corp-box {
    width: 100%;
    // min-height: 180px;
    padding: 5px 15px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
    margin-bottom: 10px;
    .corp-box-container {
      //margin: 10px 0;
    }
    &:hover {
      // border: 1px solid #fc7a43;
      background-color: #f6f6f6;
    }
    h2 {
      margin: 10px 0 5px 0;
      font-family: 宋体, Arial, Verdana, sans-serif;
    }
    .corp-info {
      width: 100%;
      font-size: 14px;
      line-height: 24px;
      & > p {
        margin-top: 10px;
      }
    }
    .corp-info-tag {
      span {
        display: inline-block;
        padding: 4px 10px;
        margin: 0 3px;
        border-radius: 15px;
        background-color: #f4f4f4;
      }
    }
    .corp-info-count {
      margin: 10px 0;
      span.count {
        display: inline-block;
        padding: 4px 10px;
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
  .gray-font {
    color: #999;
  }
  .orange-font {
    color: #fc7a43;
  }
  .long-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-break: break-all;
    overflow: hidden;
  }
}

.filter-content {
  margin-bottom: 20px;
  ::v-deep .el-radio-button__inner {
    padding: 7px 15px;
    border: 0;
  }
  ::v-deep .el-input__inner {
    border: 0;
    //width: 100px !important;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .condition {
    background-color: #fff;
  }
  .condition-one {
    z-index: 10;
  }
  .condition-two {
    z-index: 20;
  }
  .condition-three {
    z-index: 30;
  }
  .condition-four {
    z-index: 40;
  }
  .condition-five {
    z-index: 50;
    .horizontalLine {
      text-align: center;
    }
    ::v-deep #minAge,
    ::v-deep #maxAge,
    ::v-deep #minSalary,
    ::v-deep #maxSalary {
      border: 1px solid #eeeeee;
      width: 100% !important;
    }
  }
  .condition-six {
    z-index: 60;
  }
  .place-holder {
    visibility: hidden;
  }
  .el-row {
    border-bottom: 1px solid #eeeeee;
  }
  .el-radio-group {
    line-height: 40px;
    //text-align: center;
    ::v-deep .el-radio-button__inner {
      border-radius: 0;
    }
  }
  .bg-purple {
    line-height: 40px;
    text-align: center;
  }
  .filter-select {
    text-align: left;
    .min-size-select {
      width: 150px !important;
    }
  }
  .more-ico:hover {
    span,
    i {
      color: #fc6f3d;
      cursor: pointer;
    }
  }
  .more-ico {
    color: #999;
  }
  .clear-ico {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: 20px;
  }
  #postionsAll {
    top: -5px;
  }
  .show-popover-button {
    border: 0;
    border-radius: 0;
    padding: 10px 20px;
    // margin: 10px 0;
  }
}
.no-data {
  width: 100%;
  margin-top: 160px;
  text-align: center;
}
</style>

<style lang="scss">
.position-popover {
  background-color: #fafafa;
  border: 1px solid #fc6f3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-checkbox-button__inner {
    border: 0;
    background-color: #fafafa;
  }
  .popper__arrow::after {
    border-bottom-color: #fc6f3d !important;
  }
  .el-checkbox-button:first-child .el-checkbox-button__inner {
    border-left: 0;
  }
}
</style>
