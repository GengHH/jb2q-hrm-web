<!--
 * @Author: your name
 * @Date: 2021-03-09 14:11:24
 * @LastEditTime: 2021-06-25 09:59:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\module\person.vue
-->
<template>
  <div id="indexBody">
    <el-form
      v-loading="loading"
      ref="form"
      disabled
      labelPosition="right"
      :model="form"
      label-width="110px"
    >
      <el-row class="row">
        <el-col :span="12"
          ><el-form-item label="证件类型">
            <el-select v-model="form.zjlxId" placeholder="" style="width:100%">
              <el-option
                size="small"
                v-for="(v, k) in dicOptions.zjlx"
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="证件号码">
            <el-input
              size="small"
              v-model="form.zjhm"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"
          ><el-form-item label="姓名">
            <el-input size="small" v-model="form.xm"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="性别">
            <el-select v-model="form.sexId" placeholder="" style="width:100%">
              <el-option
                size="small"
                v-for="(v, k) in dicOptions.sex"
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"
          ><el-form-item label="出生日期">
            <el-input
              size="small"
              v-model="form.birthDate"
              value-format="yyyyMMdd"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="手机号">
            <el-input
              size="small"
              v-model="form.contactPhone"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"
          ><el-form-item label="居住区域">
            <el-select
              v-model="form.livingArea"
              placeholder=""
              style="width:100%"
            >
              <el-option
                size="small"
                v-for="(v, k) in dicOptions.qx"
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"
          ><el-form-item label="居住街镇">
            <el-select
              v-model="form.livingStreet"
              placeholder=""
              style="width:100%"
            >
              <el-option
                size="small"
                v-for="(v, k) in dicOptions.street"
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24"
          ><el-form-item label="居住详细地址">
            <el-input
              :title="form.livingAddress"
              size="small"
              v-model="form.livingAddress"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import { job_psnlInfo } from '../api/index';
export default {
  name: 'person',
  props: ['userPid'],
  components: {},
  data() {
    return {
      loading: true,
      form: {},
      dicOptions: {
        //证件类型
        zjlx: trim(this.$store.getters['dictionary/ggjbxx_zjlx']),
        //性别
        sex: trim(this.$store.getters['dictionary/ggjbxx_sex']),
        //街镇
        street: trim(this.$store.getters['dictionary/ggjbxx_street']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      }
    };
  },
  computed: {},
  methods: {
    query() {
      let data = { pid: this.userPid };
      job_psnlInfo(
        data,
        res => {
          this.loading = false;
          if (res.status == 200) {
            let d = res.result.data;
            this.form = { ...d };
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.query();
  }
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
