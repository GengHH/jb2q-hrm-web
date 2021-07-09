<!--
 * @Author: GengHH
 * @Date: 2020-12-08 16:31:11
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-09 14:27:15
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\index\empsurpluslack\index.vue
-->
<template>
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <div>
      <BaseSearch
        ref="searchBox"
        showSelect
        defaultSelectValue="1"
        :selectData="selectData"
        placeholder="请输入单位名称"
        @clickButton="queryInfo($event)"
      ></BaseSearch>
    </div>
    <div class="container filter-content">
      <el-row class="condition">
        <el-col
          :sm="4"
          :md="3"
          :lg="3"
          :xl="2"
          style="padding:8px 10px; text-align:center;"
        >
          区县选择：</el-col
        >
        <el-col :sm="20" :md="21" :lg="21" :xl="22">
          <el-radio-group v-model="qx" size="medium" @change="queryInfo">
            <el-radio-button label="">不限</el-radio-button>
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in dicQx"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="condition condition-three">
        <el-col :sm="4" :md="3" :lg="3" :xl="2">
          <div class="grid-content bg-purple">职位类型：</div>
        </el-col>
        <el-col :sm="18" :md="19" :lg="19" :xl="20">
          <el-checkbox-group
            v-model="positionTypeList"
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
      <el-row class="condition">
        <el-col
          :sm="4"
          :md="3"
          :lg="3"
          :xl="2"
          style="padding: 8px;text-align:center;"
        >
          审核状态：</el-col
        >
        <el-col :sm="20" :md="21" :lg="21" :xl="22">
          <el-radio-group
            v-model="verifyStatus"
            size="medium"
            @change="queryInfo"
          >
            <!-- <el-radio-button label="">不限</el-radio-button> -->
            <el-radio-button label="1">待审核</el-radio-button>
            <el-radio-button label="2">审核通过</el-radio-button>
            <el-radio-button label="3">驳回</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 用工申请信息列表 -->
      <div class="corp-row">
        <!-- 用工缺失-展示区 -->
        <el-row :gutter="20" v-if="queryType === '1'">
          <template v-for="(item, index) in showList">
            <el-col
              :key="index"
              :sm="24"
              :md="24"
              :lg="12"
              :xl="8"
              :class="['work-card', { workCardCenter: showList.length === 1 }]"
            >
              <!-- <div
                v-if="!item.verifyResult"
                class="workInfo-box-status workInfo-box-status-general"
              >
                审核中
              </div>
              <div
                v-else-if="item.verifyResult === '1'"
                class="workInfo-box-status workInfo-box-status-success"
              >
                通过
              </div>
              <div
                v-else-if="item.verifyResult === '0'"
                class="workInfo-box-status workInfo-box-status-failure"
              >
                未通过
              </div> -->
              <div class="workInfo-box">
                <h2 @click="showCorpInfo(item.cid)">{{ item.corpName }}</h2>
                <p>
                  <span class="gray-font"
                    ><i class="el-icon-school"></i>{{ item.tyshxym }}-{{
                      item.districtCodeText
                    }}</span
                  >
                </p>
                <div class="work-info">
                  <p>
                    <span class="gray-font">联系人：</span
                    >{{ item.contactName ? item.contactName : '无' }}
                    <span class="gray-font" style="margin-left:30px;"
                      >联系电话：</span
                    >{{ item.contactPhone ? item.contactPhone : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">职位类型：</span
                    >{{ item.positionTypeText ? item.positionTypeText : '无' }}
                    <span class="green-font">
                      {{ item.workNatureText }}
                    </span>
                  </p>
                  <p>
                    <span class="gray-font">招聘人数：</span
                    >{{ item.recruitNum ? item.recruitNum : '无' }}
                    <span class="gray-font" style="margin-left:30px;"
                      >薪酬：</span
                    >{{ item.salaryMin ? item.salaryMin : '无' }}-
                    {{ item.salaryMax ? item.salaryMax : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">借用期限：</span
                    >{{ item.borrowPeriod ? item.borrowPeriod : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">其他说明：</span
                    >{{ item.content ? item.content : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">审核时间：</span
                    >{{ item.verifyTime ? item.verifyTime : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">备注：</span
                    >{{ item.memo ? item.memo : '无' }}
                  </p>
                </div>
                <!-- <el-divider style="width:100%;margin:10px 0;"></el-divider>
                <div>
                  <el-row>
                    <el-col :span="18" class="gray-font" title="开店申请时间"
                      ><i class="el-icon-time"></i
                      >{{ item.applyTime ? item.applyTime : '无' }}</el-col
                    >
                    <el-col :span="6" style="text-align:right">
                      <span
                        class="work-edit-btn"
                        v-if="!item.verifyResult"
                        @click="editwork(item)"
                        ><i class="el-icon-edit"></i>编辑</span
                      >
                    </el-col>
                  </el-row>
                </div> -->
              </div>
            </el-col>
          </template>
        </el-row>
        <!-- 用工剩余-展示区 -->
        <el-row :gutter="20" v-if="queryType === '2'">
          <template v-for="(item, index) in showList">
            <el-col
              :key="index"
              :sm="24"
              :md="24"
              :lg="12"
              :xl="8"
              :class="['work-card', { workCardCenter: showList.length === 1 }]"
            >
              <div class="workInfo-box">
                <h2 @click="showCorpInfo(item.cid)">{{ item.corpName }}</h2>
                <p>
                  <span class="gray-font"
                    ><i class="el-icon-school"></i>{{ item.tyshxym }}-{{
                      item.districtCodeText
                    }}</span
                  >
                </p>
                <div class="work-info">
                  <p>
                    <span class="gray-font">联系人：</span
                    >{{ item.contactName ? item.contactName : '无' }}
                    <span class="gray-font" style="margin-left:30px;"
                      >联系电话：</span
                    >{{ item.contactPhone ? item.contactPhone : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">职位类型：</span
                    >{{ item.positionTypeText ? item.positionTypeText : '无' }}
                    <span class="green-font">
                      {{ item.workNatureText }}
                    </span>
                  </p>
                  <p>
                    <span class="gray-font">招聘人数：</span
                    >{{ item.recruitNum ? item.recruitNum : '无' }}
                    <span class="gray-font" style="margin-left:30px;"
                      >薪酬：</span
                    >{{ item.salaryMin ? item.salaryMin : '无' }}-
                    {{ item.salaryMax ? item.salaryMax : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">学历要求：</span
                    >{{ item.eduRequireText ? item.eduRequireText : '无' }}
                    <span class="gray-font" style="margin-left:30px;"
                      >借用期限：</span
                    >{{ item.borrowPeriod ? item.borrowPeriod : '无' }}
                  </p>

                  <p>
                    <span class="gray-font">该条信息有效期：</span
                    >{{ item.validDate ? item.validDate : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">其他说明：</span
                    >{{ item.content ? item.content : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">审核时间：</span
                    >{{ item.verifyTime ? item.verifyTime : '无' }}
                  </p>
                  <p>
                    <span class="gray-font">备注：</span
                    >{{ item.memo ? item.memo : '无' }}
                  </p>
                </div>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
    <!-- 分页组件 -->
    <BasePagination
      ref="page"
      :showPager="countTotal > 0"
      :totalCount="countTotal"
      @changePage="changePage"
    ></BasePagination>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import BasePagination from '@/components/common/BasePagination.vue';
import {
  queryAllEmploymentLack,
  queryAllEmploymentSurplus
} from '@/api/indexApi';
import { getDicText, niceScrollUpdate } from '@/utils';
export default {
  name: 'employmentTrainee',
  components: {
    BaseSearch,
    BasePagination
  },
  data() {
    return {
      loading: false,
      defaultImg: require('@/assets/images/break-img.svg'),
      queryType: '',
      corpName: '',
      qx: '',
      positionTypeList: [''],
      verifyStatus: '1',
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      zyLists: this.$store.getters['dictionary/recruit_position_f_type'],
      selectData: [
        { label: '用工缺失', value: '1' },
        { label: '用工剩余', value: '2' }
      ],
      countTotal: 0,
      showList: []
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
    positionTypeList: function(val, oldVal) {
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
    this.queryInfo();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    /**
     *查询基地对应的职位信息
     */
    queryInfo(dwmc) {
      this.loading = true;
      this.corpName = this.$refs?.searchBox?.input
        ? $.trim(this.$refs.searchBox.input)
        : null;
      //查询类型
      this.queryType = this.$refs?.searchBox?.selectValue
        ? $.trim(this.$refs.searchBox.selectValue)
        : '1';
      if (this.queryType === '1') {
        //用工缺失
        queryAllEmploymentLack({
          corpName: this.corpName || null,
          districtCode: this.qx || null,
          positionType: this.positionTypeList || [],
          verifyStatus: this.isHiring || '1',
          pageParam: {
            pageSize: this.$refs?.page?.pageSize || 10,
            pageIndex: this.$refs?.page?.currentPage - 1 || 0
          }
        }).then(queryRes => {
          if (queryRes && queryRes.status === 200) {
            queryRes.result.pageresult.data.forEach(item => {
              if (item.districtCode) {
                item.districtCodeText = getDicText(
                  this.$store.getters['dictionary/ggjbxx_qx'],
                  item.districtCode
                );
              }
              if (item.workNature) {
                item.workNatureText = getDicText(
                  this.$store.getters['dictionary/recruit_work_nature'],
                  item.workNature
                );
              }
              if (item.positionType) {
                item.positionTypeText = getDicText(
                  this.$store.getters['dictionary/recruit_position_s_type'],
                  item.positionType
                );
              }
              if (item.eduRequire) {
                item.eduRequireText = getDicText(
                  this.$store.getters['dictionary/recruit_edu'],
                  item.eduRequire
                );
              }
            });
            this.countTotal = queryRes.result.pageresult.total || 0;
            this.showList = queryRes.result.pageresult.data || [];
            this.$message.success('查询成功');
          } else if (queryRes) {
            this.$message.error('查询失败');
          }
          this.loading = false;
        });
      } else {
        //用工剩余
        queryAllEmploymentSurplus({
          corpName: this.corpName || null,
          districtCode: this.qx || null,
          jdlx: this.type || null,
          isHiring: this.isHiring || '1',
          pageParam: {
            pageSize: this.$refs?.page?.pageSize || 10,
            pageIndex: this.$refs?.page?.currentPage - 1 || 0
          }
        }).then(queryRes => {
          if (queryRes && queryRes.status === 200) {
            queryRes.result.pageresult.data.forEach(item => {
              if (item.districtCode) {
                item.districtCodeText = getDicText(
                  this.$store.getters['dictionary/ggjbxx_qx'],
                  item.districtCode
                );
              }
              if (item.workNature) {
                item.workNatureText = getDicText(
                  this.$store.getters['dictionary/recruit_work_nature'],
                  item.workNature
                );
              }
              if (item.positionType) {
                item.positionTypeText = getDicText(
                  this.$store.getters['dictionary/recruit_position_s_type'],
                  item.positionType
                );
              }
              if (item.eduRequire) {
                item.eduRequireText = getDicText(
                  this.$store.getters['dictionary/recruit_edu'],
                  item.eduRequire
                );
              }
            });
            this.countTotal = queryRes.result.pageresult.total || 0;
            this.showList = queryRes.result.pageresult.data || [];
            this.$message.success('查询成功');
          } else if (queryRes) {
            this.$message.error('查询失败');
          }
          this.loading = false;
        });
      }
    },
    /**
     *展开较多职位信息
     */
    openShowMore(domId) {
      if ($('#' + domId)) {
        let $target = $('#' + domId);
        if ($target.hasClass('jxcorp-open')) {
          $target.removeClass('jxcorp-open');
          $('#span' + domId).html('展开');
        } else {
          $target.addClass('jxcorp-open');
          $('#span' + domId).html('收起');
        }
        // 更新滚动条
        this._.throttle(niceScrollUpdate, 500)();
      }
    },
    /**
     *后端分页
     */
    changePage() {
      this.queryInfo(this.dwmc ? this.dwmc : '');
    },
    //显示详情
    showCorpInfo(cid) {
      if (!cid) {
        this.$alert('缺少单位标识');
      } else {
        this.$router.push({
          path: 'corpDetails',
          query: {
            cid: cid
          }
        });
      }
    },
    /**
     * 定义加载不到图片时显示默认图片
     */
    defImg(event) {
      let img = event.target;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    /**
     * 选择职位进行查询
     */
    positionGroupChange(val) {
      let newVal = val;
      if (newVal && newVal.length && newVal[newVal.length - 1] === '') {
        this.positionTypeList = [''];
      } else if (newVal && newVal.length && newVal.length > 10) {
        this.$alert('最多只可选择10种职位');
        newVal.pop();
        this.positionTypeList = newVal;
      } else if (newVal && newVal.length > 1 && newVal.includes('')) {
        this.positionTypeList = newVal.filter(item => item !== '');
      } else if (!newVal.length) {
        this.positionTypeList = [''];
      }
    },
    /**
     * 展开更多职位
     */
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
    }
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 100%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  padding: 90px 50px 10px;
  background-color: #fff;
  .corp-row {
    // width: 92%;
    margin: 0 auto;
    padding: 5px 0 50px;
  }
  // .workCardCenter {
  //   transform: translateX(-50%);
  //   left: 50%;
  // }
  .work-card {
    position: relative;
    margin-bottom: 30px;
    h2 {
      cursor: pointer;
      &:hover {
        color: #fc6f3d;
      }
    }
    .workInfo-box-status {
      width: 100px;
      padding: 10px;
      color: #ffffff;
      background-color: #8c9794;
      box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
      position: absolute;
      left: 40px;
      top: -15px;
      text-align: center;
    }
    .workInfo-box-status-general {
      background-color: #8c9794;
    }
    .workInfo-box-status-success {
      background-color: #20c997;
    }
    .workInfo-box-status-failure {
      background-color: #c93420;
    }
    .workInfo-box {
      width: 100%;
      min-height: 240px;
      // border: 1px solid #333;
      padding: 15px 30px;
      border-radius: 5px;
      box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
      h2 {
        margin: 10px 0;
        font-family: 宋体, Arial, Verdana, sans-serif;
      }
      .work-info {
        width: 100%;
        font-size: 14px;
        margin-top: 15px;
        line-height: 24px;
      }
      .work-edit-btn {
        color: #20c997;
      }
      .green-font {
        color: #20c997;
        border: 1px solid #20c997;
        padding: 2px 8px;
        border-radius: 4px;
      }
      .work-edit-btn:hover {
        color: #333;
        cursor: pointer;
      }
    }
  }
  .gray-font {
    color: #999;
  }
  .more-btn {
    margin: 20px auto 0;
    display: block;
  }
  // .condition {
  //   padding-top: 10px;
  //   padding-bottom: 20px;
  // }
  ::v-deep .el-radio-group {
    .el-radio-button--medium .el-radio-button__inner {
      border: 0px;
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
  .no-data-text {
    margin-top: 30px;
    text-align: center;
    color: #999;
  }
  // new
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
    // border-bottom: 1px solid #eeeeee;
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
</style>
