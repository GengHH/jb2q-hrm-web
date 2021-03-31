/* eslint-disable no-func-assign */
/* eslint-disable quotes */
/*
 * @Author: your name
 * @Date: 2021-03-12 10:52:20
 * @LastEditTime: 2021-03-17 09:59:07
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\pages\adminLogin\module\pass.js
 */
//初始化
var SecCtrl = require('./SecCtrl.js');
var ks_provider = 'SKF&SKFAPI20046.dll'; // 介质
var ks_alg = 0; // 使用证书时自动适配
var ks_path = ''; // 如果为软算法，对应路径
//签名算法
var hashAlg = 0; // SHA-1算法

function initProv() {
  var nRet = SecCtrl.KS_SetProv(ks_provider, ks_alg, ks_path);
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
  var signCert = getCert();
  var oid = SecCtrl.KS_GetCertInfoByOid(signCert, '1.2.156.2319');
  if (oid.length > 16) oid = oid.substr(oid.length - 16);
  if (oid.length !== 16) throw 'NO_CERT';
  return oid;
}

function signature(srcData, pinCode) {
  var cert = getCert();
  if (!cert) return;
  SecCtrl.KS_SetParam('userpin', pinCode);
  signature = SecCtrl.KS_SignData(srcData, hashAlg);
  console.log(SecCtrl.KS_GetLastErrorCode());
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
  var nRet = SecCtrl.KS_VerifyPin(pinCode);
  if (nRet == 0) return true;
  else if (nRet <= 10) alert('密码错误, 还可重试' + nRet + '次！');
  else alert('登陆出错，请检查驱动和key是否正常！');
  return false;
}

function modifyPassword(pswOld, pwdNew) {
  if (!initProv()) return false;
  var nRet = SecCtrl.KS_ModifyPin(pswOld, pwdNew);
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
    var version = SecCtrl.KS_GetVersion();
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
module.exports = {
  ca_initProv: initProv(),
  ca_getCert: getCert(),
  ca_getOid: getOid(),
  ca_signature: signature(),
  ca_checkPass: checkPass(),
  ca_getLastErr: getLastErr(),
  ca_checkVersion: checkVersion(),
  ca_modifyPassword: modifyPassword()
};
