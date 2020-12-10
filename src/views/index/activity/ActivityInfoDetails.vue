<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <BaseSearch :placeholder="searchPlaceHolder"></BaseSearch>
      <!-- 职位展示位 -->
      <div id="activityBox">
        <ActivityBoxShow v-for="activityInfo in showList" :key="activityInfo.id" :activity-info="activityInfo"></ActivityBoxShow>
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
  name: "ActivityInfoDetails",
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
    test() {
      this.axios.get('http://api.wpbom.com/api/neran.php').then(res=>{
        this.$set(this.obj,'siet',res.data);
        console.log(this.$data);
      }).catch(err=>{
        throw new Error("调用API失败"+err);
      })
    },
    jobHandleClick(){
      console.log(1);
    },
    corpHandleClick(){
      console.log(2);
    },
    showMore(){
      this.$message("this is more");
    }
  },
  created(){
    console.log(this.$route.params);
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
