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
          <!-- <pl-input
            v-model="personInfo.birthDate"
            label="出生日期"
            :disabled="false"
          ></pl-input> -->
          <pl-date-picker
            v-model="newBirthDate"
            type="date"
            :disabled="true"
            value-format="yyyyMMdd"
            label="出生日期"
          >
          </pl-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-row>
          <el-col :span="20">
            <el-form-item prop="contactPhone">
              <pl-input
                v-model="personInfo.contactPhone"
                :disabled="true"
                label="手机号"
              ></pl-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <el-button @click="dialog = !dialog">修改</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="livingArea">
          <pl-select
            v-model="personInfo.livingArea"
            :optionData="dicQx"
            label="居住区域"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="livingStreet">
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
    <!-- 聊天框 弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog"
      :before-close="handleClose"
    >
      <update-phone :oldPhone="personInfo.contactPhone"></update-phone>
    </el-dialog>
  </div>
</template>

<script>
import { getPersonBaseInfo, updatePersonBaseInfo } from '@/api/personApi';
import updatePhone from '@/views/person/personalCenter/updatePhoneNumber';
// import { phonePattern } from '@/utils/regexp';
export default {
  name: 'personApp',
  components: {
    updatePhone
  },
  data() {
    return {
      dialog: false,
      isFlipped: false,
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
          { required: true, message: '请输手机号', trigger: 'blur' }
          // {
          //   pattern: phonePattern,
          //   message: '请输入正确格式的手机号',
          //   trigger: ['blur', 'change']
          // }
        ],
        livingArea: [
          { required: true, message: '请输入居住区域', trigger: 'blur' }
        ],
        livingStreet: [
          { required: true, message: '请输入居住街镇', trigger: 'blur' }
        ],
        livingAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        livingAddressTest: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
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
      labelPosition: ''
    };
  },
  computed: {
    newBirthDate() {
      // return this.personInfo.birthDate
      //   ? this.personInfo.birthDate
      //   : this.personInfo.zjhm
      //   ? this.personInfo.zjhm.substring(6, 14)
      //   : '';
      return this.personInfo.zjhm ? this.personInfo.zjhm.substring(6, 14) : '';
    },
    dicStreet: function() {
      let that = this;
      if (this.$store.getters['dictionary/ggjbxx_street']) {
        let array = this.$store.getters['dictionary/ggjbxx_street'];
        let newArray = []; //查找符合条件值并存入新数组
        let exist = false;
        for (let i in array) {
          if (array[i].filter === that.personInfo.livingArea) {
            newArray[newArray.length] = array[i];
          }
        }
        for (let s in newArray) {
          if (newArray[s].value === that.personInfo.livingStreet) {
            exist = true;
          }
        }
        if (!exist) {
          that.personInfo.livingStreet = '';
        }
        return newArray;
      }
      that.personInfo.livingStreet = '';
      return [];
    },
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    handleClose() {
      this.dialog = false;
    },
    async getPersonInfo() {
      try {
        if (!this.$store.getters['person/token']) {
          this.$message({
            showClose: true,
            message: '请先登录，谢谢',
            type: 'error'
          });
          // Notification({
          //   title: '系统提示',
          //   message: '请先登录，谢谢',
          //   //duration: 4500,
          //   type: 'error'
          // });
          setTimeout(() => {
            window.location.href = '/ggzp-shrs/index.html';
          }, 2000);
        }
        let result = await getPersonBaseInfo({
          pid: this.$store.getters['person/pid'] || ''
        });
        console.log('result', result);
        if (result.status === 200 && result.result.data.pid)
          this.$set(this, 'personInfo', result.result.data);
        else
          this.$message({
            type: 'error',
            message: '未查询到任何信息'
          });
      } catch (error) {
        console.log(error);
      }
    },
    submitForm(done, formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let formData = JSON.parse(JSON.stringify(this.personInfo));
          formData.birthDate = this.newBirthDate || formData.birthDate;
          let reusult = await updatePersonBaseInfo(formData);
          if (reusult && reusult.status === 200) {
            done();
            this.$message({
              showClose: true,
              message: '保存成功!',
              type: 'success'
            });
            //修改该人员为不是第一次登录
            this.$store.commit('person/SET_FIRST_LOGIN', false);
          } else {
            done();
            this.$message({
              showClose: true,
              message: '保存失败!',
              type: 'error'
            });
          }
        }
        // else {
        //   done();
        //   this.$message({
        //     showClose: true,
        //     message: '系统异常，保存报错!',
        //     type: 'error'
        //   });
        //   return false;
        // }
      });
      done();
    }
    // submit(done) {
    //   setTimeout(() => {
    //     done();
    //   }, 1000);
    // }
  },
  created() {
    //this.getQx();
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
    .el-input,
    .el-select {
      width: 100%;
    }
    .form-item-left {
      & > .el-form-item {
        padding-right: 15%;
      }
    }
    .form-item-right {
      & > .el-form-item,
      & > .el-row {
        padding-left: 15%;
      }
    }
  }
  .form-btns {
    margin-top: 30px;
    text-align: center;
    // .orange-btn {
    //   color: #fff;
    //   background: #ff9954 linear-gradient(to right, #ff9854, #fc703d);
    //   border-color: #ff9954;
    // }
    // .btn-style {
    //   width: 200px;
    //   border-radius: 6px;
    // }
    // .white-btn {
    //   color: #fc6f3d;
    //   background-color: #fff;
    //   border-color: #ff9954;
    // }
  }
}
</style>
