<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-26 16:48:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->

<template>
  <div id="indexBody">
    <el-row>
      <el-col>
        <div style="margin-left:20px;color:#fc7a43">
          <span style="font-size:24px">4561131</span>
          <span>人</span>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:15px 0">
      <el-col :sm="14" :md="15" :lg="17" :xl="18">
        <el-row>
          <el-col :span="2">
            <div style="line-height:40px;text-align:center">关键字</div>
          </el-col>
          <el-col :span="22">
            <el-input
              :disabled="advancedQuery"
              v-model="form.gjz"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="10" :md="9" :lg="7" :xl="6" style="text-align:right">
        <el-button @click="onSearch" type="primary">
          <i class="el-icon-search"></i>
          搜索
        </el-button>
        <el-button
          @click="form.gjz = ''"
          style="margin-left:3px"
          type="primary"
          plain
          >清屏</el-button
        >
        <el-button
          style="margin-left:3px"
          type="primary"
          plain
          @click="
            advancedQuery = !advancedQuery;
            form.gjz = '';
          "
          :icon="!advancedQuery ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          >高级搜索</el-button
        >
      </el-col>
    </el-row>

    <transition name="bounce">
      <div v-show="advancedQuery">
        <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
      </div>
    </transition>
    <!-- <el-row>
      <el-col style="text-align:right">
        <el-button size="mini" type="info" plain round>平台注册用户</el-button>
        <el-button size="mini" type="info" plain round>大库特定用户</el-button>
      </el-col>
    </el-row> -->
    <!-- ----------------------------------------------------------------------------------- -->
    <querylist
      :pageListData="pageList"
      :dataList="dataList"
      @handleChange="handleChange"
    ></querylist>
  </div>
</template>

<script>
import querylist from './module/queryList';
import tform from '../common/t_form'; //高级查询
import { emphasis_keypoint } from './api/index';
import { allAction } from '@/api/adminApi';

export default {
  name: 'serviceManagement',
  components: {
    querylist,
    tform
  },
  data() {
    return {
      dates: ['2021-03-16', '2021-03-17'],
      form: {
        gjz: ''
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        style: {
          width: '650px',
          margin: '0 auto',
          background: '#eaeaea',
          border: '1px solid #e2e2e2',
          boxShadow: '2px 2px 5px #bbbbbb'
        },

        formItemList: [
          {
            type: 'checkbox',
            label: '身份标签',
            rules: [],
            key: 'label',
            data: [],
            style: { width: '532px' },
            options: [
              {
                value: '1',
                label: '就业困难人员',
                disabled: false
              },
              {
                value: '2',
                label: '登记失业人员',
                disabled: false
              },
              {
                value: '3',
                label: '长期失业青年',
                disabled: false
              },
              {
                value: '4',
                label: '退工三个月仍无业人员',
                disabled: false
              },
              {
                value: '5',
                label: '基层排摸无业人员',
                disabled: false
              },
              {
                value: '6',
                label: '退役军人',
                disabled: false
              },
              {
                value: '7',
                label: '高校毕业生',
                disabled: false
              },
              {
                value: '8',
                label: '特别关注人员',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            label: '管理所属区',
            rules: [],
            key: 'livingArea',
            style: { width: '210px' },
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
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'xm'
          },
          {
            type: 'input',
            label: '证件号码',
            style: { width: '210px' },
            placeholder: '请输入证件号码',
            rules: [],
            key: 'zjhm'
          },
          {
            type: 'select',
            label: '就业状态',
            rules: [],
            style: { width: '210px' },
            key: 'employStatus',
            options: [
              {
                value: '1',
                label: '已就业',
                disabled: false
              },
              {
                value: '0',
                label: '无业',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            label: '居住地',
            style: { width: '210px' },
            rules: [],
            key: 'livingAddress',
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
            type: 'select',
            label: '户籍地',
            style: { width: '210px' },
            rules: [],
            key: 'houseArea',
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
            type: 'daterange',
            label: '至今天数',
            style: { width: '210px' },
            format: 'yyyy-MM-dd',
            rules: [],
            key: 'time'
          },
          {
            type: 'input',
            label: '关键字',
            style: { width: '534px' },
            placeholder: '请输入关键字',
            rules: [],
            key: 'gjz'
          }
        ]
      },
      advancedQuery: false,
      pageList: {
        total: 0,
        pageSize: 5,
        pageIndex: 0
      },
      dicOptions: {
        //区县
        option1: this.$store.getters['dictionary/ggjbxx_qx'],
        //工作性质
        option2: this.$store.getters['dictionary/recruit_work_nature'],
        //专业（暂时没有）
        option3: this.$store.getters['dictionary/ggjbxx_qx'],
        //学历
        option4: this.$store.getters['dictionary/recruit_edu'],
        // 语种
        option5: this.$store.getters['dictionary/recruit_language_type'],
        // 语言等级
        option6: this.$store.getters['dictionary/recruit_language_level'],
        //职位
        option7: this.$store.getters['dictionary/recruit_position_f_type'],
        //行业
        option8: this.$store.getters['dictionary/recruit_position_s_type'],
        //身份标签
        option9: [
          { value: '01', label: '就业困难人员' },
          { value: '04', label: '登记失业人员' },
          { value: '05', label: '长期失业青年' },
          { value: '06', label: '退工三个月仍无业人员' },
          { value: '07', label: '基层排摸无业人员' },
          { value: '09', label: '退役军人' },
          { value: '10', label: '高校毕业生' },
          { value: '12', label: '特别关注人员' }
        ]
      },
      dataList: [],
      titleList: [
        { title: '个人基本信息' },
        { title: '简历信息' },
        { title: '劳动经历' },
        { title: '社保缴费记录' },
        { title: '就业见习记录' },
        { title: '简历投递及反馈记录' },
        { title: '职位评论记录' },
        { title: '职位收藏记录' },
        { title: '就业服务记录' }
      ]
    };
  },
  computed: {},
  methods: {
    onsubmit(e) {
      console.log(e);
    },
    handleChange(e) {
      this.pageList.pageIndex = e;
      this.onSearch();
    },
    advancedSearch(e) {
      console.log(e);
      this.form = { ...e };
      if (this.form.time) {
        this.form.zjtsStart = this.form.time[0];
        this.form.zjtsEnd = this.form.time[1];
      }

      this.onSearch();
    },
    onSearch() {
      console.log('------------------');
      let params = { ...this.form };
      params.pageParam = { ...this.pageList };
      const loading = this.$loading({
        lock: true,
        text: '搜索中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      });

      emphasis_keypoint(
        params,
        res => {
          loading.close();
          console.log(res);
          let record = res.result.record;
          let data = record.data.map(e => {
            e.titleList = this.titleList;
            e.titleListShow = false;
            return e;
          });
          console.log(data);
          this.dataList = data;
          this.pageList = {
            total: record.total,
            pageSize: record.pageSize,
            pageIndex: record.pageIndex
          };
        },
        err => {
          console.log(err);
        }
      );
    }
  },

  created() {
    let fn = [
      {
        url: '/admin/keypoint/show/resume',
        data: { pid: '200008000237040' }
      },
      {
        url: '/admin/keypoint/show/employ',
        data: { pid: '200008000237040' }
      },
      {
        url: '/admin/keypoint/show/favor',
        data: { pid: '200008000237040' }
      },
      {
        url: '/admin/keypoint/show/labor',
        data: { pid: '200008000237040' }
      },
      {
        url: '/admin/keypoint/show/evaluation',
        data: { pid: '200008000237040' }
      }
    ];
    allAction(
      fn,
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    console.log(this.$store.state.admin);
    console.log('----------------------------------');
  }
};
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(0, -50px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
