<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-06-08 15:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <el-tabs v-model="activeName">
      <el-tab-pane label="政策咨询" name="01">
        <ttable :columns="columns" :list="list">
          <el-table-column
            slot="consultComplete"
            label="是否已完成咨询指导"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag>{{
                scope.row.consultComplete == '1' ? '是' : '否'
              }}</el-tag>
            </template>
          </el-table-column>
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
                @click="look('1', scope)"
                plain
              >
                <i class="el-icon-search"></i> 查看</el-button
              >
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange"
          @current-change="handleChange"
          :current-page.sync="params.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params.total"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="专门指导" name="02">
        <ttable :columns="columns2" :list="list2">
          <el-table-column slot="employ" label="是否就业" align="center">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.employ == '1' ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column slot="implementAct" label="实施举措" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.type" :key="k">
                <el-tag v-if="v.value == scope.row.implementAct">{{
                  v.label
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
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
                @click="look('1', scope)"
                plain
              >
                <i class="el-icon-search"></i> 查看</el-button
              >
              <el-popover
                v-if="scope.row.statusId != '3' && scope.row.statusId != ''"
                ref="move_add_pop"
                placement="bottom"
                width="400"
                trigger="click"
              >
                <div>
                  是否就业：
                  <el-radio
                    v-model="maintain.employ"
                    v-for="(v, k) in dicOptions.yesno"
                    :key="k"
                    :label="v.value"
                    >{{ v.label }}</el-radio
                  >
                </div>

                <el-select v-model="maintain.employType" placeholder="就业类型">
                  <el-option
                    v-for="(v, k) in dicOptions.jobType"
                    :key="k"
                    :label="v.label"
                    :value="v.value"
                  ></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="当前情况"
                  v-model="maintain.curSituation"
                >
                </el-input>
                <el-button
                  size="mini"
                  type="danger"
                  @click="maintain_add(scope)"
                  >确定修改</el-button
                >
                <el-button size="mini" slot="reference" type="danger" plain
                  >跟踪维护</el-button
                >
              </el-popover>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange2"
          @current-change="handleChange2"
          :current-page.sync="params2.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params2.total"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <div style="text-align:right">
      <el-button size="mini" type="primary" @click="look('0')">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <adddetails
      v-if="visible"
      :visible="visible"
      :detailsData="detailsData"
      :detailsType="detailsType"
      :activeName="activeName"
      @onclose="onclose"
    ></adddetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import adddetails from './module/addDetails';
import { guide_query, guide_add } from './api/index';

export default {
  name: 'feedback',
  components: { ttable, tform, adddetails },
  data() {
    return {
      maintain: {
        jobType: '',
        curSituation: '',
        employ: ''
      },
      detailsData: {},
      detailsType: '0',
      params: {
        pageIndex: 1,
        total: 0
      },
      params2: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      dataList: null,
      dicOptions: {
        type: trim(this.$store.getters['dictionary/recruit_imple_act_type']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        jobType: trim(this.$store.getters['dictionary/recruit_employ_type'])
      },

      activeName: '01',
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
            key: 'zjhm'
          },
          {
            type: 'radio',
            label: '本人指导',
            rules: [],
            key: 'selfGuide',

            data: [],
            options: [
              {
                value: '1',
                label: '是'
              },
              {
                value: '0',
                label: '否'
              }
            ]
          },
          {
            style: { width: '210px', height: '108px', overflow: 'auto' },
            type: 'tree',
            label: '人员标签',
            data: this.$store.state.admin.label,
            id: 'labelId',
            rules: [],
            key: 'pointTypes',
            defaultProps: {
              children: 'labels',
              label: 'labelName'
            }
          }
        ]
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '咨询时间', prop: 'consultTime' },
        { title: '咨询地点', prop: 'consultAddress' },
        { title: '咨询的政策内容', prop: 'consultPolicy' },
        {
          title: '是否已完成咨询指导',
          prop: 'consultComplete',
          slot: 'consultComplete'
        },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],

      columns2: [
        { title: '序号', type: 'index' },
        { title: '姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '指导时间', prop: 'guideTime' },
        { title: '指导地点', prop: 'guideAddress' },
        { title: '指导过程', prop: 'guideProcess' },
        { title: '发现的问题和建议', prop: 'problem' },
        { title: '实施举措', prop: 'implementAct', slot: 'implementAct' },
        { title: '是否就业', prop: 'employ', slot: 'employ' },
        { title: '操作', slot: 'aaa010' }
      ],
      list2: []
    };
  },
  computed: {},
  methods: {
    formatTime(time) {
      if (time) {
        if (time.length > 8) {
          let t = time.split(' ')[0];
          let tt = t.replace(/-/g, '');
          let h = time.split(' ')[1];
          let hh = h.replace(/:/g, '');
          return tt + '' + hh;
        } else {
          return time;
        }
      } else {
        return '';
      }
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
    maintain_add(e) {
      let data = { ...e.row, ...this.maintain };
      data.expertGuideEnd = this.formatTime(data.expertGuideEnd);
      data.expertGuideStart = this.formatTime(data.expertGuideStart);
      data.guideTime = this.formatTime(data.guideTime);
      data.recordTime = this.formatTime(data.recordTime);
      guide_add(
        data,
        res => {
          document.body.click();
          this.message('success', '操作成功', () => {
            this.advancedSearch(this.dataList);
          });
          this.maintain = {
            jobType: '',
            curSituation: '',
            employ: ''
          };
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    handleChange2(e) {
      this.params2.pageIndex = e;
      this.querySpecialized(this.dataList);
    },
    handleChange(e) {
      this.params.pageIndex = e;
      this.queryPolicy(this.dataList);
    },
    queryPolicy(e) {
      console.log(e);
      let data = { ...e };
      data.guideType = this.activeName;
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;
      this.dataList = data;
      guide_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.data;
            this.list = pageresult.data;
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    querySpecialized(e) {
      console.log(e);
      let data = { ...e };
      data.guideType = this.activeName;
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params2.pageIndex)) - 1;
      this.dataList = data;
      guide_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.data;
            this.list2 = pageresult.data;
            this.params2.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params2.total = pageresult.total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    advancedSearch(e) {
      if (e.pointTypes.length) {
        e.pointTypes = e.pointTypes.toString();
      }
      //01政策  02专门
      if (this.activeName == '01') {
        this.queryPolicy(e);
      } else if (this.activeName == '02') {
        this.querySpecialized(e);
      }
    },
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      this.visible = false;
    },
    look(type, e) {
      //0新增 1查看
      if (type == 1) {
        this.detailsData = { ...e.row };
      }
      this.detailsType = type;

      this.visible = true;
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
