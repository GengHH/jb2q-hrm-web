<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-05-21 13:43:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\hrdetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog
      width="750px"
      title="审核开店申请"
      :visible="visible"
      @close="onclose"
    >
      <div class="title-style">开店申请信息</div>
      <tform ref="form" :formConfig="formConfig"></tform>
      <div>
        <div class="title-style">审核</div>
        <el-form
          style="width: 650px;margin:0 auto"
          size="small"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="审核状态">
            <el-select
              style="width:210px"
              v-model="form.verifyResult"
              placeholder="请选择审核状态"
            >
              <el-option label="通过" value="1"></el-option>
              <el-option label="不通过" value="2"></el-option>
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
    </el-dialog>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_form'; //高级查询
import { hr_verify } from '../api/index';
export default {
  name: 'hrdetails',
  components: { tform },
  props: ['visible', 'dataList'],
  data() {
    return {
      form: {
        verifyResult: '1',
        verifyMemo: ''
      },
      formConfig: {
        inline: true,
        size: 'mini',
        disabled: true,
        labelPosition: 'right',
        labelWidth: '100px',
        isBtn: true,
        style: {
          width: '650px',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'corpName'
          },
          {
            type: 'input',
            label: '社会信用代码',
            style: { width: '210px' },
            placeholder: '请输入社会信用代码',
            rules: [],
            key: 'tyshxydm'
          },
          {
            type: 'input',
            label: '联系人',
            style: { width: '210px' },
            placeholder: '请输入联系人',
            rules: [],
            key: 'contactName'
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '210px' },
            placeholder: '请输入联系电话',
            rules: [],
            key: 'contactPhone'
          },
          {
            type: 'textarea',
            label: '其他说明',
            style: { width: '535px' },
            placeholder: '请输入其他说明',
            rules: [],
            key: 'applyMemo'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onclose(type) {
      this.$emit('onclose', type || 0);
    },
    onSubmit(e) {
      let data = { ...this.dataList, ...e, ...this.form };
      if (data.verifyResult == '2') {
        if (!data.verifyMemo) {
          this.$message({
            message: '请填写理由',
            type: 'warning',
            duration: 1000
          });
          return;
        }
      }
      hr_verify(
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
    setTimeout(() => {
      this.$refs.form.value = { ...this.dataList };
    }, 0);
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
