<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <BaseSearch
      ref="searchBox"
      :placeholder="searchPlaceHolder"
      @change="query"
    ></BaseSearch>
    <!-- 区县 -->
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding:8px 10px;">
        区县：</el-col
      >
      <el-col :sm="21" :md="22" :lg="22" :xl="23">
        <el-radio-group v-model="qx" size="medium" @change="query">
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
    <el-row>
      <el-col :sm="3" :md="2" :lg="2" :xl="1" style="padding:8px 10px;">
        排序：</el-col
      >
      <el-col :sm="17" :md="18" :lg="18" :xl="19">
        <el-radio-group v-model="order" size="medium" @change="query">
          <el-radio-button label="1">最新</el-radio-button>
          <el-radio-button label="2">最热</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :sm="4" :md="4" :lg="4" :xl="4" style="text-align:right">
      </el-col>
    </el-row>
    <!-- 职位展示位 -->
    <el-tabs
      id="jobInfoGloriette"
      v-model="jobActiveName"
      @tab-click="jobHandleClick"
      style="margin-top: 20px;"
    >
      <el-tab-pane label="全部" name="0">
        <FairBoxShow
          v-for="(item, index) in showList0"
          :fairInfo="item"
          :key="index"
        ></FairBoxShow>

        <!-- S 分页部分 -->
        <BasePagination
          ref="page0"
          :showPager="totalCount0 > 0"
          :totalCount="totalCount0"
          @changePage="query0"
        ></BasePagination>
      </el-tab-pane>
      <el-tab-pane label="进行中" name="1">
        <FairBoxShow
          v-for="(item, index) in showList1"
          :fairInfo="item"
          :key="index"
        ></FairBoxShow>

        <!-- S 分页部分 -->
        <BasePagination
          ref="page1"
          :showPager="totalCount1 > 0"
          :totalCount="totalCount1"
          @changePage="query1"
        ></BasePagination>
      </el-tab-pane>
      <el-tab-pane label="未开始" name="2">
        <FairBoxShow
          v-for="(item, index) in showList2"
          :fairInfo="item"
          :key="index"
        ></FairBoxShow>

        <!-- S 分页部分 -->
        <BasePagination
          ref="page2"
          :showPager="totalCount2 > 0"
          :totalCount="totalCount2"
          @changePage="query2"
        ></BasePagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/**
 * 招聘会显示界面
 */
import BaseSearch from '@/components/common/BaseSearch.vue';
import FairBoxShow from '@/components/index/FairBoxShow.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import { queryMeetingList } from '@/api/indexApi';
import { niceScrollUpdate } from '@/utils';
export default {
  name: 'indexJobFair',
  components: {
    FairBoxShow,
    BaseSearch,
    BasePagination
  },
  data() {
    return {
      loading: false,
      defaultImg: require('@/assets/images/break-img.svg'),
      searchPlaceHolder: '搜索职位、公司',
      qx: '',
      order: '1',
      jobActiveName: '0',
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      totalCount0: 0,
      totalCount1: 0,
      totalCount2: 0,
      showList0: [],
      showList1: [],
      showList2: []
    };
  },
  computed: {
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    jobHandleClick() {
      console.log(1);
    },
    corpHandleClick() {
      console.log(2);
    },
    showMore() {
      this.$message('this is more');
    },
    query() {
      this.query0();
      this.query1();
      this.query2();
    },
    query0() {
      this.querySpecialActivityList('0');
    },
    query1() {
      this.querySpecialActivityList('1');
    },
    query2() {
      this.querySpecialActivityList('2');
    },
    async querySpecialActivityList(witchOne) {
      let _pageSize = this.$refs['page' + witchOne]?.pageSize || 10,
        _pageIndex = this.$refs['page' + witchOne]?.currentPage - 1 || 0;
      let params = {
        meetName: this.$refs.searchBox.input
          ? $.trim(this.$refs.searchBox.input)
          : null,
        tabType: witchOne || '0',
        releaseDistrict: this.qx || '',
        order: this.order || '',
        pageParam: {
          pageSize: _pageSize,
          pageIndex: _pageIndex
        }
      };
      let queryRes = await queryMeetingList(params);
      if (queryRes && queryRes.status === 200) {
        this['showList' + witchOne] = queryRes.result.pageresult.data || [];
        this['totalCount' + witchOne] = queryRes.result.pageresult.total || 0;
      } else if (queryRes) {
        this['showList' + witchOne] = [];
        this['totalCount' + witchOne] = 0;
        this.$message.error('查询招聘会信息失败');
      }
    }
  },
  mounted() {
    this.query();
  },
  updated() {
    this._.throttle(niceScrollUpdate, 500)();
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 100%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  padding: 90px 5% 0;
  background: #fff;
  .more-btn {
    margin: 20px auto 0;
    display: block;
  }
  ::v-deep .el-radio-button__inner {
    border: 0px;
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
}

.clearfix {
  zoom: 1;
}
// 职位信息列表类型
#jobInfoGloriette {
  ::v-deep .el-col {
    //color: blue;
    //height: 100px;
  }
}
// 单位信息列表类型
#corpInfoGloriette {
  ::v-deep .el-col {
    //color: red;
    //height: 100px;
  }
}
</style>
