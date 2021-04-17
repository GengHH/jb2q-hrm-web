<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-04-17 17:05:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="55%" title="添加" :visible="visible" @close="onclose">
      <div>
        <span>选择人员</span>
        <el-select
          v-model="form.pids"
          filterable
          remote
          reserve-keyword
          style="width:350px"
          placeholder="请输入关键词"
          :remote-method="orgRemoteMethod"
          :loading="loading"
          @change="userChange"
        >
          <el-option
            v-for="item in orgOption"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
            <span>{{ item.label }}</span
            >-<span>{{ item.value }}</span>
          </el-option>
        </el-select>
        <div style="margin-top:10px ">
          <span>姓名：</span> <span class="fontColor">{{ form.xm }}</span>
          <span style="margin-left:15px">身份证号：</span>
          <span class="fontColor">{{ form.pid }}</span>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="政策咨询" name="01">
          <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
        </el-tab-pane>
        <el-tab-pane label="专门指导" name="02">
          <tform :formConfig="formConfig2" @onsubmit="onsubmit2"></tform>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import { trim } from '@/utils/index';
import { emphasis_keypoint } from '../../serviceManagement/api/index';
import { guide_add } from '../api/index';
export default {
  name: 'addDetails',
  components: { tform },
  props: ['visible'],
  data() {
    let comConfig = {
      inline: true,
      size: '',
      labelPosition: 'right',
      labelWidth: '140px',
      saveBtn: {
        title: '提交'
      },
      style: {
        width: '650px',
        margin: '0 auto'
      }
    };
    return {
      form: { pids: '', pid: '' },
      orgOption: [],
      loading: false,
      value: '',
      activeName: '01',
      formConfig: {
        formItemList: [
          {
            type: 'date',
            label: '咨询时间',
            style: { width: '210px' },
            placeholder: '请输入咨询时间',
            format: 'yyyyMMdd',
            rules: [],
            key: 'consultTime'
          },
          {
            type: 'input',
            label: '咨询地点',
            placeholder: '请输入咨询地点',
            rules: [],
            style: { width: '492px' },
            key: 'consultAddress'
          },
          {
            type: 'textarea',
            label: '咨询的政策内容',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入咨询的政策内容',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'consultPolicy'
          },
          {
            type: 'textarea',
            label: '备注',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入备注',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'consultMemo'
          },
          {
            type: 'radio',
            label: '是否完成咨询指导',
            rules: [],
            key: 'consultComplete',
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
            format: 'yyyyMMdd',
            style: { width: '210px' },
            placeholder: '请输入指导时间',
            rules: [],
            key: 'guideTime'
          },
          {
            type: 'input',
            label: '指导地点',
            placeholder: '请输入指导地点',
            rules: [],
            style: { width: '492px' },
            key: 'guideAddress'
          },
          {
            type: 'textarea',
            label: '指导过程',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入指导过程',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'guideProcess'
          },
          {
            type: 'textarea',
            label: '问题和建议',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入问题和建议',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'problem'
          },
          {
            type: 'select',
            label: '实施举措',
            rules: [],
            style: { width: '210px' },
            key: 'implementAct',
            options: trim(
              this.$store.getters['dictionary/recruit_imple_act_type']
            )
          },
          {
            type: 'radio',
            label: '是否就业',
            rules: [],
            key: 'employ',
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
            key: 'employType',
            options: trim(this.$store.getters['dictionary/recruit_employ_type'])
          },
          {
            type: 'textarea',
            label: '当时情况',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入当时情况',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'curSituation'
          }
        ],
        ...comConfig
      }
    };
  },
  computed: {},
  methods: {
    orgRemoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let params = {
          xm: query,
          pageParam: {
            pageIndex: 0,
            pageSize: 10
          }
        };

        emphasis_keypoint(
          params,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.data.data;
              let list = pageresult.map(e => {
                return {
                  value: e.zjhm,
                  label: e.xm,
                  pid: e.pid,
                  contactNumber: e.contactNumber
                };
              });
              this.orgOption = list;
            }
            console.log(res);
          },
          err => {
            console.log('错误');
            console.log(err);
          }
        );
      } else {
        this.options = [];
      }
    },
    userChange(e) {
      console.log(e);
      this.form.zjhm = e.value;
      this.form.pid = e.pid;
      this.form.contactNumber = e.contactNumber;
      this.form.xm = e.label;
    },
    message(type, msg, fn) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {
          if (fn) {
            fn();
          }
        }
      });
    },
    onclose() {
      this.$emit('onclose');
    },
    onsubmit(e) {
      this.add(e);
    },
    onsubmit2(e) {
      this.add(e);
    },
    add(e) {
      console.log(e);
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      let data = { ...e, ...this.form };
      data.guideType = this.activeName;
      console.log(data);
      guide_add(
        data,
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
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
