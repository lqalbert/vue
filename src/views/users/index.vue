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
        <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="用户设置" :visible.sync="dialogTableVisible">
            <el-form :rules="rules" ref="addForm" :model="addForm" label-position="left" label-width="150px"
                     style='width: 400px; margin-left:50px;'>

                <el-form-item :label="username" prop="username">
                    <el-input v-model="addForm.username" ></el-input>
                </el-form-item>

                <el-form-item :label="email" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>

                <el-form-item :label="password" prop="password">
                    <el-input v-model="addForm.password" type="password"></el-input>
                </el-form-item>

                <el-form-item :label="repassword" prop="repassword">
                    <el-input v-model="addForm.repassword" type="password"></el-input>
                </el-form-item>


                <el-form-item :label="is_use" prop="is_use">
                    <el-radio-group v-model="addForm.is_use">
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
    import {getUsers, create, show,findOne} from '@/api/user'

    export default {
        name:"users",
        directives: {elDragDialog},
        dialogFormVisible: false,
        components: {
            Commontable
        },

        data(){
            return{
                dialogTableVisible: false,
                username:"用户名",
                email:"邮箱",
                password:"密码",
                repassword:"确认密码",
                is_use: "是否启用",
                perpages: 0,
                cur_page: 0,
                total: 1,
                tableTitle: [],
                tableData: [],
                banFields: [],
                rules: {
                    username: [{required: true, message: '用户名称必须填写', trigger: 'blur'}],
                    email: [{required: true, message: '邮箱必须填写', trigger: 'blur'}],
                    password: [{required: true, message: '密码必须填写', trigger: 'blur'}],
                    repassword: [{required: true, message: '密码必须填写', trigger: 'blur'}],
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
                    is_use: 'y'
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
                        handleDelete('/users/delete', JSON.stringify(ids)).then(response => {
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
                getData('/users/show', this.perpages, this.cur_page, this.searchForm).then(response => {
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


