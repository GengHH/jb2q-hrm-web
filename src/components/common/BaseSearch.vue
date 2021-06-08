<template>
  <div id="seek-box">
    <el-input
      id="seek-box-input"
      class="input-with-select"
      v-model="input"
      :placeholder="placeholder"
    >
      <el-select
        v-model="selectValue"
        slot="prepend"
        placeholder="请选择"
        v-if="showSelect"
        class="input-select"
      >
        <el-option
          v-for="(item, index) in selectData"
          :key="index"
          :label="item.label"
          :value="item.value"
          class="search-box-select"
        ></el-option>
        <!-- <el-option label="职位类型" value="position"></el-option> -->
        <!-- <el-option label="单位名称" value="corporation"></el-option> -->
      </el-select>

      <el-button slot="append" icon="el-icon-search" @click="searchButtonClick"
        >搜索</el-button
      >
      <!-- <el-button slot="append" class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</el-button> -->
    </el-input>
    <!-- <div class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</div> -->
  </div>
</template>

<script>
/**
 * 通用的查询框组件
 */
export default {
  name: 'BaseSearch',
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    selectValue: {
      type: String,
      default: ''
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    selectData: {
      type: Array,
      default: () => []
    }
  },
  component: {},
  data() {
    return {
      input: '',
      selectOne: false
    };
  },
  methods: {
    searchButtonClick() {
      if (this.showSelect) {
        this.$emit('clickButton', this.selectValue, this.input);
      } else {
        this.$emit('clickButton', this.input);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#seek-box {
  text-align: right;
  position: relative;
  margin-top: 14px;
  margin-bottom: 20px;

  // .el-input {
  //   width: 100%;

  //   .el-input-group__prepend {
  //     padding-left: 0px;
  //     padding-right: 0px;
  //     border: 1px solid #fc7a43;
  //     border-right: 0;
  //     background-color: #fff;
  //   }

  //   #seek-box-input {
  //     height: 40px;
  //     border: 1px solid #fc7a43;
  //   }
  //   .el-input-group__append {
  //     width: 175px;
  //     border: 0;
  //     .el-button {
  //       display: block;
  //       margin: 0 auto;
  //       font-size: 16px;
  //     }
  //   }

  // .el-select {
  //   width: 140px;
  //   margin: 0 20px;
  // }

  //   .el-select:first-child {
  //     //border-right: 1px solid #dcdfe6;
  //   }

  //   .el-select:last-child {
  //     margin-right: 0px;
  //   }
  // }

  // .el-input-group__prepend,
  // #seek-box-input {
  //   border-color: #fc703d;
  // }
  ::v-deep {
    .el-input-group__prepend {
      input {
        text-align: center;
      }
    }
    .el-select {
      .el-input {
        width: 180px;
      }
    }

    .el-input-group__append {
      color: #fff;
      background: #ff9954 linear-gradient(to right, #ff9854, #fc703d);
      /*兼容ie9*/
      filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1 ,startColorstr=#ff9854, endColorstr=#fc703d);
    }
  }

  button {
    width: 10rem;
  }
}
.search-box-select {
  text-align: center;
}
</style>
