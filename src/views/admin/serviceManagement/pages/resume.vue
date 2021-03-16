<!--
 * @Author: your name
 * @Date: 2021-03-09 14:14:04
 * @LastEditTime: 2021-03-09 15:56:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\resume.vue
-->
<template>
  <div id="indexBody">
    <div class="title-style">
      基本信息
    </div>
    <div class="box">
      <div>
        <span style="font-size:22px">李子柒</span>
        <span style="padding:0 35px">26岁</span>
        <span><i class="el-icon-female"></i></span
        ><!--  el-icon-male -->
        <span style="margin-left:40px;color:#4766a4">就业服务难度系数</span>
        <span style="color:#fc7a43;font-size:20px">4.8</span>
      </div>
      <div style="margin-top:15px">
        <span>2018年毕业</span>
        <el-divider direction="vertical"></el-divider>
        <span>本科学历</span>
        <el-divider direction="vertical"></el-divider>
        <span>18910578898</span>
        <el-divider direction="vertical"></el-divider>
        <span>上海</span>
      </div>
    </div>
    <div class="title-style">
      求职意向
    </div>
    <div class="box">
      <div>
        <span>UI设计师</span>
        <el-divider direction="vertical"></el-divider>
        <span>8k-15k</span>
        <el-divider direction="vertical"></el-divider>
        <span>互联网-计算机软件-计算机多媒体服务</span>
        <el-divider direction="vertical"></el-divider>
        <span>上海</span>
      </div>
    </div>
    <div class="title-style">
      工作经历
    </div>
    <div class="box">
      <div>
        <span class="h2SizeColor">万达信息股份有限公司</span>
        <span class="sizeColor marginLeft">2018年9月-2020年6月</span>
      </div>
      <div class="marginTop">
        <span>社保事业部</span>
        <span class="marginLeft">IOS开发工程师</span>
      </div>
      <div class="marginTop">
        <span style="color:#fd9273">工作内容</span>
      </div>
      <div class="marginTop">
        <div class="marginTop">1.IOS客户端App的设计与研发工作</div>
        <div class="marginTop">
          2.负责客户端核心框架功能的设计开发与重构优化
        </div>
        <div class="marginTop">3.负责客户端的体验优化与难点痛点解决</div>
        <div class="marginTop">4.学习和研究新技术，以满足产品升级迭代的</div>
      </div>
    </div>
    <div class="title-style">
      教育经历
    </div>
    <div class="box">
      <div>
        <div>
          <span class="h2SizeColor">重庆大学城市科技学院</span>
          <span class="sizeColor marginLeft">2018年9月-2020年6月</span>
        </div>
        <div class="marginTop">
          <span>互联网多媒体</span>
          <span class="marginLeft">研究生</span>
        </div>
      </div>
      <div style="padding:25px 0">
        <div class="marginTop">
          <span class="h2SizeColor">重庆大学城市科技学院</span>
          <span class="sizeColor marginLeft">2018年9月-2020年6月</span>
        </div>
        <div class="marginTop">
          <span>计算机科学与技术</span>
          <span class="marginLeft">本科</span>
        </div>
      </div>
    </div>
    <div class="title-style">
      外语能力
    </div>
    <div class="box">
      <el-tag closable type="warning">
        大学英语四级
      </el-tag>
    </div>
    <div class="title-style">
      技能证书
    </div>
    <div class="box">
      <el-tag closable type="warning">
        信息系统项目管理师证书
      </el-tag>
    </div>
    <div class="title-style">
      自我评价
    </div>
    <div class="box">
      <div>
        我们致力于通过产品服务、数据技术、生态规则和资源为用户和客户赋能，建设“车媒体、车电商、车金融、车生活”4个圈、从“基于内容的垂直领域公司”转型升级为“基于数据技术的‘汽车’公司”。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resume',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
#indexBody {
  .box {
    padding: 15px 20px;
  }
  .marginTop {
    margin-top: 10px;
  }
  .marginLeft {
    margin-left: 60px;
  }
  .h2SizeColor {
    font-size: 18px;
    color: #151515;
  }
  .sizeColor {
    color: #a3a3a3;
  }
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    position: absolute;
    left: 12px;
    top: 13px;
    background: $g-mian-color;
  }
}
</style>
