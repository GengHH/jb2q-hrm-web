<template>
  <div>
    <!-- <router-view></router-view> -->
    <div id="indexBody">
      <!-- 职位展示位 -->
      <!-- <div id="activityBox">
        <ActivityBoxShow></ActivityBoxShow>
      </div> -->
  
			<!--S 专栏部分 -->
			<div class="middle-box white-bg padding10 mat-15">
				<el-row>
					<el-col :span="12">
						<img width="100%" src="../../../assets/img/img02.png" alt="">
					</el-col>
					<el-col class="ul-style" :span="12">
						<p class="font-size24 line30">2020上海某银行校园招聘公告解读备考指导特别讲座</p>
						<p class="six-hui  line30 or-font mat-15"><i class="icon iconfont six-hui">&#xe651;</i> 2020-11-26 9:00  至 2020-11-28 18:00</p>
						<p class="six-hui  line30"><i class="icon iconfont">&#xe652;</i> 人数限制 ：200 人</p>
						<p class="six-hui  line30"><i class="icon iconfont">&#xe652;</i> 参与专家：刘专家  李专家     张专家</p>
						<p class="six-hui  line30"><i class="icon iconfont">&#xe650;</i> 活动地点：长宁区就业促进中心(长宁区武夷路517号)</p>
						<p class="six-hui  line30"><i class="icon iconfont six-hui">&#xe651;</i> 2020-11-26 9:00  至 2020-11-28 18:00</p>
						<p class="six-hui  line30 mat-15">
							<el-button class="release-btn font-size18" type="primary" ><i class="icon iconfont font-size20">&#xe653;</i> 去报名</el-button>
						还剩名额：<i class="or-font">28</i> 个</p>
					</el-col>
				</el-row>
			</div>
			<!-- E 专栏部分 -->
			
			<div class="middle-box">
				<div class="bout-us-box2">
					<!--S 特色专栏部分 -->
					<div class="tit-box"><span>活动介绍</span></div>
					<p class="t-indent content-font mat-15">开学啦！ 开学啦！刚步入大学校园的你，还在为未来而迷茫吗？身处毕业前最后一年的你，还在为工作而担忧吗？脑中拥有无限创意才华的你，还在为无处施展而苦恼吗？年轻er总比别人跑得快！所以等待着你们的也比别人多！相信我，这一次，等待着你的一定是极品装备~</p>
					<p class="t-indent content-font">应某某人力资源和社会保障局、某某人才服务中心邀请，我司将配合9月18日在某某人才服务中心举办地的毕业生专场招聘会现场安排《专题讲座如何在本次招聘会中被成功录用——心理专家谈面试官招聘心理及应对策略》，讲座邀请资深心理专家为你解读面试主管的心理需求，并现场互动，调适求职心理。</p>
					<p class="font-size16 or-font mat-15">讲座时间：</p>
					<p class="t-indent content-font"> 9月18日（周五）10:00—11:30（招聘会时间：9：00—12：00） </p>
					<p class="font-size16 or-font mat-15">讲座地点：</p>
					<p class="t-indent content-font"> 某某人才服务中心 </p>
					<p class="font-size16 or-font mat-15">讲座对象：</p>
					<p class="t-indent content-font">2009年100多万毕业未就业学生及其他就业困难人员  </p>
					<p class="font-size16 or-font mat-15">特约讲师：</p>
					<p class="t-indent content-font"> 赵冬杉，男，毕业于中国科学院心理研究所，中国心理培训心理咨询专家，国际传统与现代催眠专业委员会副秘书长，亿铭职业发展俱乐部特约专家。曾被中央电视台、北京电视台、北京电台、北京青年报、中国青少年学习报等多家媒体采访报道。 </p>
					<p class="font-size16 or-font mat-15">主办：</p>
					<p class="t-indent content-font">某某人力资源和社会保障局 </p>
					<p class="t-indent content-font">某某人才服务中心  </p>
					<p class="font-size16 or-font mat-15">主要内容：</p>
					<p class="t-indent content-font"> 开学啦！ 开学啦！刚步入大学校园的你，还在为未来而迷茫吗？身处毕业前最后一年的你，还在为工作而担忧吗？脑中拥有无限创意才华的你，还在为无处施展而苦恼吗？年轻er总比别人跑得快！所以等待着你们的也比别人多！相信我，这一次，等待着你的一定是极品装备~</p>
					<p class="t-indent content-font"> 应某某人力资源和社会保障局、某某人才服务中心邀请，我司将配合9月18日在某某人才服务中心举办地的毕业生专场招聘会现场安排《专题讲座如何在本次招聘会中被成功录用——心理专家谈面试官招聘心理及应对策略》，讲座邀请资深心理专家为你解读面试主管的心理需求，并现场互动，调适求职心理。       开学啦！ 开学啦！刚步入大学校园的你，还在为未来而迷茫吗？身处毕业前最后一年的你，还在为工作而担忧吗？脑中拥有无限创意才华的你，还在为无处施展而苦恼吗？年轻er总比别人跑得快！所以等待着你们的也比别人多！相信我，这一次，等待着你的一定是极品装备~</p>
					<p class="t-indent content-font"> 应某某人力资源和社会保障局、某某人才服务中心邀请，我司将配合9月18日在某某人才服务中心举办地的毕业生专场招聘会现场安排《专题讲座如何在本次招聘会中被成功录用——心理专家谈面试官招聘心理及应对策略》，讲座邀请资深心理专家为你解读面试主管的心理需求，并现场互动，调适求职心理。</p>
					<!--E 特色专栏部分 -->
				</div>
			</div>
    </div>
  </div> 
</template>

<script>
//import ActivityBoxShow from '@/components/index/ActivityBoxShow.vue';
export default {
  name: 'ActivityInfoDetails',
  components:{
    //ActivityBoxShow
  },
  data(){
    return {
      obj: {},
    };
  },
  methods: {
    jobHandleClick(){
      console.log(1);
    },
    corpHandleClick(){
      console.log(2);
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
  .middle-box {
    .el-row{
      height:300px;
      .el-col{
        text-align: left;
        height: 100%;
        img{
          height:100%;
        }
        
      }
    }
  }
  .padding10 {
    padding: 10px;
    box-sizing: border-box;
  }
  .white-bg {
    background: #fff;
  }
  .ul-style {
    padding-left: 20px;
    box-sizing: border-box;
  }
  .line30 {
    line-height: 30px;
  }
  .font-size24 {
    font-size: 24px;
  }
  .or-font {
    color: #fda749 !important;
  }
  .line30 {
    line-height: 30px;
  }
  .mat-15 {
      margin-top: 15px;
  }
  .font-size16 {
    font-size: 16px;
  }
  .font-size18 {
    font-size: 18px;
  }
  .six-hui {
    font-size: 16px;
    color: #868686;
  }
  .release-btn {
    background-color: #fc7a43;
    color: #fff;
    border-color: #fc7a43;
  }
  .content-font {
    font-size: 14px;
    color: #656565;
    line-height: 34px;
  }
  .bout-us-box2 {
    background-color: #fff;
    margin-top: 32px;
    margin-bottom: 50px;
    padding: 25px;
  }
}

</style>
