<!--
 * @Author: GengHH
 * @Date: 2021-03-18 10:55:17
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 11:56:09
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFindMgr\resumeReceived.vue
-->
<template>
  <div id="resumeReceived">
    <div class="title-style">收到的简历1</div>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-input
            v-model="queryParam.gjz"
            autocomplete="off"
            label="关键字"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <el-col :span="11">
            <pl-input
              v-model="queryParam.gjz"
              autocomplete="off"
              label="年龄（小）"
            ></pl-input>
          </el-col>
          <el-col :span="2">
            <span>-</span>
          </el-col>
          <el-col :span="11">
            <pl-input
              v-model="queryParam.gjz"
              autocomplete="off"
              label="年龄（大）"
            ></pl-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <pl-input
            v-model="queryParam.gjz"
            autocomplete="off"
            label="职位名称"
          ></pl-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-select
            v-model="queryParam.gjz"
            :optionData="dicGznx"
            label="工作年限"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <pl-select
            v-model="queryParam.gjz"
            :optionData="$store.getters['dictionary/recruit_edu']"
            label="学历"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <el-col :span="8">
            <pl-button>搜索</pl-button>
          </el-col>
          <el-col :span="8">
            <pl-button>清空</pl-button>
          </el-col>
          <el-col :span="8">
            <pl-button>高级搜索</pl-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'resumeReceived',
  data() {
    return {
      queryParam: {
        gjz: ''
      },
      data: [],
      dicGznx: [
        {
          value: '1',
          label: '不足一年'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#resumeReceived {
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
  .el-row {
    & > .el-col {
      margin: 20px 0;
    }
  }
}
</style>
