<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-05-27 20:17:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="55%" title="" :visible="visible" @close="onclose">
      <div>
        <span>选择人员</span>
        <el-select
          v-model="form.pids"
          filterable
          remote
          size="small"
          reserve-keyword
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
        <span style="margin-left:20px" v-if="isrecord">预约记录</span>
        <el-select
          size="small"
          v-model="recordValue"
          v-if="isrecord"
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
        <div style="margin-top:10px ">
          <span>姓名：</span> <span class="fontColor">{{ form.xm }}</span>
          <span style="margin-left:15px">身份证号：</span>
          <span class="fontColor">{{ form.zjhm }}</span>
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
              推荐职位暂无接口
            </div>
            <div v-show="show == '3'">
              <el-button
                style="margin-left:22%"
                type="primary"
                size="mini"
                @click="openServe"
                >预约</el-button
              >
            </div>
            <div v-show="show == '4'">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="活动名称" prop="acts">
                    <el-select
                      :multiple="true"
                      style="width:210px"
                      v-model="form.acts"
                    >
                      <el-option
                        v-for="(v, k) in activityList"
                        :key="k"
                        :label="v.actName"
                        :value="v.actId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-if="this.detailsType != '1'" style="text-align:center">
              <el-button type="primary" @click="onsubmit2">提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <servedetails
      v-if="servevisible"
      :visible="servevisible"
      :serveData="serveData"
      @onclose="serveonclose"
    ></servedetails>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import { trim } from '@/utils/index';
import { emphasis_keypoint } from '../../serviceManagement/api/index';
import { synthesize_query } from '../../technocracy/api/index';
import { act_query } from '../../profession/api/index';
import { guide_add, serve_record } from '../api/index';
import servedetails from './serveDetails';
export default {
  name: 'addDetails',
  components: { tform, servedetails },
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
            label: '当时情况',
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
            rules: [],
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
    recordListClick(e) {
      this.$refs.form2.value = {
        guideTime: e.yyrq,
        guideAddress: e.yydz,
        problem: e.zysx
      };
      console.log(e);
    },
    serveonclose() {
      this.servevisible = false;
    },
    openServe() {
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      this.serveData = { ...this.form };

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
          districtCode: this.$store.state.admin.userInfo.logonUser.areaInfo
            .areaCode
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
    selectChange(e) {
      this.show = e;
      console.log(e);
    },
    userChange(e) {
      console.log(e);
      this.form.zjhm = e.value;
      this.form.pid = e.pid;
      this.form.contactNumber = e.contactNumber;
      this.form.xm = e.label;
      this.isrecord = true;
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
    onsubmit2() {
      let e = { ...this.$refs.form2.value };
      this.add(e);
    },
    add(e) {
      console.log(e);
      if (!this.form.pid) {
        this.message('warning', '请选择人员');
        return;
      }
      let data = { ...e, ...this.form };
      if (data.acts) {
        data.acts = data.acts.map(e => {
          return { acyId: e };
        });
      }
      data.guideType = this.activeName;
      console.log(data);
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
  },
  mounted() {
    setTimeout(() => {
      if (this.detailsType == '1') {
        this.form = { ...this.detailsData };
        //01政策  02专门
        if (this.activeName == '01') {
          this.$refs.form.value = { ...this.detailsData };
        } else if (this.activeName == '02') {
          this.$refs.form2.value = { ...this.detailsData };
        }

        this.formConfig.disabled = true;
        this.formConfig2.disabled = true;
        this.show = this.detailsData.implementAct;
        this.disabled = true;
      }
      console.log(this.detailsData);
    }, 0);

    //获取活动信息

    act_query(
      {
        pageIndex: 0,
        pageSize: 100,
        actName: '',
        valid: '1'
      },
      res => {
        if (res.status == 200) {
          let data = res.result.data.data;
          data = data.filter(e => e.release == '1');
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
  created() {}
};
</script>

<style lang="scss" scoped>
.fontColor {
  color: #787878;
  font-weight: bold;
}
</style>
