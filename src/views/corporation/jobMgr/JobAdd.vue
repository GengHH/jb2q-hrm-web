<template>
  <!--S demo2职位管理右侧内容部分 -->
  <div class="shadow-left">
    <!--S 公共标题部分 -->
    <div class="title-style">
      发布职位
    </div>
    <!--E 公共标题部分 -->

    <!--S 发布职位内容部分 -->
    <el-form :model="ruleForm" :label-position="labelPosition" :rules="rules" ref="ruleForm"
      label-width="200px" class="demo-ruleForm  inside-infor clearfix">
      <el-col :span="12">
        <el-form-item label="职位名称" required>
          <el-input v-model="ruleForm.jiotitle" placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否属于中介代招" required>
          <el-select v-model="ruleForm.daizao" placeholder="请选择" class="w-select">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="委托代招单位" required>
          <el-input v-model="ruleForm.unit" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="职位分类" required>
          <el-select v-model="ruleForm.classify" placeholder="请选择" class="w-select">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="工作性质" required>
          <el-radio-group v-model="radio1" size="medium">
            <el-radio-button label="全职"></el-radio-button>
            <el-radio-button label="兼职"></el-radio-button>
            <el-radio-button label="就业见习"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-col :span="15" class="row-input-one">
          <el-form-item class="input-one" label="年龄下限" required label-width="200px">
          <el-input v-model="ruleForm.age1" placeholder="请输入"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="9" class="row-input-two">
          <el-form-item class="input-two" label="年龄上限" required label-width="80px">
          <el-input v-model="ruleForm.age2" placeholder="请输入"></el-input>
        </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12" class="clearfix">
        <el-form-item label="工作区域" class="input-one" required>
          <el-select v-model="ruleForm.region1" placeholder="请选择" class="w-select">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作街镇" class="input-two" required label-width="200px">
          <el-select v-model="ruleForm.region2" placeholder="请选择" class="w-select">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="工作详细地址" required>
          <el-input v-model="ruleForm.site" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="工作班时" required>
          <el-select v-model="ruleForm.jobtime" placeholder="请选择" class="w-select">
            <el-option label="8小时" value="shanghai"></el-option>
            <el-option label="12小时" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="24">
        <el-form-item label="工作年限要求" required>
          <el-radio-group v-model="radio2" size="medium">
            <el-radio-button label="无需求"></el-radio-button>
            <el-radio-button label="1年以下"></el-radio-button>
            <el-radio-button label="1~2年"></el-radio-button>
            <el-radio-button label="3~5年"></el-radio-button>
            <el-radio-button label="6~9年"></el-radio-button>
            <el-radio-button label="10年以上"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="学历要求" required>
          <el-select v-model="ruleForm.education" placeholder="请选择" class="w-select">
            <el-option label="大专" value="shanghai"></el-option>
            <el-option label="本科" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-col :span="15" class="row-input-one">
          <el-form-item class="input-one" label="薪酬下限" required label-width="200px">
            <el-input v-model="ruleForm.emolument1" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" class="row-input-two">
          <el-form-item class="input-two" label="薪酬上限" required label-width="80px">
            <el-input v-model="ruleForm.emolument2" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-form-item label="招聘人数" required>
          <el-input v-model="ruleForm.people" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="招聘特定人群" required>
          <el-select v-model="ruleForm.crowd" placeholder="请选择" class="w-select">
            <el-option label="大专" value="shanghai"></el-option>
            <el-option label="本科" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="职位描述" required>
          <el-input id="jobTextarea" type="textarea" placeholder="请输入职位描述（1000字符）" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="招聘类型" required>
          <el-radio-group v-model="radio3" size="medium">
            <el-radio-button label="自主招聘"></el-radio-button>
            <el-radio-button label="代理招聘"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>

    </el-form>

    <!--E 发布职位内容部分 -->

    <!-- S demo4按钮部分 -->
    <div id="demo4" class="form-btns">
      <el-button class="white-btn btn-style">清空重置</el-button>
      <el-button class="brown-btn btn-style">保存</el-button>
      <el-button class="orange-btn btn-style">发布</el-button>
    </div>
  </div>  
    <!-- E demo4按钮部分 -->
</template>

<script>
/**
 * 发布职位
 */
export default {
  name:'JobAdd',
  data(){
    return{
      visible: false,
      labelPosition: 'right',
      radio1: '全职',
      radio2: '无需求',
      radio3: '自主招聘',
      rules: {},
      ruleForm: {
        jiotitle: '',
        daizhao: '',
        unit: '',
        classify: '',
        nature: '',
        age1: '',
        age2: '',
        region1: '',
        region2: '',
        site: '',
        jobtime: '',
        yearwork: '',
        education: '',
        emolument1: '',
        emolument2: '',
        people: '',
        crowd: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
      },
    };
  },
  methods:{
    //ruleForm(){},
    //labelPosition(){},
    //rules(){},
    //radio1(){},
    //radio2(){},
    elForm(){}
  }
};
</script>

<style lang='scss' scoped>
.shadow-left{
  background-color: #ffffff;
}
.shadow-left {
  box-shadow: rgba(0,0,0,0.1) -5px 0 5px -5px;
  padding-right: 50px;
  .title-style {
    font-size: 16px;
    color: rgba(0,0,0,0.8);
    line-height: 40px;
    border-bottom: 1px solid #E9EEF3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: "";
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
  .inside-infor {
    margin-top: 20px;
  }
  .el-select{
    width: 100%;
  }
  .row-input-one{
    padding-left: 0 !important;
  }
  .row-input-two{
    padding-right: 0 !important;
  }
  .el-textarea{
    height: 100px;
  }
}
#jobTextarea{
  //min-height: 100px !important;
  height: 100% !important;
}
.form-btns{
  text-align: center;
  padding: 40px 0;
  .btn-style {
    width: 200px;
    border-radius: 6px;
  }
  .white-btn {
    color: #fc6f3d;
    background-color: #fff;
    border-color: #ff9954;
  }
  .brown-btn {
    color: #FFF;
    background: #ab8a76 linear-gradient(to right,#d1b29c,#86614f);
    border-color: transparent;
    border: 0;
  }
  .orange-btn {
    color: #FFF;
    background: #ff9954 linear-gradient(to right,#ff9854,#fc703d);
    border-color: #ff9954;
  }
}
</style>