<!--
 * @Author: your name
 * @Date: 2021-03-24 11:12:37
 * @LastEditTime: 2021-07-02 14:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\profession\module\serveDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="700px" title="预约" :visible="visible" @close="onclose">
      <div
        style="height:500px;overflow: scroll;overflow-x: hidden;padding: 0 10px 0 0;"
      >
        <div>
          预约人：<span style="margin-right:20px">{{ serveData.xm }}</span
          >身份证件号：{{ serveData.zjhm }}
        </div>
        <div style="margin-top:15px">
          选择地区：<el-select
            @change="getTime"
            size="mini"
            v-model="qxValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in qx"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="padding: 10px 0">
          <el-tag
            @click="getinfo(v)"
            style="cursor: pointer;margin: 0 5px;"
            v-for="(v, k) in timeList"
            :key="k"
            type="info"
            >{{ v }}</el-tag
          >
        </div>
        <div style="padding: 10px 0">
          <template v-for="(v, k) in infoList">
            <el-card class="box-card" v-if="v.ccxx.length" :key="k">
              <div class="text item">
                <div style="margin:5px">{{ v.zddz }}</div>
                <template v-for="(value, key) in v.ccxx">
                  <el-popconfirm
                    :key="key"
                    @confirm="onsubmit(v, value)"
                    title="确定预约吗？"
                  >
                    <el-tag
                      slot="reference"
                      style="margin:5px;cursor: pointer;"
                      type="info"
                      >{{ value.yysjd }}</el-tag
                    >
                  </el-popconfirm>
                </template>
              </div>
            </el-card>
          </template>
        </div>
        <div v-show="isform" style="padding: 10px 0">
          <tform ref="form" :formConfig="formConfig"></tform>
          <div style="text-align:center">
            <el-button size="mini" type="primary" @click="advancedSearch"
              >提交</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
import { trim } from '@/utils/index';
import { serve_info, serve_check, serve_area, serve_save } from '../api/index';
export default {
  name: 'serveDetails',
  components: { tform },
  props: ['visible', 'serveData'],
  data() {
    return {
      userTime: '',
      isform: false,
      dicOptions: {
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        kh: trim(this.$store.getters['dictionary/zyjs_zyzdzykh'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '90px',
        isBtn: true,
        style: {
          width: '650px',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '场次流水号',
            disabled: true,
            rules: [],
            style: { width: '210px' },
            key: 'cclsh'
          },
          {
            type: 'input',
            label: '预约日期',
            disabled: true,
            rules: [],
            style: { width: '210px' },
            key: 'yyrq'
          },
          {
            type: 'input',
            label: '预约时间',
            disabled: true,
            rules: [],
            style: { width: '210px' },
            key: 'yysj'
          },
          {
            type: 'input',
            label: '指导时段',
            disabled: true,
            rules: [],
            style: { width: '210px' },
            key: 'zdsd'
          },
          {
            type: 'input',
            label: '指导地址',
            disabled: true,
            rules: [],
            style: { width: '524px' },
            key: 'zddz'
          },

          {
            type: 'select',
            label: '学历',
            rules: [{ required: true, message: '请选择学历', trigger: 'blur' }],
            key: 'xlId',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/zyjs_xyjycd'])
          },
          {
            type: 'select',
            label: '困惑',
            rules: [{ required: true, message: '请选择困惑', trigger: 'blur' }],
            key: 'khId',
            style: { width: '210px' },
            options: trim(this.$store.getters['dictionary/zyjs_zyzdzykh'])
          },
          {
            type: 'textarea',
            label: '困惑描述',
            autosize: { minRows: 4, maxRows: 6 },
            style: { width: '524px' },
            placeholder: '请输入困惑描述',
            rules: [
              { required: true, message: '请输入困惑描述', trigger: 'blur' }
            ],
            key: 'khms'
          },
          {
            type: 'input',
            label: '联系手机',
            rules: [
              { required: true, message: '请输入联系手机', trigger: 'blur' },
              {
                min: 11,
                max: 11,
                message: '请输入正确的手机号',
                trigger: 'blur'
              }
            ],
            placeholder: '请输入联系手机',
            style: { width: '210px' },
            key: 'lxsj'
          }
        ]
      },
      infoList: [],
      timeList: [],
      qxValue: '',
      //区县
      qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
    };
  },
  computed: {},
  methods: {
    message(type, msg, fn) {
      this.$message({
        message: msg,
        type: type,
        duration: 1500,
        onClose: () => {
          if (fn) {
            fn();
          }
        }
      });
    },
    advancedSearch() {
      //let data = {...this.$refs.tform.value,yyqx:this.qxValue,pid:this.serveData.pid}

      this.$refs.form.$refs.value.validate(valid => {
        if (valid) {
          let data = {
            ...this.$refs.form.value,
            yyqx: this.qxValue,
            pid: this.serveData.pid
          };
          // this.message('success', '预约成功！');
          // this.infoList = [];
          // this.isform = false;
          // this.$emit('getInfo', data);
          // this.$emit('onclose');
          // return;
          serve_save(
            data,
            res => {
              if (res.status == 200) {
                if (res.result.data == '1') {
                  this.message('success', '预约成功！');
                  this.infoList = [];
                  this.isform = false;
                }
              }
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
    onsubmit(e, b) {
      let data = { ...e, ...b };
      console.log(data);

      data.pid = this.serveData.pid;
      serve_check(
        data,
        res => {
          let state = res.result.data;
          if (state == '0') {
            this.isform = true;
            data.yysj = data.yysd;
            data.zdsd = data.yysjd;
            data.yyrq = this.userTime;
            this.$refs.form.value = {
              ...data
            };
          } else if (state == '1') {
            this.message(
              'warning',
              '当前有未完成的预约指导，请完成后再次预约！'
            );
          } else if (state == '2') {
            this.message('warning', '您本月已预约3次，预约机会已用完！');
          } else if (state == '3') {
            this.message(
              'warning',
              '截止目前您已有2次失约记录，3个月内不可再次预约！'
            );
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    getinfo(e) {
      let time = e.replace(/-/g, '');
      console.log(time);
      let data = { yyrq: time, qx: this.qxValue, pid: this.serveData.pid };
      this.userTime = time;
      this.isform = false;
      serve_info(
        data,
        res => {
          console.log(res);
          if (res.status == 200) {
            this.infoList = res.result.data;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    getTime() {
      let data = { ...this.serveData, qx: this.qxValue };
      serve_area(
        data,
        res => {
          if (res.status == 200) {
            console.log(res);
            let yxDate = res.result.data.yxDate;
            yxDate = yxDate.map(e => {
              let d =
                e.substring(0, 4) +
                '-' +
                e.substring(4, 6) +
                '-' +
                e.substring(6, 8);
              return d;
            });
            this.timeList = yxDate;
            this.infoList = [];
            this.isform = false;
          }
        },
        err => {
          console.log(err);
        }
      );
    },

    onclose(type) {
      //是否从预约进入

      if (this.serveData.isOrder) {
        this.$emit('onclose', '2');
      } else {
        this.$emit('onclose', type || 0);
      }
    }
  },
  mounted() {
    let qx = this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode;
    this.qxValue = qx;
    this.getTime();
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
