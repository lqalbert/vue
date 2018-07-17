<template>
    <div class="contable">
        <!--顶部按钮和搜索框-->
        <div>
            <el-button type="primary" icon="el-icon-circle-plus">添加数据</el-button>
            <el-button type="danger" icon="el-icon-delete" style="margin-bottom: 10px;">批量删除</el-button>
            <el-form v-for="item in tableTitle" :inline="true" :model="formInline" class="demo-form-inline"
                     style="display: inline-block;margin-left: 20px;">
                <el-form-item v-if="item.Type.substr(0,4)=='varc' && !isBan(item.Field,banFields)" :label="item.Comment">
                    <el-input v-model="formInline[item.Field]" :placeholder="item.Comment"></el-input>
                </el-form-item>

                <el-form-item v-else-if="item.Type.substr(0,4)=='enum' && !isBan(item.Field,banFields)"
                              :label="(item.Comment.split(':'))[0]">
                    <el-select v-model="formInline[item.Field]" :placeholder="(item.Comment.split(':'))[0]">
                        <el-option v-for="each in getEnum((item.Comment.split(':'))[1])"  :label="each[1]" :value="each[0]"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary">查询</el-button>
        </div>

        <!--表格-->
        <el-table
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column v-for="item in tableTitle"
                             :label="item.Type.substr(0,4)=='enum'?(item.Comment.split(':'))[0]:item.Comment"
                             :prop="item.Field">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--页码-->
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                style="margin: 10px auto"
                background
                :page-sizes="[2,3,5, 15, 20, 25,30,35]"
                :page-size="perpages"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>


<script>
    export default {
        name: 'commontable',
        props: ['tableData', 'tableTitle', 'perpages', 'total', 'banFields'],
        data() {
            return {

                formInline: {

                },


            }
        },
        methods: {
            //当前页码
            handleCurrentChange(val) {
                this.$emit('changeCurrent', val)
            },
            //每页条数
            handleSizeChange(val) {
                this.$emit('changePagesize', val)
            },
            //判断是否禁止搜索
            isBan(needle, haystack) {
                var length = haystack.length;
                for (var i = 0; i < length; i++) {
                    if (haystack[i] == needle) return true;
                }
                return false;
            },
            //获取enum键值
            getEnum(data) {
               let sel=data.split(',');
                let arr=[];
                for(let i of sel){
                    arr.push(i.split('='))
                 }
                 console.log(this.formInline.is_backend)
                return arr
            }
        },

    }
</script>

<style scoped>
    .contable {
        margin: 20px 20px;
    }

    .el-form--inline .el-form-item {
        vertical-align: baseline;
    }

    .search {
        vertical-align: baseline;
    }
</style>