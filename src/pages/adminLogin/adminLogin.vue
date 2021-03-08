<!--
   * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-04 16:52:31
 * @Description: file content
-->
<template>
  <div id="indexApp">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" v-on:click="onSubmit('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * 管理员登陆入口界面
 */
export default {
  name: 'app',
  components: {},
  data: () => {
    return {
      form: {
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不可为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          window.location.href = 'http://localhost:8089/ggzp-shrs/admin.html';
        } else {
          this.$message({
            message: '请填写密码',
            type: 'warning',
            offset: this.offset
          });
          return false;
        }
      });
    }
  },
  computed: {
    offset: function() {
      let height = document.documentElement.clientHeight;
      return height / 2 - 46;
    }
  },
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
    background: $g-mian-color;
  }
}
</style>
