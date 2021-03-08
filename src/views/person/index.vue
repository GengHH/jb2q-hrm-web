<template>
  <div id="indexBody">
    <div class="title-style">个人信息维护</div>
    <el-form
      :model="personInfo"
      :label-position="labelPosition"
      :rules="rules"
      ref="personInfo"
      label-width="0px"
      class="demo-ruleForm clearfix"
    >
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-select
            v-model="personInfo.zjlxId"
            label="证件类型"
            :optionData="dicZjlx"
            :disabled="true"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required>
          <pl-input
            v-model="personInfo.zjhm"
            label="证件号码"
            placeholder="BHFE0099889988"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-input
            v-model="personInfo.xm"
            label="姓名"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required>
          <pl-select
            v-model="personInfo.sexId"
            label="性别"
            :optionData="dicXb"
            :disabled="true"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-input
            v-model="personInfo.birthDate"
            label="出生日期"
            :disabled="true"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="contactPhone">
          <pl-input v-model="personInfo.contactPhone" label="手机号"></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required>
          <pl-select
            v-model="personInfo.livingArea"
            :optionData="dicQx"
            label="居住区域"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item required>
          <pl-select
            v-model="personInfo.livingStreet"
            label="居住街镇"
            :optionData="dicStreet"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="livingAddress">
          <pl-input
            v-model="personInfo.livingAddress"
            label="居住详细地址"
          ></pl-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="form-btns">
      <!-- <el-button class="orange-btn btn-style" @click="submitForm('personInfo')"
        >保存</el-button
      > -->
      <pl-button
        class="orange-btn btn-style"
        :auto-loading="true"
        @click="submitForm($event, 'personInfo')"
      >
        保存
      </pl-button>
      <el-button class="white-btn btn-style" @click="getPersonInfo()"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import { testData } from '@pub/mockTestData';
import { getQx } from '@/api/common';
import { getPersonBaseInfo, updatePersonBaseInfo } from '@/api/personApi';
import { phonePattern } from '@/utils/regexp';
import plButton from '@/components/common/BaseLoadingButton';
import plInput from '@/components/common/BaseLabelInput';
import plSelect from '@/components/common/BaseLabelSelect';
export default {
  name: 'personApp',
  components: {
    plInput,
    plSelect,
    plButton
  },
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
      rules: {
        contactPhone: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        livingAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        livingAddressTest: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      dicQx: [],
      dicXb: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ],
      dicZjlx: [
        { value: '01', label: '身份证' },
        { value: '02', label: '护照' }
      ],
      // dicStreet: [
      //   { value: '1309', label: '区域一' },
      //   { value: '1310', label: '区域二' }
      // ],
      colRowGutter: 40,
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
      labelPosition: ''
    };
  },
  computed: {
    dicStreet: function() {
      let that = this;
      // if (this.$store.getters['dictionary/orgin']) {
      //   return this.$store.getters['dictionary/orgin'].find(function(i) {
      //     return i.level === that.personInfo.livingArea;
      //   });
      // }
      return [];
    },
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    async getQx() {
      try {
        let result = await getQx();
        console.log('dic', result);
        this.$set(this, 'dicQx', result.dicData);
      } catch (error) {
        console.log(error);
      }
    },
    async getPersonInfo() {
      try {
        // TODO 更换pid this.$store.getters['person/pid']
        let result = await getPersonBaseInfo({
          pid: this.$store.getters['person/pid'] || '201906186258910'
        });
        console.log('result', result);
        if (result.status === 200)
          this.$set(this, 'personInfo', result.result.data);
      } catch (error) {
        console.log(error);
      }
    },
    jobHandleClick() {
      console.log(1);
    },
    corpHandleClick() {
      console.log(2);
    },
    submitForm(done, formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let formData = JSON.parse(JSON.stringify(this.personInfo));
          let reusult = await updatePersonBaseInfo({
            data: formData
          });
          console.log(reusult);
          if (reusult && reusult.status === 200) {
            done();
            this.$message({
              showClose: true,
              message: '保存成功!',
              type: 'success'
            });
          } else {
            done();
            this.$message({
              showClose: true,
              message: 'error submit!',
              type: 'error'
            });
          }
        } else {
          done();
          console.log('error submit!!');
          return false;
        }
      });
    },
    submit(done) {
      setTimeout(() => {
        done();
      }, 1000);
    }
  },
  created() {
    this.getQx();
    this.getPersonInfo();
    // this.axios
    //   .get('/mock-pers-api/person/info/loadPersonInfo')
    //   .then(res => {
    //     console.log(res);
    //     this.$set(this, 'personInfo', res.result.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.$message({
    //       showClose: true,
    //       message: err,
    //       type: 'error'
    //     });
    //   });
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  //max-width: 1360px;
  /* min-height: 100%; */
  /* margin: 0 auto; */
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  top: 60px;
  left: 5%;
  background-color: $g-white-color;
  //padding-right: 80px;
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
  .el-form {
    margin-top: 20px;
    .el-col {
      min-height: 80px;
    }
    .el-select {
      width: 100%;
    }
    .form-item-left {
      .el-form-item {
        padding-right: 15%;
      }
    }
    .form-item-right {
      .el-form-item {
        padding-left: 15%;
      }
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
