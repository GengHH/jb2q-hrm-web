<!--
 * @Author: your name
 * @Date: 2021-04-20 11:07:54
 * @LastEditTime: 2021-04-25 14:44:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\recruitmentManagement\pages\resultDetails.vue
-->
<template>
  <el-dialog
    title="招聘会反馈结果"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div
      style="height:500px;overflow: scroll;overflow-x: hidden;padding: 0 10px 0 0;"
    >
      <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_Form';
import {
  feedback_look,
  feedback_info_query,
  feedback_update
} from '../api/index';
export default {
  name: 'resultDetails',
  props: ['visible', 'lookList', 'disabled'],
  components: { tform },
  data() {
    return {
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '320px',
        style: {
          width: '650px',
          margin: '0 auto'
        },
        saveBtn: {
          title: '提交'
        },
        formItemList: [
          {
            type: 'select',
            label: '管理区',
            rules: [],
            disabled: true,
            key: 'distictCode',
            style: { width: '260px' },
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'radio',
            label: '是否面向高校毕业生',
            rules: [],
            key: 'forCollegeGraduates',
            style: { width: '260px' },
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'input',
            label: '招聘单位数',
            style: { width: '260px' },
            placeholder: '请输入招聘单位数',
            rules: [],
            disabled: true,
            key: 'corpCount'
          },
          {
            type: 'input',
            label: '其中：面向高校毕业生的招聘单位数',
            style: { width: '260px' },
            placeholder: '请输入面向高校毕业生的招聘单位数',
            rules: [],
            disabled: true,
            key: 'collegeCorpCount'
          },
          {
            type: 'input',
            label: '招聘职位数',
            style: { width: '260px' },
            placeholder: '请输入招聘职位数',
            rules: [],
            disabled: true,
            key: 'positionCount'
          },
          {
            type: 'input',
            label: '其中：面向高校毕业生的招聘职位数',
            style: { width: '260px' },
            placeholder: '请输入面向高校毕业生的招聘职位数',
            rules: [],
            disabled: true,
            key: 'collegePositionCount'
          },
          {
            type: 'input',
            label: '招聘人数',
            style: { width: '260px' },
            placeholder: '请输入招聘人数',
            rules: [],
            disabled: true,
            key: 'peopleCount'
          },
          {
            type: 'input',
            label: '其中：面向高校毕业生的招聘职人数',
            style: { width: '260px' },
            placeholder: '请输入面向高校毕业生的招聘职人数',
            rules: [],
            disabled: true,
            key: 'collegePeopleCount'
          },
          {
            type: 'input',
            label: '投递简历人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人次数',
            rules: [],
            disabled: true,
            key: 'deliveryOnTCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人次数',
            rules: [],
            disabled: true,
            key: 'collegeDeliveryTon'
          },
          {
            type: 'input',
            label: '投递简历人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人次数',
            rules: [],
            key: 'deliveryUnderTCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人次数',
            rules: [],
            key: 'collegeDeliveryTUnder'
          },
          {
            type: 'input',
            label: '投递简历人数（线上）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人数',
            rules: [],
            disabled: true,
            key: 'deliveryOnCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人数',
            rules: [],
            disabled: true,
            key: 'collegeDeliveryOn'
          },
          {
            type: 'input',
            label: '投递简历人数（线下）',
            style: { width: '260px' },
            placeholder: '请输入投递简历人数',
            rules: [],
            key: 'deliveryUnderCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的投递简历人数（线下）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的投递简历人数',
            rules: [],
            key: 'collegeDeliveryUnder'
          },
          {
            type: 'input',
            label: '入场人次数',
            style: { width: '260px' },
            placeholder: '请输入入场人次数',
            rules: [],
            key: 'admissionCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的入场人次数',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的入场人次数',
            rules: [],
            key: 'collegeAdmissionCount'
          },
          {
            type: 'input',
            label: '通知面试人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入通知面试人次数',
            rules: [],
            disabled: true,
            key: 'noticeInterviewCount'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的通知面试人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的通知面试人次数',
            rules: [],
            disabled: true,
            key: 'colNotInterCount'
          },
          {
            type: 'input',
            label: '意向录用人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入意向录用人次数',
            rules: [],
            disabled: true,
            key: 'likeCountOn'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的意向录用人次数（线上）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的意向录用人次数',
            rules: [],
            disabled: true,
            key: 'colLikeCountOn'
          },
          {
            type: 'input',
            label: '意向录用人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入意向录用人次数',
            rules: [],
            key: 'likeCountUnder'
          },
          {
            type: 'input',
            label: '其中：高校毕业生的意向录用人次数（线下）',
            style: { width: '260px' },
            placeholder: '请输入高校毕业生的意向录用人次数',
            rules: [],
            key: 'colLikeCountUnder'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    advancedSearch(e) {
      console.log(e);
    },
    onclose() {
      this.$emit('onclose');
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped></style>
