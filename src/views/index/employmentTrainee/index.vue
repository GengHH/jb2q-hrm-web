<!--
 * @Author: GengHH
 * @Date: 2020-12-08 16:31:11
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-15 15:17:20
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\index\employmentTrainee\index.vue
-->
<template>
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <div>
      <BaseSearch
        ref="searchBox"
        placeholder="请输入单位名称关键字"
        @clickButton="queryJyjxJdInfo($event)"
      ></BaseSearch>
    </div>
    <div class="container">
      <el-row class="condition">
        <el-col
          :sm="4"
          :md="3"
          :lg="3"
          :xl="2"
          style="padding: 10px; text-align:center;"
        >
          区县选择：</el-col
        >
        <el-col :sm="20" :md="21" :lg="21" :xl="22">
          <el-radio-group v-model="qx" size="medium">
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
      <el-row class="condition">
        <el-col
          :sm="4"
          :md="3"
          :lg="3"
          :xl="2"
          style="padding: 10px;text-align:center;"
        >
          基地类型：</el-col
        >
        <el-col :sm="20" :md="21" :lg="21" :xl="22">
          <el-radio-group v-model="type" size="medium">
            <el-radio-button label="">不限</el-radio-button>
            <el-radio-button label="1">一般基地</el-radio-button>
            <el-radio-button label="2">综合类基地</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 基地信息列表 -->
      <div class="jxcorp-row">
        <!-- 展示栏 -->
        <el-row :gutter="20">
          <template v-for="(jdItem, index) in showList">
            <!------------------>
            <!-- 一般基地类型 -->
            <!------------------>
            <template v-if="jdItem.jdlx === '1'">
              <el-col :sm="24" :md="12" :lg="8" :xl="6" :key="'jd' + index">
                <div class="jxcorp-box" :id="jdItem.jdbh">
                  <el-row class="jxcorp-header">
                    <el-col :span="4">
                      <!-- <img
                        class="jxcorp-img"
                        src="../../../assets/images/logos.png"
                        alt="未加载"
                      /> -->
                      <img
                        class="jxcorp-img"
                        :src="'data:image/jpg;base64,' + jdItem.logo"
                        @error="defImg"
                        alt="未加载"
                      />
                    </el-col>
                    <el-col :span="20" style="padding-left: 5px;">
                      <!-- <div
                        class="jxcorp-title"
                        :title="'基地名称：' + jdItem.jdmc"
                        @click="showCorpInfo(jdItem.jdlx)"
                      >
                        {{ jdItem.jdmc }}
                      </div> -->

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
                        <span>{{ jdItem.dwlx }}</span> |
                        <span>{{ jdItem.hylb }}</span> |
                        <span>{{ jdItem.slrq }}</span> |
                        <span>其他</span>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 一个职位 -->
                  <div v-if="jdItem.positionDataList.length === 0">
                    <p class="no-data-text">暂无岗位相关信息</p>
                  </div>
                  <div
                    v-else
                    class="jxcorp-list"
                    v-for="(jdZwItem, index2) in jdItem.positionDataList"
                    :key="index2"
                  >
                    <span class="jxcorp-list-name" :title="jdZwItem.gwbm">{{
                      jdZwItem.gwbm
                    }}</span>
                    <span class="gray-font">岗位：{{ jdZwItem.gwzs }}人</span>
                    <span class="gray-font">在岗：{{ jdZwItem.zgrs }}人</span>
                    <span class="gray-font">招聘：{{ jdZwItem.zprs }}人</span>
                  </div>
                  <span
                    class="more-position"
                    v-if="jdItem.positionDataList.length > 3"
                    @click="openShowMore(jdItem.jdbh)"
                    >展开</span
                  >
                </div>
              </el-col>
            </template>

            <!---------------->
            <!-- 综合类基地 -->
            <!---------------->
            <template v-if="jdItem.jdlx === '2'">
              <el-col
                :sm="24"
                :md="12"
                :lg="8"
                :xl="6"
                v-for="(zhjdItem, index2) in jdItem.baseComDataList"
                :key="index2"
              >
                <div class="jxcorp-box" :id="zhjdItem.cid">
                  <el-row class="jxcorp-header">
                    <el-col :span="4">
                      <!-- <img
                        class="jxcorp-img"
                        src="../../../assets/images/logos.png"
                        alt="未加载"
                      /> -->
                      <img
                        class="jxcorp-img"
                        :src="'data:image/jpg;base64,' + zhjdItem.logo"
                        @error="defImg"
                        alt="未加载"
                      />
                    </el-col>
                    <el-col :span="20">
                      <!-- <div class="jxcorp-title" >{{ jdItem.jdmc }}</div> -->
                      <div
                        class="jxcorp-title"
                        :title="'基地名称：' + jdItem.jdmc"
                        @click="showCorpInfo(jdItem.jdlx, zhjdItem.cid)"
                      >
                        <div
                          class="jxcorp-title-mc"
                          v-if="jdItem.isTrial !== '1'"
                        >
                          {{ zhjdItem.dwmc }}
                        </div>

                        <div class="jxcorp-title-mc syx-mc" v-else>
                          {{ zhjdItem.dwmc
                          }}<span class="syx-label">试运行</span>
                        </div>
                      </div>
                      <div class="jxcorp-info gray-font">
                        <span>{{ jdItem.dwlx }}</span> |
                        <span>{{ jdItem.hylb }}</span> |
                        <span>{{ jdItem.slrq }}</span> |
                        <span>其他</span>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 一个职位 -->
                  <div v-if="zhjdItem.positionDataList.length === 0">
                    <p class="no-data-text">暂无岗位相关信息</p>
                  </div>
                  <div
                    v-else
                    class="jxcorp-list"
                    v-for="(zhjdZwItem, index3) in zhjdItem.positionDataList"
                    :key="index3"
                  >
                    <span class="jxcorp-list-name" :title="zhjdZwItem.gwbm">
                      {{ zhjdZwItem.gwbm }}
                    </span>
                    <span class="gray-font">岗位：{{ zhjdZwItem.gwzs }}人</span>
                    <span class="gray-font">在岗：{{ zhjdZwItem.zgrs }}人</span>
                    <span class="gray-font">招聘：{{ zhjdZwItem.zprs }}人</span>
                  </div>
                  <span
                    class="more-position"
                    v-if="zhjdItem.positionDataList.length > 3"
                    @click="openShowMore(zhjdItem.cid)"
                    >展开</span
                  >
                </div>
              </el-col>
            </template>
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
      type: '',
      dwmc: null,
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      countTotal: 0,
      showList: [1, 2]
    };
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
        dwmc: dwmc || null,
        qxid: this.qx || null,
        jdlx: this.type || null,
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
        } else {
          $target.addClass('jxcorp-open');
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
    padding: 20px 0 50px;
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
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-break: break-all;
      overflow: hidden;
    }

    .syx-mc {
      position: relative;
      padding-right: 50px;
    }
    .syx-label {
      position: absolute;
      top: 0;
      right: 0;
      background: #ad87f1;
      color: #fff;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 3px;
      font-weight: 300;
      font-family: 宋体, Arial, Verdana, sans-serif;
    }
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
    .gray-font {
      color: #999;
    }
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
  .no-data-text {
    margin-top: 30px;
    text-align: center;
    color: #999;
  }
}
</style>
