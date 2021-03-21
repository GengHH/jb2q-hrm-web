<!--
 * @Author: your name
 * @Date: 2020-12-30 11:49:57
 * @LastEditTime: 2021-03-18 11:41:31
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\person\personalCenter\updatePhoneNumber.vue
-->
<template>
  <el-form ref="form" :model="formData" :rules="rules">
    <el-form-item required prop="newphoneNum">
      <pl-input v-model="formData.newphoneNum" label="新手机号码"></pl-input>
    </el-form-item>
    <el-form-item required prop="verificationCode">
      <el-row>
        <el-col :span="16">
          <pl-input
            v-model="formData.verificationCode"
            label="手机短信验证码"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <el-button id="codeBtn" type="primary" @click="getCode" plain
            >获取验证码</el-button
          >
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item id="submitBtnBox">
      <el-button id="submitBtn" type="primary" @click="upDateNum"
        >确认修改</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
//import plInput from '@/components/common/BaseLabelInput';
import { phonePattern } from '@/utils/regexp';
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
          { required: true, message: '请输入短息验证码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    getCode() {},
    upDateNum() {
      this.$ref['form'].validate(valid => {
        if (valid) {
          alert('submit!');
        }
      });
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
