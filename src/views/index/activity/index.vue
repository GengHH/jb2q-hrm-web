<!--
 * @Author: GengHH
 * @Date: 2020-12-08 16:30:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-23 10:32:45
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\index\activity\index.vue
-->
<template>
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <BaseSearch
      :placeholder="searchPlaceHolder"
      showSelect
      :selectData="selectData"
      @clickButton="queryActivityList(arguments)"
    ></BaseSearch>
    <el-row class="condition">
      <el-col
        :sm="4"
        :md="3"
        :lg="3"
        :xl="2"
        style="padding: 10px; text-align:center;"
      >
        区县：</el-col
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
        排序：</el-col
      >
      <el-col :sm="20" :md="21" :lg="21" :xl="22">
        <el-radio-group v-model="order" size="medium">
          <!-- <el-radio-button label="">不限</el-radio-button> -->
          <el-radio-button label="1">最新</el-radio-button>
          <el-radio-button label="2">最热</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 活动展示位 -->
    <div id="activityBox">
      <ActivityBoxShow
        v-for="activityInfo in showList"
        :key="activityInfo.actId"
        :activityInfo="activityInfo"
        @clickDetials="activityBoxClick($event)"
      ></ActivityBoxShow>
    </div>
    <!-- 分页组件 -->
    <BasePagination
      ref="page"
      :showPager="total > 0"
      :totalCount="total"
      @changePage="queryActivityList"
    ></BasePagination>
    <div
      v-if="total == 0"
      style="width:100%;text-align:center;color:#999;margin-top:15%;"
    >
      没有查询数据
    </div>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import ActivityBoxShow from '@/components/index/ActivityBoxShow.vue';
import { queryActivityList } from '@/api/indexApi';
import { niceScrollUpdate } from '@/utils';
export default {
  name: 'app',
  components: {
    BaseSearch,
    BasePagination,
    ActivityBoxShow
  },
  data() {
    return {
      loading: false,
      path: require('@/assets/logo.png'),
      obj: {},
      searchPlaceHolder: '请输入特色活动名称',
      // jobActiveName: 'jobRecommended',
      // corpActiveName: 'corpRecommended',
      total: 0,
      showList: [],
      qx: '',
      order: '1',
      selectData: this.$store.getters[
        'dictionary/recruit_special_activity_type'
      ],
      dicQx: this.$store.getters['dictionary/ggjbxx_qx']
    };
  },
  mounted() {
    this.queryActivityList();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    async queryActivityList(args) {
      let actType = args ? args[0] : '';
      let activityName = args ? args[1] : '';
      this.loading = true;
      let res = await queryActivityList({
        pageParam: {
          pageSize: this.$refs.page.pageSize || 10,
          pageIndex: this.$refs.page.currentPage - 1 || 0
        },
        actName: activityName ? $.trim(activityName) : '',
        actType: actType,
        districtCode: this.qx,
        order: this.order
      });

      if (res.status === 200) {
        this.total = res.result.pageresult.total;
        this.showList = res.result.pageresult.data;
      } else if (res) {
        this.total = 0;
        this.showList = [];
        this.$message({ type: 'error', message: '查询特色活动失败' });
      }
      this.loading = false;
    },
    activityBoxClick(actId) {
      this.$router
        .push({
          path: '/activityDetails',
          query: { activityId: actId }
          // params: { data: this.showList }
        })
        .catch(err => err);
    },
    changePage() {
      this.$message('this is more');
    }
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 100%;
  min-height: 100%;
  padding: 90px 50px 10px;
  background-color: #fff;
  #activityBox {
    margin-top: 32px;
    margin-bottom: 50px;
    //padding: 40px;
  }
  ::v-deep .el-radio-group {
    .el-radio-button--medium .el-radio-button__inner {
      border: 0px;
    }
  }
}
</style>
