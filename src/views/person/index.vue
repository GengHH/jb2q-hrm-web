<template>
  <div id="indexBody">
    <div class="title-style">个人信息维护</div>
    <el-form
      :model="personInfo"
      :label-position="labelPosition"
      :rules="rules"
      ref="personInfo"
      label-width="200px"
      class="demo-ruleForm clearfix"
    >
      <el-col :span="12">
        <el-form-item label="证件类型" required>
          <el-input
            v-model="personInfo.zjlxId"
            placeholder="身份证"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="证件号码" required>
          <el-input
            v-model="personInfo.zjhm"
            placeholder="BHFE0099889988"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名" required>
          <el-input
            v-model="personInfo.xm"
            placeholder="张三"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" required>
          <el-input
            v-model="personInfo.sexId"
            placeholder="男"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄" required>
          <el-input
            v-model="personInfo.pid"
            placeholder="30"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号" required>
          <el-input
            v-model="personInfo.contactPhone"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="居住区域">
          <el-select v-model="personInfo.livingArea" placeholder="请选择">
            <el-option label="浦东新区" value="15"></el-option>
            <el-option label="杨浦区" value="13"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="居住街镇" required>
          <el-select
            v-model="personInfo.livingStreet"
            placeholder="请选择"
            class="w-select"
          >
            <el-option label="区域一" value="1309"></el-option>
            <el-option label="区域二" value="1310"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="居住详细地址">
          <el-input
            v-model="personInfo.livingAddress"
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
      personInfo: {
        birthDate: '',
        contactPhone: '',
        livingAddress: '',
        livingArea: '',
        livingStreet: '',
        pid: '',
        sexId: '',
        xm: '',
        zjhm: '',
        zjlxId: ''
      },
      colRowGutter: 40,
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
      rules: {},
      labelPosition: ''
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
    this.axios
      .get('/person/info/loadPersonInfo')
      .then(res => {
        console.log(res);
        this.$set(this, 'personInfo', res.result.data);
      })
      .catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        });
      });
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
