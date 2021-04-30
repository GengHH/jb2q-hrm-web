<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-04-29 16:06:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->

<template>
  <div id="indexBody">
    <el-row>
      <el-col>
        <div style="margin-left:20px;color:#fc7a43">
          <span style="font-size:24px">{{ total }}</span>
          <span>人</span>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:15px 0">
      <el-col :sm="12" :md="14" :lg="16" :xl="18">
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
      <el-col :sm="12" :md="10" :lg="8" :xl="6" style="text-align:right">
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
import { trim } from '@/utils/index';
import querylist from './module/queryList';
import tform from '../common/t_form'; //高级查询
import { emphasis_keypoint } from './api/index';

export default {
  name: 'serviceManagement',
  components: {
    querylist,
    tform
  },
  data() {
    return {
      istotal: true,
      total: 0,
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
          background: '#ffffff',
          border: '1px solid #e2e2e2',
          boxShadow: '2px 2px 5px #bbbbbb'
        },

        formItemList: [
          {
            type: 'checkbox',
            label: '身份标签',
            rules: [],
            key: 'pointTypeList',
            data: [],
            style: { width: '532px' },
            options: trim(this.$store.getters['dictionary/recruit_point_type'])
          },
          {
            type: 'select',
            label: '管理所属区',
            rules: [],
            key: 'livingArea',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
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
            options: trim(this.$store.getters['dictionary/ggjbxx_jyzt'])
          },
          {
            type: 'select',
            label: '居住地',
            style: { width: '210px' },
            rules: [],
            key: 'livingAddress',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          },
          {
            type: 'select',
            label: '户籍地',
            style: { width: '210px' },
            rules: [],
            key: 'houseArea',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
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
        pageIndex: 1
      },
      dicOptions: {
        //区县
        qx: this.$store.getters['dictionary/ggjbxx_qx'],
        //重点人员类型
        type: this.$store.getters['dictionary/recruit_point_type'],
        //就业状态
        jyzt: this.$store.getters['dictionary/ggjbxx_jyzt']
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
    handleChange(e) {
      console.log(e);
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
      params.pageParam.pageIndex = this.pageList.pageIndex - 1;
      emphasis_keypoint(
        params,
        res => {
          console.log(res);
          let record = res.result.data;
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
            pageIndex: Number(record.pageIndex) + 1
          };

          if (this.istotal) {
            this.total = record.total;
            this.istotal = false;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.onSearch();
  },
  created() {}
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
