<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-06-11 14:01:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: 
-->
<template>
  <div id="indexBody">
    <el-row>
      <el-col :span="24"
        ><div style="text-align:center">
          <el-select
            style="width:350px"
            v-model="form.corpName"
            filterable
            remote
            reserve-keyword
            placeholder="请输入单位名称或者社会信用代码"
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
        </div>
        <div style="text-align:center;margin:10px 0">
          <span>单位名称：</span>
          <span class="fontColor">{{ form.corpName }}</span>
          <span style="margin-left:15px">社会信用代码：</span>
          <span class="fontColor">{{ form.tyshxym }}</span>
        </div></el-col
      >
    </el-row>
    <tform
      v-show="isP"
      ref="form"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import { unit_query } from '../unitManagement/api/index';
import { resume_add } from './api/index';
export default {
  name: 'unitResumeParameterSetting',
  components: { tform },
  data() {
    return {
      isP: false,
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //是否
        yesno: trim(this.$store.getters['dictionary/yesno'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        saveBtn: {
          icon: 'el-icon-check',
          title: '提交'
        },
        style: { width: '430px', margin: '0 auto' },
        labelPosition: 'right',
        labelWidth: '200px',

        formItemList: [
          {
            type: 'radio',
            label: '是否允许简历搜索',
            rules: [
              {
                required: true,
                message: '请选择',
                trigger: 'blur'
              }
            ],
            style: { width: '190px' },
            key: 'resumeSearch',
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'number',
            controls: false,
            label: '简历可搜索次数（周）',
            style: { width: '210px' },
            placeholder: '请输入可搜索次数',
            rules: [
              {
                required: true,
                message: '请输入可搜索次数',
                trigger: 'blur'
              }
            ],
            key: 'searchTotal'
          },
          {
            type: 'radio',
            label: '是否允许简历下载',
            rules: [
              {
                required: true,
                message: '请选择',
                trigger: 'blur'
              }
            ],
            style: { width: '190px' },
            key: 'resumeDownload',
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'number',
            controls: false,
            label: '简历可下载次数（周）',
            style: { width: '210px' },
            placeholder: '请输入可下载次数',
            rules: [
              {
                required: true,
                message: '请输入可下载次数',
                trigger: 'blur'
              }
            ],
            key: 'downloadTotal'
          },
          {
            type: 'radio',
            label: '是否允许简历收藏',
            rules: [
              {
                required: true,
                message: '请选择',
                trigger: 'blur'
              }
            ],
            style: { width: '190px' },
            key: 'resumeFavor',
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'number',
            controls: false,
            label: '简历可收藏上限',
            style: { width: '210px' },
            placeholder: '请输入可收藏上限',
            rules: [
              {
                required: true,
                message: '请输入可收藏上限',
                trigger: 'blur'
              }
            ],
            key: 'favorTotal'
          },
          {
            type: 'radio',
            label: '是否进入首页“推荐单位”',
            rules: [
              {
                required: true,
                message: '请选择',
                trigger: 'blur'
              }
            ],
            style: { width: '190px' },
            key: 'indexRec',
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'number',
            controls: false,
            label: '简历可查看份数（周）',
            style: { width: '210px' },
            placeholder: '请输入份数',
            rules: [
              {
                required: true,
                message: '请输入份数',
                trigger: 'blur'
              }
            ],
            key: 'viewTotal'
          },
          {
            type: 'number',
            controls: false,
            label: '单位收藏简历时效（月）',
            style: { width: '210px' },
            placeholder: '请输入简历时效',
            rules: [
              {
                required: true,
                message: '请输入简历时效',
                trigger: 'blur'
              }
            ],
            key: 'resumeFavorAging'
          }
        ]
      },
      loading: false,
      orgOption: [],
      form: { pid: '' },
      initForm: {
        resumeSearch: '',
        searchTotal: '',
        resumeDownload: '',
        downloadTotal: '',
        resumeFavor: '',
        favorTotal: '',
        indexRec: '',
        viewTotal: '',
        resumeFavorAging: ''
      }
    };
  },
  computed: {},
  methods: {
    advancedSearch(e) {
      this.$refs.form.$refs.value.validate(valid => {
        if (valid) {
          let data = { ...e };
          resume_add(
            data,
            res => {
              if (res.status == 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.form = {};
                    this.orgOption = [];
                    this.isP = false;
                    this.$refs.form.value = { ...this.initForm };
                  }
                });
              }
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    isUserName(query) {
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
      if (reg.test(query)) {
        return {
          corpName: query,
          tyshxym: ''
        };
      } else {
        return {
          corpName: '',
          tyshxym: query
        };
      }
    },
    orgRemoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let q = this.isUserName(query);
        let params = {
          ...q,
          districtCode: '',
          entrustStatus: '1',
          pageParam: {
            pageIndex: 0,
            pageSize: 10
          }
        };

        unit_query(
          params,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.pageresult.data;
              let list = pageresult.map(e => {
                return {
                  value: e.tyshxym,
                  label: e.corpName,
                  ...e
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
      this.isP = true;
      this.form = { ...e };
      this.$refs.form.value = { ...e };
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
