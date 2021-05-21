<!--
 * @Author: your name
 * @Date: 2021-04-14 17:01:43
 * @LastEditTime: 2021-05-21 18:46:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitment\resume.vue
-->
<template>
  <el-dialog
    title="简历审核"
    width="730px"
    :visible="resVisible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <userresume :form="resumeList"></userresume>
      <div v-if="type == '1'">
        <div class="title-style">审核</div>
        <el-form size="small" :model="form" label-width="100px">
          <el-form-item label="审核状态">
            <el-select
              style="width:210px"
              v-model="form.verifyResult"
              @change="selectChange"
              placeholder="请选择审核状态"
            >
              <el-option label="通过" value="1"></el-option>
              <el-option label="不通过" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="理由">
            <el-input
              style="width:534px"
              type="textarea"
              v-model="form.verifyMemo"
            ></el-input>
          </el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="onSubmit">审核</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import { agency_resume_verify, unit_query_resume } from '../../api/index';
import userresume from '../../../serviceManagement/pages/resume';
export default {
  name: 'resume',
  props: ['resVisible', 'data', 'type'],
  components: { userresume },
  data() {
    return {
      resumeList: {},
      form: {
        verifyResult: '1',
        verifyMemo: ''
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
    onSubmit() {
      let data = { ...this.data, ...this.form };
      if (data.verifyResult == '0') {
        if (!data.verifyMemo) {
          this.$message({
            message: '请填写备注',
            type: 'warning'
          });
          return;
        }
      }

      agency_resume_verify(
        data,
        res => {
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.onclose('1');
              }
            });
          } else {
            this.$message({
              message: res.result.data.msg,
              type: 'warning',
              duration: 2000
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    let data = { ...this.data };
    unit_query_resume(
      data,
      res => {
        if (res.result.data.result) {
          console.log(res);
        } else {
          this.$message({
            message: res.result.data.msg,
            type: 'warning',
            duration: 2000
          });
        }
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
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
