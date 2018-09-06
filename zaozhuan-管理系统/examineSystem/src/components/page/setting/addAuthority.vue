<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>权限编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          <el-row style="margin-bottom:15px;">
  <i class="el-icon-edit"></i><span style="color: #606266;font-size:14px;margin-left:10px;">{{roleName}}</span>
</el-row>
<hr style="border:none;border-bottom:1px solid #ccc;margin:20px 0;">
        <div class="form-box"  v-if='!loading'>
             <el-tree
                empty-text="暂无数据"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :load="loadNode"
                lazy
                default-expand-all
                :props="defaultProps"
                @node-click="handleNodeClick"
                @check-change="handleCheckChange"
                >
             </el-tree>
           
        </div>
        <el-row style="margin-top:30px;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="returnCallback">取消</el-button>
        </el-row>

    </div>
</template>

<script>
import { postAjax, getAjax, oUrl, uploadImg } from "../../../api/api.js";
import qs from "qs";
export default {
  data: function() {
    return {
      loading: true,
      defaultProps: {
        children: "zones",
        label: "label"
      },
      roleName: this.$route.query.roleName,
      roleId: this.$route.query.roleId,
      listArray: [],
      childArray: [],
      checkedId: [],
      array: [],
      checkArray: []
    };
  },

  mounted() {
    this.selectLists();
    //  this.RoleMenu()
  },
  methods: {
    //获取一级树
    selectLists() {
      this.loading = true;
      getAjax("menu/queryMenuList", { parentId: "0" }).then(res => {
        if (res.data.code == 200) {
          var _this = this;
          this.listArray = [];
          res.data.data.forEach(function(res) {
            _this.listArray.push({
              label: res.menuname,
              id: res.menuid,
              parentId: res.menuid
            });
          });
          this.loading = false;
        }
      });
    },
    handleNodeClick(data, Node) {
      if (Node.parent.level === 0) {
        // 不会触发事件
      } else {
        // 关闭选择器
        this.isShowSelect = false;
      }
    },
    //判断第一级栏目
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.listArray);
      } else {
        this.getChildren(node.data.id, resolve);
        this.RoleMenu();
      }
    },
    //获取子集栏目
    getChildren(id, resolve) {
      getAjax("menu/queryMenuList", { parentId: id })
        .then(res => {
          var _this = this;
          this.childArray = [];
          res.data.data.forEach(function(res) {
            _this.childArray.push({
              label: res.menuname,
              id: res.menuid,
              parentId: id
            });
          });
          return resolve(this.childArray);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //选中状态
    handleCheckChange(data, checked, indeterminate) {
      this.checkArray = this.$refs.tree.getCheckedNodes();
      var _this = this;
      this.checkedId = [];
      this.checkArray.forEach(function(res, index) {
        _this.checkedId.push(res.id);
      });
      this.checkedId.push(data.parentId);
      Array.prototype.distinct = function() {
        var arr = this,
          result = [],
          len = arr.length;
        arr.forEach(function(v, i, arr) {
          var bool = arr.indexOf(v, i + 1);
          if (bool === -1) {
            result.push(v);
          }
        });
        return result;
      };
      this.array = this.checkedId.distinct();
    },
    //根据个人id查询树
    RoleMenu() {
      getAjax("roleMenu/findRoleAndMenuById", { roleId: this.roleId }).then(
        res => {
          if (res.data.code == 200) {
            let _this = this;
            this.checkArray = [];
            res.data.data.menuIds.forEach(function(res) {
              _this.checkArray.push({
                id: res.menuId,
                label: res.menuName
              });
            });

            this.$refs.tree.setCheckedNodes(this.checkArray);
          }
        }
      );
    },
    onSubmit() {
      postAjax("roleMenu/roleMenuSave", {
        roleId: this.roleId,
        menuIds: this.array.toString()
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("提交成功！");
          this.$router.push({ path: "/authoritySetting" });
        }
      });
    },
    returnCallback() {
      this.$router.push({ path: "/authoritySetting" });
    }
  }
};
</script>
<style>
.assignBox {
  width: 70%;
  margin-bottom: 3%;
}
.clearfix:after {
  content: "\200B";
  display: block;
  height: 0;
  clear: both;
}
.assignBox .left {
  width: 50%;
  float: left;
}
.assignBox .right {
  width: 49%;
  float: left;
  /* border: 1px solid #ccc; */
}
.el-checkbox-group .el-checkbox:first-child {
  margin-left: 30px;
}
.el-checkbox {
  display: block;
}
</style>
