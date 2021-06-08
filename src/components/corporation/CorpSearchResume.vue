<!--
 * @Author: GengHH
 * @Date: 2020-12-21 17:18:03
 * @LastEditTime: 2021-06-03 14:00:38
 * @LastEditors: GengHH
 * @Description: 个人简历界面-子菜单显示组件
 * @FilePath: \jb2q-hrm-web\src\components\corporation\CorpSearchResume.vue
-->
<template>
  <!-- S demo3信息部分 -->
  <div id="demo3">
    <!-- <div class="div-box bg-gray">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <span class="favorite"><i class="el-icon-star-on"></i>收藏</span>
    </div> -->
    <div class="div-box" v-for="(resumeItem, index) in jobData" :key="index">
      <el-row :gutter="20">
        <!-- <el-col :span="1" class="mat-15">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
        </el-col> -->
        <el-col :span="7">
          <div class="infor-module">
            <p
              class="name-infor  font-or"
              @click="
                showResumeDetial(
                  index,
                  resumeItem.resumeId,
                  resumeItem.pid,
                  resumeItem.favor
                )
              "
            >
              <span class="personName">{{ resumeItem.xm }}</span>
              <!-- <span>人力资源总监</span>  -->
            </p>
            <p class="span-infor">
              <span>{{ resumeItem.workAreaText }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ resumeItem.age }}岁</span>
              <el-divider direction="vertical"></el-divider>
              <span>工作经验{{ resumeItem.workYear }}年</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ highEduLevel(resumeItem) }}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="6" class="mat-15" style="text-align:left">
          <span class="career">{{ resumeItem.positionName }}</span>
          <p class="money-p">
            <span>期望薪资：</span> {{ resumeItem.salaryMin }}-{{
              resumeItem.salaryMax
            }}
          </p>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <p class="time-p">修改时间：{{ resumeItem.updateTime }}</p>
          <p class="time-p">最近登录：{{ resumeItem.loginTime }}</p>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <el-button
            type="primary"
            class="white-btn"
            @click="
              inviteDetial(
                index,
                resumeItem.resumeId,
                resumeItem.pid,
                resumeItem.favor
              )
            "
            ><i class="el-icon-view"></i>邀 约</el-button
          >
          <el-button
            v-if="resumeItem.favor"
            type="primary"
            class="gray-btn"
            style="width:100px"
            @click="favorResume(resumeItem.favor, index, resumeItem.resumeId)"
          >
            <i class="el-icon-star-on">已收藏</i>
          </el-button>
          <el-button
            v-else
            type="primary"
            class="white-btn"
            style="width:100px"
            @click="favorResume(resumeItem.favor, index, resumeItem.resumeId)"
          >
            <!-- <i v-if="resumeItem.favor" class="el-icon-star-on">已收藏</i> -->
            <i class="el-icon-star-off">收 藏</i>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <el-pagination
      id="jobListpager"
      v-show="showPager"
      v-bind="pageAttrs"
      :class="pagerClass"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      :current-page="currentPage"
      :total="totalCount"
    >
    </el-pagination>
  </div>
  <!-- E demo3信息部分 -->
</template>

<script>
/**
 * 个人简历界面-子菜单显示组件
 */
import { niceScrollUpdate } from '@/utils/index';
export default {
  name: 'PerSearchJob',
  props: {
    showPager: {
      type: Boolean,
      default: false
    },
    pagerClass: {
      type: String,
      default: 'peger-center'
    },
    jobData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      currentPage: 0,
      pageSize: 10
    };
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  },
  computed: {
    pageAttrs() {
      return {
        ...this.$PlElement?.pageConfig,
        ...this.pageConfig
      };
    },
    pageTableData() {
      //前端分页实现逻辑
      return this.showPager
        ? this.jobData.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )
        : this.jobData;
    },
    totalCount() {
      return this.total ? this.total : this.jobData.length;
    }
  },
  methods: {
    /**
     * 将最高学历字典转成文字
     */
    highEduLevel(item) {
      let dictionary = this.$store.getters['dictionary/recruit_edu'];
      let dic = dictionary.find(i => {
        return i.value === item.eduLevel;
      });
      return dic ? dic.label : item.eduLevel;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.$parent.queryResumes) {
        this.$parent.queryResumes(this.$parent.queryParams.positionName);
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.queryResumes) {
        this.$parent.queryResumes(this.$parent.queryParams.positionName);
      }
    },
    handlePrevClick(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.queryResumes) {
        this.$parent.queryResumes(this.$parent.queryParams.positionName);
      }
    },
    handleNextClick(currentPage) {
      this.currentPage = currentPage;
      if (this.$parent.queryResumes) {
        this.$parent.queryResumes(this.$parent.queryParams.positionName);
      }
    },
    // selectJob(index, resumeId) {
    //   //投递简历
    //   this.$confirm('确认向该职位投递简历？')
    //     .then(() => {
    //       this.$emit('deliveryResume', index, resumeId); //通知父组件改变。
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    /**
     * 收藏简历
     */
    favorResume(favor, index, resumeId) {
      //收藏或者取消收藏职位
      let str = favor ? '确认取消收藏该简历？' : '确认收藏该简历？';
      this.$confirm(str)
        .then(() => {
          this.$emit('favorResume', index, resumeId, favor);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 全部收藏
     */
    // allStarAction(event) {
    //   console.log(event);
    // },
    handleCheckAllChange() {},
    /**
     * 显示详细简历信息
     */
    showResumeDetial(index, resumeId, pid, favor) {
      this.$emit('showResumeDetials', index, resumeId, pid, favor);
    },
    /**
     * 邀约
     */
    inviteDetial(index, resumeId, pid, favor) {
      this.$emit('inviteDetials', index, resumeId, pid, favor);
    }
    // callPositionCorp(index, resumeId) {
    //   this.$emit('callPositionCorp', index, resumeId);
    //   this.$alert('暂时无法进行沟通');
    // }
  }
};
</script>

<style lang="scss" scoped>
.div-box {
  padding: 15px 18px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-bottom: 16px;
  .favorite {
    float: right;
    font-size: 14px;
    color: #000;
    margin-top: 3px;
    cursor: pointer;
    i {
      color: #fc7540;
      font-size: 18px;
    }
  }
  .foot-span {
    height: 32px;
    line-height: 32px;
    background-color: #f6f6f6;
  }
  .i-style {
    font-size: 14px;
    color: #fff;
    padding: 2px 5px;
    border-radius: 4px;
    background-color: #8b614d;
  }
}
.name-infor {
  font-size: 20px;
  margin-bottom: 20px;
}
.personName:hover {
  cursor: pointer;
}
.bg-gray {
  background: #f7f7f7;
  margin-top: 16px;
}
.padd0 {
  padding: 0;
  .el-row {
    padding: 15px 18px;
  }
}
.marl-65 {
  margin-left: 65px;
}
.ico_rz {
  display: inline-block;
}
.span-infor {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 15px;
  .gray-btn,
  .gray-btn:hover {
    color: #fc6f3d;
    background-color: transparent;
    border-color: #d1d1d1;
    padding: 3px 10px;
    border-radius: 20px;
  }
}
.money-p {
  color: #aaa;
  margin: 20px 0 10px;
}
.time-p {
  color: #aaa;
  margin: 10px 0;
}
</style>
