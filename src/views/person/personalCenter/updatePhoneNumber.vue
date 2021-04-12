<!--
 * @Author: your name
 * @Date: 2020-12-30 11:49:57
 * @LastEditTime: 2021-04-12 20:17:29
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\person\personalCenter\updatePhoneNumber.vue
-->
<template>
  <el-form ref="dataForm" :model="formData" :rules="rules">
    <el-form-item required prop="newphoneNum">
      <pl-input v-model="formData.newphoneNum" label="新手机号码"></pl-input>
    </el-form-item>
    <el-form-item required prop="verificationCode">
      <el-row>
        <el-col :span="16">
          <pl-input
            v-model.number="formData.verificationCode"
            label="手机短信验证码"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <pl-button id="codeBtn" type="primary" @click="getCode($event)" plain
            >获取验证码</pl-button
          >
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item id="submitBtnBox">
      <pl-button id="submitBtn" type="primary" @click="updatePhoneNum($event)"
        >确认修改</pl-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
//import plInput from '@/components/common/BaseLabelInput';
import { phonePattern } from '@/utils/regexp';
import { sendSms, updatePhoneNum } from '@/api/personApi';
export default {
  name: 'updatePhoneNumber',
  components: {
    //plInput
  },
  data() {
    return {
      formData: {
        newphoneNum: '',
        verificationCode: ''
      },
      rules: {
        newphoneNum: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        verificationCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { type: 'number', message: '请输数字', trigger: 'blur' }
          //{ min: 6, max: 6, message: '请输六位验证码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async getCode(done) {
      let that = this;
      if (!this.formData.newphoneNum) {
        this.$alert('手机号不能为空');
      } else if (!phonePattern.test(this.formData.newphoneNum)) {
        this.$alert('手机号格式不正确');
      } else {
        let smsResult = await sendSms({
          contactPhone: that.formData.newphoneNum
        }).catch(() => {
          done();
          that.$message({ type: 'error', message: '系统异常，获取验证码失败' });
        });
        if (smsResult.status === 200) {
          that.$message({ type: 'success', message: '获取验证码成功' });
        } else {
          that.$message({ type: 'error', message: '获取验证码失败' });
        }
      }
      done();
    },
    updatePhoneNum(done) {
      let that = this;
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          let result = await updatePhoneNum({
            pid: that.$store.getters['person/pid'],
            contactPhone: that.formData.newphoneNum,
            verifyCode: that.formData.verificationCode
          }).catch(() => {
            done();
            that.$message({ type: 'error', message: '系统异常，修改失败' });
          });
          if (result.message) {
            that.$message({ type: 'error', message: result.message });
          } else if (result.status === 200) {
            that.$message({ type: 'success', message: '修改成功' });
          } else {
            that.$message({ type: 'error', message: '修改失败' });
          }
        }
      });
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 40%;
  min-width: 400px;
  max-width: 550px;
  margin: 0 auto;
  margin-top: 10%;
  .el-form-item {
    margin-bottom: 40px;
  }
  #codeBtn {
    float: right;
  }
  #submitBtnBox {
    text-align: center;
    #submitBtn {
      width: 100%;
      //margin-top: 50px;
      .el-form-item__content {
        margin: 0;
      }
    }
  }
}
</style>
