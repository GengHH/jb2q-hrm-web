<template>
  <!--S 关于我们部分 -->
  <div id="indexBody">

    <div class="bout-us-box">
      <!--S 地图部分 -->
      <div id="demo3" class="map-div">
        <img src="../../../assets/img/map.png" alt="未加载" />
      </div>
      <!--E 地图部分 -->

      <!--S 表格部分 -->
      <div id="demo4">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" type="index" width="55"></el-table-column>
          <el-table-column prop="name" label="单位名称"></el-table-column>
          <el-table-column prop="emolument" label="联系地址"></el-table-column>
          <el-table-column prop="workplace" label="邮编"></el-table-column>
          <el-table-column prop="time" label="联系电话"></el-table-column>
        </el-table>
        
        <!-- S 分页部分 -->
        <div id="demo5" class="page-box tac">
          <BasePagination></BasePagination>
        </div>
        <!-- E 分页部分 -->
      </div>
      <!--E 表格部分 -->
    </div>
  </div>
  <!--E  关于我们部分-->
</template>

<script>
import BasePagination from '@/components/common/BasePagination.vue';
export default {
  name:'Aboutus',
  props:{
    currentPage:String
  },
  components:{
    BasePagination
  },
  data(){
    return {
      visible: false,
      labelPosition: 'right',
      tableData: [{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      },{
        name: '上海市劳动人事争议仲裁委员会',
        emolument: '普陀区西乡路188号（近新村路）',
        workplace: '200125',
        time:'231111',
      }, ],
      multipleSelection: []
  }
},
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

  }
}
</script>

<style lang='scss' scoped>
#indexBody{
  width:90%;
  min-height: 100%;
  //max-height:1000px;
  margin:0 auto 150px;

  .bout-us-box{
    background-color: #ffffff;
    margin-top: 32px;
    margin-bottom: 50px;
    padding: 40px;
    .map-div {
      width: 100%;
      //height: 447px;
      border: 1px solid #EE9900;
      img{
        width: 100%;
      }
    }
  }
}

#demo4{
  color: red;
  margin-top: 30px;

  .el-table{
    tr{
      background-color: #f8f8f8 !important;

    }
  }
  .el-table .cell {
    div {
      background: url(../../../assets/img/serial.png) center no-repeat;
      background-size: 22px 24px;
      color: #ffffff !important;
    }
  }

  .tac {
    text-align: center !important;

}
  .el-table th, .el-table tr {
    background-color: #f8f8f8 im !important;
  }
}

</style>