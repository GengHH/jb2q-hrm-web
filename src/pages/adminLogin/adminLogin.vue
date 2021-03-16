<!--
   * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-15 10:57:02
 * @Description: file content
-->
<template>
  <div id="indexApp">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="0px"
      class="login-box"
    >
      <h3 class="login-title">RA登录</h3>
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
          @click="onSubmit('loginForm')"
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
</template>

<script>
/**
 * 管理员登陆入口界面
 */
import SecCtrl from './module/SecCtrl.js';
import { queryLogonUser } from '@/api/adminApi';

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

function getOid() {
  let signCert = getCert();
  let oid = SecCtrl.KS_GetCertInfoByOid(signCert, '1.2.156.2319');
  if (oid.length > 16) oid = oid.substr(oid.length - 16);
  if (oid.length !== 16) throw 'NO_CERT';
  return oid;
}

function signature(srcData, pinCode) {
  let cert = getCert();
  if (!cert) return;
  SecCtrl.KS_SetParam('userpin', pinCode);
  signature = SecCtrl.KS_SignData(srcData, hashAlg);
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

function modifyPassword(pswOld, pwdNew) {
  if (!initProv()) return false;
  let nRet = SecCtrl.KS_ModifyPin(pswOld, pwdNew);
  if (nRet != 0) {
    alert('修改密码失败！' + SecCtrl.KS_GetLastErrorMsg());
    return;
  } else {
    alert('修改密码成功！');
  }
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

function checkVersion(nowVersion) {
  try {
    let version = SecCtrl.KS_GetVersion();
    if (version < 0 || version == undefined || version == 'undefined') {
      return false;
    }
    if (nowVersion && version != nowVersion) {
      return false;
    }
  } catch (e) {
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
          this.$store.state.admin.logonUser = {
            userId: '',
            userIdStr: '0000309307',
            userName: '丁丽莉',
            loginName: '2b44928ae11fb938',
            userType: '02',
            organId: '',
            organIdStr: '1666',
            organName: '上海市社会保险事业管理中心金山分中心',
            organType: '',
            domainId: 1,
            domainIdStr: '',
            domainName: '',
            roleKey: '',
            userKey: '',
            expire: -1,
            extInfo: {
              sessionId: '',
              logid: '',
              userType: '02',
              userId: '0000309307',
              userName: '丁丽莉',
              userPhone: '',
              loginName: '2b44928ae11fb938',
              userKey: '310105810117000',
              organId: '1666',
              organCode: '',
              organName: '上海市社会保险事业管理中心金山分中心',
              organType: '',
              organStatus: '',
              deptId: '',
              deptCode: '',
              deptType: '',
              deptName: '',
              districtCode: '16',
              districtName: '金山',
              streetCode: '1600',
              streetName: '金山',
              communityCode: '',
              communityName: '',
              loginCaType: '',
              cookieToken: '',
              pid: '',
              deviceSN: '',
              sfbz: 'TEST_shq310105198101170428',
              passBySb: false,
              yxbz: '1',
              sbdwmc: '',
              tyshxym: ''
            },
            areaInfo: {
              areaCode: '16',
              areaCode1: '1600',
              areaCode2: '166600',
              areaCode3: '',
              areaCode4: '',
              areaCode5: '',
              areaCode6: '',
              areaName: '金山',
              areaName1: '金山',
              areaName2: '上海市社会保险事业管理中心金山分中心',
              areaName3: '',
              areaName4: '',
              areaName5: '',
              areaName6: ''
            },
            roles: [
              {
                roleId: 'R1',
                roleName: '业务经办'
              }
            ],
            readOnly: false,
            domainIdKey: '1',
            userIdKey: '0000309307',
            organIdKey: '1666'
          };
          this.form.signData = signatureInfo['signature'];
          console.log(random);
          console.log(this.form.loginName);
          console.log(this.form.signData);
          console.log('登陆成功');
          window.location.href = 'http://localhost:8089/ggzp-shrs/admin.html';
        } else {
          return false;
        }
      });
    }
  },
  computed: {},
  created() {}
};
</script>

<style lang="scss" scoped>
#indexApp {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  // text-align: center;
  //color: #2c3e50;
  height: 100%;
  width: 100%;
  padding-top: 15%;
  .login-box {
    border: 1px solid #dcdfe6;
    width: 350px;
    margin: 0 auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 1px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  .btn {
    width: 100%;
  }
}
</style>
