<template>
    <div>
        <!--表格-->
        <commontable @addRow="openDialog" @handleDelete="handleDelete" @reload="reload" @handleEdit="handleEdit"
                     @search="search" @changeCurrent="handleCurrentChange" @changePagesize="handleSizeChange"
                     :ban-fields="banFields" :table-data="tableData" :table-title="tableTitle" :perpages="perpages"
                     :total="total"></commontable>

        <!--添加和编辑的对话框-->
        <div class="components-container">
            <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="添加角色" :visible.sync="dialogTableVisible">
                <el-form :rules="rules" ref="addForm" :model="addForm" label-position="left" label-width="150px"
                         style='width: 400px; margin-left:50px;'>

                    <el-form-item :label="role_name" prop="role_name">
                        <el-input v-model="addForm.role_name"></el-input>
                    </el-form-item>

                    <el-form-item :label="role_comment" prop="role_name">
                        <el-input v-model="addForm.role_comment"></el-input>
                    </el-form-item>

                    <el-form-item :label="role_mark" prop="role_name">
                        <el-input v-model="addForm.role_mark"></el-input>
                    </el-form-item>


                    <el-form-item :label="parent_id" prop="parent_id">
                        <el-select v-model="addForm.parent_id" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item :label="is_use" prop="is_use">
                        <el-radio-group v-model="addForm.is_use"  >
                            <el-radio label="y" border>是</el-radio>
                            <el-radio label="n" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item :label="is_robot" prop="is_robot">
                        <el-radio-group v-model="addForm.is_robot"  >
                            <el-radio label="y" border>是</el-radio>
                            <el-radio label="n" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item :label="is_backend" prop="is_backend">
                        <el-radio-group v-model="addForm.is_backend"  >
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
    import getRoles from '@/api/role'

    export default {
        name: 'dragDialog-demo',
        directives: {elDragDialog},
        dialogFormVisible: false,
        components: {
            Commontable
        },
        data() {
            return {
                dialogTableVisible: false,
                parent_id: "所属父类",
                role_name: "角色名字",
                role_comment: "角色说明",
                role_mark: "角色标签",
                is_use: "是否启用",
                is_backend: "是否能登录后台",
                is_robot: "是否是机器人",

                rules: {
                    role_name: [{required: true, message: '角色名称必须填写', trigger: 'blur'}],
                    parent_id: [{required: true, message: '必须选择一个父类', trigger: 'blur'}],
                    role_comment: [{required: true, message: '角色说名必须填写', trigger: 'blur'}],
                    role_mark: [{required: true, message: '角色标签必须填写', trigger: 'blur'}],
                },
                addForm: {

                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value4: '选项2',


                perpages: 0,
                cur_page: 0,
                total: 1,
                searchForm: '',
                tableTitle: [],
                tableData: [],
                banFields: []
                //banFields:['role_mark','is_use','role_name']
            }
        },
        mounted() {
            this.getData()
        },
        computed: {},
        methods: {

            handleDrag() {
                //this.$refs.select.blur()
            },
            //确认提交
            confirms(){


                console.log(this.addForm)
            },
            dialogFormVisible() {
                this.dialogTableVisible = false
            },
            openDialog() {
                this.dialogTableVisible = true
                getRoles().then(response => {
                   console.log(response)
                }).catch(error => {
                    console.log(error)
                })
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
                this.searchForm = JSON.stringify(val)
                this.getData()
            },
            //编辑
            handleEdit: function (id) {

                //this.getData()
            },
            //删除一条
            handleDelete(ids) {
                //console.log(ids)
                if (ids.length < 1) {
                    alert('请先选择一条数据！')
                } else {
                    if (confirm("确认删除？")) {
                        handleDelete('/roles/delete', JSON.stringify(ids)).then(response => {
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
                getData('/roles', this.perpages, this.cur_page, this.searchForm).then(response => {
                    this.tableTitle = response.fields
                    this.tableData = response.data.data
                    this.perpages = response.data.per_page
                    this.total = response.data.total
                }).catch(error => {
                    console.log(error)
                })
            }
        },

    }
</script>
<style scoped>


</style>


