<!--
 * @Author: your name
 * @Date: 2021-03-24 11:12:37
 * @LastEditTime: 2021-05-27 20:17:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\profession\module\serveDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="500px" title="预约" :visible="visible" @close="onclose">
      <div style="height:500px">
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import { serve_info, serve_save, serve_area } from '../api/index';
export default {
  name: 'serveDetails',
  components: {},
  props: ['visible', 'serveData'],
  data() {
    return {
      infoList: [],
      timeList: [],
      qxValue: '',
      //区县
      qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
    };
  },
  computed: {},
  methods: {
    onsubmit(e, b) {
      let data = { ...e, ...b };
      data.pid = this.serveData.pid;
      serve_save(
        data,
        res => {
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
      let data = { qx: this.qxValue, ...this.serveData };
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
          }
        },
        err => {
          console.log(err);
        }
      );
    },

    onclose() {
      this.$emit('onclose');
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
