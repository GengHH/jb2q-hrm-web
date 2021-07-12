<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-07-09 10:07:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform
      ref="tform"
      :formConfig="formConfig"
      @onsubmit="advancedSearch"
    ></tform>
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
              <div v-for="(v, k) in dicOptions.yesno" :key="k">
                <el-tag v-if="v.value == scope.row.employ">{{
                  v.label
                }}</el-tag>
              </div>
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
      <el-button
        v-if="activeName == '02'"
        size="mini"
        type="success"
        @click="orderVisible = true"
      >
        <i class="el-icon-goods"></i> 职业指导预约</el-button
      >
      <el-button size="mini" type="primary" @click="look('0')">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <el-dialog
      width="80%"
      title="职业指导预约"
      :visible="orderVisible"
      @close="orderVisible = false"
      @open="openOrder"
    >
      <div>
        <tform
          ref="ordertform"
          :formConfig="orderFormConfig"
          @onsubmit="orderSearch"
        ></tform>
        <ttable :columns="columns3" :list="list3">
          <el-table-column slot="yzdzt" label="指导状态" align="center">
            <template slot-scope="scope">
              <div v-for="(v, k) in dicOptions.zdzt" :key="k">
                <el-tag v-if="v.value == scope.row.yzdzt">{{ v.label }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="140"
            slot="aaa010"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.yzdzt == '1'">
                <el-popover placement="bottom" width="400" trigger="click">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="setState(scope, '3')"
                    >确定标记指导成功</el-button
                  >
                  <el-button slot="reference" size="mini" type="success" plain>
                    <i class="el-icon-user-solid"></i> 指导成功</el-button
                  >
                </el-popover>
                <el-popover placement="bottom" width="400" trigger="click">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="setState(scope, '4')"
                    >确定标记已失约</el-button
                  >
                  <el-button slot="reference" size="mini" type="warning" plain>
                    <i class="el-icon-user-solid"></i> 已失约</el-button
                  >
                </el-popover>
                <el-button
                  size="mini"
                  type="primary"
                  @click="orderLook(scope)"
                  plain
                >
                  <i class="el-icon-s-platform"></i> 专门指导</el-button
                >
              </div>
            </template>
          </el-table-column>
        </ttable>
        <el-pagination
          @size-change="handleChange3"
          @current-change="handleChange3"
          :current-page.sync="params3.pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="params3.total"
        >
        </el-pagination>
      </div>
    </el-dialog>
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
import { guide_query, guide_add, order_query, order_update } from './api/index';

export default {
  name: 'profeedback',
  components: { ttable, tform, adddetails },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      orderVisible: false,
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
      params3: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      orderDataList: null,
      dataList: null,
      dicOptions: {
        type: trim(this.$store.getters['dictionary/recruit_imple_act_type']),
        yesno: trim(this.$store.getters['dictionary/yesno']),
        jobType: trim(this.$store.getters['dictionary/recruit_employ_type']),

        zykh: trim(this.$store.getters['dictionary/zyjs_zyzdzykh']),
        zdzt: trim(this.$store.getters['dictionary/zyjs_zyzdzt'])
      },

      activeName: '01',
      visible: false,
      orderFormConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'select',
            label: '指导状态',
            style: { width: '210px' },
            multiple: true,
            key: 'state',
            options: trim(this.$store.getters['dictionary/zyjs_zyzdzt'])
          },
          {
            type: 'daterange',
            label: '预约日期',
            rules: [],
            key: 'time'
          },
          {
            type: 'input',
            label: '身份证号',
            style: { width: '210px' },
            placeholder: '请输入身份证号',
            rules: [],
            key: 'sfz'
          },
          {
            type: 'select',
            label: '指导区',
            style: { width: '210px' },
            key: 'qx',
            options: trim(this.$store.getters['dictionary/ggjbxx_qx'])
          }
        ]
      },
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
            type: 'select',
            label: '指导区',
            style: { width: '210px' },
            key: 'districtCode',
            options: this.setQx()
          },

          {
            type: 'select',
            label: '是否就业',
            style: { width: '210px' },
            key: 'employ',
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'select',
            label: '年龄',
            style: { width: '210px' },
            key: 'ageType',
            options: trim(this.$store.getters['dictionary/recruit_age_type'])
          },
          {
            type: 'select',
            label: '学历',
            style: { width: '210px' },
            key: 'eduId',
            options: trim(this.$store.getters['dictionary/recruit_edu'])
          },

          {
            type: 'daterange',
            label: '指导日期',
            format: 'yyyyMMdd',
            rules: [],
            key: 'guideDate'
          },
          {
            style: {
              width: '210px',
              'min-height': '56px',
              overflow: 'auto',
              position: 'absolute',
              'z-index': '999',
              'box-shadow': '0 2px 12px 0 rgb(0 0 0 / 10%)'
            },
            isQueryStyle: true,
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
          // {
          //   style: { width: '210px', height: '108px', overflow: 'auto' },
          //   type: 'tree',
          //   label: '人员标签',
          //   data: this.$store.state.admin.label,
          //   id: 'labelId',
          //   rules: [],
          //   key: 'pointTypes',
          //   defaultProps: {
          //     children: 'labels',
          //     label: 'labelName'
          //   }
          // }
        ]
      },
      userId: this.$store.state.admin.userInfo.logonUser.userIdKey,
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
      list2: [],

      columns3: [
        { title: '序号', type: 'index' },
        { title: '预约日期', prop: 'yyrq' },
        { title: '预约时段', prop: 'yysd' },
        { title: '预约地址', prop: 'yydz' },
        { title: '预约人姓名', prop: 'yyrxm' },
        { title: '身份证', prop: 'sfz' },
        { title: '手机号', prop: 'sjh' },
        { title: '指导师姓名', prop: 'zdsxm' },
        { title: '指导状态', prop: 'yzdzt', slot: 'yzdzt' },
        { title: '主要困惑', prop: 'zykh' },
        { title: '主要困惑描述', prop: 'zykhms' },
        { title: '操作', slot: 'aaa010' }
      ],
      list3: []
    };
  },
  computed: {},
  methods: {
    openOrder() {
      setTimeout(() => {
        this.$refs.ordertform.value = {
          qx: this.adminId
        };
      }, 0);

      if (this.adminId == '00') {
        this.orderFormConfig.formItemList[3].disabled = false;
      } else {
        this.orderFormConfig.formItemList[3].disabled = true;
      }
    },
    setQx() {
      let qx = [...trim(this.$store.getters['dictionary/ggjbxx_qx'])];
      qx.unshift({ label: '全部', value: '' });
      return qx;
    },
    setState(e, type) {
      let data = { ...e.row };
      data.userId = this.userId;
      data.zdzt = type;
      order_update(
        data,
        res => {
          document.body.click();
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.orderSearch(this.orderDataList);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    orderLook(e) {
      //0新增 1查看
      this.detailsData = { isOrder: true, ...e.row };
      this.detailsType = '0';

      this.visible = true;
    },
    orderSearch(e) {
      let data = { ...e };
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params3.pageIndex)) - 1;
      if (data.time) {
        data.ksrq = data.time[0];
        data.jsrq = data.time[1];
      }
      data.state = data.state ? data.state.toString() : '';
      this.orderDataList = data;
      order_query(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            if (pageresult) {
              this.list3 = pageresult.data;
              this.params3.pageIndex = Number(pageresult.pageIndex) + 1;
              this.params3.total = pageresult.total;
            }
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
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
    handleChange3(e) {
      this.params3.pageIndex = e;
      this.orderSearch(this.orderDataList);
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
      let data = { ...e };
      if (data.guideDate) {
        data.guideDateStart = data.guideDate[0];
        data.guideDateEnd = data.guideDate[1];
      }
      data.pointTypes = data.pointTypes ? data.pointTypes.toString() : '';

      //01政策  02专门
      if (this.activeName == '01') {
        this.queryPolicy(data);
      } else if (this.activeName == '02') {
        this.querySpecialized(data);
      }
    },
    onclose(type) {
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
      if (type == '2') {
        this.orderSearch(this.orderDataList);
      }
      this.visible = false;
    },
    look(type, e) {
      //0新增 1查看
      if (type == 1) {
        this.detailsData = { ...e.row };
      }
      this.detailsData.isOrder = false;
      this.detailsType = type;

      this.visible = true;
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.tform.value = {
        districtCode: this.adminId
      };
    }, 0);
  },
  created() {
    if (this.adminId == '00') {
      this.formConfig.formItemList[3].disabled = false;
    } else {
      this.formConfig.formItemList[3].disabled = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
