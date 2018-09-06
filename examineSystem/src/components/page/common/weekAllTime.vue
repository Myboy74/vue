<template>
    <div class="block">
        <el-date-picker
                v-model="time1"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始时间">
        </el-date-picker>
        <el-date-picker
                v-model="time2"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time1:"",
                time2:""
            };
        },
        watch:{
            time1(val){
                this.$emit('weekTimes',val);
            },
            time2(val){
                this.$emit('weekTime',val);
            }
        }
    }
</script>

<style scoped>
    .el-range-editor.el-input__inner{
        margin-right: 20px;
    }
</style>