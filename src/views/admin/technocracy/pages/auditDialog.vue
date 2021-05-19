<!--
 * @Author: your name
 * @Date: 2021-03-16 13:59:30
 * @LastEditTime: 2021-05-18 19:42:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\auditDialog.vue
-->
<template>
  <el-dialog title="审核" width="850px" :visible="visible" @close="onclose">
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <tform :formConfig="auditConfig"></tform>
      <div v-if="auditConfig.type == '0'" class="title-style">入团审核</div>
      <div v-if="auditConfig.type == '1'" class="title-style">续聘审核</div>
      <div v-if="auditConfig.type == '2'" class="title-style">退团审核</div>
      <div v-if="auditConfig.type == '3'" class="title-style">转移审核</div>
      <el-form
        size="small"
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="审核状态" prop="verifyResult">
          <el-select
            v-model="form.verifyResult"
            @change="selectChange"
            placeholder="请选择审核状态"
          >
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="auditConfig.type > 1 ? '理由' : '备注'">
          <el-input type="textarea" v-model="form.verifyMemo"></el-input>
        </el-form-item>
        <el-form-item
          prop="joinDate"
          v-if="auditConfig.type == '0' && form.verifyResult == '1'"
          label="入团时间"
        >
          <el-date-picker
            v-model="form.joinDate"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="actSituation"
          v-if="auditConfig.type == '2' && form.verifyResult == '1'"
          label="出团时间"
        >
          <el-date-picker
            v-model="form.outDate"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="moveDate"
          v-if="auditConfig.type == '3' && form.verifyResult == '1'"
          label="转移时间"
        >
          <el-date-picker
            v-model="form.moveDate"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="time"
          v-if="auditConfig.type < 2 && form.verifyResult == '1'"
          label="新聘期时间"
        >
          <el-date-picker
            v-model="form.time"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </el-form-item>

        <div style="text-align:center">
          <el-button type="primary" @click="onSubmit">审核</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import {
  joinTeam_audit,
  continue_audit,
  quit_audit,
  move_audit
} from '../api/index';
export default {
  name: 'auditDialog',
  props: ['visible', 'auditConfig'],
  components: { tform },
  data() {
    return {
      rules: {
        verifyResult: [{ required: true, message: '请填写必选项' }],
        verifyMemo: [{ required: true, message: '请填写必选项' }],
        joinDate: [{ required: true, message: '请填写必选项' }],
        actSituation: [{ required: true, message: '请填写必选项' }],
        moveDate: [{ required: true, message: '请填写必选项' }],
        time: [{ required: true, message: '请填写必选项' }]
      },
      dicOptions: {
        //区县
        qx: this.$store.getters['dictionary/ggjbxx_qx']
      },
      form: {
        verifyResult: '1',
        region: '',
        verifyMemo: '',
        joinDate: '',
        time: ''
      }
    };
  },
  computed: {},
  methods: {
    selectChange(e) {
      console.log(e);
    },
    onclose(type) {
      this.$emit('onclose', type);
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {
          if (type == 'success') {
            this.onclose(this.auditConfig.type);
          }
        }
      });
    },
    onSubmit() {
      let form = this.form;
      let index = this.auditConfig.type;
      let row = this.auditConfig.row;
      if (form.time) {
        form.startDate = form.time[0];
        form.endDate = form.time[1];
      }
      let data = { ...form };
      if (data.verifyResult == '0') {
        if (!data.verifyMemo) {
          this.$message({
            message: '请填写备注',
            type: 'warning'
          });
          return;
        }
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          //0入团 1续聘 2退团 3转移
          if (index == '0') {
            data.innerId = row.innerId;
            joinTeam_audit(
              data,
              res => {
                if (res.result.data.result) {
                  this.message('success', '操作成功');
                } else {
                  this.message('warning', res.result.data.msg);
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          } else if (index == '1') {
            data.renewId = row.renewId;
            data.expertId = row.expertId;
            continue_audit(
              data,
              res => {
                if (res.result.data.result) {
                  this.message('success', '操作成功');
                } else {
                  this.message('warning', res.result.data.msg);
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          } else if (index == '2') {
            data.quitId = row.quitId;
            data.expertId = row.expertId;
            quit_audit(
              data,
              res => {
                if (res.result.data.result) {
                  this.message('success', '操作成功');
                } else {
                  this.message('warning', res.result.data.msg);
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          } else {
            data.moveId = row.moveId;
            data.expertId = row.expertId;
            move_audit(
              data,
              res => {
                if (res.result.data.result) {
                  this.message('success', '操作成功');
                } else {
                  this.message('warning', res.result.data.msg);
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  margin: 0 0 15px 0;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
</style>
