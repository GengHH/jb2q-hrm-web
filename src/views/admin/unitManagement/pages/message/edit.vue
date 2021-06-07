<!--
 * @Author: your name
 * @Date: 2021-04-12 16:37:56
 * @LastEditTime: 2021-05-20 10:36:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\message\edit.vue
-->
<template>
  <el-dialog
    title="代理招聘编辑"
    width="710px"
    :visible="visible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <tform
        ref="tform"
        :formConfig="formConfig"
        @onsubmit="advancedSearch"
      ></tform>
    </div>
  </el-dialog>
</template>

<script>
import tform from '../../../common/t_form';
import { trim } from '@/utils/index';
import { unit_edit } from '../../api/index';
export default {
  name: 'edit',
  props: ['visible', 'form'],
  components: { tform },
  data() {
    return {
      dicOptions: {
        //行业分类
        type: trim(this.$store.getters['dictionary/recruit_industry_type']),
        //单位性质
        nature: trim(this.$store.getters['dictionary/recruit_corp_nature']),
        //工作性质
        workNature: trim(this.$store.getters['dictionary/recruit_work_nature']),
        //招聘类型
        recType: trim(this.$store.getters['dictionary/recruit_type']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        saveBtn: {
          title: '提交'
        },

        formItemList: [
          {
            type: 'input',
            label: '职位名称',
            style: { width: '210px' },
            placeholder: '请输入职位名称',
            rules: [],
            key: 'positionName'
          },
          {
            type: 'select',
            label: '招聘类型',
            rules: [],
            key: 'recruitType',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/recruit_type'])
          },
          {
            type: 'input',
            label: '薪酬上限',
            style: { width: '210px' },
            placeholder: '请输入薪酬上限',
            rules: [],
            key: 'salaryMax'
          },
          {
            type: 'input',
            label: '薪酬下限',
            style: { width: '210px' },
            placeholder: '请输入薪酬下限',
            rules: [],
            key: 'salaryMin'
          },
          {
            type: 'select',
            label: '学历',
            rules: [],
            key: 'eduRequire',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/recruit_edu'])
          },
          {
            type: 'select',
            label: '工作年限',
            rules: [],
            key: 'workYearNeed',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/recruit_work_year'])
          },
          {
            type: 'select',
            label: '工作性质',
            rules: [],
            key: 'workNature',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/recruit_work_nature'])
          },
          {
            type: 'input',
            label: '招聘人数',
            style: { width: '210px' },
            placeholder: '请输入招聘人数',
            rules: [],
            key: 'recruitNum'
          },
          {
            type: 'select',
            label: '工作地点',
            rules: [],
            key: 'workArea',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'date',
            label: '发布时间',
            style: { width: '210px' },
            placeholder: '请输入发布时间',
            rules: [],
            key: 'releaseTime'
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
    advancedSearch(e) {
      let data = { ...e };
      unit_edit(
        data,
        res => {
          if (res.result.data.result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.onclose(1);
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
  created() {},
  mounted() {
    setTimeout(() => {
      this.$refs.tform.value = { ...this.form };
    }, 0);
  }
};
</script>
<style lang="scss" scoped></style>
