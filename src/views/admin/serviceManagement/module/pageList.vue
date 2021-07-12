<!--
 * @Author: your name
 * @Date: 2021-03-09 10:07:05
 * @LastEditTime: 2021-07-09 16:54:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\module\pageList.vue
-->
<template>
  <el-dialog
    width="75%"
    title="求职档案"
    :visible="dialogTableVisible"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    @close="evclose"
    @open="onopen"
  >
    <div id="indexBody">
      <el-row style="margin-top:10px">
        <el-col :md="5" :lg="5" :xl="5">
          <div class="title">
            <ul>
              <li
                @click="skip(v)"
                :class="[!!v.state ? 'liColor' : '']"
                v-for="(v, k) in titleList"
                :key="k"
              >
                <i class="el-icon-arrow-right"></i>{{ v.title }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :md="19" :lg="19" :xl="19">
          <div ref="viewScroll" class="pageList" @scroll="scroll($event)">
            <div class="boxList" ref="b0" style="height:303px">
              <div class="boxTiele">
                <h1>个人基本信息</h1>
              </div>
              <person v-if="userPid" :userPid="userPid"></person>
            </div>
            <div class="boxList" ref="b1" style="height:900px;overflow: auto;">
              <div class="boxTiele">
                <h1>简历信息</h1>
              </div>
              <resume v-if="userPid" :userPid="userPid"></resume>
            </div>
            <div class="boxList" ref="b2" style="height:645px">
              <div class="boxTiele">
                <h1>劳动经历</h1>
              </div>
              <experience v-if="userPid" :userPid="userPid"></experience>
            </div>
            <div class="boxList" ref="b3" style="height:645px">
              <div class="boxTiele">
                <h1>社保缴费记录</h1>
              </div>
              <socialsecurity :userPid="userPid"></socialsecurity>
            </div>
            <div class="boxList" ref="b4" style="height:645px">
              <div class="boxTiele">
                <h1>就业见习记录</h1>
              </div>
              <getajob :userPid="userPid"></getajob>
            </div>
            <div class="boxList" ref="b5" style="height:645px">
              <div class="boxTiele">
                <h1>简历投递及反馈记录</h1>
              </div>
              <feedback :userPid="userPid"></feedback>
            </div>
            <div class="boxList" ref="b6" style="height:645px">
              <div class="boxTiele">
                <h1>职位评论记录</h1>
              </div>
              <comment :userPid="userPid"></comment>
            </div>
            <div class="boxList" ref="b7" style="height:645px">
              <div class="boxTiele">
                <h1>职位收藏记录</h1>
              </div>
              <collect :userPid="userPid"></collect>
            </div>
            <div class="boxList" ref="b8" style="height:645px">
              <div class="boxTiele">
                <h1>就业服务记录</h1>
              </div>
              <serve @gotoRuter="gotoRuter" :userPid="userPid"></serve>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import collect from '../pages/collect'; //职位收藏记录
import comment from '../pages/comment'; //职位评论记录
import experience from '../pages/experience'; //劳动经历
import feedback from '../pages/feedback'; //简历投递及反馈记录
import getajob from '../pages/getAJob'; //就业见习记录
import person from '../pages/person'; //个人基本信息
import resume from '../pages/resume'; //简历信息
import serve from '../pages/serve'; //就业服务记录
import socialsecurity from '../pages/socialSecurity'; //社保缴费记录
import { allAction } from '@/api/adminApi';
export default {
  name: 'pageList',
  props: ['dialogTableVisible', 'pagelistIndex', 'evList'],
  components: {
    collect,
    comment,
    experience,
    feedback,
    getajob,
    person,
    resume,
    serve,
    socialsecurity
  },
  data() {
    return {
      timenumber: 0,
      istime: true,
      userPid: '',
      loading: false,
      isData: false,
      person: {},
      resume: {},
      experience: [],
      socialsecurity: [],
      getajob: [],
      feedback: [],
      comment: [],
      collect: [],
      serve: [],

      arrListHeight: [],
      titleList: [
        { title: '个人基本信息', state: true, id: 0 },
        { title: '简历信息', state: false, id: 1 },
        { title: '劳动经历', state: false, id: 2 },
        { title: '社保缴费记录', state: false, id: 3 },
        { title: '就业见习记录', state: false, id: 4 },
        { title: '简历投递及反馈记录', state: false, id: 5 },
        { title: '职位评论记录', state: false, id: 6 },
        { title: '职位收藏记录', state: false, id: 7 },
        { title: '就业服务记录', state: false, id: 8 }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    gotoRuter(path) {
      this.dialogTableVisible = false;
      this.$router.push({ path: path });
    },
    evclose() {
      this.$emit('evclose');
    },
    //获取现在的高
    setHright() {
      this.arrListHeight = [];
      for (let i = 0; i < this.titleList.length; i++) {
        this.arrListHeight.push(this.$refs['b' + i].offsetHeight);
      }
      console.log(this.arrListHeight);
    },
    skip(e) {
      this.setHright();
      let height = 0;
      let id = e.id;
      for (let i = 0; i < this.titleList; i++) {
        this.titleList[i].state = false;
      }
      this.titleList[id].state = true;
      for (let i = 0; i < id; i++) {
        height += this.arrListHeight[i];
      }
      console.log(height);
      this.$refs.viewScroll.scrollTop = height + 1;
    },
    scroll(e) {
      let top = e.srcElement.scrollTop;
      let height = this.arrListHeight;
      let bar = 0;
      let obar = 0;
      for (let i = 0; i < height.length; i++) {
        bar += height[i];
        if (i == 0) {
          this.titleList[i].state = false;
          if (top <= bar) {
            this.titleList[i].state = true;
          }
        } else {
          this.titleList[i].state = false;
          obar += height[i - 1];
          if (top <= bar && top >= obar) {
            this.titleList[i].state = true;
          }
        }
      }
    },
    queryHtml() {
      let time = setInterval(() => {
        if (this.timenumber > 60) {
          this.istime = false;
          this.loading = false;
          clearInterval(time);
        }
        let height = this.$refs.b1.offsetHeight;
        if (this.istime && height == '889') {
          this.timenumber++;
        } else {
          this.istime = false;
          clearInterval(time);
          this.loading = false;
          this.skip(this.pagelistIndex);
        }
      }, 1000);
      //简历的默认高度
    },
    onopen() {},
    handleAsync() {
      return new Promise(resolve => {
        resolve();
      });
    },
    async handleShow(fn) {
      await this.handleAsync().then(() => {
        fn();
      });
    }
  },
  created() {
    //this.loading = true;
    this.userPid = this.evList.pid;
    this.isData = true;
    setTimeout(() => {
      this.skip(this.pagelistIndex);
    }, 0);
  },
  mounted() {
    // setTimeout(() => {
    //   this.queryHtml();
    // }, 0);
  }
};
</script>

<style lang="scss" scoped>
.el-icon-loading {
  z-index: 999;
}
.liColor {
  color: #fc7a43;
}
#indexBody {
  .pageList {
    padding: 0 10px;
    height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    .boxList {
      .boxTiele {
        border-bottom: 1px solid #e5e5e5;
        h1 {
          padding: 10px 0;
          display: inline-block;
          font-size: 20px;
          color: #585858;
          border-bottom: 2px solid $g-mian-color;
        }
      }
    }
  }
  .title {
    padding: 0 0 10px 0;
    ul {
      border-right: 1px solid #d6d6d6;
      li {
        margin: 15px 0;
      }
      li:hover {
        color: #fc7a43;
        cursor: pointer;
      }
      li:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
