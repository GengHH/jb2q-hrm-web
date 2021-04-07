<!--
   * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-31 19:34:45
 * @Description: file content
-->
<template>
  <div id="indexApp">
    <el-tabs id="typeTabs" v-model="activePath" @tab-click="handleClick">
      <el-tab-pane label="个人登录" name="person">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="证件登录" name="first">
            <el-form
              ref="zjhmLoginForm"
              :model="form"
              :rules="rules"
              label-width="0px"
              class="login-box"
            >
              <el-form-item style="margin-bottom:25px" prop="zjhm">
                <el-input
                  prefix-icon="el-icon-lock"
                  type="zjhm"
                  placeholder="请输入证件号码"
                  v-model="form.zjhm"
                />
              </el-form-item>
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
                  @click="onSubmit('zjhmLoginForm')"
                  >登录</el-button
                >
              </el-form-item>
              <div style="height:18px;font-size:14px">
                如果您还未注册，请先<span style="color:#fc6f3d;cursor: pointer;"
                  >下载人社app 注册</span
                >
              </div>
            </el-form>
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
                <el-input
                  prefix-icon="el-icon-lock"
                  type="zjhm"
                  placeholder="请输入手机号码"
                  v-model="phoneForm.phone"
                />
              </el-form-item>
              <el-form-item style="margin-bottom:25px" prop="message">
                <el-row :gutter="10">
                  <el-col :span="14">
                    <el-input
                      prefix-icon="el-icon-lock"
                      type="message"
                      placeholder="请输入短信验证码"
                      v-model="phoneForm.message"
                    />
                  </el-col>
                  <el-col :span="10" class="text-right">
                    <pl-button @click="getMessage">
                      发送短信
                    </pl-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item style="margin-bottom:10px">
                <el-button
                  :disabled="show"
                  class="btn"
                  type="primary"
                  @click="onSubmit('sjhmLoginForm')"
                  >登录</el-button
                >
              </el-form-item>
              <div style="height:18px;font-size:14px">
                如果您还未注册，请先<span class="download-link"
                  >下载人社app 注册</span
                >
              </div>
            </el-form>
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
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { doLogin } from '@/api/personApi';
import { phonePattern, cP } from '@/utils/regexp';
export default {
  name: 'login',
  components: {},
  data() {
    return {
      show: false,
      activePath: this.$store.getters.priorityLoginType || '',
      activeName: 'first',
      form: {
        zjhm: '',
        password: ''
      },
      phoneForm: {
        phone: '',
        message: ''
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
        message: [
          {
            required: true,
            message: '短信码不能为空',
            trigger: 'blur'
          }
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
  methods: {
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
      //跳转到一网通办登录
      window.location.href =
        'http://117.184.226.149/uc/login/login.jsp?type=1&redirect_uri=https://j2testzzjb.rsj.sh.cegn.cn/ggzp-zzjb-shrs/loginController/ywtb-index';
    },
    getMessage() {
      // TODO获取短信验证码
    },
    onSubmit(formName) {
      if (formName === 'phoneform') {
        this.$alert('此功能暂未开通，敬请等待！');
      }
      let that = this;
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用后台的登录功能
          // TODO
          doLogin(this.$refs[formName].model)
            .then(res => {
              if (res && res.status == 200 && res.result.data) {
                //获取个人基本信息
                //! TODO 处理store
                window.location.href = '/ggzp-shrs/person.html';
              } else {
                that.$message({
                  type: 'error',
                  message: '用户名或密码错误，登录失败！'
                });
              }
            })
            .catch(() => {
              that.$message({ type: 'error', message: '系统异常，登录失败' });
            });
        } else {
          return false;
        }
      });
    },
    onCorpSubmit() {
      this.$alert('此功能暂未实现');
    }
  }
};
</script>

<style lang="scss" scoped>
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
  #typeTabs {
    ::v-deep .el-tabs__header {
      padding: 0px 0 10px;
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
      #tab-first {
        padding-left: 10px;
      }
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
    border: 1px solid #dcdfe6;
    border-top: 0;
    width: 100%;
    //margin: 0 auto;
    padding: 35px 35px 15px 35px;
    border-radius: 0 0 5px 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    //box-shadow: 0 0 1px #909399;
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
}
</style>
