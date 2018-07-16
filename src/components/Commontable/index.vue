<template>
    <div class="contable">
        <!--顶部按钮和搜索框-->
        <div>

            <el-button type="primary" icon="el-icon-circle-plus">添加数据</el-button>
            <el-button type="danger" icon="el-icon-delete" style="margin-bottom: 10px;">批量删除</el-button>

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

                <el-form-item label="特殊资源">
                    <el-radio-group v-model="sizeForm.resource" size="medium">
                        <el-radio border label="线上品牌商赞助"></el-radio>
                        <el-radio border label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-button type="primary">查询</el-button>
            </el-form>
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
                style="margin: 10px auto"
                background
                :page-sizes="[5, 15, 20, 25,30,35]"
                :page-size="perpages"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>


<script>
    export default {
        name: 'commontable',
        props: ['tableData', 'tableTitle', 'perpages', 'total'],
        data() {
            return {
                vform: '',
                inputdata: '',
                formInline: {
                    user: '',
                    region: ''
                },
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

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