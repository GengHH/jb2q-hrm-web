<!--
 * @Author: your name
 * @Date: 2021-03-16 10:58:38
 * @LastEditTime: 2021-03-16 15:29:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\adminManagement.vue
-->
<template>
  <div id="indexBody">
    <div class="queryList">
      <tform :formConfig="formConfig" @onsubmit="onsubmit"></tform>
      <el-button-group>
        <el-button
          @click="auditStutas = '2'"
          size="mini"
          :type="auditStutas == '2' ? 'primary' : ''"
          >待审核</el-button
        >
        <el-button
          @click="auditStutas = '1'"
          size="mini"
          :type="auditStutas == '1' ? 'primary' : ''"
          >通过</el-button
        >
        <el-button
          @click="auditStutas = '0'"
          size="mini"
          :type="auditStutas == '0' ? 'primary' : ''"
          >不通过</el-button
        >
      </el-button-group>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane style="margin-top:130px" label="入团" name="0">
        <ttable :columns="columns0" :list="list">
          <el-table-column slot="aaa007" label="复核状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.aaa007 == '1'" type="success"
                >通过</el-tag
              >
              <el-tag v-else type="warning">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column slot="aaa009" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 0)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
      </el-tab-pane>
      <el-tab-pane style="margin-top:130px" label="续聘" name="1">
        <ttable :columns="columns2" :list="list">
          <el-table-column slot="aaa007" label="复核状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.aaa007 == '1'" type="success"
                >通过</el-tag
              >
              <el-tag v-else type="warning">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column slot="aaa009" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 1)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
      </el-tab-pane>
      <el-tab-pane style="margin-top:130px" label="退团" name="2">
        <ttable :columns="columns3" :list="list">
          <el-table-column slot="aaa007" label="复核状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.aaa007 == '1'" type="success"
                >通过</el-tag
              >
              <el-tag v-else type="warning">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column slot="aaa009" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 2)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
      </el-tab-pane>
      <el-tab-pane style="margin-top:130px" label="转移" name="3">
        <ttable :columns="columns4" :list="list">
          <el-table-column slot="aaa007" label="复核状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.aaa007 == '1'" type="success"
                >通过</el-tag
              >
              <el-tag v-else type="warning">未通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column slot="aaa009" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="look(scope, 3)"
                plain
                >审核</el-button
              >
            </template>
          </el-table-column>
        </ttable>
      </el-tab-pane>
    </el-tabs>
    <auditdialog
      :visible="visible"
      :auditConfig="auditConfig"
      @onclose="visible = false"
    ></auditdialog>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import ttable from '../../common/t_table';
import auditdialog from './auditDialog';
export default {
  name: 'adminManagement',
  components: {
    tform,
    ttable,
    auditdialog
  },
  data() {
    return {
      visible: false,
      auditStutas: '2',
      activeName: '0',
      currentPage: 1,
      list: [
        {
          aaa001: '测试1',
          aaa002: '测试',
          aaa003: '测试3',
          aaa004: '测试',
          aaa005: '测试4',
          aaa006: '测试',
          aaa007: '1',
          aaa008: '测试'
        }
      ],
      columns0: [
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'aaa001' },
        { title: '姓名', prop: 'aaa002' },
        { title: '管理所属区', prop: 'aaa003' },
        { title: '入团时间申请', prop: 'aaa004' },
        { title: '专家状态', prop: 'aaa005' },
        { title: '新聘期开始时间', prop: 'aaa006' },
        { title: '新聘期结束时间', prop: 'aaa008' },
        { title: '复核状态', prop: 'aaa007', slot: 'aaa007' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'aaa001' },
        { title: '姓名', prop: 'aaa002' },
        { title: '续聘申请人', prop: 'aaa003' },
        { title: '续聘申请时间', prop: 'aaa004' },
        { title: '复核状态', prop: 'aaa007', slot: 'aaa007' },
        { title: '新聘期开始时间', prop: 'aaa005' },
        { title: '新聘期结束时间', prop: 'aaa006' },
        { title: '复核时间', prop: 'aaa008' },
        { title: '复核人', prop: 'aaa010' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns3: [
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'aaa001' },
        { title: '姓名', prop: 'aaa002' },
        { title: '退出理由', prop: 'aaa003' },
        { title: '退团申请人', prop: 'aaa004' },
        { title: '退团申请时间', prop: 'aaa005' },
        { title: '复核状态', prop: 'aaa007', slot: 'aaa007' },
        { title: '复核备注', prop: 'aaa006' },
        { title: '出团时间', prop: 'aaa008' },
        { title: '复核时间', prop: 'aaa011' },
        { title: '复核人', prop: 'aaa010' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      columns4: [
        { title: '序号', type: 'index' },
        { title: '专家编号', prop: 'aaa001' },
        { title: '姓名', prop: 'aaa002' },
        { title: '转移理由', prop: 'aaa003' },
        { title: '转入区', prop: 'aaa004' },
        { title: '转出申请人', prop: 'aaa005' },
        { title: '申请时间', prop: 'aaa006' },
        { title: '确认状态', prop: 'aaa007', slot: 'aaa007' },
        { title: '转移时间', prop: 'aaa008' },
        { title: '确认时间', prop: 'aaa010' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      auditConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '120px',
        isBtn: true,
        style: {
          width: '100%',
          margin: '0 auto'
        }
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        style: {
          width: '100%',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '专家编号',
            style: { width: '210px' },
            placeholder: '请输入专家编号',
            rules: [],
            key: 'name2'
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
            placeholder: '请输入证件号码',
            style: { width: '210px' },
            rules: [],
            key: 'input'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onsubmit(e) {
      console.log(e);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    look(e, type) {
      this.visible = true;
      let a = e.row;
      let b = this['columns' + type];
      let c = this.getConfigData(a, b);
      let formItemList = [];
      for (let i = 0; i < c.length; i++) {
        formItemList.push({
          type: 'input',
          label: c[i].title,
          placeholder: c[i].value,
          style: { width: '250px' },
          disabled: true,
          key: c[i].key
        });
      }
      this.auditConfig.formItemList = formItemList;
      this.auditConfig.type = type;
    },
    getConfigData(a, b) {
      let c = [];
      for (let index in a) {
        for (let i = 0; i < b.length; i++) {
          if (index == b[i].prop) {
            c.push({
              title: b[i].title,
              value: a[index],
              key: index
            });
          }
        }
      }
      return c;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#indexBody {
  position: relative;
  .queryList {
    position: absolute;
    z-index: 99;
    top: 50px;
  }
}
</style>
