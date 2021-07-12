<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-06-09 16:40:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="750px" title="详情" :visible="visible" @close="onclose">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-left:30px" label="姓名">
              <el-select
                v-model="form.name"
                filterable
                remote
                reserve-keyword
                style="width:210px;"
                placeholder="请输入姓名或者账号名"
                :remote-method="remoteMethod"
                :loading="loading"
                @change="expertChange"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                  <span>{{ item.label }}</span
                  >-<span>{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号名">
              <el-input
                style="width:210px"
                disabled
                v-model="form.userName"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <tform ref="form" :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    </el-dialog>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_form'; //高级查询
import { user_querySysm, user_edit } from '../api/index';
export default {
  name: 'addDetails',
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
        size: '',
        labelPosition: 'right',
        labelWidth: '100px',
        saveBtn: {
          title: '提交'
        },
        style: {
          width: '650px',
          margin: '0 auto'
        },

        formItemList: [
          {
            type: 'input',
            label: '部门名称',
            style: { width: '210px' },
            placeholder: '请输入部门名称',
            rules: [],
            key: 'deptName'
          },
          {
            type: 'input',
            label: '职位',
            style: { width: '210px' },
            placeholder: '请输入职位',
            rules: [],
            key: 'positionName'
          },
          {
            type: 'select',
            label: '身份',
            rules: [],
            style: { width: '210px' },
            key: 'roleId',
            options: trim(this.$store.getters['dictionary/recruit_user_role'])
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '210px' },
            placeholder: '请输入联系电话',
            rules: [],
            key: 'contactNumber'
          },
          {
            type: 'input',
            label: '手机号码',
            style: { width: '210px' },
            placeholder: '请输入联系手机号码',
            maxlength: 11,
            rules: [],
            key: 'contactPhone'
          },
          {
            type: 'input',
            label: '邮箱',
            style: { width: '210px' },
            placeholder: '请输入联系邮箱',
            rules: [],
            key: 'mail'
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
    isUserName(query) {
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
      if (reg.test(query)) {
        return {
          name: query,
          userName: ''
        };
      } else {
        return {
          name: '',
          userName: query
        };
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let q = this.isUserName(query);
        let data = {
          ...q,
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
    onsubmit(e) {
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
    if (this.type == '1') {
      setTimeout(() => {
        this.$refs.form.value = { ...this.dataList };
        this.form = { ...this.dataList };
      }, 0);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
