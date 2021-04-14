<!--
   * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-14 17:55:14
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
    <el-tabs id="typeTabs" v-model="activePath" @tab-click="handleClick">
      <el-tab-pane label="个人登录" name="person">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
          <el-tab-pane label="证件登录" name="first">
            <el-form
              ref="zjhmLoginForm"
              :model="form"
              :rules="rules"
              label-width="0px"
              class="login-box"
            >
              <el-form-item style="margin-bottom:25px" prop="zjhm">
                <pl-input
                  prefix-icon="el-icon-lock"
                  type="zjhm"
                  label="证件号码"
                  v-model="form.zjhm"
                />
              </el-form-item>
              <el-form-item style="margin-bottom:25px" prop="password">
                <pl-input
                  prefix-icon="el-icon-lock"
                  type="password"
                  label="密码"
                  v-model="form.password"
                />
              </el-form-item>
            </el-form>
            <div class="login-btn-bar">
              <pl-button
                :disabled="show"
                class="btn"
                type="primary"
                @click="doLogin($event, 'zjhmLoginForm')"
                >登录</pl-button
              >

              <div class="login-tips">
                如果您还未注册，请先<span class="download-link"
                  >下载人社app 注册</span
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="手机登录" name="second">
            <el-form
              ref="sjhmLoginForm"
              :model="phoneForm"
              :rules="rules"
              label-width="0px"
              class="login-box"
            >
              <el-form-item style="margin-bottom:25px" prop="phone">
                <pl-input
                  prefix-icon="el-icon-lock"
                  type="zjhm"
                  placeholder="手机号码"
                  v-model="phoneForm.phone"
                />
              </el-form-item>
              <el-form-item style="margin-bottom:25px" prop="verifyCode">
                <el-row :gutter="10">
                  <el-col :span="14">
                    <pl-input
                      prefix-icon="el-icon-lock"
                      type="message"
                      label="短信验证码"
                      v-model="phoneForm.verifyCode"
                    />
                  </el-col>
                  <el-col :span="10" class="text-right">
                    <pl-button
                      v-show="verifyCodeShow"
                      @click="getMessage($event)"
                    >
                      发送短信
                    </pl-button>
                    <pl-button v-show="!verifyCodeShow" class="count">
                      {{ count }} s
                    </pl-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <div class="login-btn-bar">
              <pl-button
                :disabled="show"
                class="btn"
                type="primary"
                @click="doLogin($event, 'sjhmLoginForm')"
                >登录</pl-button
              >
              <br />
              <div class="login-tips">
                如果您还未注册，请先<span class="download-link"
                  >下载人社app 注册</span
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="扫码登录" name="third">
            <div class="tab-content">
              跳转中...
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="单位登录" name="corporation">
        <div class="tab-content">
          <img src="@/assets/images/ca.png" alt="" class="corp-img" />
        </div>
        <div class="text-center">
          <el-button
            :disabled="show"
            class="btn corp-btn"
            type="primary"
            @click="onCorpSubmit()"
            >登录</el-button
          >
          <div id="corpYwtb" style="height:18px;font-size:14px">
            <span class="download-link" @click="turnYwtb2"
              >一网通办入口登录 ></span
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="footer">
      <el-row>
        <el-col :span="4" class="text-center">
          <img src="../../assets/images/logo-img1.png" alt="" />
        </el-col>
        <el-col :span="3" class="text-center">
          <img
            style="margin:12px 0 0 20px;"
            src="../../assets/images/logo-img3.png"
            alt=""
          />
        </el-col>
        <el-col :span="4" class="text-center">
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
import { doSend, doLogin } from '@/api/personApi';
import { phonePattern, cP } from '@/utils/regexp';
export default {
  name: 'login',
  components: {},
  data() {
    return {
      show: false,
      verifyCodeShow: true,
      count: '',
      timer: null,
      activePath: this.$store.getters.priorityLoginType || '',
      activeName: 'first',
      form: {
        zjhm: '',
        password: ''
      },
      phoneForm: {
        phone: '',
        verifyCode: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        zjhm: [
          {
            required: true,
            message: '证件号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: cP,
            message: '请输入正确格式的证件号码',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号码',
            trigger: ['blur', 'change']
          }
        ],
        verifyCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
          // { type: 'number', message: '请输数字', trigger: 'blur' }
          //{ min: 6, max: 6, message: '请输六位验证码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    // activePathName: {
    //   get: function() {
    //     return this.activePath ? this.activePath : 'person';
    //   },
    //   set: function(v) {
    //     this.activePath = v;
    //   }
    // }
  },
  created() {
    //PlaceholderInit();
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleClick(tab, event) {
      if (tab.label === '个人登录') {
        //this.$router.push('#/person');
      } else if (tab.label === '单位登录') {
        //this.$router.push('#/coporation');
      } else if (tab.label === '扫码登录') {
        this.turnYwtb();
      }
    },
    turnYwtb() {
      //个人跳转到一网通办登录
      window.location.href =
        'http://117.184.226.149/uc/login/login.jsp?type=1&redirect_uri=https://j2testzzjb.rsj.sh.cegn.cn/ggzp-zzjb-shrs/loginController/ywtb-index';
    },
    turnYwtb2() {
      //单位跳转到一网通办登录
      window.location.href =
        'http://117.184.226.149/uc/login/login.jsp?type=2&redirect_uri=https://j2testzzjb.rsj.sh.cegn.cn/ggzp-zzjb-shrs/loginController/ywtb-index';
    },
    async getMessage(done) {
      //获取短信验证码
      let that = this;
      if (!this.phoneForm.phone) {
        this.$alert('手机号不能为空');
      } else if (!phonePattern.test(this.phoneForm.phone)) {
        this.$alert('手机号格式不正确');
      } else {
        let smsResult = await doSend({
          phone: that.phoneForm.phone
        }).catch(() => {
          done();
          that.$message({ type: 'error', message: '系统异常，获取验证码失败' });
        });
        if (smsResult.status === 200) {
          //采用倒计时方法
          //that.$message({ type: 'success', message: '获取验证码成功' });
          const TIME_COUNT = 60;
          if (!that.timer) {
            that.count = TIME_COUNT;
            that.verifyCodeShow = false;
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= TIME_COUNT) {
                that.count--;
              } else {
                that.verifyCodeShow = true;
                clearInterval(that.timer);
                that.timer = null;
              }
            }, 1000);
          }
        } else {
          that.$message({ type: 'error', message: '获取验证码失败' });
        }
      }
      done();
    },
    doLogin(done, formName) {
      let that = this;
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用后台的登录功能
          // TODO
          doLogin(this.$refs[formName].model)
            .then(res => {
              console.log(res);
              if (res && res.status == 200 && res.result.data) {
                //登录成功,获取个人基本信息
                //! TODO 处理store
                window.location.href = '/ggzp-shrs/person.html';
              } else if (
                res.result.reason === '01' &&
                formName === 'zjhmLoginForm'
              ) {
                that.$message({
                  type: 'error',
                  message: '证件号码不存在！'
                });
              } else if (
                res.result.reason === '02' &&
                formName === 'zjhmLoginForm'
              ) {
                that.$message({
                  type: 'error',
                  message: '密码错误，登录失败！'
                });
              } else if (
                res.result.reason === '01' &&
                formName === 'sjhmLoginForm'
              ) {
                that.$message({
                  type: 'error',
                  message: '手机号码不存在！'
                });
              } else if (
                res.result.reason === '02' &&
                formName === 'sjhmLoginForm'
              ) {
                that.$message({
                  type: 'error',
                  message: '验证码错误，登录失败！'
                });
              } else {
                that.$message({
                  type: 'error',
                  message: '登录失败！'
                });
              }
            })
            .catch(() => {
              done();
              that.$message({ type: 'error', message: '系统异常，登录失败' });
            });
        } else {
          return false;
        }
        done();
      });
    },
    onCorpSubmit() {
      this.$alert('此功能暂未实现');
    }
  }
};
</script>

<style lang="scss" scoped>
$headerHeight: 60px;
#indexApp {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
  background-image: url('../../assets/images/logo_bg.png');
  background-repeat: round;
  height: 100%;
  width: 100%;
  padding-top: 15%;
  .herder {
    .title {
      img {
        float: left;
      }
      .img1 {
        margin-top: 17px;
        height: 32px;
        width: 31px;
      }
      .img2 {
        margin-top: 18px;
        height: 30px;
      }
      span {
        color: #ffffff;
        float: left;
        margin-top: 27px;
        font-size: 16px;
        margin-left: 30px;
      }
      height: $headerHeight;

      width: 1200px;
      margin: 0 auto;
    }
    //min-width: 1600px;
    width: 100%;
    height: $headerHeight;
    background: #fd7a43;
    position: absolute;
    top: 0;
  }
  .footer {
    margin: 15px auto 0 auto;
    background: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    .textStyle {
      color: #666666;
      padding: 5px;
    }
    img {
      margin: 0 auto;
    }
  }
  #typeTabs {
    ::v-deep .el-tabs__header {
      padding: 0px 0 25px;
      .el-tabs__nav {
        width: 100%;
        // & > el-tabs__nav-wrap {
        //   & > el-tabs__nav-scroll {
        //     & > .el-tabs__active-bar {
        //       height: 0;
        //     }
        //   }
        // }
        #tab-corporation,
        #tab-person {
          width: 50%;
          text-align: center;
          font-size: 18px;
          font-weight: 200;
          background-color: #eee;
          z-index: 5;
          bottom: -2px;
        }
        #tab-corporation.is-active,
        #tab-person.is-active {
          color: rgb(48, 49, 51);
          background-color: #fff;
        }
      }
      // #tab-first {
      //   padding-left: 10px;
      // }
    }
  }
  .el-tabs {
    width: 350px;
    margin: 0px 240px 0 auto;
    background: #fff;
    border-radius: 5px;
    ::v-deep .el-tabs__header {
      padding: 0 35px;
      margin-bottom: 0px;
    }
    ::v-deep .el-tab-pane {
      min-height: 250px;
    }
  }
  .tab-content {
    text-align: center;
    margin-top: 30px;
  }
  .login-box {
    //border: 1px solid #dcdfe6;
    //border-top: 0;
    width: 100%;
    //margin: 0 auto;
    padding: 10px 35px 15px 35px;
    border-radius: 0 0 5px 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    //box-shadow: 0 0 1px #909399;
  }
  .login-btn-bar {
    padding: 0 35px 15px 35px;
    .login-tips {
      margin-top: 10px;
      height: 18px;
      font-size: 14px;
    }
  }
  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  .btn {
    width: 100%;
  }
  .download-link {
    color: #fc6f3d;
    cursor: pointer;
  }
  .corp-img {
    margin: 0 auto;
  }
  .corp-btn {
    width: 50%;
    margin-top: 30px;
  }
  #corpYwtb {
    margin-top: 20px;
  }
  .count {
    background-color: #f6f6f6;
  }
}
</style>
