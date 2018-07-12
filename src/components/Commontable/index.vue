<template>
    <div class="contable">
        <!--顶部按钮和搜索框-->
        <div>
            <el-row>
                <el-button type="primary" icon="el-icon-circle-plus">添加数据</el-button>
                <el-button type="danger" icon="el-icon-delete">批量删除</el-button>

                <el-form :inline="true" :model="formInline" class="demo-form-inline"
                         style="display: inline-block;margin-left: 20px;">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form>

            </el-row>
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
            <el-table-column
                    label="日期"
                    width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
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
                style="margin: 10px auto"
                background
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
    </div>
</template>


<script>
    export default {
        name: 'commontable',
        props: ['tableData', 'multipleSelection', 'options'],
        data() {
            return {
                vform: '',
                inputdata: '',
                formInline: {
                    user: '',
                    region: ''
                }

            }
        }
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