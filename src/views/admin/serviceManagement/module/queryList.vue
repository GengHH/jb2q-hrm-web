<!--
 * @Author: tangqiang
 * @Date: 2021-03-08 16:18:55
 * @LastEditTime: 2021-07-12 11:06:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\module\queryList.vue
-->
<template>
  <div id="indexBody">
    <div class="title">
      <h1>查询列表</h1>
    </div>
    <div class="body">
      <div class="list" v-for="(v, k) in dataList" :key="k">
        <el-row style="padding:25px 15px 20px 15px;">
          <el-col :md="10" :lg="10" :xl="10" class="bg-purple">
            <div>
              <span class="listTiele">{{ v.xm }}</span>
              <span class="listSubTiele">{{
                v.sexId == '1' ? '男' : '女'
              }}</span>
              <span v-for="(value, key) in dicOptions.jyzt" :key="key"
                ><el-tag
                  v-if="value.value == v.employStatus"
                  size="small"
                  :class="[v.employStatus == '1' ? 'yesColor' : 'noColor']"
                  >{{ value.label }}</el-tag
                ></span
              >
            </div>
            <div style="margin-top:15px">
              <span class="listSubTiele">{{ v.zjhm }}</span
              ><el-divider direction="vertical"></el-divider>
              <span class="listSubTiele">{{ formatTime(v.birthDate) }}</span
              ><el-divider direction="vertical"></el-divider>
              <template v-for="(val, key) in dicOptions.edu">
                <span
                  v-if="val.value == v.eduId"
                  :key="key"
                  class="listSubTiele"
                  >{{ val.label }}</span
                >
              </template>
            </div>
          </el-col>
          <el-col :md="4" :lg="4" :xl="4" style="text-align: center;">
            <div style="margin-top:20px">
              <span class="listSubTiele">是否注册平台账号</span
              ><el-checkbox
                :checked="!!Number(v.registerRecruit)"
                disabled
              ></el-checkbox>
            </div>
          </el-col>
          <el-col :md="10" :lg="10" :xl="10" style="text-align: right;">
            <div style="margin-top:20px;font-weight: 600;">
              <span
                @mouseover="v.titleListShow = true"
                @mouseout="v.titleListShow = false"
                style="color:#fc7a43;position: relative;cursor: pointer;"
                ><i class="el-icon-caret-bottom"></i> 求职档案
                <div class="selectList" v-show="v.titleListShow">
                  <ul>
                    <li
                      @click="liClick(k0, v.pid)"
                      v-for="(v0, k0) in v.titleList"
                      :key="k0"
                    >
                      <span> {{ v0.title }}</span>
                      <div
                        v-if="k0 != v.titleList.length - 1"
                        class="line"
                      ></div>
                    </li>
                  </ul>
                </div>
              </span>
              <span @click="openRec(v)" style="color:#4766a4;cursor: pointer;"
                ><i class="el-icon-s-promotion"></i> 推荐职位</span
              >
              <span @click="attention(v)" style="color:#d9534f;cursor: pointer;"
                ><i class="el-icon-star-on"></i> 取消关注</span
              >
              <span style="color:#fc6f3d;cursor: pointer;"
                ><i class="el-icon-time"></i> 历史标记</span
              >
            </div>
          </el-col>
        </el-row>
        <el-row style="padding:0px 10px;background:#eeeeee;line-height:44px">
          <el-col :md="18" :lg="18" :xl="18">
            <template v-if="v.keyPointLableDataList">
              <template v-for="(v1, k1) in v.keyPointLableDataList">
                <el-tag
                  v-if="v1.pointType == '10'"
                  style="margin:0 2px"
                  :key="'b' + k1"
                  type="warning"
                  effect="dark"
                  size="small"
                  >{{ getqx(v1.districtCode) }}-{{ v1.pointTypeName }}</el-tag
                >
                <el-tag
                  v-if="v1.pointType != '10'"
                  style="margin:0 2px"
                  :key="'k' + k1"
                  effect="plain"
                  type="info"
                  size="small"
                  >{{ v1.pointTypeName }}</el-tag
                >
              </template>
            </template>
            <template v-if="!v.keyPointLableDataList.length">{{
              '无'
            }}</template>
          </el-col>
          <el-col :md="6" :lg="6" :xl="6" style="text-align: right;">
            <span class="listSubTiele"
              >列表名单起始时间：{{
                v.updateTime ? v.updateTime.split(' ')[0] : ''
              }}</span
            >
          </el-col>
        </el-row>
      </div>

      <el-pagination
        @size-change="handleChange"
        @current-change="handleChange"
        :current-page.sync="pageListData.pageIndex"
        :page-size="pageListData.pageSize"
        layout="slot,total, prev, pager, next"
        :total="pageListData.total"
      >
        <!-- <span>【筛选的条件名】人数：</span> -->
      </el-pagination>
    </div>
    <pagelist
      v-if="dialogTableVisible"
      :pagelistIndex="pagelistIndex"
      :dialogTableVisible="dialogTableVisible"
      :evList="evList"
      @evclose="dialogTableVisible = false"
    >
    </pagelist>

    <recommend
      v-if="visible"
      :dataList="recdata"
      :visible="visible"
      @onclose="visible = false"
    ></recommend>
  </div>
</template>

<script>
import pagelist from './pageList';
import { trim } from '@/utils/index';
import recommend from '../pages/recommend'; //推荐职位
export default {
  name: 'queryList',
  props: ['pageListData', 'dataList'],
  components: {
    pagelist,
    recommend
  },
  data() {
    return {
      recdata: {},
      evList: {},
      dicOptions: {
        //就业状态
        jyzt: trim(this.$store.getters['dictionary/ggjbxx_jyzt']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      pagelistIndex: {},
      //遮罩开关
      visible: false,
      dialogTableVisible: false
    };
  },
  computed: {},
  methods: {
    getqx(code) {
      let qx = trim(this.$store.getters['dictionary/ggjbxx_qx']);
      for (let i = 0; i < qx.length; i++) {
        if (code == qx[i].value) {
          return qx[i].label;
        }
      }
      return '';
    },
    openRec(e) {
      this.recdata = { ...e };
      this.visible = true;
    },
    formatTime(time) {
      if (!time) {
        return '';
      }
      return (
        time.substring(0, 4) +
        '-' +
        time.substring(4, 6) +
        '-' +
        time.substring(6, 8)
      );
    },
    liClick(e, v) {
      this.evList.pid = v;
      this.pagelistIndex = { id: e };
      this.dialogTableVisible = true;
    },
    attention() {
      const loading = this.$loading({
        lock: true,
        text: '请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },
    handleChange(e) {
      this.$emit('handleChange', e);
    }
  },
  mounted() {
    console.log(123);
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.yesColor {
  background: #4766a4;
  color: #ffffff;
}
.noColor {
  background: #fc7a43;
  color: #ffffff;
}
#indexBody {
  .body {
    padding: 15px 0;
    .list:hover {
      box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
    }
    .list {
      border-radius: 4px;
      border: 1px solid #e5e5e5;
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
  }
  .title {
    border-bottom: 1px solid #e5e5e5;

    h1 {
      display: inline-block;
      font-size: 16px;
      color: #585858;
      padding: 8px 0;
      border-bottom: 2px solid $g-mian-color;
    }
  }
}
</style>
