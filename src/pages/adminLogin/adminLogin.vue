<!--
   * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-08 10:13:20
 * @Description: file content
-->
<template>
  <div id="indexApp">
    <div class="herder">
      <div class="title">
        <img class="img1" src="../../assets/img/logoWhite.png" alt="图标" />
        <img class="img2" src="../../assets/img/logo3White.png" alt="标题" />
        <span>欢迎登录</span>
      </div>
    </div>
    <img class="bg" src="../../assets/images/logo_bg.png" alt="背景图片" />
    <div class="login-box">
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="0px">
        <h3 class="login-title">RA登录</h3>
        <img src="../../assets/images/ca.png" width="100%" alt="ca" />
        <h4 style="text-align:center;padding:10px 0">
          请插入<span style="color:#fd7a43">RA</span>登录
        </h4>
        <el-form-item style="margin-bottom:25px" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          />
        </el-form-item>
        <el-form-item style="margin-bottom:10px">
          <el-button
            :disabled="show"
            class="btn"
            type="primary"
            @click="isAdmin('loginForm')"
            >登录</el-button
          >
        </el-form-item>
        <div style="height:18px;font-size:14px">
          如果您还未下载驱动，请先<span style="color:#fc6f3d;cursor: pointer;"
            >下载驱动</span
          >
        </div>
      </el-form>
    </div>
    <div class="footer">
      <el-row>
        <el-col :span="4">
          <img src="../../assets/images/logo-img1.png" alt="" />
        </el-col>
        <el-col :span="3">
          <img
            style="margin:12px 0 0 20px;"
            src="../../assets/images/logo-img3.png"
            alt=""
          />
        </el-col>
        <el-col :span="4">
          <img
            style="margin-top:14px"
            src="../../assets/images/logo-img2.png"
            alt=""
          />
        </el-col>
        <el-col :span="4" style="margin-top:10px">
          <div class="textStyle">地址：人民大道200号</div>
          <div class="textStyle">邮编：200003</div>
        </el-col>
        <el-col :span="4" style="margin-top:10px">
          <div class="textStyle">联系电话：23111111</div>
          <div class="textStyle">上海政务服务总客服：12345</div>
        </el-col>
        <el-col :span="5" style="margin-top:10px">
          <div class="textStyle">沪ICP备：12004267</div>
          <div class="textStyle">沪公安备：31010102045442号</div>
          <div class="textStyle">政府网站标识码：310000000044</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/**
 * 管理员登陆入口界面
 */
import Vue from 'vue';
import App from './adminLogin.vue';
import store from '@/store';
import { isNoBody, isPerson, isCorporation } from '@/utils';
import SecCtrl from './module/SecCtrl.js';
import { queryLogin } from '@/api/adminApi';
import apiUrlConfig from '@/config';
let ks_provider = 'SKF&SKFAPI20046.dll'; // 介质
let ks_alg = 0; // 使用证书时自动适配
let ks_path = ''; // 如果为软算法，对应路径
//签名算法
let hashAlg = 0; // SHA-1算法

function initProv() {
  let nRet = SecCtrl.KS_SetProv(ks_provider, ks_alg, ks_path);
  if (nRet != 0) {
    alert(SecCtrl.KS_GetLastErrorMsg());
    return false;
  }
  return true;
}

function getCert() {
  if (!initProv()) return '';
  return SecCtrl.KS_GetCert(2);
}

function signature(srcData, pinCode) {
  let cert = getCert();
  if (!cert) return;
  SecCtrl.KS_SetParam('userpin', pinCode);
  let signature = SecCtrl.KS_SignData(srcData, hashAlg);
  if (
    SecCtrl.KS_GetLastErrorCode() != 0 &&
    SecCtrl.KS_GetLastErrorMsg() != '成功'
  ) {
    //alert(SecCtrl.KS_GetLastErrorMsg());
    alert(
      '签名错误，' +
        SecCtrl.KS_GetLastErrorCode() +
        SecCtrl.KS_GetLastErrorMsg()
    );
    return;
  }
  return {
    signature: signature,
    cert: cert
  };
}

function checkPass(pinCode) {
  if (!initProv()) return false;
  SecCtrl.KS_SetParam('defaultpin', pinCode);
  let nRet = SecCtrl.KS_VerifyPin(pinCode);
  if (nRet == 0) return true;
  else if (nRet <= 10) alert('密码错误, 还可重试' + nRet + '次！');
  else alert('登陆出错，请检查驱动和key是否正常！');
  return false;
}

function getLastErr() {
  if (
    SecCtrl.KS_GetLastErrorCode() != 0 &&
    SecCtrl.KS_GetLastErrorMsg() != '成功'
  ) {
    alert(SecCtrl.KS_GetLastErrorMsg());
    return false;
  }
  return true;
}

export default {
  name: 'app',
  components: {},
  data: () => {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('密码长度为6到18位！'));
      } else {
        callback();
      }
    };
    var onrandom = () => {
      let chars = '0123456789';
      let code = '';
      for (let i = 0; i < 16; i++) {
        code += chars.charAt(Math.floor(Math.random() * 9));
      }
      return code;
    };
    return {
      show: false,
      form: {
        bgUrl: require('@/assets/images/logo_bg.png'),
        password: '',
        random: onrandom(),
        signData: '',
        loginName: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        password: [
          {
            trigger: 'blur',
            validator: validatePass
          }
        ]
      }
    };
  },
  methods: {
    isAdmin(formName) {
      console.log(this.$store);
      console.log(isNoBody(this));
      if (isNoBody(this)) {
        this.onSubmit(formName);
      } else {
        if (isPerson(this)) {
          this.$alert('已有个人登录本系统，请先退出登录');
        }
        if (isCorporation(this)) {
          this.$alert('已有单位登录本系统，请先退出登录');
        }
        setTimeout(() => {
          window.location.href = '/ggzp-shrs/index.html';
        }, 2000);
      }
    },
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证密码
          let strpassword = this.form.password;
          if (!checkPass(strpassword)) {
            return false;
          }
          //数字签名
          var random = this.form.random;

          //获取证书内容
          this.form.loginName = getCert();
          if (!getLastErr()) {
            return;
          }
          var signatureInfo = signature(random, strpassword);
          if (signatureInfo == null || signatureInfo['signature'].length == 0) {
            return false;
          }
          this.form.signData = signatureInfo['signature'];
          queryLogin(
            {
              password: strpassword,
              random: random,
              loginName: this.form.loginName,
              signData: this.form.signData
            },
            response => {
              if (response.status == 200) {
                this.$store.dispatch('admin/setUserInfo', response.result);
                window.location.href = '/ggzp-shrs/admin.html';
              }
            },
            error => {
              console.log(error);
            }
          );
        } else {
          return false;
        }
      });
    }
  },
  computed: {},
  mounted() {},
  created() {}
};
</script>

<style lang="scss" scoped>
$headerHeight: 80px;
#indexApp {
  position: relative;
  overflow-x: hidden;
  .bg {
    width: 100%;
    min-width: 1600px;
  }
  .herder {
    .title {
      img {
        float: left;
      }
      .img1 {
        margin-top: 17px;
        height: 46px;
        width: 46px;
      }
      .img2 {
        margin-top: 23px;
        height: 34px;
      }
      span {
        color: #ffffff;
        float: left;
        margin-top: 32px;
        font-size: 16px;
        margin-left: 30px;
      }
      height: $headerHeight;
      width: 1200px;
      margin: 0 auto;
    }
    min-width: 1600px;
    width: 100%;
    height: $headerHeight;
    background: #fd7a43;
  }
  .footer {
    width: 1200px;
    margin: 15px auto 0 auto;
    .textStyle {
      color: #666666;
      padding: 5px;
    }
  }
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  // text-align: center;
  //color: #2c3e50;
  height: 100%;
  width: 100%;
  .login-box {
    position: absolute;
    z-index: 9;
    top: 0;
    bottom: 0;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    width: 350px;
    margin: auto 0;
    right: 20%;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 1px #909399;
    height: 404px;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 20px auto;
    color: #fd7a43;
    font-size: 20px;
  }

  .btn {
    width: 100%;
  }
}
</style>
