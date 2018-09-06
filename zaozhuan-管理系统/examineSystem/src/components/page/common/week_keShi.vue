<template>
    <div class="container">
        <div class="block">
            <label class="label-search" >责任科室:</label>
            <el-select v-model="searchInfo.responsibility" placeholder="全部" @change="search">
                <el-option
                        v-for="item in optionsDuty"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                </el-option>
            </el-select>
        </div>

    </div>
</template>

<script>
    import { postAjax, getAjax, uploadImg } from "../../../api/api.js";

    export default {
        created(){
            this.getkeShi();
        },
        props:['user'],
        data(){
            return{
                searchInfo: {
                    dutyvalue: "", //责任科室
                },
                optionsDuty: [], //责任科室
            }
        },
        methods:{
            search(val){
                this.searchInfo.dutyvalue=val;
                this.$emit('weekKeShi', this.searchInfo.dutyvalue);
            },
            getkeShi(){
                getAjax("org/queryOrgList").then(res => {
                    if (res.data.code == 200) {
                        this.optionsDuty = res.data.data;
                        this.optionsDuty.unshift({orgName:'全部',orgId:''})
                        if (res.data.data.length) {
                            // this.searchInfo.dutyvalue = res.data.data[0].orgId;
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 40px;
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
</style>