<!--
 * @Author: your name
 * @Date: 2021-04-14 17:01:28
 * @LastEditTime: 2021-04-15 10:23:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\recruitment\position.vue
-->
<template>
  <el-dialog
    title="职位审核"
    width="730px"
    :visible="resVisible"
    @close="onclose"
    append-to-body
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <div class="title-style">详细信息</div>
      <tform ref="form" :formConfig="formConfig"></tform>
      <div v-if="type == '1'">
        <div class="title-style">审核</div>
        <el-form size="small" :model="form" label-width="100px">
          <el-form-item label="审核状态">
            <el-select
              style="width:210px"
              v-model="form.statusId"
              @change="selectChange"
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
    </div>
  </el-dialog>
</template>

<script>
import tform from '../../../common/t_form'; //高级查询
import { agency_position_verify } from '../../api/index';
import { trim } from '@/utils/index';
export default {
  name: 'position',
  props: ['resVisible', 'data', 'type'],
  components: { tform },
  data() {
    return {
      form: {
        statusId: '2',
        verifyMemo: ''
      },
      dicOptions: {
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year']),
        //工作性质
        workNature: trim(this.$store.getters['dictionary/recruit_work_nature'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        disabled: true,
        isBtn: true,
        style: {
          width: '100%',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '职位名称',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'positionName'
          },

          {
            type: 'input',
            label: '薪酬',
            placeholder: '',
            style: { width: '210px' },
            rules: [],
            key: 'salary'
          },
          {
            type: 'select',
            label: '学历要求',
            rules: [],
            style: { width: '210px' },
            key: 'eduRequir',
            options: trim(this.$store.getters['dictionary/recruit_edu'])
          },
          {
            type: 'select',
            label: '工作年限',
            rules: [],
            style: { width: '210px' },
            key: 'workYearNeed',
            options: trim(this.$store.getters['dictionary/recruit_work_year'])
          },
          {
            type: 'select',
            label: '工作性质',
            rules: [],
            style: { width: '210px' },
            key: 'workNature',
            options: trim(this.$store.getters['dictionary/recruit_work_nature'])
          },
          {
            type: 'input',
            label: '招聘人数',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'recruitNum'
          },
          {
            type: 'input',
            label: '工作地点',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'workAddress'
          },
          {
            style: { width: '210px' },
            type: 'date',
            label: '发布时间',
            placeholder: '',
            rules: [],
            key: 'releaseTime'
          }
        ]
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
            message: '请填写理由',
            type: 'warning'
          });
          return;
        }
      }

      agency_position_verify(
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
      console.log(this.type);
      this.data.salary = this.data.salaryMin + '-' + this.data.salaryMax;
      this.$refs.form.value = this.data;
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
