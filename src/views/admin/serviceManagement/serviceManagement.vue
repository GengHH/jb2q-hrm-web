<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-15 10:57:14
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
            <el-input placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="10" :md="9" :lg="7" :xl="6" style="text-align:right">
        <el-button type="primary">
          <i class="el-icon-search"></i>
          搜索
        </el-button>
        <el-button style="margin-left:3px" type="primary" plain>清屏</el-button>
        <el-button
          style="margin-left:3px"
          type="primary"
          plain
          @click="advancedQuery = !advancedQuery"
          >高级搜索</el-button
        >
      </el-col>
    </el-row>
    <transition name="fade">
      <div v-show="advancedQuery">
        <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
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
      :pageList="pageList"
      :dataList="dataList"
      @handleChange="handleChange"
    ></querylist>
  </div>
</template>

<script>
import querylist from './module/queryList';
import tform from '../common/t_form'; //高级查询
import axios from 'axios';
export default {
  name: 'serviceManagement',
  components: {
    querylist,
    tform
  },
  data() {
    return {
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
            key: 'checkbox',
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
            key: 'aaa',
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
            key: 'name'
          },
          {
            type: 'input',
            label: '证件号码',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name2'
          },
          {
            type: 'select',
            label: '就业状态',
            rules: [],
            style: { width: '210px' },
            key: 'aaa1',
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
            label: '居住地',
            style: { width: '210px' },
            rules: [],
            key: 'aaa2',
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
            key: 'aaa3',
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
            rules: [],
            key: 'daterange'
          },
          {
            type: 'input',
            label: '关键字',
            style: { width: '534px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name22'
          }
        ]
      },
      advancedQuery: false,
      pageList: {
        total: 15,
        pageSize: 5,
        currentPage: 1
      },
      dataList: [
        {
          aaa001: '张大军',
          aaa002: '男',
          aaa003: 0,
          aaa004: '412825199402100277',
          aaa005: '1994-02-10',
          aaa006: '本科',
          aaa007: 1,
          aaa008: [
            {
              title: '失业'
            },
            {
              title: '无业'
            }
          ],
          aaa009: [
            {
              title: '黄埔'
            },
            {
              title: '宋江'
            }
          ],
          aaa010: '2019-12-11'
        }
      ]
    };
  },
  computed: {},
  methods: {
    onsubmit(e) {
      console.log(e);
    },
    handleChange(e) {
      console.log(e + '---');
    }
  },
  created() {
    console.log(this.$store.state.admin);
  }
};
</script>

<style lang="scss" scoped></style>
