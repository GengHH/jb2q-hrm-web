<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-03-23 14:31:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="55%" title="推荐职位" :visible="visible" @close="onclose">
      <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
    </el-dialog>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
export default {
  name: 'addDetails',
  components: { tform },
  props: ['visible'],
  data() {
    return {
      formConfig: {
        inline: true,
        size: '',
        labelPosition: 'right',
        labelWidth: '100px',
        style: {
          width: '650px',
          margin: '0 auto'
        },

        formItemList: [
          {
            type: 'input',
            label: '账号',
            style: { width: '210px' },
            placeholder: '请输入账号',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入单位名称',
            rules: [],
            key: 'zjhm'
          },
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'xm1'
          },
          {
            type: 'radio',
            label: '性别',
            rules: [],
            key: 'radio',
            options: [
              {
                value: '1',
                label: '男',
                disabled: false
              },
              {
                value: '0',
                label: '女',
                disabled: false
              }
            ]
          },
          {
            type: 'input',
            label: '部门名称',
            style: { width: '210px' },
            placeholder: '请输入部门名称',
            rules: [],
            key: 'xm2'
          },
          {
            type: 'input',
            label: '职位',
            style: { width: '210px' },
            placeholder: '请输入职位',
            rules: [],
            key: 'xm3'
          },
          {
            type: 'select',
            label: '身份',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '市管理员',
                disabled: false
              },
              {
                value: '0',
                label: '区管理员',
                disabled: false
              }
            ]
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '210px' },
            placeholder: '请输入联系电话',
            rules: [],
            key: 'xm13'
          },
          {
            type: 'input',
            label: '手机号码',
            style: { width: '210px' },
            placeholder: '请输入联系手机号码',
            rules: [],
            key: 'xm23'
          },
          {
            type: 'input',
            label: '邮箱',
            style: { width: '210px' },
            placeholder: '请输入联系邮箱',
            rules: [],
            key: 'xm33'
          },
          {
            type: 'checkbox',
            label: '权限名称',
            rules: [],
            key: 'label',
            data: [],
            style: { width: '532px' },
            options: [
              {
                value: '1',
                label: '前台（见习岗位发布与处理）',
                disabled: false
              },
              {
                value: '2',
                label: '前台（见习基地管理）',
                disabled: false
              },
              {
                value: '3',
                label: '前台（岗位发布）',
                disabled: false
              }
            ]
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onclose() {
      this.$emit('onclose');
    },
    onsubmit(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
