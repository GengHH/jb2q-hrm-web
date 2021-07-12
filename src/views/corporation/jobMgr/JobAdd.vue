<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-12 17:59:17
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobAdd.vue
-->
<template>
  <!--S demo2职位管理右侧内容部分 -->
  <div
    class="shadow-left"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <!--S 公共标题部分 -->
    <div class="title-style">
      发布职位
    </div>
    <!--E 公共标题部分 -->

    <!--S 发布职位内容部分 -->
    <el-form
      id="addForm"
      :disabled="formDisabled"
      :model="jobForm"
      :label-position="labelPosition"
      :rules="rules"
      ref="jobForm"
      label-width="0px"
      class="inside-infor clearfix"
    >
      <el-col :span="12">
        <el-form-item class="radio-group" prop="workNature" required>
          <el-radio-group
            v-model="jobForm.workNature"
            size="medium"
            @change="workNatureChange"
          >
            <el-radio-button label="01">全职</el-radio-button>
            <el-radio-button label="02">兼职</el-radio-button>
            <el-radio-button label="03" v-if="isTranBaseSymbol"
              >就业见习</el-radio-button
            >
          </el-radio-group> </el-form-item
        ><span class="radio-group-label"
          >（<span class="requiredSymbol">*</span>工作性质）</span
        >
      </el-col>
      <el-col :span="12">
        <!-- 见习职位名称 / 手动输入职位名称-->
        <el-form-item prop="positionName" required>
          <pl-input
            required
            v-model="jobForm.positionName"
            label="职位名称"
            :disabled="disabledByJxzw"
          ></pl-input>
        </el-form-item>
      </el-col>

      <!-------------------------->
      <!-- 显示就业见习岗位名称 -->
      <!-------------------------->
      <el-col
        :span="24"
        v-if="showJxPosition"
        v-loading="jxLoading"
        element-loading-text="拼命加载中"
      >
        <div class="jx-wrap jx-wrap-header">
          <el-row :gutter="40" style="margin:0">
            <el-col :span="12" class="jx-wrap-header-title">
              见习职位信息<i class="header-icon el-icon-info"></i>
            </el-col>
            <el-col :span="12">
              <BaseSearch
                placeholder="请输入职位名称"
                @clickButton="queryJxPosition($event)"
              ></BaseSearch>
            </el-col>
          </el-row>
        </div>
        <div
          v-if="!jyjxList.length"
          class="jx-wrap jx-wrap-body"
          style="text-align:center;padding:20px"
        >
          无职位数据
        </div>
        <div v-else class="jx-wrap jx-wrap-body">
          <!-- 委托单位或者见习职位列表 -->
          <el-carousel indicator-position="outside" :autoplay="false">
            <el-carousel-item v-for="item in carouselPageCount" :key="item">
              <div class="jx-carousel">
                <el-radio-group
                  v-model="jobForm.tranPositionCode"
                  size="medium"
                  id="positionsRadios"
                  class="radio-list-bar"
                >
                  <!-- 一般基地--直接显示职位信息 -->
                  <template v-if="jxjdData.jdlx === '1'">
                    <el-radio-button
                      v-for="idx in jyjxList[item - 1]"
                      :key="idx.gwbh"
                      :label="idx.gwbh"
                    >
                      <span @click="radioGroupChange(idx.gwbm)">{{
                        idx.gwbm
                      }}</span>
                    </el-radio-button>
                  </template>
                  <!-- 综合基地--显示委托外派单位信息 -->
                  <template v-else>
                    <el-popover
                      ref="popoverRef"
                      v-for="(wpdwItem, index) in jyjxList[item - 1]"
                      :key="index"
                      placement="bottom"
                      width="600"
                      trigger="click"
                      :open-delay="openDelay"
                      :close-delay="closeDelay"
                      :append-to-body="false"
                      popper-class="position-popover"
                    >
                      <el-radio-button
                        v-for="idx in wpdwItem.positionDataList"
                        :key="idx.gwbh"
                        :label="idx.gwbh"
                      >
                        <span
                          :id="idx.gwbh"
                          :class="wpdwItem.cid"
                          @click="
                            radioGroupChange(
                              idx.gwbm,
                              wpdwItem.cid,
                              wpdwItem.dwmc
                            )
                          "
                          >{{ idx.gwbm }}</span
                        >
                      </el-radio-button>
                      <el-button
                        class="show-popover-button"
                        :btnIndex="wpdwItem.cid"
                        slot="reference"
                        >{{ wpdwItem.dwmc }}</el-button
                      >
                    </el-popover>
                  </template>
                </el-radio-group>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <!-- end -->
      <el-col :span="12" v-if="isHumanResourceReg">
        <el-form-item prop="agencyRecruit">
          <pl-select
            required
            v-model="jobForm.agencyRecruit"
            label="是否属于中介代招"
            :optionData="dicData"
            class="w-select"
            @change="agencyRecruitChange"
          >
          </pl-select>
        </el-form-item>
      </el-col>

      <!---------------------->
      <!-- 显示委托单位名称 -->
      <!---------------------->
      <el-col
        :span="24"
        v-if="showWtCorp"
        v-loading="wtLoading"
        element-loading-text="拼命加载中"
      >
        <div class="jx-wrap jx-wrap-header">
          <el-row :gutter="40" style="margin:0">
            <el-col :span="6" class="jx-wrap-header-title">
              委托单位信息<i class="header-icon el-icon-info"></i>
            </el-col>
            <el-col :span="18">
              <BaseSearch
                placeholder="请输入"
                showSelect
                :selectData="wtSelectData"
                defaultSelectValue="1"
                @clickButton="queryEntrustCorp(arguments)"
              ></BaseSearch>
            </el-col>
          </el-row>
        </div>
        <div
          v-if="!wtdwList.length"
          class="jx-wrap jx-wrap-body"
          style="text-align:center;padding:20px"
        >
          无单位信息数据
        </div>
        <div v-else class="jx-wrap jx-wrap-body">
          <!-- 单位名称列表 -->
          <el-carousel indicator-position="outside" :autoplay="false">
            <el-carousel-item v-for="item in carouselPageCount2" :key="item">
              <div class="jx-carousel">
                <el-radio-group
                  v-model="jobForm.entrustCorpName"
                  size="medium"
                  id="corpRadios"
                  class="radio-list-bar"
                >
                  <!--直接显示单位信息 -->
                  <el-radio-button
                    v-for="idx in wtdwList[item - 1]"
                    :key="idx.entrustTyshxym"
                    :label="idx.entrustCorpName"
                  >
                    <span
                      @click="
                        wtRadioGroupChange(
                          idx.entrustTyshxym,
                          idx.entrustCorpName
                        )
                      "
                      >{{ idx.entrustTyshxym }}（{{
                        idx.entrustCorpName
                      }}）</span
                    >
                  </el-radio-button>
                </el-radio-group>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <!-- end -->
      <el-col
        :span="24"
        v-if="isHumanResourceReg && jobForm.agencyRecruit === '1'"
      >
        <el-form-item prop="entrustTyshxym">
          <pl-input
            required
            v-model="jobForm.entrustTyshxym"
            label="委托待招单位统一社会信用码"
            disabled
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        v-if="isHumanResourceReg && jobForm.agencyRecruit === '1'"
      >
        <el-form-item prop="entrustCorpName">
          <pl-input
            required
            v-model="jobForm.entrustCorpName"
            label="委托代招单位"
            disabled
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="positionFType" required>
          <pl-select
            v-model="jobForm.positionFType"
            label="职位分类一级"
            :optionData="dicZyflData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="positionType" required>
          <pl-select
            v-model="jobForm.positionType"
            label="职位分类二级"
            :optionData="dicZyflDataTwo"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <!-- 待修改 -->
      <el-col :span="12">
        <el-col :span="12" class="row-input-one">
          <el-form-item class="input-one" prop="ageMin" required>
            <pl-input
              required
              v-model.number="jobForm.ageMin"
              label="年龄下限"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="row-input-two">
          <el-form-item class="input-two" prop="ageMax" required>
            <pl-input
              required
              v-model.number="jobForm.ageMax"
              label="年龄上限"
            ></pl-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12" class="clearfix">
        <el-form-item class="input-one" prop="workArea" required>
          <pl-select
            required
            v-model="jobForm.workArea"
            label="工作区域"
            :optionData="dicGzqyData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input-two" prop="workStreetList">
          <el-select
            :required="streetRequired"
            multiple
            v-model="jobForm.workStreetList"
            placeholder="请选择工作街镇"
            :optionData="dicStreet"
            class="w-select"
          >
            <el-option
              v-for="item in dicStreet"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="workAddress" required>
          <pl-input
            required
            v-model="jobForm.workAddress"
            label="工作详细地址"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="workHour">
          <pl-select
            v-model="jobForm.workHour"
            label="工作班时"
            :optionData="dicBsData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <pl-select
            v-model="jobForm.salaryPayType"
            label="工资支付方式"
            :optionData="dicZffsData"
            class="w-select"
            :disabled="disabledByJxzw"
          >
          </pl-select>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item class="radio-group" prop="workYearNeed" required>
          <el-radio-group v-model="jobForm.workYearNeed" size="medium">
            <el-radio-button
              v-for="(item, index) in dicGznxData"
              :key="index"
              :label="item.value"
              >{{ item.label }}</el-radio-button
            >
            <!-- <el-radio-button label="01">无需求</el-radio-button>
            <el-radio-button label="02">1年以下</el-radio-button>
            <el-radio-button label="03">1~2年</el-radio-button>
            <el-radio-button label="04">3~5年</el-radio-button>
            <el-radio-button label="05">6~9年</el-radio-button>
            <el-radio-button label="06">10年以上</el-radio-button> -->
          </el-radio-group>
          <span class="radio-group-label"
            >（<span class="requiredSymbol">*</span>工作年限要求）</span
          >
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="eduRequire" required>
          <pl-select
            v-model="jobForm.eduRequire"
            label="学历要求"
            :optionData="dicXlData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-col :span="12" class="row-input-one">
          <el-form-item class="input-one" prop="salaryMin" required>
            <pl-input
              required
              v-model.number="jobForm.salaryMin"
              @change="minSalaryChange"
              :disabled="disabledByJxzw"
              label="薪酬下限"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="row-input-two">
          <el-form-item class="input-two" prop="salaryMax" required>
            <pl-input
              required
              v-model.number="jobForm.salaryMax"
              @change="maxSalaryChange"
              :disabled="disabledByJxzw"
              label="薪酬上限"
            ></pl-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="recruitNum" required>
          <pl-input
            required
            v-model.number="jobForm.recruitNum"
            label="招聘人数"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="specialList">
          <pl-select
            multiple
            v-model="jobForm.specialList"
            label="招聘特定人群"
            class="w-select"
            :optionData="dicTdrqData"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="describe" required>
          <pl-input
            required
            id="jobTextarea"
            type="textarea"
            label="职位描述（1500字符）"
            v-model="jobForm.describe"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          class="radio-group"
          prop="recruitType"
          :rules="isPublic ? rules.recruitType : []"
        >
          <el-radio-group
            v-model="jobForm.recruitType"
            size="medium"
            :disabled="disabledByJxzw"
          >
            <el-radio-button label="1">自主招聘</el-radio-button>
            <el-radio-button label="2">代理招聘</el-radio-button>
          </el-radio-group>
          <span class="radio-group-label"
            >（<span v-if="isPublic" class="requiredSymbol">*</span
            >招聘类型）</span
          >
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="date-picker" prop="endDate">
          <pl-date-picker
            v-model="jobForm.endDate"
            type="date"
            value-format="yyyyMMdd"
            label="发布截止日期"
            :required="isPublic"
            :picker-options="expireTimeOption"
          >
          </pl-date-picker>
        </el-form-item>
      </el-col>
    </el-form>

    <!--E 发布职位内容部分 -->

    <!-- S demo4按钮部分 -->
    <div id="demo4" class="form-btns" v-if="!formDisabled">
      <el-button class="white-btn btn-style" @click="dialogClear"
        >清空重置</el-button
      >
      <pl-button class="brown-btn btn-style" @click="savePosition($event)"
        >保存</pl-button
      >
      <pl-button class="orange-btn btn-style" @click="releasePosition($event)"
        >发布</pl-button
      >
    </div>
  </div>
  <!-- E demo4按钮部分 -->
</template>

<script>
/**
 * 发布职位
 */
import {
  savePosition,
  releasePosition,
  findPositionDetail,
  queryJyjxJdInfo,
  queryEntrustCorp
} from '@/api/corporationApi';
import { salaryPattern, agePattern } from '@/utils/regexp';
import BaseSearch from '@/components/common/BaseSearch.vue';
import { overDateSomeDays, niceScrollUpdate } from '@/utils';
export default {
  name: 'JobAdd',
  components: {
    BaseSearch
  },
  data() {
    return {
      openDelay: 200,
      closeDelay: 0,
      loading: false,
      jxLoading: false,
      wtLoading: false,
      formDisabled: false,
      labelPosition: 'right',
      isPublic: false,
      activeNames: ['1'],
      // autoplay: false,
      showJxPosition: false,
      showWtCorp: false,
      disabledByJxzw: false,
      jxjdData: {},
      jyjxList: [],
      wtSelectData: [
        { label: '统一社会信用码', value: '1' },
        { label: '单位名称', value: '2' }
      ],
      wtdwData: [],
      wtdwList: [],
      carouselPageCount: 0,
      carouselPageCount2: 0,
      // zwbh: '', //见习职位编号
      // jxzwname: '', //见习职位名称
      streetRequired: true,
      rules: {
        corpId: '',
        positionName: [
          {
            required: true,
            message: '请输入职位名称',
            trigger: ['blur', 'change']
          }
        ],
        entrustTyshxym: [
          {
            required: true,
            message: '请输入统一社会信用码',
            trigger: ['blur', 'change']
          },
          {
            len: 18,
            message: '请输入18位',
            trigger: ['blur', 'change']
          }
        ],
        //tranBaseSymbol: '',
        //agencyRecruit: '',
        entrustCorpName: [
          {
            required: true,
            message: '请输入委托单位名称',
            trigger: ['blur', 'change']
          },
          { max: 40, message: '不得超过40字符', trigger: 'blur' }
        ],
        positionFType: [
          {
            required: true,
            message: '请选择职位分类一级',
            trigger: ['blur', 'change']
          }
        ],
        positionType: [
          {
            required: true,
            message: '请选择职位分类二级',
            trigger: ['blur', 'change']
          }
        ],
        workNature: [
          {
            required: true,
            message: '请选择工作性质',
            trigger: ['blur', 'change']
          }
        ],
        workArea: [
          {
            required: true,
            message: '请选择工作区域',
            trigger: ['blur', 'change']
          }
        ],
        workAddress: [
          {
            required: true,
            message: '请输入工作详细地址',
            trigger: ['blur', 'change']
          }
        ],
        workStreetList: [
          {
            required: true,
            message: '请选择工作街镇',
            trigger: ['blur']
          }
        ],
        workYearNeed: [
          {
            required: true,
            message: '请选择工作年限要求',
            trigger: ['blur', 'change']
          }
        ],
        eduRequire: [
          {
            required: true,
            message: '请选择学历要求',
            trigger: ['blur', 'change']
          }
        ],
        // salaryPayType: [
        //   {
        //     required: true,
        //     message: '请选择工资支付方式',
        //     trigger: 'blur'
        //   }
        // ],
        //specialList: '',
        describe: [
          {
            required: true,
            message: '请输职位描述',
            trigger: ['blur', 'change']
          },
          { max: 1500, message: '不得超过1500字符', trigger: 'blur' }
        ],
        ageMin: [
          {
            required: true,
            message: '请输入年龄下限',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
          {
            pattern: agePattern,
            message: '年龄介于16-150周岁',
            trigger: 'blur'
          }
        ],
        ageMax: [
          {
            required: true,
            message: '请输入年龄下限',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
          {
            pattern: agePattern,
            message: '年龄介于16-150周岁',
            trigger: 'blur'
          }
        ],
        salaryMin: [
          {
            required: true,
            message: '薪酬下限不能为空',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字' },
          {
            pattern: salaryPattern,
            message: '月薪介于1000和99999',
            trigger: 'blur'
          }
        ],
        salaryMax: [
          {
            required: true,
            message: '薪酬上限不能为空',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字' },
          {
            pattern: salaryPattern,
            message: '月薪介于1000和99999',
            trigger: 'blur'
          }
        ],
        recruitNum: [
          {
            required: true,
            message: '请输入招聘人数',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
          {
            pattern: /^\d{1,3}$/,
            message: '最高不超过999人',
            trigger: 'blur'
          }
        ],
        recruitType: [
          {
            required: true,
            message: '请选择招聘类型',
            trigger: ['blur', 'change']
          }
        ]
      },
      query: {},
      jobForm: {
        editId: '',
        positionName: '',
        recruitType: '',
        tranBaseSymbol: '',
        agencyRecruit: '0',
        entrustTyshxym: '',
        entrustCorpName: '',
        corpId: '',
        positionFType: '',
        positionType: '',
        workNature: '',
        ageMax: '',
        ageMin: '',
        workArea: '',
        workAddress: '',
        workStreetList: [],
        workHour: '',
        workYearNeed: '',
        eduRequire: '',
        salaryMax: '',
        salaryMin: '',
        salaryPayType: '',
        recruitNum: '',
        specialList: [],
        describe: '',
        opWay: '',
        endDate: '',
        tranPositionCode: '', //见习职位编号
        tranCorpId: '', //内网就业见习单位标识
        tranCorpName: '' //内网就业见习单位名称
      },
      isDefaultPosition: false,
      isDefaultStreet: false,
      showWorkStreetList: [],
      // dicGzqyData: this.$store.getters['dictionary/ggjbxx_qx@3'],
      //dicGzjzData: this.$store.getters['dictionary/ggjbxx_street'],
      dicBsData: this.$store.getters['dictionary/recruit_work_hour'],
      dicTdrqData: this.$store.getters['dictionary/recruit_special_people'],
      dicZyflData: this.$store.getters['dictionary/recruit_position_f_type'],
      dicData: this.$store.getters['dictionary/yesno'],
      dicXlData: this.$store.getters['dictionary/recruit_edu'],
      dicZffsData: this.$store.getters['dictionary/recruit_salary_pay_type'],
      dicGznxData: this.$store.getters['dictionary/recruit_work_year'],
      isHumanResourceReg: this.$store.getters['corporation/human_resource_reg'],
      isTranBaseSymbol: this.$store.getters['corporation/tran_base_symbol'],
      dicStreet: [],
      dicZyflDataTwo: [],
      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      wtQueryType: '1'
    };
  },
  created() {
    //根据url上的参数查询职位信息
    console.log(this.$route.query);
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      this.query = this.$route.query;
      this.findPositionDetail();
      this.formDisabled = this.$route.query.disabled === 'true';
    } else {
      this.query = {};
      this.formDisabled = false;
    }
  },
  updated() {
    this._.throttle(niceScrollUpdate, 500)();
  },
  computed: {
    //重置区县字典表下拉框
    dicGzqyData() {
      let _dic = [...this.$store.getters['dictionary/ggjbxx_qx@3']];
      if (_dic && _dic.length && _dic[0].value !== '0A') {
        _dic.unshift({
          value: '0A',
          label: '全市'
        });
      }
      return _dic;
    }
    // dicZyflDataTwo() {
    //   let _data = this.$store.getters['dictionary/recruit_position_s_type'];
    //   if (_data && _data.length) {
    //     return Object.values(
    //       _data.reduce((res, item) => {
    //         let _code = '' + Number(item.value.substring(0, 2));
    //         res[_code] ? res[_code].push(item) : (res[_code] = [item]);
    //         return res;
    //       }, {})
    //     );
    //   }
    //   return [];
    // }
    /**
     * 职位信息或者委托单位信息分页
     */
    // carouselPageCount() {
    //   console.log(123123123123);
    //   let _jxjdData = { ...this.jxjdData };
    //   if (this.jxjdData?.baseComDataList?.length) {
    //     this.jyjxList = [];
    //     let pageCount =
    //       Math.floor(this.jxjdData.baseComDataList.length / 20) +
    //       (this.jxjdData.baseComDataList.length % 20 > 0 ? 1 : 0);
    //     for (let i = 1; i <= pageCount; i++) {
    //       this.jyjxList.push(
    //         this.jxjdData.baseComDataList.slice((i - 1) * 20, i * 20)
    //       );
    //     }
    //     console.log(this.jyjxList);
    //     return pageCount;
    //   } else {
    //     this.jyjxList = [];
    //     return 1;
    //   }
    // }
  },
  watch: {
    /**
     * 根据区县动态变更街道信息
     */
    'jobForm.workArea': function(val) {
      let that = this;
      if (this.$store.getters['dictionary/ggjbxx_street']) {
        let array = this.$store.getters['dictionary/ggjbxx_street'];
        let newArray = []; //查找符合条件值并存入新数组
        let exist = false;
        for (let i in array) {
          if (array[i].filter === that.jobForm.workArea) {
            newArray[newArray.length] = array[i];
          }
        }
        for (let s in newArray) {
          if (newArray[s].value === that.jobForm.workStreetList) {
            exist = true;
          }
        }
        if (!exist) {
          that.jobForm.workStreetList = [];
        }
        that.dicStreet = newArray;
      }
      //如果是首次编辑职位信息时，使用查询出来的默认的街道数据，编辑过程中，如果区县变化，则街道置为空
      that.jobForm.workStreetList = this.isDefaultStreet
        ? this.showWorkStreetList
        : [];
      this.isDefaultStreet = false;

      //如果是‘全市’，街道非必填
      if (val === '0A') {
        this.streetRequired = false;
        this.rules.workStreetList = [];
      } else {
        this.streetRequired = true;
        this.rules.workStreetList = [
          {
            required: true,
            message: '请选择工作街镇',
            trigger: ['blur']
          }
        ];
      }
      this.$refs.jobForm.clearValidate();
    },
    /**
     * 根据一级职位动态变更二级职位信息
     */
    'jobForm.positionFType': function(val, oldVal) {
      let that = this;
      if (this.$store.getters['dictionary/recruit_position_s_type']) {
        let array = this.$store.getters['dictionary/recruit_position_s_type'];
        let newArray = []; //查找符合条件值并存入新数组
        // let exist = false;
        for (let i in array) {
          if (array[i].value.substr(0, 2) === that.jobForm.positionFType) {
            newArray[newArray.length] = array[i];
          }
        }
        that.dicZyflDataTwo = newArray;
      }
      if (this.isDefaultPosition) {
        this.isDefaultPosition = false;
      } else {
        this.jobForm.positionType = '';
      }
      return;
    },
    // dicStreet: function() {
    //   let that = this;
    //   if (this.$store.getters['dictionary/ggjbxx_street']) {
    //     let array = this.$store.getters['dictionary/ggjbxx_street'];
    //     let newArray = []; //查找符合条件值并存入新数组
    //     let exist = false;
    //     for (let i in array) {
    //       if (array[i].filter === that.jobForm.workArea) {
    //         newArray[newArray.length] = array[i];
    //       }
    //     }
    //     for (let s in newArray) {
    //       if (newArray[s].value === that.jobForm.workStreetList) {
    //         exist = true;
    //       }
    //     }
    //     if (!exist) {
    //       that.jobForm.workStreetList = [];
    //     }
    //     return newArray;
    //   }
    //   that.jobForm.workStreetList = [];
    //   return [];
    // }
    'jobForm.tranPositionCode': function(val, oldVal) {
      //节流，防止数据短时间多次变动照成样式渲染过多而浪费性能
      this._.throttle(() => {
        //监听选中的选项-修改样式
        if (val) {
          $('.show-popover-button').css({
            backgroundColor: '#f4f4f4',
            color: '#333'
          });
          let styleIndex = $('#' + val).attr('class');
          $('.show-popover-button[btnIndex="' + styleIndex + '"]').css({
            backgroundColor: '#fff1ec',
            color: '#fc6f3d'
          });
          //选择见习职位后，固定为上海市最低工资标准（取就业系统）的80%。
          if (this.jxjdData.qszdgz && !isNaN(Number(this.jxjdData.qszdgz))) {
            let _salary = Math.ceil(Number(this.jxjdData.qszdgz) * 0.8);
            this.jobForm.salaryMax = this.jobForm.salaryMin = _salary;
            //固定为自主招聘
            this.jobForm.recruitType = '1';
          } else {
            this.$alert('无法根据最低工资获得薪资范围');
          }
        } else {
          //无选中职位时候-外派单位信息清空
          this.jobForm.tranCorpId = '';
          this.jobForm.tranCorpName = '';
          //重置薪资
          this.jobForm.salaryMax = this.jobForm.salaryMin = '';
          this.jobForm.recruitType = '';
        }
        //自动关闭popover(循环关闭所有的popoverRef)
        if (this.$refs?.popoverRef) {
          setTimeout(() => {
            this.$refs.popoverRef.forEach(p => {
              p?.doClose();
            });
          }, 500);
        }
      }, 500)();
    },
    /**
     * 见习职位信息或者基地单位信息分页
     */
    jxjdData: function() {
      //节流，防止数据短时间多次变动照成样式渲染过多而浪费性能
      this._.throttle(() => {
        //监听选中的选项-修改样式
        if (this.jxjdData?.positionDataList?.length) {
          this.jyjxList = [];
          let pageCount =
            Math.floor(this.jxjdData.positionDataList.length / 20) +
            (this.jxjdData.positionDataList.length % 20 > 0 ? 1 : 0);
          for (let i = 1; i <= pageCount; i++) {
            this.jyjxList.push(
              this.jxjdData.positionDataList.slice((i - 1) * 20, i * 20)
            );
          }
          // console.log(this.jyjxList);
          this.carouselPageCount = pageCount;
        } else if (this.jxjdData?.baseComDataList?.length) {
          this.jyjxList = [];
          let pageCount =
            Math.floor(this.jxjdData.baseComDataList.length / 20) +
            (this.jxjdData.baseComDataList.length % 20 > 0 ? 1 : 0);
          for (let i = 1; i <= pageCount; i++) {
            this.jyjxList.push(
              this.jxjdData.baseComDataList.slice((i - 1) * 20, i * 20)
            );
          }
          // console.log(this.jyjxList);
          this.carouselPageCount = pageCount;
        } else {
          //没有职位信息
          this.jyjxList = [];
          this.carouselPageCount = 1;
        }
      }, 500)();
    },
    /**
     * 委托单位信息分页
     */
    wtdwData: function() {
      //节流，防止数据短时间多次变动照成样式渲染过多而浪费性能
      this._.throttle(() => {
        //监听选中的选项-修改样式
        if (this.wtdwData.length) {
          this.wtdwList = [];
          let pageCount =
            Math.floor(this.wtdwData.length / 20) +
            (this.wtdwData.length % 20 > 0 ? 1 : 0);
          for (let i = 1; i <= pageCount; i++) {
            this.wtdwList.push(this.wtdwData.slice((i - 1) * 20, i * 20));
          }
          // console.log(this.wtdwList);
          this.carouselPageCount2 = pageCount;
        } else {
          //没有职位信息
          this.wtdwList = [];
          this.carouselPageCount2 = 1;
        }
      }, 500)();
    }
  },
  methods: {
    elForm() {},
    minSalaryChange() {
      if (this.jobForm.workNature === '03') {
        //见习职位，不做校验
        return;
      }
      if (!this.jobForm.salaryMin) {
        return;
      }
      // if (isNaN(Number(this.jobForm.salaryMin))) {
      //   this.$alert('请输入数字');
      //   this.jobForm.salaryMin = '';
      // } else
      if (
        this.jobForm.salaryMax &&
        this.jobForm.salaryMin > this.jobForm.salaryMax
      ) {
        this.$alert('薪酬下限不得低于薪酬上限');
        this.jobForm.salaryMin = '';
      } else if (
        this.jobForm.salaryMax &&
        this.jobForm.salaryMin * 3 < this.jobForm.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.jobForm.salaryMax = '';
      }
    },
    maxSalaryChange() {
      if (this.jobForm.workNature === '03') {
        //见习职位，不做校验
        return;
      }
      if (!this.jobForm.salaryMax) {
        return;
      }
      // if (isNaN(Number(this.jobForm.salaryMax))) {
      //   this.$alert('请输入数字');
      //   this.jobForm.salaryMax = '';
      // } else
      if (
        this.jobForm.salaryMin &&
        this.jobForm.salaryMin > this.jobForm.salaryMax
      ) {
        this.$alert('薪酬上限不得高于薪酬下限');
        this.jobForm.salaryMin = '';
      } else if (
        this.jobForm.salaryMin &&
        this.jobForm.salaryMin * 3 < this.jobForm.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.jobForm.salaryMax = '';
      }
    },
    dialogClear() {
      //清空弹出框
      this.isPublic = false;
      this.$refs.jobForm.resetFields();
    },
    savePosition(done) {
      this.isPublic = false;
      this.$refs.jobForm.validate(async valid => {
        if (valid) {
          this.jobForm.opWay = 'save';
          this.jobForm.agencyRecruit = this.jobForm.agencyRecruit || '0';
          let saveResult = await savePosition(this.jobForm).catch(() => {
            done();
          });
          if (saveResult && saveResult.status === 200) {
            this.$message({ type: 'success', message: '保存成功' });
          } else if (saveResult) {
            this.$message({ type: 'error', message: '保存失败' });
          }
        }
      });
      done();
    },
    releasePosition(done) {
      this.isPublic = true;
      console.log(
        '%c 🍿 overDateSomeDays(this.jobForm.endDate, 30): ',
        'font-size:20px;background-color: #E41A6A;color:#fff;',
        overDateSomeDays(this.jobForm.endDate, 30)
      );
      if (overDateSomeDays(this.jobForm.endDate, 30)) {
        this.$message.error('发布截止日期不得超过当前日期30天');
      } else {
        this.$refs.jobForm.validate(async valid => {
          if (valid) {
            if (!this.jobForm.endDate) {
              this.$message({ type: 'error', message: '发布日期不能为空' });
            } else if (overDateSomeDays(this.jobForm.endDate, 30)) {
              this.$message.error('发布截止日期不得超过当前日期30天');
            } else if (this.jobForm.workNature === '03') {
              // this.$confirm(
              //   '发布就业见习职位，需管理人员确认, 是否继续?',
              //   '提示',
              //   {
              //     confirmButtonText: '确定',
              //     cancelButtonText: '取消',
              //     type: 'warning'
              //   }
              // )
              //   .then(async () => {
              this.jobForm.opWay = 'release';
              this.jobForm.agencyRecruit = this.jobForm.agencyRecruit || '0';
              let publicResult = await releasePosition(this.jobForm).catch(
                () => {
                  done();
                }
              );
              if (publicResult && publicResult.status === 200) {
                this.$message({ type: 'success', message: '发布成功' });
              } else if (publicResult) {
                this.$message({ type: 'error', message: '发布失败' });
              }
              // })
              // .catch(() => {
              //   this.$message({
              //     type: 'info',
              //     message: '已取消发布'
              //   });
              // });
            } else {
              this.jobForm.opWay = 'release';
              this.jobForm.agencyRecruit = this.jobForm.agencyRecruit || '0';
              let publicResult = await releasePosition(this.jobForm).catch(
                () => {
                  done();
                }
              );
              if (publicResult && publicResult.status === 200) {
                this.$message({ type: 'success', message: '发布成功' });
              } else if (publicResult) {
                this.$message({ type: 'error', message: '发布失败' });
              }
            }
          }
        });
      }
      done();
    },
    /**
     * 根据职位编号，查询呢职位详细信息
     */
    async findPositionDetail() {
      let queryResult = await findPositionDetail(this.query || {});
      if (queryResult && queryResult.status === 200) {
        queryResult.result.data.positionFType = queryResult.result.data
          .positionType
          ? queryResult.result.data.positionType.substr(0, 2)
          : '';
        this.jobForm = { ...queryResult.result.data };
        this.isDefaultPosition = true;
        //临时存储一下街道数据
        this.isDefaultStreet = true;
        this.showWorkStreetList = queryResult.result.data.workStreetList;
      } else if (queryResult) {
        this.$message({ type: 'error', message: '未查询到职位详细信息' });
      }
    },
    /**
     * 查询单位见习职位信息
     */
    async queryJxPosition(val) {
      this.jxLoading = true;
      let queryRes = await queryJyjxJdInfo({
        cid: this.$store.getters['corporation/cid'],
        zymc: $.trim(val) ? $.trim(val) : null
      }).catch(() => {
        this.jxLoading = false;
      });
      if (queryRes && queryRes.status === 200) {
        this.jxjdData = queryRes.result.data || {};
      } else if (queryRes) {
        this.jxjdData = {};
        this.$message({ type: 'error', message: '查询就业见习职位信息失败' });
      }
      this.jxLoading = false;
    },
    /**
     * 单位性质发生变化时，如果是见习单位
     */
    workNatureChange() {
      if (this.jobForm.workNature === '03') {
        this.disabledByJxzw = true;
        this.showJxPosition = true;
        //已经查询过数据，不需要再次查询
        if (!this.jxjdData?.baseComDataList?.length) {
          //查询见习岗位名称
          this.queryJxPosition();
        }
        //工资支付方式
        this.jobForm.salaryPayType = '04';
      } else {
        this.disabledByJxzw = false;
        //需要重新选择
        this.jobForm.tranPositionCode = '';
        this.jobForm.positionName = '';
        this.showJxPosition = false;
        //工资支付方式
        this.jobForm.salaryPayType = '';
      }
    },
    radioGroupChange(name, wpdwCid, wpdwDwmc) {
      // this.jxzwname = name;
      this.jobForm.positionName = name || '';
      // 见习职位-对应的外派单位信息
      this.jobForm.tranCorpId = wpdwCid || '';
      this.jobForm.tranCorpName = wpdwDwmc || '';
    },
    /**
     * 是否中介代招发生变化时，如果是“是”
     */
    agencyRecruitChange() {
      if (this.jobForm.agencyRecruit === '1') {
        this.showWtCorp = true;
      } else {
        //需要重新选择
        this.jobForm.positionName = '';
        this.showWtCorp = false;
      }
    },
    /**
     *选择查询出来的单位
     */
    async wtRadioGroupChange(tyshxym, corpname) {
      // 委托单位信息
      if (this.wtQueryType === '2') {
        //根据选择单位的统一社会信用码再次判断
        this.wtLoading = true;
        let queryRes = await queryEntrustCorp({
          entrustTyshxym: tyshxym,
          entrustCorpName: corpname
        });
        if (
          queryRes &&
          queryRes.status === 200 &&
          queryRes.result.data.length === 0
        ) {
          this.jobForm.entrustTyshxym = tyshxym || '';
          this.jobForm.entrustCorpName = corpName || '';
        } else if (queryRes) {
          this.$alert('此单位为“外地”单位或者“非存续”单位');
          this.jobForm.entrustTyshxym = '';
          this.jobForm.entrustCorpName = '';
        }
        this.wtLoading = false;
      } else {
        await function(tyshxym, corpName) {
          this.jobForm.entrustTyshxym = tyshxym || '';
          this.jobForm.entrustCorpName = corpName || '';
        };
      }
    },
    /**
     * 根据统一社会信用码获取单位名称
     */
    async queryEntrustCorp(args) {
      let type = args[0] || '';
      this.wtQueryType = args[0] || '1';
      let value = args[1] || '';
      if (!value) {
        this.$alert('请输入相关信息进行查询');
        return;
      }
      this.wtLoading = true;
      let queryRes = await queryEntrustCorp({
        entrustTyshxym: type === '1' ? value : '',
        entrustCorpName: type === '2' ? value : ''
      });
      if (queryRes && queryRes.status === 200) {
        this.wtdwData = queryRes.result.data || [];
        this.jobForm.entrustTyshxym = '';
        this.jobForm.entrustCorpName = '';
      } else if (queryRes) {
        this.wtdwData = [];
        this.jobForm.entrustTyshxym = '';
        this.jobForm.entrustCorpName = '';
      }
      this.wtLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.shadow-left {
  background-color: #ffffff;
  //box-shadow: rgba(0, 0, 0, 0.1) -5px 0 5px -5px;
  //padding-right: 50px;
  #addForm > .el-col {
    min-height: 80px;
  }
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
  .inside-infor {
    margin-top: 20px;
  }
  .el-select {
    width: 100%;
  }
  .date-picker {
    width: 100%;
  }
  .row-input-one {
    padding-left: 0 !important;
  }
  .row-input-two {
    padding-right: 0 !important;
  }
  .el-textarea {
    height: 100px;
  }
  .radio-group {
    display: inline-block;
  }
  .radio-group-label {
    font-size: 14px;
    color: #acacac;
  }
  .jx-wrap-header {
    padding: 0 0 0 60px;
    background-color: #f9f9f9;
    &-title {
      line-height: 75px;
      color: #999;
    }
  }
  .jx-wrap-body {
    background-color: #f6f6f6;
    margin-bottom: 20px;
  }
  .el-carousel__item {
    .jx-carousel {
      margin: 0;
      padding: 10px 60px 0;
    }
  }
}
#jobTextarea {
  //min-height: 100px !important;
  height: 100% !important;
}
.form-btns {
  text-align: center;
  padding: 40px 0;
}
::v-deep textarea {
  min-height: 150px !important;
}

::v-deep .el-popover__reference-wrapper {
  button {
    background-color: #f4f4f4;
    border: 0;
  }
}
#positionsRadios,
#corpRadios {
  ::v-deep .el-radio-button__inner {
    background-color: #f6f6f6;
    border: 0;
  }
  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0;
  }
  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #fc7a43;
  }
}
</style>
<style lang="scss">
.position-popover {
  label > span {
    border: 0;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0;
  }
}
</style>
