<!--
 * @Author: GengHH
 * @Date: 2020-12-21 17:18:03
 * @LastEditTime: 2021-03-09 10:33:32
 * @LastEditors: GengHH
 * @Description: 个人简历界面-子菜单显示组件
 * @FilePath: \jb2q-hrm-web\src\components\person\PerSearchJob.vue
-->
<template>
  <!-- S demo3信息部分 -->
  <div id="demo3">
    <div class="div-box bg-gray">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <span class="favorite"><i class="el-icon-star-on"></i>收藏</span>
    </div>
    <div class="div-box padd0">
      <el-row>
        <el-col :span="1" class="mat-15">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
        </el-col>
        <el-col :span="10">
          <div class="infor-module">
            <p class="name-infor font-or">
              项目经理 <i class="i-style">介</i> <span>12k-18k</span>
            </p>
            <p class="span-infor">
              <span>上海</span>
              <el-divider direction="vertical"></el-divider>
              <span>本科</span>
              <el-divider direction="vertical"></el-divider>
              <span>全职</span>
              <el-divider direction="vertical"></el-divider>
              <span>经验1~2年</span>
              <el-button type="primary" class="gray-btn"
                ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
              >
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="time-p sixteen-opacity">
            万达信息股份有限公司
            <img class="ico_rz" src="../../assets/images/ico_rz.png" alt="" />
          </p>
          <p class="span-infor">
            <span>移动互联网</span>
            <el-divider direction="vertical"></el-divider>
            <span>股份</span>
            <el-divider direction="vertical"></el-divider>
            <span>10000人以上</span>
          </p>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" class="release-btn">
            <i class="el-icon-position"></i>投递</el-button
          >
          <el-button type="primary" class="white-btn"
            ><i class="el-icon-star-off"></i> 收藏</el-button
          >
        </el-col>
      </el-row>
      <div class="foot-span">
        <el-col :span="11">
          <span class="fourteen-opacity marl-65">招聘人数 <i>8</i>人</span>
        </el-col>
        <el-col :span="8">
          <span class="fourteen-opacity"
            >发布机构：上海某某职业代理有限公司</span
          >
        </el-col>
        <el-col :span="5">
          <span class="fourteen-opacity">发布时间：2020-11-06</span>
        </el-col>
      </div>
    </div>
    <div class="div-box padd0">
      <el-row>
        <el-col :span="1" class="mat-15">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
        </el-col>
        <el-col :span="10">
          <div class="infor-module">
            <p class="name-infor font-or">
              项目经理 <i class="bl-bg i-style">见习</i> <span>12k-18k</span>
            </p>
            <p class="span-infor">
              <span>上海</span>
              <el-divider direction="vertical"></el-divider>
              <span>本科</span>
              <el-divider direction="vertical"></el-divider>
              <span>全职</span>
              <el-divider direction="vertical"></el-divider>
              <span>经验1~2年</span>
              <el-button type="primary" class="gray-btn"
                ><i class="el-icon-chat-dot-round"></i> 立即沟通</el-button
              >
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="time-p sixteen-opacity">
            万达信息股份有限公司
            <img class="ico_rz" src="../../assets/images/ico_rz.png" alt="" />
          </p>
          <p class="span-infor">
            <span>移动互联网</span>
            <el-divider direction="vertical"></el-divider>
            <span>股份</span>
            <el-divider direction="vertical"></el-divider>
            <span>10000人以上</span>
          </p>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" class="release-btn" @click="selectJob">
            <i class="el-icon-position"></i>投递</el-button
          >
          <el-button type="primary" class="white-btn" @click="startJob"
            ><i class="el-icon-star-off"></i> 收藏</el-button
          >
        </el-col>
      </el-row>
      <div class="foot-span">
        <el-col :span="19">
          <span class="fourteen-opacity marl-65">招聘人数 <i>8</i>人</span>
        </el-col>
        <el-col :span="5">
          <span class="fourteen-opacity">发布时间：2020-11-06</span>
        </el-col>
      </div>
    </div>
  </div>
  <!-- E demo3信息部分 -->
</template>

<script>
/**
 * 个人简历界面-子菜单显示组件
 */
export default {
  name: 'PerSearchJob',
  props: {
    JobData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    selectJob: function() {
      this.$alert('功能暂未开放');
    },
    startJob: function() {
      this.$alert('收藏成功');
    }
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
  .release-btn {
    background-color: #fc7a43;
    font-size: 14px;
    color: #fff;
    border-color: #fc7a43;
  }
  .white-btn {
    color: #fc6f3d;
    background-color: #fff;
    border-color: #ff9954;
  }
  .i-style {
    font-size: 14px;
    color: #fff;
    padding: 2px 5px;
    border-radius: 4px;
    background-color: #8b614d;
  }
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
}
</style>
