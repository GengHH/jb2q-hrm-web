<!--
 * @Author: your name
 * @Date: 2020-12-16 10:36:27
 * @LastEditTime: 2021-03-23 15:29:38
 * @LastEditors: GengHH
 * @Description: 个人权限控制
 * @FilePath: \jb2q-hrm-web\src\views\person\personalCenter\permissionSettings.vue
-->
<template>
  <el-row :gutter="20">
    <el-col :span="8" v-loading="loading1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-switch v-model="allowSearchView" :disabled="disabled"></el-switch>
        </div>
        <div class="text item">{{ allowSearchText }}</div>
      </el-card>
    </el-col>
    <el-col :span="8" v-loading="loading2">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-switch
            v-model="allowArtificialRecoView"
            :disabled="disabled"
          ></el-switch>
        </div>
        <div class="text item">{{ allowArtificialRecoText }}</div>
      </el-card>
    </el-col>
    <el-col :span="8" v-loading="loading3">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-switch
            v-model="allowAutoRecoView"
            :disabled="disabled"
          ></el-switch>
        </div>
        <div class="text item">{{ allowAutoRecoText }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {
  loadPsnlPermissionsInfo,
  updatePersonalPermissions
} from '@/api/personApi';
export default {
  name: 'permissionSettings',
  data() {
    return {
      disabled: false,
      allowSearch: '0',
      allowArtificialReco: '0',
      allowAutoReco: '0',
      loading1: false,
      loading2: false,
      loading3: false
    };
  },
  computed: {
    allowSearchView: {
      get: function() {
        return !!Number(this.allowSearch);
      },
      set: function(v) {
        this.allowSearch = v ? '1' : '0';
        //开始加载遮罩
        this.loading1 = true;
        this.setPermission(1);
      }
    },
    allowSearchText() {
      return this.allowSearch === '1'
        ? '用人单位将能主动搜索到您的简历'
        : '用人单位将不能主动搜索到您的简历';
    },
    allowArtificialRecoView: {
      get: function() {
        return !!Number(this.allowArtificialReco);
      },
      set: function(v) {
        this.allowArtificialReco = v ? '1' : '0';
        //开始加载遮罩
        this.loading2 = true;
        this.setPermission(2);
      }
    },
    allowArtificialRecoText() {
      return this.allowArtificialReco == '1'
        ? '将能接受管理员人工推荐职位'
        : '将不能接受管理员人工推荐职位';
    },
    allowAutoRecoView: {
      get: function() {
        return !!Number(this.allowAutoReco);
      },
      set: function(v) {
        this.allowAutoReco = v ? '1' : '0';
        //开始加载遮罩
        this.loading3 = true;
        this.setPermission(3);
      }
    },
    allowAutoRecoText() {
      return this.allowAutoReco === '1'
        ? '将接受系统自动推荐职位'
        : '将不能接受系统自动推荐职位';
    }
  },
  methods: {
    showMessage(type, msg) {
      this.$message({
        type: type,
        message: msg
      });
    },
    async setPermission(index) {
      // TODO 调用后台接口
      let _pid = this.$store.getters['person/pid'];
      if (index == 1) {
        let updateResult1 = await updatePersonalPermissions({
          pid: _pid,
          allowSearch: this.allowSearch
        });
        if (updateResult1 && updateResult1.status == 200) {
          this.allowSearchView
            ? this.showMessage('success', '用人单位将能主动搜索到您的简历')
            : this.showMessage('success', '用人单位将不能主动搜索到您的简历');
        } else {
          this.showMessage('success', '修改失败');
        }
        this['loading' + index] = false;
      } else if (index === 2) {
        let updateResult2 = await updatePersonalPermissions({
          pid: _pid,
          allowArtificialReco: this.allowArtificialReco
        });
        if (updateResult2 && updateResult2.status == 200) {
          this.allowArtificialRecoView
            ? this.showMessage('success', '将能接受管理员人工推荐职位')
            : this.showMessage('success', '将不能接受管理员人工推荐职位');
        } else {
          this.showMessage('error', '修改失败');
        }
        this['loading' + index] = false;
      } else if (index === 3) {
        let updateResult3 = await updatePersonalPermissions({
          pid: _pid,
          allowAutoReco: this.allowAutoReco
        });
        if (updateResult3 && updateResult3.status == 200) {
          this.allowAutoRecoView
            ? this.showMessage('success', '将接受系统自动推荐职位')
            : this.showMessage('success', '将不能接受系统自动推荐职位');
        } else {
          this.showMessage('error', '修改失败');
        }
        this['loading' + index] = false;
      }
    }
  },
  created() {
    loadPsnlPermissionsInfo({ pid: this.$store.getters['person/pid'] } || '')
      .then(res => {
        if (res.status === 200) {
          this.allowSearch = res.result.data
            ? res.result.data.allowSearch
            : '0';
          this.allowArtificialReco = res.result.data
            ? res.result.data.allowArtificialReco
            : '0';
          this.allowAutoReco = res.result.data
            ? res.result.data.allowAutoReco
            : '0';
        } else {
          // 禁用控件
          this.disabled = true;
          this.showMessage('error', '无法加载个人权限信息');
        }
      })
      .catch(() => {
        this.disabled = true;
        this.showMessage('error', '系统异常，无法加载个人权限信息');
      });
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
</style>
