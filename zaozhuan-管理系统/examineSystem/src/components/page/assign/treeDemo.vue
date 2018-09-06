<template>
    <div class="custom-tree-container">
        <div class="block">
            <tr>
                <th>关键目标</th>
                <th>关键目标</th>
                <th>关键目标</th>
            </tr>
            <el-tree
                    :data="data4"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false">
      <tr class="custom-tree-node" slot-scope="{ node, data }">
        <td>{{ node.label }}</td>
        <td>{{ data.ass }}</td>
      <td>{{ node.label }}</td>
      </tr>
      
            </el-tree>
        </div>
    </div>
</template>


<script>
    let id = 1000;

    export default {
        data() {
            const data = [
                {
                id: 1,
                label: '一级 1',
                ass: '一级 1A',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    ass: '一级 1A',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1',
                        ass: '一级 1A',
                    }, {
                        id: 10,
                        label: '三级 1-1-2',
                        ass: '一级 1A',
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                ass: '一级 1A',
                children: [
                    {
                    id: 5,
                    label: '二级 2-1',
                    ass: '一级 1A',
                }, {
                    id: 6,
                    label: '二级 2-2',
                    ass: '一级 1A',
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1',
                    ass: '一级 1A',
                }, {
                    id: 8,
                    label: '二级 3-2',
                    ass: '一级 1A',
                }]
            }];
            return {
                data4: JSON.parse(JSON.stringify(data)),
            }
        },

        methods: {
            renderContent(h, { node, data, store }) {
               
                // return ('<span class="custom-tree-node">\n' +
                //     '   <span>'+node.label+'</span><span>' +
                //     '  </span></span>');
            }
        }
    };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    /* tr{
      border-bottom:1px solid
    } */
    td:first-child,th:first-child{
      /* border-right:1px solid; */
      width: 300px;
    }
    td{
        width: 300px;
    }
    th{
        width: 300px;
        text-align: center
    }
    .el-tree-node__content{
        border-bottom:1px solid 
    }
</style>
