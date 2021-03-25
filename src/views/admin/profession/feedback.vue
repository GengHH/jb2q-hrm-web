<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-03-23 17:28:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <el-tabs v-model="activeName">
      <el-tab-pane label="政策咨询" name="first">
        <ttable :columns="columns" :list="list">
          <el-table-column
            width="200"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-search"></i> 查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-edit"></i> 编辑</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="专门指导" name="second">
        <ttable :columns="columns2" :list="list2">
          <el-table-column
            width="200"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-search"></i> 查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-edit"></i> 编辑</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage2"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="专项指导" name="third">
        <ttable :columns="columns3" :list="list3">
          <el-table-column
            width="200"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-search"></i> 查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-edit"></i> 编辑</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="专家指导" name="fourth">
        <ttable :columns="columns4" :list="list4">
          <el-table-column
            width="200"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-search"></i> 查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="look(scope, 1)"
                plain
              >
                <i class="el-icon-edit"></i> 编辑</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="currentPage4"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <div style="text-align:right">
      <el-button size="mini" type="primary" @click="visible = true">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <adddetails :visible="visible" @onclose="onclose"></adddetails>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import adddetails from './module/addDetails';
export default {
  name: 'feedback',
  components: { ttable, tform, adddetails },
  data() {
    return {
      activeName: 'first',
      visible: false,
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
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
            label: '身份证号',
            style: { width: '210px' },
            placeholder: '请输入身份证号',
            rules: [],
            key: 'xm'
          },
          {
            type: 'checkbox',
            label: '指导类型',
            rules: [],
            key: 'checkbox',
            data: [],
            options: [
              {
                value: '1',
                label: '政策咨询',
                disabled: false
              },
              {
                value: '2',
                label: '专门指导',
                disabled: false
              },
              {
                value: '3',
                label: '专项指导',
                disabled: false
              },
              {
                value: '4',
                label: '专家指导',
                disabled: false
              }
            ]
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'aaa001' },
        { title: '证件号码', prop: 'aaa002' },
        { title: '咨询时间', prop: 'aaa003' },
        { title: '咨询地点', prop: 'aaa004' },
        { title: '咨询的政策内容', prop: 'aaa005' },
        { title: '服务的工作人员', prop: 'aaa006' },
        { title: '是否已完成咨询指导', prop: 'aaa007' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试',
          aaa007: '测试'
        }
      ],
      currentPage2: 1,

      columns2: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'aaa001' },
        { title: '证件号码', prop: 'aaa002' },
        { title: '指导时间', prop: 'aaa003' },
        { title: '指导地点', prop: 'aaa004' },
        { title: '服务的工作人员', prop: 'aaa005' },
        { title: '指导过程', prop: 'aaa006' },
        { title: '发现的问题和建议', prop: 'aaa007' },
        { title: '实施举措', prop: 'aaa008' },
        { title: '是否就业', prop: 'aaa009' },
        { title: '操作', slot: 'aaa010' }
      ],
      list2: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试',
          aaa007: '测试',
          aaa008: '测试',
          aaa009: '1'
        }
      ],
      currentPage3: 1,

      columns3: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'aaa001' },
        { title: '证件号码', prop: 'aaa002' },
        { title: '推荐时间', prop: 'aaa003' },
        { title: '推荐人', prop: 'aaa004' },
        { title: '专项指导活动名称', prop: 'aaa005' },
        { title: '操作', slot: 'aaa010' }
      ],
      list3: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试'
        }
      ],
      currentPage4: 1,
      columns4: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'aaa001' },
        { title: '证件号码', prop: 'aaa002' },
        { title: '推荐时间', prop: 'aaa003' },
        { title: '推荐人', prop: 'aaa004' },
        { title: '专项活动名称', prop: 'aaa005' },
        { title: '备注', prop: 'aaa006' },
        { title: '操作', slot: 'aaa010' }
      ],
      list4: [
        {
          aaa001: '测试',
          aaa002: '测试',
          aaa003: '测试',
          aaa004: '测试',
          aaa005: '测试',
          aaa006: '测试'
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
    advancedSearch(e) {
      console.log(e);
    },
    onclose() {
      this.visible = false;
    },
    look() {}
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
