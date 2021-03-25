<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-24 11:18:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <div style="text-align:right">
      <el-button size="mini" type="primary" @click="visible = true" plain>
        <i class="el-icon-date"></i> 预约设置
      </el-button>
    </div>
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <makedate :visible="visible" @onclose="onclose"></makedate>
  </div>
</template>

<script>
import tform from '../common/t_form';
import makedate from './module/makeDate';
export default {
  name: 'makeAnAppointment',
  components: { tform, makedate },
  data() {
    let widths = 250;
    return {
      visible: true,
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '150px',
        style: {
          width: '850px',
          margin: '0 auto'
        },
        saveBtn: {
          title: '保存',
          icon: ''
        },
        formItemList: [
          {
            type: 'select',
            label: '指导区',
            rules: [],
            key: 'livingArea',
            style: { width: widths + 'px' },
            options: [
              {
                value: '1',
                label: '1星',
                disabled: false
              },
              {
                value: '0',
                label: '5星',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            label: '预约日期',
            rules: [],
            key: 'livingArea',
            style: { width: widths + 'px' },
            options: [
              {
                value: '1',
                label: '1星',
                disabled: false
              },
              {
                value: '0',
                label: '5星',
                disabled: false
              }
            ]
          },
          {
            type: 'date',
            label: '预约时间',
            rules: [],
            style: { width: widths + 'px' },
            placeholder: '请输入预约时间',
            key: 'date'
          },
          {
            type: 'time',
            label: '指导时段',
            style: { width: widths + 'px' },
            rules: [],
            placeholder: '请输入指导时段',
            key: 'date',
            option: {
              start: '08:30',
              step: '00:30',
              end: '18:30'
            }
          },
          {
            type: 'input',
            label: '预约地址',
            style: { width: widths + 'px' },
            placeholder: '请输入预约地址',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '预约人证件号码',
            style: { width: widths + 'px' },
            placeholder: '请输入预约人证件号码',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '预约人姓名',
            style: { width: widths + 'px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'xm'
          },
          {
            type: 'date',
            label: '预约人出生日期',
            rules: [],
            style: { width: widths + 'px' },
            placeholder: '请输入预约人出生日期',
            key: 'date'
          },
          {
            type: 'select',
            label: '预约人学历',
            rules: [],
            key: 'livingArea',
            style: { width: widths + 'px' },
            options: [
              {
                value: '1',
                label: '1星',
                disabled: false
              },
              {
                value: '0',
                label: '5星',
                disabled: false
              }
            ]
          },
          {
            type: 'input',
            label: '联系手机',
            style: { width: widths + 'px' },
            placeholder: '请输入联系手机',
            rules: [],
            key: 'xm'
          },
          {
            type: 'select',
            label: '主要困惑',
            rules: [],
            key: 'livingArea',
            style: { width: widths + 'px' },
            options: [
              {
                value: '1',
                label: '1星',
                disabled: false
              },
              {
                value: '0',
                label: '5星',
                disabled: false
              }
            ]
          },
          {
            type: 'textarea',
            label: '困惑描述',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: widths * 2 + 160 + 'px' },
            placeholder: '请输入困惑描述',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
    advancedSearch(e) {
      console.log(e);
    },
    onclose() {
      this.visible = false;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
