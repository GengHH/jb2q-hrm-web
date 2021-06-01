<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <BaseSearch
        :placeholder="searchPlaceHolder"
        @clickButton="queryActivies($event)"
      ></BaseSearch>
      <!-- 职位展示位 -->
      <div id="activityBox">
        <ActivityBoxShow
          v-for="activityInfo in showList"
          :key="activityInfo.id"
          :activity="activityInfo"
          @click.native="activityBoxClick(activityInfo)"
        ></ActivityBoxShow>
      </div>
      <!-- 分页组件 -->
      <BasePagination v-if="total > 0"></BasePagination>
    </div>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import ActivityBoxShow from '@/components/index/ActivityBoxShow.vue';
import { queryActivies } from '@/api/indexApi';
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
      showList: [{ id: 12 }]
    };
  },
  computed: {
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    async queryActivies(actName) {
      let res = await queryActivies({
        pageSize: 10,
        pageIndex: 0,
        actName: actName
      }).catch(() => {
        this.$massage({
          type: 'error',
          message: '系统异常，查询失败'
        });
        this.showList = [];
      });
      if (res.status === 200) {
        this.total = res.result.pageresult.total;
        this.showList = res.result.pageresult.data;
      } else {
        this.total = 0;
        this.showList = [];
        this.$massage({ type: 'error', message: '查询失败' });
      }
    },
    activityBoxClick(e) {
      this.$router
        .push({
          path: '/activityDetails',
          query: { activityId: e.id },
          params: { data: this.showList }
        })
        .catch(err => err);
    },
    showMore() {
      this.$message('this is more');
    }
  },
  created() {
    // console.log("index begin creating");
    // console.log(this);
    // console.log(this.$data);
    // this.axios.get('/admin/index').then(res =>{
    //   this.$set(this.obj,'siet',res.data)
    // }).catch( err=>{
    //   console.log(err)
    // });
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto 30px;
  padding-top: 90px;
  #activityBox {
    background-color: #fff;
    margin-top: 32px;
    margin-bottom: 50px;
    //padding: 40px;
  }
}
</style>
