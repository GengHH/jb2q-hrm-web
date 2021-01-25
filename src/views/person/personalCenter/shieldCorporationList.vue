<!--
 * @Author: your name
 * @Date: 2020-12-16 10:36:27
 * @LastEditTime: 2021-01-25 18:46:18
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\person\personalCenter\shieldCorporationList.vue
-->
<template>
  <div id="shieldCorpListBox">
    <pl-table
      :data="tableData"
      :columns="columns"
      @selection-change="handleSelectionChange"
      show-pager
    >
    </pl-table>

    <!-- <el-table
      :data="tableData"
      :columns="columns"
      @selection-change="handleSelectionChange"
      show-pager
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        width="150"
      >
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  name: 'shieldCorporationList',
  props: {
    p: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [
        {
          date: '2019-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200333,
          tag: '家',
          status: 0
        },
        {
          date: '2019-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1517 弄',
          zip: 200333,
          tag: '公司',
          status: 1
        },
        {
          date: '2019-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1519 弄',
          zip: 200333,
          tag: '家',
          status: 0
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1516 弄',
          zip: 200333,
          tag: '公司',
          status: 0
        },
        {
          date: '2019-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1515 弄',
          zip: 200333,
          tag: '公司',
          status: 0
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    }
  },
  computed: {
    columns() {
      return [
        { attrs: { type: 'selection' } },
        {
          label: '行序号',
          attrs: { type: 'index', width: 100 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        { label: '日期', prop: 'date' },
        { label: '名称', prop: 'name', rowSpan: 'all' },
        {
          label: '地址',
          customerRenderText: ({ row, index }) => {
            console.log(index);
            const { province, city, address } = row;
            return province + city + address;
          }
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
#shieldCorpListBox {
  height: 100%;
  width: 100%;
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
