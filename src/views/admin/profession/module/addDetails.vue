<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-03-23 18:26:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="55%" title="添加" :visible="visible" @close="onclose">
      <div>
        <span>选择人员</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option label="刘大人" value="1"> </el-option>
        </el-select>
        <div style="margin-top:10px ">
          <span>姓名：</span> <span class="fontColor">刘大人</span>
          <span style="margin-left:15px">身份证号：</span>
          <span class="fontColor">50016156124451231</span>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="政策咨询" name="first">
          <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
        </el-tab-pane>
        <el-tab-pane label="专门指导" name="second">
          <tform :formConfig="formConfig2" @onsubmit="onsubmit2"></tform>
        </el-tab-pane>
        <el-tab-pane label="专项指导" name="third">
          <tform :formConfig="formConfig3" @onsubmit="onsubmit3"></tform>
        </el-tab-pane>
        <el-tab-pane label="专家指导" name="fourth">
          <tform :formConfig="formConfig4" @onsubmit="onsubmit4"></tform>
        </el-tab-pane>
      </el-tabs>
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
    let comConfig = {
      inline: true,
      size: '',
      labelPosition: 'right',
      labelWidth: '100px',
      style: {
        width: '650px',
        margin: '0 auto'
      }
    };
    return {
      value: '',
      activeName: 'first',
      formConfig: {
        formItemList: [
          {
            type: 'date',
            label: '咨询时间',
            style: { width: '210px' },
            placeholder: '请输入咨询时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'select',
            label: '咨询地点',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '上海',
                disabled: false
              },
              {
                value: '0',
                label: '北京',
                disabled: false
              }
            ]
          },
          {
            type: 'textarea',
            label: '咨询的政策内容',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入咨询的政策内容',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'textarea',
            label: '备注',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入备注',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'radio',
            label: '是否完成咨询指导',
            rules: [],
            key: 'radio',
            options: [
              {
                value: '1',
                label: '是',
                disabled: false
              },
              {
                value: '0',
                label: '否',
                disabled: false
              }
            ]
          }
        ],
        ...comConfig
      },
      formConfig2: {
        formItemList: [
          {
            type: 'date',
            label: '指导时间',
            style: { width: '210px' },
            placeholder: '请输入指导时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'select',
            label: '指导地点',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '上海',
                disabled: false
              },
              {
                value: '0',
                label: '北京',
                disabled: false
              }
            ]
          },
          {
            type: 'textarea',
            label: '指导过程',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入指导过程',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'textarea',
            label: '问题和建议',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入问题和建议',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'select',
            label: '实施举措',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '上海',
                disabled: false
              },
              {
                value: '0',
                label: '北京',
                disabled: false
              }
            ]
          },
          {
            type: 'radio',
            label: '是否就业',
            rules: [],
            key: 'radio',
            options: [
              {
                value: '1',
                label: '是',
                disabled: false
              },
              {
                value: '0',
                label: '否',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            label: '就业类型',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '上海',
                disabled: false
              },
              {
                value: '0',
                label: '北京',
                disabled: false
              }
            ]
          },
          {
            type: 'textarea',
            label: '当时情况',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入当时情况',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          }
        ],
        ...comConfig
      },
      formConfig3: {
        formItemList: [
          {
            type: 'select',
            label: '活动类型',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '上海',
                disabled: false
              },
              {
                value: '0',
                label: '北京',
                disabled: false
              }
            ]
          },
          {
            type: 'input',
            label: '活动名称',
            placeholder: '请输入活动名称',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'name'
          },
          {
            type: 'date',
            label: '活动开始时间',
            style: { width: '210px' },
            placeholder: '请输入活动开始时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'date',
            label: '活动结束时间',
            style: { width: '210px' },
            placeholder: '请输入活动结束时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'radio',
            label: '是否专家参与',
            rules: [],
            key: 'radio',
            options: [
              {
                value: '1',
                label: '是',
                disabled: false
              },
              {
                value: '0',
                label: '否',
                disabled: false
              }
            ]
          },
          {
            type: 'input',
            label: '活动地点',
            placeholder: '请输入活动地点',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'name'
          },

          {
            type: 'textarea',
            label: '主要内容',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入主要内容',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'date',
            label: '报名开始时间',
            style: { width: '210px' },
            placeholder: '请输入活动开始时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'date',
            label: '报名截止时间',
            style: { width: '210px' },
            placeholder: '请输入活动结束时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'input',
            label: '最大报名人数（人）',
            placeholder: '',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'name'
          },
          {
            type: 'input',
            label: '最大推荐报名人数（人）',
            placeholder: '',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'name'
          }
        ],
        ...comConfig
      },
      formConfig4: {
        formItemList: [
          {
            type: 'select',
            label: '专家名称',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '上海',
                disabled: false
              },
              {
                value: '0',
                label: '北京',
                disabled: false
              }
            ]
          },
          {
            type: 'input',
            label: '指导地点 ',
            placeholder: '请输入活动名称',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'name'
          },
          {
            type: 'date',
            label: '开始时间',
            style: { width: '210px' },
            placeholder: '请输入活动开始时间',
            rules: [],
            key: 'date'
          },
          {
            type: 'date',
            label: '结束时间',
            style: { width: '210px' },
            placeholder: '请输入活动结束时间',
            rules: [],
            key: 'date'
          },

          {
            type: 'textarea',
            label: '备注',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '532px' },
            placeholder: '请输入备注',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          }
        ],
        ...comConfig
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
    },
    onsubmit2(e) {
      console.log(e);
    },
    onsubmit3(e) {
      console.log(e);
    },
    onsubmit4(e) {
      console.log(e);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.fontColor {
  color: #787878;
  font-weight: bold;
}
</style>
