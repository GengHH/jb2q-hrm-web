<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-06 20:18:42
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobAdd.vue
-->
<template>
  <!--S demo2职位管理右侧内容部分 -->
  <div class="shadow-left">
    <!--S 公共标题部分 -->
    <div class="title-style">
      发布职位
    </div>
    <!--E 公共标题部分 -->

    <!--S 发布职位内容部分 -->
    <el-form
      :model="ruleForm"
      :label-position="labelPosition"
      :rules="rules"
      ref="positionForm"
      label-width="20px"
      class="demo-ruleForm  inside-infor clearfix"
    >
      <el-col :span="12">
        <el-form-item required>
          <pl-input v-model="ruleForm.jiotitle" label="职位名称"></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-select
            v-model="ruleForm.daizao"
            label="是否属于中介代招"
            :optionData="dicData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-input v-model="ruleForm.unit" label="委托代招单位"></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-select
            v-model="ruleForm.classify"
            label="职位分类"
            :optionData="dicZyflData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item slabel="工作性质" required>
          <el-radio-group v-model="radio1" size="medium">
            <el-radio-button label="全职"></el-radio-button>
            <el-radio-button label="兼职"></el-radio-button>
            <el-radio-button label="就业见习"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-col :span="12" class="row-input-one">
          <el-form-item class="input-one" required label-width="20px">
            <pl-input v-model="ruleForm.age1" label="年龄下限"></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="row-input-two">
          <el-form-item class="input-two" required label-width="20px">
            <pl-input v-model="ruleForm.age2" label="年龄上限"></pl-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12" class="clearfix">
        <el-form-item class="input-one" required>
          <pl-select
            v-model="ruleForm.region1"
            label="工作区域"
            :optionData="dicGzqyData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
        <el-form-item class="input-two" required label-width="20px">
          <pl-select
            v-model="ruleForm.region2"
            label="工作街镇"
            :optionData="dicGzjzData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-input v-model="ruleForm.site" label="工作详细地址"></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-select
            v-model="ruleForm.jobtime"
            label="工作班时"
            :optionData="dicBsData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="24">
        <el-form-item slabel="工作年限要求" required>
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
        <el-form-item required>
          <pl-select
            v-model="ruleForm.education"
            label="学历要求"
            :optionData="dicData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-col :span="12" class="row-input-one">
          <el-form-item class="input-one" required label-width="20px">
            <pl-input v-model="ruleForm.emolument1" label="薪酬下限"></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="row-input-two">
          <el-form-item class="input-two" required label-width="20px">
            <pl-input v-model="ruleForm.emolument2" label="薪酬上限"></pl-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-input v-model="ruleForm.people" label="招聘人数"></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item required>
          <pl-select
            v-model="ruleForm.crowd"
            label="招聘特定人群"
            class="w-select"
            :optionData="dicTdrqData"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item required>
          <pl-input
            id="jobTextarea"
            type="textarea"
            label="职位描述（1000字符）"
            v-model="ruleForm.desc"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item slabel="招聘类型" required>
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
      <el-button class="white-btn btn-style" @click="dialogClear"
        >清空重置</el-button
      >
      <el-button class="brown-btn btn-style" @click="savePosition"
        >保存</el-button
      >
      <el-button class="orange-btn btn-style" @click="publicPosition"
        >发布</el-button
      >
    </div>
  </div>
  <!-- E demo4按钮部分 -->
</template>

<script>
/**
 * 发布职位
 */
export default {
  name: 'JobAdd',
  data() {
    return {
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
        type: []
      },
      dicGzqyData: this.$store.getters['dictionary/ggjbxx_qx'],
      dicGzjzData: this.$store.getters['dictionary/ggjbxx_street'],
      dicBsData: this.$store.getters['dictionary/recruit_work_hour'],
      dicTdrqData: this.$store.getters['dictionary/recruit_special_people'],
      dicZyflData: this.$store.getters['dictionary/recruit_position_f_type'],
      dicData: this.$store.getters['dictionary/yesno']
    };
  },
  methods: {
    elForm() {},
    dialogClear() {
      //清空弹出框
      this.$refs.positionForm.resetFields();
    },
    savePosition() {
      this.$alert('暂时没有此Api接口，请稍后！');
    },
    publicPosition() {
      this.$alert('暂时没有此Api接口，请稍后！');
    }
  }
};
</script>

<style lang="scss" scoped>
.shadow-left {
  background-color: #ffffff;
}
.shadow-left {
  box-shadow: rgba(0, 0, 0, 0.1) -5px 0 5px -5px;
  padding-right: 50px;
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
  .inside-infor {
    margin-top: 20px;
  }
  .el-select {
    width: 100%;
  }
  .row-input-one {
    padding-left: 0 !important;
  }
  .row-input-two {
    padding-right: 0 !important;
  }
  .el-textarea {
    height: 100px;
  }
}
#jobTextarea {
  //min-height: 100px !important;
  height: 100% !important;
}
.form-btns {
  text-align: center;
  padding: 40px 0;
}
::v-deep textarea {
  min-height: 150px !important;
}
</style>
