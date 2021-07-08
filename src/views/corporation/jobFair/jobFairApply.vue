<template>
  <!-- <router-view></router-view> -->
  <div id="jobFairApply">
    <div class="title-style">单位招聘会报名</div>
    <el-row id="selectBar" :gutter="20">
      <el-col :span="10">
        <el-radio-group v-model="type" size="medium">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">线上</el-radio-button>
          <el-radio-button label="2">线上及线下</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="5">
        <pl-date-picker
          v-model="date"
          type="date"
          value-format="yyyyMMdd"
          label="日期"
        >
        </pl-date-picker>
      </el-col>
      <el-col :span="5">
        <pl-input label="地点" v-model="address"></pl-input>
      </el-col>
      <el-col :span="4" class="text-right">
        <pl-button
          @click="query($event)"
          class="orange-btn"
          icon="el-icon-search"
          >搜索</pl-button
        >
        <!-- <BaseSearch
          showSelect
          :selectData="selectData"
          placeholder="招聘类型"
          @clickButton="query(arguments)"
        ></BaseSearch> -->
      </el-col>
    </el-row>
    <!-- 招聘会展示位 -->
    <FairBoxShow
      v-for="item in showList"
      :key="item.id"
      :fairInfo="item"
    ></FairBoxShow>
    <!-- S 分页部分 -->
    <BasePagination
      ref="page"
      :showPager="totalCount > 0"
      :totalCount="totalCount"
      @changePage="changePage"
    ></BasePagination>
  </div>
</template>

<script>
/**
 * 单位招聘会报名界面
 */
import FairBoxShow from '@/components/corporation/FairBoxShow';
import BaseSearch from '@/components/common/BaseSearch';
import BasePagination from '@/components/common/BasePagination';
import { queryJobFairList } from '@/api/corporationApi';
import { niceScroll, niceScrollUpdate } from '@/utils';
export default {
  name: 'jobFairApply',
  components: {
    FairBoxShow,
    BasePagination,
    BaseSearch
  },
  data() {
    return {
      date: '',
      address: '',
      type: '',
      totalCount: 0,
      showList: []
    };
  },
  computed: {},
  mounted() {
    this.query($.noop);
    niceScroll();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    query(done) {
      let params = {
        cid: this.$store.getters['corporation/cid'],
        pageIndex: this.$refs.page.currentPage - 1 || 0,
        pageSize: this.$refs.page.pageSize,
        date: this.date,
        address: this.address,
        type: this.type
      };
      queryJobFairList(params).then(queryRes => {
        console.log(queryRes);
        if (queryRes && queryRes.status === 200) {
          this.totalCount = queryRes.result.pageresult.total || 0;
          this.showList = queryRes.result.pageresult.data || [];
          if (
            !this.totalCount ||
            (this.totalCount && Number(this.totalCount) === 0)
          ) {
            this.$message({ type: 'success', message: '未查询到结果' });
          }
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
      done();
    },

    /**
     * 后台分页
     */
    changePage() {
      this.query($.noop);
    }
  }
};
</script>

<style lang="scss" scoped>
#jobFairApply {
  // width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  #selectBar {
    width: 100%;
    margin: 20px 0;
  }
  .more-btn {
    margin: 20px auto 0;
    display: block;
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
}

.clearfix {
  zoom: 1;
}
</style>
