<template>
    <div>
        <!--数据展示-->
        <commontable @addRow="openDialog" @handleDelete="handleDelete" @reload="reload" @handleEdit="handleEdit"
                     @search="search" @changeCurrent="handleCurrentChange" @changePagesize="handleSizeChange"
                     :ban-fields="banFields" :table-data="tableData" :table-title="tableTitle" :perpages="perpages"
                     :total="total">
        </commontable>

        <!--添加和编辑的对话框-->
        <div class="components-container">
            <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="菜单设置" :visible.sync="dialogTableVisible">
                <el-form :rules="rules" ref="addForm" :model="addForm" label-position="left" label-width="150px"
                         style='width: 400px; margin-left:50px;'>

                    <el-form-item :label="name" prop="name">
                        <el-input v-model="addForm.name" ></el-input>
                    </el-form-item>

                    <el-form-item :label="path" prop="path">
                        <el-input v-model="addForm.path"></el-input>
                    </el-form-item>

                    <el-form-item :label="component" prop="component">
                        <el-input v-model="addForm.component" ></el-input>
                    </el-form-item>

                    <el-form-item :label="icon" prop="icon">
                        <el-input v-model="addForm.icon"></el-input>
                    </el-form-item>

                    <el-form-item :label="level" prop="level">
                        <el-input v-model="addForm.level" ></el-input>
                    </el-form-item>

                    <el-form-item :label="comment" prop="comment">
                        <el-input v-model="addForm.comment"></el-input>
                    </el-form-item>


                    <el-form-item :label="is_use" prop="is_use">
                        <el-radio-group v-model="addForm.is_use">
                            <el-radio label="y" border>是</el-radio>
                            <el-radio label="n" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item :label="is_last" prop="is_last">
                        <el-radio-group v-model="addForm.is_last">
                            <el-radio label="y" border>是</el-radio>
                            <el-radio label="n" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible">取消</el-button>
                    <el-button type="primary" @click="confirms">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getData, handleDelete} from '@/api/table'
    import Commontable from '@/components/Commontable'
    import elDragDialog from '@/directive/el-dragDialog'
    import {getUsers, create, show,findOne} from '@/api/menu'

    export default {
        name:"menus",
        directives: {elDragDialog},
        dialogFormVisible: false,
        components: {
            Commontable
        },

        data(){
            return{
                dialogTableVisible: false,
                name:"菜单名",
                path:"菜单路径",
                component:"菜单所属组件",
                icon:"菜单图标",
                level: "菜单级别",
                comment: "菜单说明",
                is_use: "是否启用",
                is_last: "最后一级菜单",
                perpages: 0,
                cur_page: 0,
                total: 1,
                tableTitle: [],
                tableData: [],
                banFields: [],
                rules: {
                    name: [{required: true, message: '菜单名必须填写', trigger: 'blur'}],
                    path: [{required: true, message: '菜单路径必须填写', trigger: 'blur'}],
                    component: [{required: true, message: '菜单所属组件必须填写', trigger: 'blur'}],
                    level: [{required: true, message: '菜单级别必须填写', trigger: 'blur'}],
                    comment: [{required: true, message: '菜单说明必须填写', trigger: 'blur'}],
                },
                addForm: {},

            }
        },
        mounted() {
            this.getData()
        },
        computed: {},
        methods:{
            handleDrag() {
                //this.$refs.select.blur()
            },

            //确认提交
            confirms() {
                create(this.addForm).then(response => {
                    this.getData()
                }).catch(error => {
                    console.log(error)
                })

                this.dialogTableVisible = false
            },
            dialogFormVisible() {
                this.dialogTableVisible = false
            },
            openDialog() {
                this.dialogTableVisible = true
                this.addForm = {
                    is_use: 'y',
                    is_last: 'y'
                }
            },
            //当前页码
            handleCurrentChange: function (val) {
                this.cur_page = val
                this.getData()
            },
            //每页条数
            handleSizeChange: function (val) {
                this.perpages = val
                this.getData()
            },
            //查询搜索
            search: function (val) {
                this.cur_page = 0
                this.searchForm = JSON.stringify(val)
                console.log(val)
                this.getData()
            },
            //编辑
            handleEdit: function (row) {
                this.dialogTableVisible = true
                findOne(row.id).then(response => {
                    this.addForm = response.data
                    this.addForm.password = ""
                    //this.addForm.parent_id=undefined
                }).catch(error => {
                    console.log(error)
                })
            },
            //删除一条
            handleDelete(ids) {

                if (ids.length < 1) {
                    alert('请先选择一条数据！')
                } else {
                    if (confirm("确认删除？")) {
                        handleDelete('/menus/delete', JSON.stringify(ids)).then(response => {
                            this.searchForm = ''
                            this.cur_page = 0
                            this.getData()
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }

            },
            //重置
            reload() {
                this.searchForm = ''
                this.getData()
            },
            //获取数据
            getData() {
                getData('/menus/show', this.perpages, this.cur_page, this.searchForm).then(response => {
                    this.tableTitle = response.fields
                    this.tableData = response.data.data
                    this.perpages = response.data.per_page
                    this.total = response.data.total
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>
<style scoped>


</style>


