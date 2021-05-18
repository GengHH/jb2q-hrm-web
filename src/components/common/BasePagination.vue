<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-18 15:32:44
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BasePagination.vue
-->
<template>
  <el-pagination
    v-show="showPager"
    v-bind="pageAttrs"
    @size-change="handleSizeChange"
    @current-change="handleClick"
    @prev-click="handleClick"
    @next-click="handleClick"
    :current-page="currentPage"
    :total="totalCount"
  >
  </el-pagination>
  <!-- :page-size="pageSize" -->
  <!-- :page-sizes="pageSizes" -->
  <!-- layout="total,sizes, prev, pager, next, jumper" -->
</template>

<script>
/**
 * 通用的分页组件 (目前只适合后台分页)
 * TODO:  layout能否动态修改
 */
export default {
  name: 'BasePagination',
  props: {
    showPager: {
      type: Boolean,
      default: false
    },
    totalCount: {
      type: Number,
      default: 0
    }
    // currentPage: {
    //   type: Number,
    //   default: 0
    // },
    // pageSize: {
    //   type: Number,
    //   default: 10
    // },
    // pageLayout: {
    //   type: String,
    //   default: () => 'total , pager'
    // },
    // pageSizes: {
    //   type: Array,
    //   default: () => [10, 20, 50, 100]
    // }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    pageAttrs() {
      return {
        ...this.$PlElement?.pageConfig,
        ...this.pageConfig
      };
    }
  },
  methods: {
    handleClick(currentPage) {
      this.currentPage = currentPage;
      this.$emit('changePage');
      console.log(`当前页 ${currentPage} `);
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$emit('changePage');
      console.log(`每页 ${pageSize} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped></style>
