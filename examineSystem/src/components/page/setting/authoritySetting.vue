<template>
<div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
  <el-table
      :data="tableData"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        label="角色名称"
        width="160">
        <span slot-scope="scope">{{ scope.row.roleName?scope.row.roleName:' ' }}</span>
      </el-table-column>
      <el-table-column
        label="备注"
        width="160">
        <span slot-scope="scope">{{ scope.row.remark?scope.row.remark:' ' }}</span>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="setAuthority(scope.$index, scope.row)">设置权限</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>   
</template>

<script>
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
import qs from "qs";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.getRole();
  },

  methods: {
    //获取角色列表
    getRole() {
      let data=qs.stringify({pageNum:this.pageNum})
      postAjax("role/queryRolePage", data).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.dataList;
        }
      });
    },
    //设置权限
    setAuthority(index, row) {
      this.$router.push({
        name: "addAuthority",
        query: {
          roleName: row.roleName,
          roleId: row.roleId
        }
      });
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.label-search {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item-select {
  display: inline-block;
}
</style>
<style>
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
</style>
