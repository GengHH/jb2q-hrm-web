<!--
 * @Author: your name
 * @Date: 2021-04-15 17:38:40
 * @LastEditTime: 2021-04-16 15:42:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addRight.vue
-->
<template>
  <div id="indexBody">
    <el-dialog
      width="750px"
      title="增加权限"
      :visible="visible"
      @close="onclose"
    >
      <tform ref="form" :formConfig="formConfig"></tform>
      <div style="padding:0 30px">
        <el-form label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="权限组">
                <el-checkbox-group v-model="checkedCitiesGroup">
                  <el-checkbox
                    v-for="item in citiesGroup"
                    :label="item.groupId"
                    :key="item.groupId"
                    >{{ item.groupName
                    }}<el-tree
                      default-expand-all
                      :data="formatDataTree(item)"
                      :props="defaultPropsGroup"
                    ></el-tree
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="权限名称">
                <el-tree
                  :data="treeData"
                  node-key="menuId"
                  show-checkbox
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                >
                </el-tree>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div v-if="isSubmit" style="text-align:center">
        <el-button size="small" type="primary" @click="onsubmit()">
          提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_form'; //高级查询
import {
  group_add,
  power_add,
  queryGroup,
  user_menu,
  queryRight
} from '../api/index';

export default {
  name: 'addRight',
  components: { tform },
  props: ['visible', 'dataList'],
  data() {
    return {
      isSubmit: true,
      treeData: [],
      defaultPropsGroup: {
        children: 'children',
        label: 'label'
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },

      checkedCitiesGroup: [],
      citiesGroup: [],
      numbers: 0,
      formConfig: {
        inline: true,
        size: '',
        labelPosition: 'right',
        labelWidth: '100px',
        disabled: true,
        isBtn: true,
        style: {
          width: '650px',
          margin: '0 auto'
        },

        formItemList: [
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入部门名称',
            rules: [],
            key: 'name'
          },
          {
            type: 'input',
            label: '账号名',
            style: { width: '210px' },
            placeholder: '请输入部门名称',
            rules: [],
            key: 'userName'
          },
          {
            type: 'input',
            label: '部门名称',
            style: { width: '210px' },
            placeholder: '请输入部门名称',
            rules: [],
            key: 'deptName'
          },
          {
            type: 'input',
            label: '职位',
            style: { width: '210px' },
            placeholder: '请输入职位',
            rules: [],
            key: 'positionName'
          },
          {
            type: 'select',
            label: '身份',
            rules: [],
            style: { width: '210px' },
            key: 'roleId',
            options: trim(this.$store.getters['dictionary/recruit_user_role'])
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '210px' },
            placeholder: '请输入联系电话',
            rules: [],
            key: 'contactNumber'
          },
          {
            type: 'input',
            label: '手机号码',
            style: { width: '210px' },
            placeholder: '请输入联系手机号码',
            maxlength: 11,
            rules: [],
            key: 'contactPhone'
          },
          {
            type: 'input',
            label: '邮箱',
            style: { width: '210px' },
            placeholder: '请输入联系邮箱',
            rules: [],
            key: 'mail'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //格式化数据
    treeDataformat(source, id, parentId, children) {
      let cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          child => father[id] == child[parentId]
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father[children] = branchArr) : ''; //给父级添加一个children属性，并赋值
        return father[parentId] == 1; // 如果第一层不是parentId=0，请自行修改
      });
    },
    getMenu(data) {
      queryRight(
        data,
        res => {
          if (res.status == 200) {
            console.log(res);
            res.result.data.push({
              text: '父级',
              menuId: '',
              parentId: 1
            });
            let datas = this.treeDataformat(
              res.result.data,
              'menuId',
              'parentId',
              'children'
            );
            this.treeData = datas[0].children;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取用户已经有的权限
    getUserMenu(data) {
      user_menu(
        data,
        res => {
          if (res.status == 200) {
            let data = res.result.data;

            let userPowers = data.userPowers.map(e => {
              return e.menuId;
            });
            this.$refs.tree.setCheckedKeys([...userPowers]);

            let groups = data.groups.map(e => {
              return e.groupId;
            });
            this.checkedCitiesGroup = [...groups];
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取组
    getQueryGroup() {
      queryGroup(
        {},
        res => {
          if (res.status == 200) {
            console.log(res);
            this.citiesGroup = res.result.data;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //格式化数据树
    formatDataTree(obj) {
      let data = [];
      let user = obj.users.map(e => {
        e.label = e.name;
        return e;
      });
      let power = obj.powers.map(e => {
        e.label = e.menuName;
        return e;
      });
      data.push(
        {
          label: '权限',
          children: power
        },
        {
          label: '成员',
          children: user
        }
      );
      return data;
    },
    expertChange(e) {
      this.form.userName = e.value;
      this.form.name = e.label;
      this.idList = { ...e };
    },
    //新增成员
    addGroup(data) {
      return new Promise((reslove, reject) => {
        group_add(
          data,
          res => {
            if (res.status == 200) {
              reslove(res);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    },
    //新增权限
    addPower(data) {
      return new Promise((reslove, reject) => {
        power_add(
          data,
          res => {
            if (res.status == 200) {
              reslove(res);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    },
    onclose(type) {
      this.$emit('onclose', type || 0);
    },
    onsubmit() {
      let groupId = this.checkedCitiesGroup.toString();
      let menuIds = this.$refs.tree.getCheckedKeys().toString();

      let obj = {
        userId: this.dataList.userId,
        menuIds: menuIds,
        groupId: groupId
      };

      var res = Promise.all([
        //新增权限
        this.addGroup(obj),
        //新增成员
        this.addPower(obj)
      ]);
      res.then(
        arr => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.onclose(1);
            }
          });
        },
        err => {
          this.$message({
            message: '操作失败，请联系管理员',
            type: 'warning',
            duration: 1500
          });
          console.log(err);
          console.log('请求失误');
        }
      );
    }
  },
  mounted() {
    setTimeout(() => {
      this.getMenu(this.dataList);
      this.getUserMenu(this.dataList);

      this.getQueryGroup();
      this.$refs.form.value = { ...this.dataList };
    }, 0);
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
</style>
