<!--
 * @Author: GengHH
 * @Date: 2020-12-08 16:31:11
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-20 19:30:23
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\index\employmentTrainee\index.vue
-->
<template>
  <div id="indexBody">
    <div>
      <BaseSearch></BaseSearch>
    </div>
    <div class="container">
      <el-row class="condition">
        <el-col
          :sm="4"
          :md="3"
          :lg="3"
          :xl="2"
          style="padding: 10px; text-align:center;"
        >
          区县选择：</el-col
        >
        <el-col :sm="20" :md="21" :lg="21" :xl="22">
          <el-radio-group v-model="qx" size="medium">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in dicQx"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 排序 -->
      <el-row class="condition">
        <el-col
          :sm="4"
          :md="3"
          :lg="3"
          :xl="2"
          style="padding: 10px;text-align:center;"
        >
          基地类型：</el-col
        >
        <el-col :sm="20" :md="21" :lg="21" :xl="22">
          <el-radio-group v-model="type" size="medium">
            <el-radio-button label="">不限</el-radio-button>
            <el-radio-button label="1">一般基地</el-radio-button>
            <el-radio-button label="2">综合类基地</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 基地信息列表 -->
      <div class="jxcorp-row">
        <!-- 展示栏 -->
        <el-row :gutter="20">
          <el-col
            :sm="24"
            :md="12"
            :lg="8"
            :xl="6"
            v-for="(item, index) in showList"
            :key="index"
          >
            <div class="jxcorp-box">
              <el-row class="jxcorp-header">
                <el-col :span="4">
                  <img
                    class="jxcorp-img"
                    src="../../../assets/images/logos.png"
                    alt="未加载"
                  />
                </el-col>
                <el-col :span="20">
                  <div class="jxcorp-title">万达信息有限公司</div>
                  <div class="jxcorp-info gray-font">
                    <span>上市公司</span>| <span>软件服务</span>|
                    <span>1995年</span>|
                    <span>其他</span>
                  </div>
                </el-col>
              </el-row>
              <div class="jxcorp-list">
                <span class="jxcorp-list-name">123412</span>
                <span class="gray-font">岗位：8人</span>
                <span class="gray-font">在岗：10人</span>
                <span class="gray-font">招聘：10人</span>
              </div>
              <div class="jxcorp-list">
                <span class="jxcorp-list-name">123412</span>
                <span class="gray-font">岗位：8人</span>
                <span class="gray-font">在岗：10人</span>
                <span class="gray-font">招聘：10人</span>
              </div>
              <div class="jxcorp-list">
                <span class="jxcorp-list-name">123412</span>
                <span class="gray-font">岗位：8人</span>
                <span class="gray-font">在岗：10人</span>
                <span class="gray-font">招聘：10人</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { queryJyjxJdInfo } from '@/api/indexApi';
export default {
  name: 'employmentTrainee',
  components: {
    BaseSearch
  },
  data() {
    return {
      qx: '',
      type: '',
      dicQx: this.$store.getters['dictionary/ggjbxx_qx'],
      showList: [1, 2]
    };
  },
  created() {
    this.queryJyjxJdInfo();
  },
  methods: {
    queryJyjxJdInfo() {
      queryJyjxJdInfo().then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.countTotal = queryRes.result.pageresult.total || 0;
          this.showList = queryRes.result.pageresult.data || [];
          this.$message({ type: 'success', message: '查询成功' });
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  padding-top: 90px;
  .container {
    background-color: #fff;
  }
  .jxcorp-row {
    width: 92%;
    margin: 0 auto;
    padding: 20px 0 50px;
  }
  .jxcorp-box {
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
  }
  .jxcorp-title {
    font-size: 16px;
    font-weight: 800;
    margin: 10px 0;
  }
  .jxcorp-img {
    width: 100%;
  }
  .jxcorp-header {
    margin-bottom: 20px;
  }
  .jxcorp-list {
    margin: 5px;
    &-name {
      width: 35%;
      display: inline-block;
      padding-right: 10px;
    }
    .gray-font {
      color: #999;
    }
  }
  .more-btn {
    margin: 20px auto 0;
    display: block;
  }
  .condition {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  ::v-deep .el-radio-group {
    .el-radio-button--medium .el-radio-button__inner {
      border: 0px;
    }
  }
}
</style>
