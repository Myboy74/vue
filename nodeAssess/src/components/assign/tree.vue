<template>
<div>

  <el-tree
  :data="data2"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  check-strictly='fasle'
  highlight-current
  :props="defaultProps"
   @check-change="handleCheckChange"
  >
</el-tree>

<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
 
  <el-button @click="resetChecked">清空</el-button>
</div>
    
</div>
</template>
<script>
export default {
    methods: {
        handleCheckChange(data, checked, indeterminate) { 
           console.log(this.$refs.tree.getCheckedNodes());
      },
    //   getCheckedNodes() {
        
    //   },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },

    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>

<style>

</style>
