<!--
 * @Author: your name
 * @Date: 2021-03-09 14:11:24
 * @LastEditTime: 2021-03-09 15:08:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\module\person.vue
-->
<template>
  <div id="indexBody">
    <el-form ref="form" labelPosition="right" :model="form" label-width="110px">
      <el-row class="row">
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="证件类型">
            <el-input
              size="small"
              v-model="form.aaa001"
              disabled
            ></el-input> </el-form-item
        ></el-col>
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="证件号码">
            <el-input
              size="small"
              v-model="form.aaa002"
              disabled
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row class="row">
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="姓名">
            <el-input
              size="small"
              v-model="form.aaa003"
              disabled
            ></el-input> </el-form-item
        ></el-col>
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="性别">
            <el-input
              size="small"
              v-model="form.aaa004"
              disabled
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row class="row">
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="出生日期">
            <el-input
              size="small"
              v-model="form.aaa005"
              disabled
            ></el-input> </el-form-item
        ></el-col>
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="手机号">
            <el-input
              size="small"
              v-model="form.aaa006"
              disabled
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row class="row">
        <el-col :md="6" :lg="6" :xl="6"
          ><el-form-item label="居住区域">
            <el-input size="small" v-model="form.aaa007" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="6" :lg="6" :xl="6"
          ><el-form-item label="居住区域">
            <el-input
              size="small"
              v-model="form.aaa008"
              disabled
            ></el-input> </el-form-item
        ></el-col>
        <el-col :md="12" :lg="12" :xl="12"
          ><el-form-item label="居住详细地址">
            <el-input
              title="Top Left 提示文字"
              size="small"
              v-model="form.aaa009"
              disabled
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'person',
  components: {},
  data() {
    return {
      form: {
        aaa001: '身份证',
        aaa002: '412825199301245789',
        aaa003: '刘先生',
        aaa004: '男',
        aaa005: '1990-03-05',
        aaa006: '18910684478',
        aaa007: '浦东新区',
        aaa008: '陆家嘴街道',
        aaa009: '花木路119号'
      }
    };
  },
  computed: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.width {
  width: 100%;
}
.row {
  margin-top: 12px;
  padding: 0;
}
.el-form-item {
  margin: 0;
}
</style>
