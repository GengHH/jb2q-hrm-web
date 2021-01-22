<!--
 * @Author: your name
 * @Date: 2020-12-16 10:36:27
 * @LastEditTime: 2021-01-22 18:21:34
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\person\personalCenter\shieldCorporation.vue
-->
<template>
  <div id="shieldCorpBox">
    <!-- <el-input v-model="value" type="text" placeholder="电话号码"></el-input> -->
    <base-search @clickButton="searchDw($event)"></base-search>
    <p id="searchTip">与"{{ value }}"相关的公司共{{ corpList.length }}个</p>
    <div class="selected-block" v-for="(item, index) in corpList" :key="index">
      <el-row>
        <el-col class="select-col" :span="2">
          <el-checkbox v-model="checked"></el-checkbox>
        </el-col>
        <el-col :span="22">
          <h3>{{ item.name }}</h3>
          <p class="easy-name">{{ item.easyName }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import baseSearch from '@/components/common/BaseSearch';
export default {
  name: 'shieldCorporation',
  components: {
    baseSearch
  },
  data() {
    return {
      checked: false,
      value: '',
      corpList: [
        {
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        }
      ]
    };
  },
  methods: {
    searchDw(val) {
      console.log(val);
      this.value = val;
    }
  }
};
</script>

<style lang="scss" scoped>
#shieldCorpBox {
  height: 100%;
  width: 60%;
  margin: 20px auto;
  .selected-block {
    border-bottom: 1px solid #cecece;
  }
  #searchTip {
    margin: 15px 0;
    color: #aaa;
  }
  .select-col {
    text-align: center;
    .el-checkbox {
      top: 25px;
    }
  }
  h3 {
    margin: 15px 0;
  }
  .easy-name {
    color: rgb(96, 192, 147);
    margin: 15px 0;
  }
}
</style>
