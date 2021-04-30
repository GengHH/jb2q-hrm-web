<!--
 * @Author: your name
 * @Date: 2021-03-09 10:07:05
 * @LastEditTime: 2021-04-29 15:36:47
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
            <div class="boxList" ref="b0">
              <div class="boxTiele">
                <h1>个人基本信息</h1>
              </div>
              <person :form="person"></person>
            </div>
            <div class="boxList" ref="b1">
              <div class="boxTiele">
                <h1>简历信息</h1>
              </div>
              <resume :form="resume"></resume>
            </div>
            <div class="boxList" ref="b2">
              <div class="boxTiele">
                <h1>劳动经历</h1>
              </div>
              <experience :list="experience"></experience>
            </div>
            <div class="boxList" ref="b3">
              <div class="boxTiele">
                <h1>社保缴费记录</h1>
              </div>
              <socialsecurity :list="socialsecurity"></socialsecurity>
            </div>
            <div class="boxList" ref="b4">
              <div class="boxTiele">
                <h1>就业见习记录</h1>
              </div>
              <getajob :lists="getajob"></getajob>
            </div>
            <div class="boxList" ref="b5">
              <div class="boxTiele">
                <h1>简历投递及反馈记录</h1>
              </div>
              <feedback></feedback>
            </div>
            <div class="boxList" ref="b6">
              <div class="boxTiele">
                <h1>职位评论记录</h1>
              </div>
              <comment :list="comment"></comment>
            </div>
            <div class="boxList" ref="b7">
              <div class="boxTiele">
                <h1>职位收藏记录</h1>
              </div>
              <collect></collect>
            </div>
            <div class="boxList" ref="b8">
              <div class="boxTiele">
                <h1>就业服务记录</h1>
              </div>
              <serve></serve>
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
      loading: false,

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
  computed: {},
  methods: {
    evclose() {
      this.$emit('evclose');
    },
    //获取现在的高
    setHright() {
      this.arrListHeight = [];
      for (let i = 0; i < this.titleList.length; i++) {
        this.arrListHeight.push(this.$refs['b' + i].offsetHeight);
      }
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
      console.log(this.arrListHeight);
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
    this.loading = true;
    let data = { ...this.evList };
    let path = [
      //个人基本信息
      {
        url: '/admin/keypoint/show/psnlInfo?pid=' + data.pid
      },
      //简历信息
      {
        url: '/admin/keypoint/show/resume?pid=' + data.pid
      },
      //劳动经历
      {
        url: '/admin/keypoint/show/labor?pid=' + data.pid
      },
      //社保缴费记录
      {
        url: '/admin/keypoint/show/insur?pid=' + data.pid
      },
      //就业见习记录
      {
        url: '/admin/keypoint/show/trainee?pid=' + data.pid
      },
      //简历投递及反馈记录 --
      {
        url: '/admin/keypoint/show/employ?pid=' + data.pid
      },
      //职位评价记录
      {
        url: '/admin/keypoint/show/evaluation?pid=' + data.pid
      },
      //职位收藏记录
      {
        url: '/admin/keypoint/show/favor?pid=' + data.pid
      },
      //就业服务记录
      {
        url: '/admin/keypoint/show/employ?pid=' + data.pid
      }
    ];
    allAction(
      path,
      res => {
        console.log(res);
        this.person = res[0].data.result.data;
        this.resume = res[1].data.result.data;
        this.experience = res[2].data.result.data;
        this.socialsecurity = res[3].data.result.data
          ? res[3].data.result.data
          : [];
        this.getajob = res[4].data.result.data;
        this.feedback = res[5].data.result.data;
        this.comment = res[6].data.result.data;
        this.collect = res[7].data.result.data;
        this.serve = res[8].data.result.data;

        this.loading = false;
        this.handleShow(() => {
          this.skip(this.pagelistIndex);
        });
      },
      err => {
        console.log(err);
      }
    );
  },
  mounted() {}
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
