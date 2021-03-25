<!--
 * @Author: tangqiang
 * @Date: 2021-03-08 16:18:55
 * @LastEditTime: 2021-03-23 10:20:26
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
        <el-row>
          <el-col :md="9" :lg="9" :xl="9" class="bg-purple">
            <div>
              <span class="listTiele">{{ v.xm }}</span>
              <span class="listSubTiele">{{ v.sex }}</span>
              <span
                ><el-tag
                  size="small"
                  :class="[!!v.registerRecruit ? 'yesColor' : 'noColor']"
                  >{{ !!v.registerRecruit ? '已就业' : '未就业' }}</el-tag
                ></span
              >
            </div>
            <div style="margin-top:15px">
              <span class="listSubTiele">{{ v.zjhm }}</span
              ><el-divider direction="vertical"></el-divider>
              <span class="listSubTiele">{{ v.birthDate }}</span
              ><el-divider direction="vertical"></el-divider>
              <span class="listSubTiele">{{ v.specialFocus }}</span>
            </div>
          </el-col>
          <el-col :md="5" :lg="5" :xl="5" style="text-align: center;">
            <div style="margin-top:20px">
              <span class="listSubTiele">是否注册平台账号</span
              ><el-checkbox :checked="!!v.employStatus" disabled></el-checkbox>
            </div>
          </el-col>
          <el-col :md="10" :lg="10" :xl="10" style="text-align: right;">
            <div style="margin-top:20px;font-weight: 600;">
              <span
                @mouseover="show = true"
                @mouseout="show = false"
                style="color:#fc7a43;position: relative;cursor: pointer;"
                ><i class="el-icon-caret-bottom"></i> 求职档案
                <div class="selectList" v-show="show">
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
              <span
                @click="visible = true"
                style="color:#4766a4;cursor: pointer;"
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
        <el-row style="margin-top:10px">
          <el-col :md="18" :lg="18" :xl="18">
            <el-tag
              style="margin:0 2px"
              v-for="(v1, k1) in v.aaa008"
              :key="'k' + k1"
              effect="plain"
              type="info"
              size="small"
              >{{ v1.title }}</el-tag
            >
            <el-tag
              style="margin:0 2px"
              v-for="(v2, k2) in v.aaa009"
              :key="k2"
              type="warning"
              effect="dark"
              size="small"
              >关注-{{ v2.title }}</el-tag
            >
          </el-col>
          <el-col :md="6" :lg="6" :xl="6" style="text-align: right;">
            <span class="listSubTiele"
              >列表名单起始时间：{{ v.updateTime }}</span
            >
          </el-col>
        </el-row>
      </div>
      <el-pagination
        @size-change="handleChange"
        @current-change="handleChange"
        :current-page.sync="pageListData.pageIndex"
        :page-size="pageListData.pageSize"
        layout="prev, pager, next, jumper"
        :total="pageListData.total"
      >
      </el-pagination>
    </div>
    <pagelist
      v-if="dialogTableVisible"
      :pagelistIndex="pagelistIndex"
      :dialogTableVisible="dialogTableVisible"
      @evclose="dialogTableVisible = false"
    >
    </pagelist>

    <recommend :visible="visible" @onclose="visible = false"></recommend>
  </div>
</template>

<script>
import pagelist from './pageList';
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
      pagelistIndex: {},
      //遮罩开关
      visible: false,
      dialogTableVisible: false,
      show: false,

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
      ]
    };
  },
  computed: {},
  methods: {
    liClick(e) {
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
    .list {
      padding: 15px 20px;
      border: 1px solid #e5e5e5;
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
