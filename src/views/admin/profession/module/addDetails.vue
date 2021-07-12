<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-07-09 15:32:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="800px" title="" :visible="visible" @close="onclose">
      <div style="height:600px;overflow: auto;">
        <div>
          <div v-if="this.detailsType != '1'">
            <span>选择人员</span>
            <el-select
              v-model="form.pids"
              filterable
              remote
              size="small"
              reserve-keyword
              placeholder="请输入身份证号"
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
            <span style="margin-left:20px">预约记录</span>
            <el-select
              size="small"
              v-model="recordValue"
              @change="recordListClick"
              placeholder="请选择"
            >
              <el-option
                v-for="item in recordList"
                :key="item.value"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-button size="mini" type="primary" @click="focusLabel"
              >关注该人员</el-button
            >
          </div>

          <div style="margin-top:10px ">
            <span>姓名：</span> <span class="fontColor">{{ form.xm }}</span>
            <span style="margin-left:15px">身份证号：</span>
            <span class="fontColor">{{ form.zjhm }}</span>
            <span
              v-if="activeName == '02'"
              class="list"
              @mouseover="titleListShow = true"
              @mouseout="titleListShow = false"
              style="color:#fc7a43;position: relative;cursor: pointer;"
              ><i class="el-icon-caret-bottom"></i> 求职档案
              <div class="selectList" v-show="titleListShow">
                <ul>
                  <li
                    @click="liClick(k0)"
                    v-for="(v0, k0) in titleList"
                    :key="k0"
                  >
                    <span> {{ v0.title }}</span>
                    <div v-if="k0 != titleList.length - 1" class="line"></div>
                  </li>
                </ul>
              </div>
            </span>
          </div>
          <!-- 标签 -->
          <div style="margin-top:10px">
            <el-tag
              style="margin:0 4px"
              size="small"
              v-for="(v, k) in keyPointLableDataList"
              :key="k"
              >{{ v.pointTypeName }}</el-tag
            >
            <el-button
              v-if="hisLabels.length"
              size="mini"
              type="info"
              @click="lookLabel"
              >查看历史标签</el-button
            >
          </div>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane v-if="activeName == '01'" label="政策咨询" name="01">
            <tform ref="form" :formConfig="formConfig"></tform>
            <div v-if="this.detailsType != '1'" style="text-align:center">
              <el-button type="primary" @click="onsubmit">提交</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="activeName == '02'" label="专门指导" name="02">
            <el-row>
              <el-col :span="6">
                <div
                  style="text-align:right;margin-right: 10px;margin-top: 6px;"
                >
                  <span style="color:red">*</span> 个人特征
                </div>
              </el-col>
              <el-col :span="18">
                <el-tree
                  v-if="this.detailsType != '1'"
                  :data="userLabel"
                  show-checkbox
                  node-key="labelId"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @check="
                    (a, b) => {
                      setTabs(a, b);
                    }
                  "
                >
                </el-tree>
                <div style="width:100%" v-if="questionData.length">
                  <el-tag
                    style="margin:4px"
                    size="mini"
                    v-for="(tag, key) in questionData"
                    :key="key"
                  >
                    {{ tag.labelName }}
                  </el-tag>
                </div>
                <div v-if="this.detailsType == '1'">
                  <el-tag
                    size="small"
                    style="margin: 2px;"
                    v-for="item in treeStrList"
                    :key="item.pointType"
                    effect="dark"
                  >
                    {{ item.pointTypeName }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>

            <tform ref="form2" :formConfig="formConfig2"></tform>

            <el-form
              size="small"
              :model="form"
              :disabled="disabled"
              label-width="140px"
              style="width: 650px;margin: 0 auto"
            >
              <div v-show="show == '1'">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="专家姓名" prop="expertName">
                      <el-select
                        v-model="form.expertName"
                        filterable
                        remote
                        reserve-keyword
                        style="width:210px"
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading"
                        @change="expertChange"
                      >
                        <el-option
                          v-for="item in userOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                        >
                          <span>{{ item.label }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="指导地点" prop="expertGuideAddress">
                      <el-input
                        style="width:210px"
                        v-model="form.expertGuideAddress"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="开始时间" prop="expertGuideStart">
                      <el-date-picker
                        v-model="form.expertGuideStart"
                        type="date"
                        style="width:210px"
                        value-format="yyyyMMdd"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结束时间" prop="expertGuideEnd">
                      <el-date-picker
                        v-model="form.expertGuideEnd"
                        type="date"
                        style="width:210px"
                        value-format="yyyyMMdd"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="expertMemo">
                      <el-input
                        style="width:532px"
                        v-model="form.expertMemo"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-show="show == '2'">
                <el-button
                  style="margin-left:22%"
                  type="primary"
                  size="mini"
                  @click="openRec"
                  >推荐职位</el-button
                >
              </div>
              <div v-show="show == '3'">
                <el-button
                  v-if="isOrderType"
                  style="margin-left:22%"
                  type="primary"
                  size="mini"
                  @click="openServe"
                  >预约</el-button
                >
                <el-button
                  v-if="!isOrderType"
                  size="small"
                  style="margin-left:22%"
                  type="primary"
                  @click="onsubmitMake"
                  >再次预约</el-button
                >
                <!-- <div v-for="(v, k) in getInfoList" :key="k">
                  预约日期：{{ v.yyrq }}预约时间段：{{ v.yysjd }}预约地址：{{
                    v.zddz
                  }}
                </div> -->
              </div>
              <div v-show="show == '4'">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="活动名称" prop="acts">
                      <el-select
                        style="width:210px"
                        v-model="form.acts"
                        @change="showActivity"
                      >
                        <el-option
                          v-for="(v, k) in activityList"
                          :key="k"
                          :label="v.label"
                          :value="v"
                          >{{ v.label }} - {{ getQx(v.qx) }}</el-option
                        >
                      </el-select>
                      <el-select
                        style="width:115px"
                        v-model="form.qx"
                        placeholder="请选择区"
                        @change="selectActivity"
                      >
                        <el-option
                          v-for="(v, k) in dicOptions.qx"
                          :key="k"
                          :label="v.label"
                          :value="v.value"
                          >{{ v.label }}</el-option
                        >
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <div v-for="(v, k) in actList" :key="k" class="actList">
                      <el-row type="flex">
                        <el-col :span="3"> {{ k + 1 }}.开始时间: </el-col>
                        <el-col :span="3">
                          <span style="color:grey">{{
                            v.actStartTime.split(' ')[0]
                          }}</span>
                        </el-col>

                        <el-col :span="3">
                          活动地点:
                        </el-col>
                        <el-col :span="5">
                          <span style="color:grey">{{ v.actAddress }}</span>
                        </el-col>
                        <el-col :span="3">
                          主要内容:
                        </el-col>
                        <el-col :span="5">
                          <span style="color:grey">{{ v.content }}</span>
                        </el-col>
                        <el-col :span="2">
                          <span style="color:#fc6f3d">{{
                            getQx(v.districtCode)
                          }}</span>
                          <span
                            v-if="detailsType != '1'"
                            @click="
                              actList.splice(k, 1);
                              form.acts = '';
                            "
                            class="el-icon-close"
                          ></span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <div v-if="this.detailsType != '1'" style="text-align:center">
              <el-button
                v-if="(!isOrderType && show != 3) || isOrderType"
                size="small"
                style="margin-top:10px"
                type="primary"
                @click="onsubmit2"
                >提交</el-button
              >
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <recommend
      v-if="recvisible"
      :dataList="recdata"
      :visible="recvisible"
      @onclose="recvisible = false"
    ></recommend>
    <servedetails
      v-if="servevisible"
      :visible="servevisible"
      :serveData="serveData"
      @onclose="serveonclose"
      @getInfo="getInfo"
    ></servedetails>
    <pagelist
      v-if="dialogTableVisible"
      :pagelistIndex="pagelistIndex"
      :dialogTableVisible="dialogTableVisible"
      :evList="evList"
      @evclose="dialogTableVisible = false"
    ></pagelist>
    <looklabel
      v-if="visibleLabel"
      :dataList="formLabel"
      :visible="visibleLabel"
      @onclose="visibleLabel = false"
    ></looklabel>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import { trim, isZjhm, treeDataformat } from '@/utils/index';
import { emphasis_keypoint } from '../../serviceManagement/api/index';
import { synthesize_query } from '../../technocracy/api/index';
import { act_query } from '../../profession/api/index';
import {
  guide_add,
  serve_record,
  label_query,
  guide_queryPerson,
  guide_delete_label,
  guide_focus,
  order_update
} from '../api/index';
import recommend from '../../serviceManagement/pages/recommend';
import servedetails from './serveDetails';
import looklabel from './lookLabel';
import pagelist from '../../serviceManagement/module/pageList';
export default {
  name: 'addDetails',
  components: { tform, servedetails, recommend, pagelist, looklabel },
  props: ['visible', 'detailsType', 'detailsData', 'activeName'],
  data() {
    let comConfig = {
      inline: true,
      size: 'small',
      labelPosition: 'right',
      labelWidth: '140px',
      disabled: false,
      isBtn: true,
      style: {
        width: '650px',
        margin: '0 auto'
      }
    };
    return {
      isOrderType: true,
      getInfoList: [],
      questionData: [],
      dicOptions: {
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      hisLabels: [],
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      userId: this.$store.state.admin.userInfo.logonUser.userIdStr,
      keyPointLableDataList: [],
      actList: [],
      visibleLabel: false,
      dialogTableVisible: false,
      pagelistIndex: 0,
      evList: {},
      titleListShow: false,
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
      ],

      treeStrList: [],
      defaultProps: {
        children: 'labels',
        label: 'labelName'
      },
      queDefaultProps: {
        children: 'children',
        label: 'label'
      },
      issue: [],
      userLabel: [],
      recvisible: false,
      isrecord: false,
      recordValue: '',
      recordList: [],
      servevisible: false,
      disabled: false,
      show: '0',
      activityList: [],
      userOptions: [],
      form: { pids: '', pid: '' },
      orgOption: [],
      loading: false,
      value: '',
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
            rules: [
              { required: true, message: '请输入指导时间', trigger: 'blur' }
            ],
            key: 'guideTime'
          },
          {
            type: 'input',
            label: '指导地点',
            placeholder: '请输入指导地点',
            rules: [
              { required: true, message: '请输入指导地点', trigger: 'blur' }
            ],
            style: { width: '492px' },
            key: 'guideAddress'
          },
          {
            type: 'textarea',
            label: '指导过程',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入指导过程',
            rules: [
              { required: true, message: '请输入指导过程', trigger: 'blur' }
            ],
            key: 'guideProcess'
          },
          {
            type: 'textarea',
            label: '问题和建议',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入问题和建议',
            rules: [
              { required: true, message: '请输入问题和建议', trigger: 'blur' }
            ],
            key: 'problem'
          },
          {
            style: { width: '492px' },
            type: 'tree',
            label: '职业问题诊断',
            data: this.formatTree(),
            id: 'labelId',
            tags: [],
            rules: [],
            key: 'diagnosis',
            defaultProps: {
              children: 'children',
              label: 'label'
            }
          },
          {
            type: 'radio',
            label: '是否就业',
            rules: [],
            key: 'employ',
            disabled: true,
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
            disabled: true,
            rules: [],
            style: { width: '210px' },
            key: 'employType',
            options: trim(this.$store.getters['dictionary/recruit_employ_type'])
          },
          {
            type: 'textarea',
            label: '当前情况',
            disabled: true,
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '492px' },
            placeholder: '请输入当时情况',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'curSituation'
          },
          {
            type: 'select',
            label: '实施举措',
            // multiple: true,
            rules: [
              { required: true, message: '请选择实施举措', trigger: 'blur' }
            ],
            style: { width: '210px' },
            key: 'implementAct',
            options: trim(
              this.$store.getters['dictionary/recruit_imple_act_type']
            ),
            change: e => {
              this.selectChange(e);
            }
          }
        ],
        ...comConfig
      }
    };
  },
  computed: {},
  methods: {
    onsubmitMake() {
      let data = {
        ...this.detailsData,
        zdzt: '3', //3是指导成功
        userId: this.userId
      };
      this.onsubmit2(() => {
        order_update(
          data,
          res => {
            if (res.status == 200) {
              this.openServe();
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      });
    },
    getInfo(e) {
      this.getInfoList.push(e);
    },
    setTabs(a, b) {
      this.questionData = [];
      for (let i = 0; i < b.checkedNodes.length; i++) {
        if (b.checkedNodes[i].labelReal == '1') {
          this.questionData.push({
            labelId: b.checkedNodes[i].labelId,
            labelName: b.checkedNodes[i].labelName
          });
        }
      }
    },
    selectActivity(e) {
      act_query(
        {
          pageIndex: 0,
          pageSize: 20,
          actName: '',
          valid: '1',
          districtCode: e
        },
        res => {
          if (res.status == 200) {
            this.activityList = [];
            this.form.acts = '';

            let data = res.result.data.data;
            data = data.filter(e => e.release == '1');
            data = data.map(e => {
              e.value = e.actId;
              e.label = e.actName;
              e.qx = e.districtCode;
              return e;
            });
            this.activityList = data;
          } else {
            this.message('warning', res.result.data.msg);
          }
          console.log('-----------------------------');
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    lookLabel() {
      this.formLabel = this.hisLabels;
      console.log(123);
      this.visibleLabel = true;
    },
    getQx(code) {
      let data = trim(this.$store.getters['dictionary/ggjbxx_qx']);
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == code) {
          return data[i].label;
        }
      }
    },
    deletaLabel(e, k) {
      let data = { ...e };

      guide_delete_label(
        data,
        res => {
          if (res.result.data.result) {
            this.keyPointLableDataList.splice(k, 1);
            this.message('success', '删除成功');
          } else {
            this.$refs.form2.value.isAttention = '';
            this.message('warning', res.result.data.msg);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    focusLabel() {
      let data = { ...this.form };
      if (!this.form.pid) {
        this.$refs.form2.value.isAttention = '';
        this.message('warning', '请选择人员');
        return;
      }
      guide_focus(
        data,
        res => {
          if (res.result.data.result) {
            this.message('success', '关注成功', () => {
              this.keyPointLableDataList.push({
                pointType: '10',
                pointTypeName: '特别关注人员'
              });
            });
          } else {
            this.$refs.form2.value.isAttention = '';
            this.message('warning', res.result.data.msg);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    showActivity(e) {
      console.log(e);
      let list = this.actList;
      for (let i = 0; i < list.length; i++) {
        if (list[i].actId == e.actId) {
          return;
        }
      }
      list.push({ ...e });
    },
    liClick(e) {
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      this.evList.pid = this.form.pid;
      this.pagelistIndex = { id: e };
      this.dialogTableVisible = true;
    },
    openRec() {
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      this.recdata = { ...this.form };
      this.recvisible = true;
    },
    recordListClick(e) {
      this.$refs.form2.value = {
        guideTime: e.yyrq,
        guideAddress: e.yydz,
        problem: e.zysx
      };
      console.log(e);
    },
    serveonclose(e) {
      this.servevisible = false;
      if (e == '2') {
        this.onclose('2');
      }
    },
    openServe() {
      console.log(this.detailsData);
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      this.getInfoList = [];
      this.serveData = { ...this.form, isOrder: this.detailsData.isOrder };
      this.servevisible = true;
    },
    expertChange(e) {
      console.log(e);
      this.form.expertName = e.label;
      this.form.expertId = e.value;
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let data = {
          xm: query,
          pageIndex: 0,
          pageSize: 10,
          valid: 1,
          districtCode: this.adminId
        };
        synthesize_query(
          data,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.pageresult.data;
              let list = pageresult.map(e => {
                return { value: e.expertId, label: e.xm };
              });
              this.userOptions = list;
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.options = [];
      }
    },
    orgRemoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let q = isZjhm(query);
        let params = {
          zjhm: query,
          pageParam: {
            pageIndex: 0,
            pageSize: 10
          }
        };

        guide_queryPerson(
          params,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.pageresult.data;
              let list = pageresult.map(e => {
                return {
                  value: e.zjhm,
                  label: e.xm,
                  pid: e.pid,
                  contactNumber: e.lxdh,
                  keyPointLableDataList: e.labels ? e.labels : [],
                  hisLabels: e.hisLabels
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
    selectChange(e) {
      this.show = e;
      console.log(e);
    },
    userChange(e) {
      if (this.activeName == '02') {
        this.recordValue = '';
        this.recordList = [];
        this.$refs.form2.value = {
          guideTime: '',
          guideAddress: '',
          problem: ''
        };
      }

      console.log(e);
      this.form.zjhm = e.value;
      this.form.pid = e.pid;
      this.form.contactNumber = e.contactNumber;
      this.form.xm = e.label;
      //历史标签
      this.hisLabels = e.hisLabels;
      // 回显标签
      let userLabel = e.keyPointLableDataList.filter(e => {
        return Number(e.pointType) < 11;
      });
      this.keyPointLableDataList = userLabel;
      let featureLabel = e.keyPointLableDataList.filter(e => {
        return Number(e.pointType) > 10;
      });
      this.questionData = featureLabel.map(e => {
        return { labelName: e.pointTypeName };
      });

      featureLabel = featureLabel.map(e => {
        return e.pointType;
      });
      this.setCheckedKeys(featureLabel, 'tree');

      serve_record(
        { pid: e.pid },
        res => {
          if (res.status == '200') {
            let data = res.result.data;
            if (data) {
              for (let i = 0; i < data.length; i++) {
                data[i].label = data[i].yyrq + ' ' + data[i].zdsd;
                data[i].value = i;
              }
              this.recordList = data;
            }
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
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
    onclose(type) {
      this.$emit('onclose', type || 0);
    },
    onsubmit() {
      let e = { ...this.$refs.form.value };
      this.add(e);
    },
    getCheckedNodes(ref) {
      return this.$refs[ref].getCheckedNodes();
    },
    getCheckedKeys(ref) {
      return this.$refs[ref].getCheckedKeys();
    },
    setCheckedKeys(key, ref) {
      this.$refs[ref].setCheckedKeys(key);
    },
    onsubmit2(fn) {
      let tree = this.getCheckedNodes('tree').filter(e => {
        return e.labelReal == '1';
      });
      if (!tree.length) {
        this.message('warning', '请选择个人特征');
        return;
      }
      let treeData = tree.map(e => {
        return {
          labelId: e.labelId
        };
      });
      let e = {
        ...this.$refs.form2.value,
        focusLabels: treeData
      };
      if (e.diagnosis) {
        e.diagnosis = e.diagnosis
          .map(e => {
            return e.labelId;
          })
          .toString();
      }

      this.add(e, fn);
    },
    add(e, fn) {
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      let data = { ...e, ...this.form };
      //1是 0否
      if (data.isAttention == '1') {
        //10为特别关注人员
        data.focusLabels.push({ labelId: 10 });
      }
      data.acts = this.actList;

      data.guideType = this.activeName;
      if (this.activeName == '02') {
        this.$refs.form2.$refs.value.validate(valid => {
          if (valid) {
            guide_add(
              data,
              res => {
                if (typeof fn == 'function') {
                  fn();
                } else {
                  this.message('success', '操作成功', () => {
                    this.onclose('1');
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
      } else {
        guide_add(
          data,
          res => {
            this.message('success', '操作成功', () => {
              this.onclose('1');
            });
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
      console.log(data);
    },
    formatTree() {
      let question1 = this.$store.getters[
        'dictionary/recruit_diagnosis_type'
      ].map(e => {
        e.filter = 0;

        e.labelName = e.label;
        e.labelId = e.value;
        e.labelReal = '0';
        return e;
      });
      let question2 = this.$store.getters[
        'dictionary/recruit_diagnosis_que_type'
      ].map(e => {
        e.labelName = e.label;
        e.labelId = e.value;
        e.labelReal = '1';
        return e;
      });
      let data = [
        { label: '职业问题诊断', value: 0 },
        ...question1,
        ...question2
      ];
      return treeDataformat(data, 'value', 'filter', 'children', 0);
    },
    showTags(tag) {
      let question2 = this.$store.getters[
        'dictionary/recruit_diagnosis_que_type'
      ];
      let arr = [];
      for (let i = 0; i < tag.length; i++) {
        for (let j = 0; j < question2.length; j++) {
          if (question2[j].value == tag[i]) {
            arr.push({
              labelName: question2[j].label,
              labelId: question2[j].value
            });
          }
        }
      }
      return arr;
    },
    orderQuery(obj) {
      console.log(obj);
      let params = {
        zjhm: obj.sfz,
        pageParam: {
          pageIndex: 0,
          pageSize: 1
        }
      };

      guide_queryPerson(
        params,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult.data;
            let data = pageresult.map(e => {
              return {
                value: e.zjhm,
                label: e.xm,
                pid: e.pid,
                contactNumber: e.lxdh,
                keyPointLableDataList: e.labels ? e.labels : [],
                hisLabels: e.hisLabels
              };
            });
            this.userChange(data[0]);
            this.orgOption = data;
            this.form.pids = {
              value: data[0].value,
              label: data[0].label
            };

            this.$refs.form2.value.guideTime = obj.yyrq;
            this.$refs.form2.value.guideAddress = obj.yydz;
            this.$refs.form2.value.problem = obj.zykhms;

            if (this.detailsData.isOrder) {
              this.$refs.form2.value = {
                implementAct: '3'
              };
            }
            console.log(this.$refs.form2.value);
          }
          console.log(res);
        },
        err => {
          console.log('错误');
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.userLabel = this.$store.state.admin.label[1].labels;
    //是否从预约进入

    if (this.detailsData.isOrder) {
      this.orderQuery(this.detailsData);
      this.isOrderType = false;
      this.show = 3;
      console.log(this.detailsData);
    } else {
      this.isOrderType = true;
      this.form.qx = this.adminId;
      // let labels = this.$store.state.admin.label[1].labels;
      // let str = JSON.stringify(labels);
      // str = str.replace(/"labelReal":"0"/g,'"disabled":"true"')
      // console.log(str);
      // this.userLabel = JSON.parse(str)

      setTimeout(() => {
        if (this.detailsType == '1') {
          this.form = { ...this.detailsData };
          //01政策  02专门
          if (this.activeName == '01') {
            this.$refs.form.value = { ...this.detailsData };
          } else if (this.activeName == '02') {
            let tags = this.detailsData.diagnosis.split(',');
            this.formConfig2.formItemList[4].tags = this.showTags(tags);
            this.form.acts = '';
            if (this.detailsData.acts.length) {
              if (this.detailsType == '1') {
                this.actList = this.detailsData.acts;
              }
            }
            this.$refs.form2.value = { ...this.detailsData };
          }
          this.formConfig.disabled = true;
          this.formConfig2.disabled = true;
          this.show = this.detailsData.implementAct;
          this.disabled = true;
          if (this.form.labels.length) {
            let userLabel = this.form.labels.filter(e => {
              return Number(e.pointType) < 11;
            });
            this.keyPointLableDataList = userLabel;
            let featureLabel = this.form.labels.filter(e => {
              return Number(e.pointType) > 10;
            });
            this.treeStrList = featureLabel;
          }
        }
      }, 0);

      //获取活动信息

      if (this.detailsType != '1') {
        act_query(
          {
            pageIndex: 0,
            pageSize: 10,
            actName: '',
            valid: '1',
            districtCode: this.adminId
          },
          res => {
            if (res.status == 200) {
              let data = res.result.data.data;
              data = data.filter(e => e.release == '1');
              data = data.map(e => {
                e.value = e.actId;
                e.label = e.actName;
                e.qx = e.districtCode;
                return e;
              });
              this.activityList = data;
            } else {
              this.message('warning', res.result.data.msg);
            }
            console.log('-----------------------------');
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.el-icon-close {
  color: red;
  cursor: pointer;
}
.actList {
  .el-row:nth-of-type(odd) {
    margin: 5px 0 5px 0;
    padding: 5px 0 5px 0;
    background: #ebebeb;
  }
}
.fontColor {
  color: #787878;
  font-weight: bold;
}
.list:hover {
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
}
.list {
  margin: 5px 0;
  .listTiele {
    color: #fc7a43;
    font-size: 24px;
    font-weight: 600;
  }
  .listSubTiele {
    color: #a3a3a3;
    padding: 0 5px;
  }
  .selectList {
    position: absolute;
    top: 20;
    left: 0;
    width: 150px;
    height: 250px;
    background: #fefefe;
    box-shadow: 0px 0px 10px #c7c7c7;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    z-index: 9;
    span {
      cursor: pointer;
    }
    span:hover {
      cursor: pointer;
      color: #fc7a43;
    }
    .line {
      width: 100%;
      border-top: 1px solid #d0d0d0;
      margin-top: 4px;
    }
    ul {
      padding: 5px 10px;
      li {
        text-align: left;
        padding: 4px 0;
        color: #bbbbbb;
      }
    }
  }
}
</style>
