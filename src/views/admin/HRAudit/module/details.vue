<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-05-18 18:09:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog
      width="750px"
      :title="type == '1' ? '查看' : '审核开店申请'"
      :visible="visible"
      @close="onclose"
    >
      <div class="title-style">开店申请信息</div>
      <tform ref="form" :formConfig="formConfig"></tform>
      <div v-if="type == '2'">
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
              v-model="form.statusId"
              placeholder="请选择审核状态"
            >
              <el-option label="通过" value="2"></el-option>
              <el-option label="不通过" value="3"></el-option>
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
import { user_querySysm, user_edit } from '../api/index';
export default {
  name: 'details',
  components: { tform },
  props: ['visible', 'type', 'dataList'],
  data() {
    return {
      loading: false,
      form: {
        userName: '',
        name: ''
      },
      userOptions: [],
      idList: {},
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
            key: 'deptName'
          },
          {
            type: 'input',
            label: '社会信用代码',
            style: { width: '210px' },
            placeholder: '请输入社会信用代码',
            rules: [],
            key: 'deptName'
          },
          {
            type: 'input',
            label: '联系人',
            style: { width: '210px' },
            placeholder: '请输入联系人',
            rules: [],
            key: 'deptName'
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '210px' },
            placeholder: '请输入联系电话',
            rules: [],
            key: 'deptName'
          },
          {
            type: 'textarea',
            label: '其他说明',
            style: { width: '535px' },
            placeholder: '请输入其他说明',
            rules: [],
            key: 'deptName'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    expertChange(e) {
      this.form.userName = e.value;
      this.form.name = e.label;
      this.idList = { ...e };
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let data = {
          name: query,
          pageIndex: 0,
          pageSize: 10
        };
        user_querySysm(
          data,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.pageresult.data;
              let list = pageresult.map(e => {
                return {
                  value: e.userName,
                  label: e.name,
                  userId: e.userId,
                  organId: e.organId,
                  deptId: e.deptId
                };
              });
              this.userOptions = list;
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    onclose(type) {
      this.$emit('onclose', type || 0);
    },
    onSubmit(e) {
      let data = { ...this.form, ...e, ...this.idList };
      user_edit(
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
