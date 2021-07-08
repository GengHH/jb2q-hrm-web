<!--
 * @Author: GengHH
 * @Date: 2020-12-08 16:31:11
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-08 14:35:08
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\index\empsurpluslack\index.vue
-->
<template>
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <div>
      <BaseSearch
        ref="searchBox"
        showSelect
        :selectData="selectData"
        placeholder="请输入"
        @clickButton="queryJyjxJdInfo($event)"
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
          <el-radio-group v-model="qx" size="medium" @change="queryJyjxJdInfo">
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
            v-model="type"
            size="medium"
            @change="queryJyjxJdInfo"
          >
            <el-radio-button label="">不限</el-radio-button>
            <el-radio-button label="1">待审核</el-radio-button>
            <el-radio-button label="2">审核通过</el-radio-button>
            <el-radio-button label="3">驳回</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 用工申请信息列表 -->
      <div class="jxcorp-row">
        <!-- 展示栏 -->
        <el-row :gutter="20">
          <template v-for="(jdItem, index) in showList">
            <el-col :sm="24" :md="12" :lg="8" :xl="6" :key="'jd' + index">
              <div class="jxcorp-box" :id="jdItem.cid">
                <el-row class="jxcorp-header">
                  <el-col :span="4">
                    <img
                      v-if="jdItem.logo"
                      class="jxcorp-img"
                      :src="'data:image/jpg;base64,' + jdItem.logo"
                      @error="defImg"
                      alt="未加载"
                    />
                    <img
                      v-else
                      class="jxcorp-img"
                      :src="defaultImg"
                      @error="defImg"
                      alt="未加载"
                    />
                  </el-col>
                  <el-col :span="20" style="padding-left: 5px;">
                    <div
                      class="jxcorp-title"
                      :title="'基地名称：' + jdItem.jdmc"
                      @click="showCorpInfo(jdItem.jdlx, jdItem.cid)"
                    >
                      <div
                        class="jxcorp-title-mc"
                        v-if="jdItem.isTrial !== '1'"
                      >
                        {{ jdItem.jdmc }}
                      </div>

                      <div class="jxcorp-title-mc syx-mc" v-else>
                        {{ jdItem.jdmc }}<span class="syx-label">试运行</span>
                      </div>
                    </div>

                    <div class="jxcorp-info gray-font">
                      <span>{{ jdItem.dwlx }}</span
                      ><span class="jxcorp-info-line">|</span>
                      <span>{{ jdItem.hylb }}</span
                      ><span class="jxcorp-info-line">|</span>
                      <span>{{ jdItem.slrq }}</span
                      ><span class="jxcorp-info-line">|</span>
                      <span>其他</span>
                    </div>
                  </el-col>
                </el-row>
                <!-- 没有一个职位 -->
                <div v-if="jdItem.positionDataList.length === 0">
                  <p class="no-data-text">暂不招录</p>
                </div>
                <!-- 一个or多个职位 -->
                <div
                  v-else
                  class="jxcorp-list"
                  v-for="(jdZwItem, index2) in jdItem.positionDataList"
                  :key="index2"
                >
                  <span class="jxcorp-list-name" :title="jdZwItem.gwbm">{{
                    jdZwItem.gwbm
                  }}</span>
                  <span class="gray-font">拟招：{{ jdZwItem.gwzs }}人</span>
                  <span class="gray-font">可招：{{ jdZwItem.zgrs }}人</span>
                  <span class="gray-font">已招：{{ jdZwItem.zprs }}人</span>
                </div>
                <span
                  :id="'span' + jdItem.cid"
                  class="more-position"
                  v-if="jdItem.positionDataList.length > 3"
                  @click="openShowMore(jdItem.cid)"
                  >展开</span
                >
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
import { queryJyjxJdInfo } from '@/api/indexApi';
import { niceScrollUpdate } from '@/utils';
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
      qx: '',
      positionTypeList: [''],
      type: '',
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      zyLists: this.$store.getters['dictionary/recruit_position_f_type'],
      selectData: [
        { label: '统一社会信用码', value: '1' },
        { label: '单位名称', value: '2' }
      ],
      countTotal: 0,
      showList: [1, 2]
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
  mounted() {
    this.queryJyjxJdInfo();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    /**
     *查询基地对应的职位信息
     */
    queryJyjxJdInfo(dwmc) {
      this.loading = true;
      this.dwmc = this.$refs.searchBox.input
        ? $.trim(this.$refs.searchBox.input)
        : null;
      queryJyjxJdInfo({
        cid: null,
        dwmc: this.dwmc || null,
        qxid: this.qx || null,
        jdlx: this.type || null,
        isHiring: this.isHiring || '1',
        pageParam: {
          pageSize: this.$refs.page.pageSize || 10,
          pageIndex: this.$refs.page.currentPage - 1 || 0
        }
      }).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.countTotal = queryRes.result.data.total || 0;
          this.showList = queryRes.result.data.data || [];
          this.$message({ type: 'success', message: '查询成功' });
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
        this.loading = false;
      });
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
      this.queryJyjxJdInfo(this.dwmc ? this.dwmc : '');
    },
    showCorpInfo(jdlx, cid) {
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
  .jxcorp-row {
    // width: 92%;
    margin: 0 auto;
    padding: 5px 0 50px;
  }
  .jxcorp-box {
    position: relative;
    height: 165px;
    min-height: 165px;
    margin: 10px 0;
    padding: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
    .more-position {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #3f51b5;
      cursor: pointer;
      font-size: 12px;
      &:hover {
        color: #333;
      }
    }
  }
  .jxcorp-open {
    height: 100% !important;
  }
  .jxcorp-title {
    font-size: 16px;
    font-weight: 800;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      color: #fc7a43;
    }
    .jxcorp-title-mc {
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-break: break-all;
      overflow: hidden;
    }

    .syx-mc {
      position: relative;
      padding-right: 60px;
    }
    .syx-label {
      position: absolute;
      top: 0;
      right: 0;
      background: #ad87f1;
      color: #fff;
      font-size: 12px;
      padding: 0 8px;
      border-radius: 3px;
      font-weight: 300;
      font-family: 宋体, Arial, Verdana, sans-serif;
    }
  }
  .jxcorp-info-line {
    color: #ccc;
    padding: 0 5px;
  }
  .jxcorp-img {
    width: 100%;
    max-width: 64px;
    margin: 0 auto;
  }
  .jxcorp-header {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dotted #ddd;
  }
  .jxcorp-list {
    margin: 8px 5px;
    &-name {
      width: 35%;
      display: inline-block;
      padding-right: 10px;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-break: break-all;
      overflow: hidden;
    }
    &-name:hover {
      color: #fc7a43;
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
</style>
