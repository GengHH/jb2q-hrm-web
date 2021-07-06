<!--
 * @Author: your name
 * @Date: 2020-12-16 10:36:27
 * @LastEditTime: 2021-07-05 13:54:06
 * @LastEditors: GengHH
 * @Description: 个人屏蔽单位
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
    <div class="btn-bar">
      <el-button class="orange-btn" @click="doShieldCorp"
        >屏蔽所选企业</el-button
      >
    </div>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { doShieldCorp } from '@/api/personApi';
export default {
  name: 'shieldCorporation',
  components: {
    BaseSearch
  },
  data() {
    return {
      checked: false,
      value: '',
      corpList: [
        {
          pid: '123123123123',
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          pid: '123123123123',
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          pid: '123123123123',
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          pid: '123123123123',
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          pid: '123123123123',
          name: '百度在线网络技术有限公司',
          easyName: '百度'
        },
        {
          pid: '123123123123',
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
    },
    turnOther() {
      this.$router.push('/personalCenter/shieldCorporationList');
    },
    doShieldCorp() {
      let that = this;
      doShieldCorp()
        .then(res => {
          if (res.status === 200) {
            this.$router.push('/personalCenter/shieldCorporationList');
          } else {
            that.$message({
              type: 'error',
              message: '操作失败'
            });
          }
        })
        .catch(() => {
          that.$message({
            type: 'error',
            message: '系统异常,操作失败'
          });
        });
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
  .btn-bar {
    width: 100%;
    margin-top: 30px;
    text-align: center;
  }
}
</style>
