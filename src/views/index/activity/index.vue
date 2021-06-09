<!--
 * @Author: GengHH
 * @Date: 2020-12-08 16:30:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-09 14:14:46
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\index\activity\index.vue
-->
<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <BaseSearch
        :placeholder="searchPlaceHolder"
        @clickButton="queryActivityList($event)"
      ></BaseSearch>
      <!-- 职位展示位 -->
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
        style="width:100%;text-align:center;color:#999;margin-top:100px;"
      >
        没有查询数据
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import ActivityBoxShow from '@/components/index/ActivityBoxShow.vue';
import { queryActivityList } from '@/api/indexApi';
export default {
  name: 'app',
  components: {
    BaseSearch,
    BasePagination,
    ActivityBoxShow
  },
  data() {
    return {
      path: require('@/assets/logo.png'),
      obj: {},
      searchPlaceHolder: '请输入特色活动名称',
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
      total: 0,
      showList: []
    };
  },
  mounted() {
    this.queryActivityList();
  },
  methods: {
    async queryActivityList(activityName) {
      let res = await queryActivityList({
        pageSize: this.$refs.page.pageSize || 10,
        pageIndex: this.$refs.page.currentPage - 1 || 0,
        activityName: activityName ? $.trim(activityName) : ''
      });
      if (res.status === 200) {
        this.total = res.result.pageresult.total;
        this.showList = res.result.pageresult.data;
      } else if (res) {
        this.total = 0;
        this.showList = [];
        this.$massage({ type: 'error', message: '查询特色活动失败' });
      }
    },
    activityBoxClick(actId) {
      this.$router
        .push({
          path: '/activityDetails',
          query: { activityId: actId },
          params: { data: this.showList }
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
}
</style>
