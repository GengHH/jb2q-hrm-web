<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total,sizes, prev, pager, next, jumper"
    :total="pageTotal">
  </el-pagination>
</template>

<script>
/**
 * 通用的分页组件
 * TODO:  layout能否动态修改
 */
export default {
  name:'BasePagination',
  props:{
    pageTotal: {
      type:Number,
      default: 100
    }, 
    pageLayout: {
      type: String,
      default: ()=> 'total , pager'
    },
    pageSize:{
      type:Number,
      default:20
    },
    pageSizes:{
      type:Array,
      default:() => [10, 200, 300, 400]
    }
  },
  data(){
    return{
      currentPage : 1
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang='scss' scoped></style>