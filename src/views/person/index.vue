<template>
  <div id="indexBody">
    <div class="title-style">
      个人信息维护
    </div>
    <el-form
      :model="ruleForm"
      :label-position="labelPosition"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm clearfix"
    >
      <el-col :span="12">
        <el-form-item label="证件类型" required>
          <el-input
            v-model="ruleForm.number"
            placeholder="身份证"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="证件号码" required>
          <el-input
            v-model="ruleForm.name"
            placeholder="BHFE0099889988"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名" required>
          <el-input
            v-model="ruleForm.time"
            placeholder="张三"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" required>
          <el-input
            v-model="ruleForm.domicile"
            placeholder="男"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄" required>
          <el-input
            v-model="ruleForm.nature"
            placeholder="30"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号" required>
          <el-input
            v-model="ruleForm.sign"
            placeholder="13312341234"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="居住区域">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="居住街镇" required>
          <el-select
            v-model="ruleForm.region2"
            placeholder="请选择"
            class="w-select"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="居住详细地址">
          <el-input
            v-model="ruleForm.site"
            placeholder="请输入联系地址"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="form-btns">
      <el-button class="orange-btn btn-style">保存</el-button>
      <el-button class="white-btn btn-style">取消</el-button>
    </div>
  </div>
</template>

<script>
import { testData } from '@pub/mockTestData';
export default {
  name: 'personApp',
  data() {
    return {
      list: testData.list,
      obj: {},
      colRowGutter: 40,
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
      rules: {},
      labelPosition: '',
      ruleForm: {
        number: '',
        name: '',
        time: '',
        domicile: '',
        nature: '',
        sign: '',
        region: '',
        region2: '',
        scope: '',
        name2: '',
        name3: '',
        phone: '',
        linkman: '',
        site: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
  /* min-height: 100%; */
  /* margin: 0 auto; */
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  top: 60px;
  left: 5%;
  background-color: $g-white-color;
  padding-right: 80px;
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
  form {
    margin-top: 20px;
    .el-select {
      width: 100%;
    }
  }
  .form-btns {
    margin-top: 30px;
    text-align: center;
    .orange-btn {
      color: #fff;
      background: #ff9954 linear-gradient(to right, #ff9854, #fc703d);
      border-color: #ff9954;
    }
    .btn-style {
      width: 200px;
      border-radius: 6px;
    }
    .white-btn {
      color: #fc6f3d;
      background-color: #fff;
      border-color: #ff9954;
    }
  }
}
</style>
