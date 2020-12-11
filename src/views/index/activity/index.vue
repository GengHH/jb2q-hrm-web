<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <BaseSearch :placeholder="searchPlaceHolder"></BaseSearch>
      <!-- 职位展示位 -->
      <div id="activityBox">
        <ActivityBoxShow v-for="activityInfo in showList" :key="activityInfo.id" :activity-info="activityInfo"
                  @click.native="activityBoxClick(activityInfo)"></ActivityBoxShow>
      </div>
      <!-- 分页组件 -->
      <BasePagination></BasePagination>
    </div>
  </div> 
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import ActivityBoxShow from '@/components/index/ActivityBoxShow.vue';
import { testData } from '@pub/mockTestData';
export default {
  name: "app",
  components:{
    BaseSearch,
    BasePagination,
    ActivityBoxShow
  },
  data(){
    return {
      path: require("@/assets/logo.png"),
      list: testData.list,
      obj: {},
      searchPlaceHolder:'请输入特色活动名称',
      jobActiveName :'jobRecommended',
      corpActiveName: 'corpRecommended',
      showList:[
        {id:'6',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'5',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'4',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'3',jobName:'HTML5移动开发工程师',districtName:'活动列表',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'2',jobName:'HTML5移动开发工程师',districtName:'活动管理',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
        {id:'1',jobName:'HTML5移动开发工程师',districtName:'活动管理',timeInterval:'3-5年',educationName:'本科',minSalary:'10000',maxSalary:'15000',paymentUnit:'元/月'},
      ]
    }
  },
  computed: {
    jobFaieList: function(){
      return this.showList ? this.showList.slice(0,3) : [];
    }
  },
  methods: {
    activityBoxClick(e){
      this.$router.push({
        path:'/activityDetails',
        query:{activityId:e.id},
        params:{data:this.showList}
      });
    },
    showMore(){
      this.$message("this is more");
    }
  },
  created(){
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

<style lang='scss' scoped>
#indexBody{
  width:90%;
  min-height: 100%;
  //max-height:1000px;
  margin:0 auto 150px;
  #activityBox{
    background-color: #fff;
    margin-top: 32px;
    margin-bottom: 50px;
    padding: 40px;
  }
}

</style>
