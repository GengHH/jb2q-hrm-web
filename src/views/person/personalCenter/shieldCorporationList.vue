<!--
 * @Author: your name
 * @Date: 2020-12-16 10:36:27
 * @LastEditTime: 2021-03-09 18:43:53
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\person\personalCenter\shieldCorporationList.vue
-->
<template>
  <div id="shieldCorpListBox">
    <el-row class="search-bar" :span="20">
      <el-col :span="8"
        ><pl-button type="danger" icon="el-icon-edit" size="medium "
          >取消屏蔽</pl-button
        ><pl-button type="primary" icon="el-icon-plus" size="medium "
          >添加屏蔽企业</pl-button
        >
        <el-switch v-model="modeValue" inactive-text="切换"> </el-switch
      ></el-col>
      <el-col :span="16"
        ><base-search @clickButton="clickButton($event)"></base-search
      ></el-col>
    </el-row>
    <pl-table
      :data="tableData"
      ref="serveTable"
      :columns="columns"
      show-pager
      v-if="modeValue"
    >
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.date }}</span>
      </template>
      <template #star="{row}">
        <el-rate v-model="row.star"></el-rate>
      </template>
    </pl-table>
    <base-info-notification-card
      v-else
      :data="tableData"
      @deleteMessage="deleteMessage(arguments)"
    ></base-info-notification-card>
  </div>
</template>

<script>
import plButton from '@/components/common/BaseLoadingButton';
import BaseSearch from '@/components/common/BaseSearch';
import BaseInfoNotificationCard from '@/components/common/BaseInfoNotificationCard.vue';
export default {
  name: 'shieldCorporationList',
  props: {
    p: {
      type: Boolean,
      default: false
    }
  },
  components: {
    plButton,
    BaseSearch,
    BaseInfoNotificationCard
  },
  data() {
    return {
      modeValue: false,
      tableData: [
        {
          date: '2019-05-01',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200333,
          tag: '家',
          status: 0,
          actions: ['test']
        },
        {
          date: '2019-05-04',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1517 弄',
          zip: 200333,
          tag: '公司',
          status: 1,
          actions: ['test']
        },
        {
          date: '2019-05-03',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1519 弄',
          zip: 200333,
          tag: '家',
          status: 0,
          actions: ['test']
        },
        {
          date: '2019-05-02',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1516 弄',
          zip: 200333,
          tag: '公司',
          status: 0,
          actions: ['test']
        },
        {
          date: '2019-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1515 弄',
          zip: 200333,
          tag: '公司',
          status: 0,
          actions: ['test', 'test2']
        }
      ]
    };
  },
  methods: {
    clickButton(val) {
      console.log(val);
    },
    deleteMessage(arg) {
      console.log(arg[0], arg[1]);
      //arg[1]();
      //   this.$confirm('确认删除此项信息？')
      //     .then(() => {
      //       // TODO
      //       this.$delete(this.tableData, index);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    }
  },
  computed: {
    multipleSelection() {
      //获取子组件中的选中的数据
      return this.$refs.serveTable.multipleSelection;
    },
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
        { label: '日期', prop: 'date', formatter: 'date', slotName: 'date' },
        { label: '评分', prop: 'star', slotName: 'star' },
        { label: '名称', prop: 'name', rowSpan: 'all' },
        {
          label: '地址',
          customerRenderText: ({ row, $index }) => {
            //console.log($index);
            const { province, city, address } = row;
            return province + city + address;
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'test',
              text: '测试',
              attrs: { type: 'warning', round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'test2',
              text: '测试2',
              attrs: { type: 'warning', round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            }
          ]
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
  .search-bar {
    margin-bottom: 15px;
  }
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
  ::v-deep #seek-box {
    margin: 0;
    #seek-box-input {
      height: 36px;
    }
    .el-input-group__append {
      width: 120px;
    }
    .el-button {
      font-size: 14px;
      height: 36px;
    }
  }
}
</style>
