<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:34
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-22 12:04:37
 * @Description: 单位关注子页面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\corporationAttention.vue
-->
<template>
  <div id="corporationAttention">
    <div class="title-style">单位关注</div>
    <el-row>
      <el-col :span="12">
        <pl-button
          type="danger"
          icon="el-icon-star-off"
          @click="cancelAttention"
          >取消关注</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch></BaseSearch>
      </el-col>
    </el-row>
    <pl-table :data="tableData" ref="jobTable" :columns="columns" show-pager>
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.favorTime }}</span>
      </template>
    </pl-table>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { queryCorpStarList } from '@/api/personApi';
export default {
  name: 'corporationAttention',
  components: {
    BaseSearch
  },
  data() {
    return {
      tableData: []
    };
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
        {
          label: '单位logo',
          prop: 'logo',
          rowSpan: 'all'
        },
        {
          label: '单位名称',
          prop: 'corpName',
          rowSpan: 'all'
        },
        {
          label: '行业类别',
          prop: 'industryType',
          rowSpan: 'all'
        },
        {
          label: '单位性质',
          prop: 'corpNature',
          rowSpan: 'all'
        },
        {
          label: '关注时间',
          prop: 'favorTime',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '操作',
          attrs: { width: 120 },
          actions: [
            {
              id: 'action1',
              text: '取消关注',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-star-off',
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
    },
    selection() {
      return this.$refs.jobTable.multipleSelection;
    }
  },
  methods: {
    async queryList() {
      let res = await queryCorpStarList({
        pid: this.$store.getters['person/pid'] || ''
      });
      if (res.status === 200) {
        res.result.data.forEach(item => {
          item.actions = ['action1'];
        });
        this.tableData = res.result.data;
      } else {
        this.$message({ type: 'success', message: '未查询到信息' });
      }
    },
    cancelAttention() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        // TODO 删除数据
        that.tableData = that.tableData.filter(
          obj => !that.selection.some(i => obj.id === i.id)
        );
      }
    }
  },
  created() {
    this.queryList();
  }
};
</script>

<style lang="scss" scoped>
#corporationAttention {
  #seek-box {
    margin: 0;
    ::v-deep #seek-box-input {
      height: 40px !important;
    }
  }
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
      margin: 10px 0;
    }
    .delimiter {
      line-height: 40px;
    }
    .no-col-padding {
      button {
        width: 100px;
      }
    }
    .el-range-editor {
      width: 100%;
    }
  }
}
</style>
