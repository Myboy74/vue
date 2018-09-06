<template>
    <div class="container">
        <div class="block">
            <el-date-picker
                    v-model="searchTime.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
                    v-model="searchTime.endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="结束时间">
            </el-date-picker>
        </div>
        <div class="block1">
            <!-- <el-input placeholder="重点任务查询" prefix-icon="el-icon-search" v-model="searchTime.selectWord"
                      class="f_search"></el-input> -->
            <el-button type="primary" @click="search" style="float: left">搜索</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                searchTime:[
                    {
                        startTime: "",
                        endTime:"",
                        selectWord:""
                    }
                ],

            }
        },
        methods:{
            search(){
                this.$emit('searchTime',this.searchTime);
            }
        },
        watch:{
            startTime(val){
                console.log(val);
                this.searchTime.startTime=val;
            },
            endTime(val){
                console.log(val);
                this.searchTime.endTime=val;
            },
            select_word(val){
                this.searchTime.selectWord=val;
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 40px;
    }
    .block,.block1{
        width: 41%;
        float: left;
    }
    .block1{
        width: 55%;
    }
    .block1 .f_search{
        width: 60%;
        float: left;
        margin-right: 10px;
    }
</style>