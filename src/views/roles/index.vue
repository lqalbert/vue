<template>
    <div>
        <!--表格-->
        <commontable @addRow="openDialog" @handleDelete="handleDelete" @reload="reload" @handleEdit="handleEdit" @search="search" @changeCurrent="handleCurrentChange" @changePagesize="handleSizeChange" :ban-fields="banFields" :table-data="tableData" :table-title="tableTitle" :perpages="perpages" :total="total"></commontable>

        <!--添加和编辑的对话框-->
        <div class="components-container">
            <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="添加角色" :visible.sync="dialogTableVisible">


                <el-form :rules="rules" ref="addForm" :model="addForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

                    <el-form-item :label="title" prop="role_name">
                        <el-select ref="select" v-model="value" placeholder="请选择">
                            <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
                            <el-option label="选择父类" value="test哈哈">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item :label="title" prop="role_name">
                        <el-input v-model="addForm.role_name"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible">取消</el-button>
                    <el-button  type="primary" >确定</el-button>
                </div>
            </el-dialog>
        </div>






    </div>


</template>

<script>
    import {getData,handleDelete} from '@/api/table'
    import Commontable from '@/components/Commontable'
    import elDragDialog from '@/directive/el-dragDialog'

    export default {
        name: 'dragDialog-demo',
        directives: { elDragDialog },
        dialogFormVisible: false,





        components: {
            Commontable
        },

        data() {
            return {
                dialogTableVisible: false,
                title:"角色名",
                rules: {
                    role_name: [{ required: true, message: '角色名称必须填写', trigger: 'blur' }]
                },
                addForm: {
                    role_name:''
                },



                perpages: 0,
                cur_page: 0,
                total: 1,
                searchForm:'',
                tableTitle: [],
                tableData: [],
                banFields:[]
               //banFields:['role_mark','is_use','role_name']
            }
        },
        mounted(){
            this.getData()
        },
        computed: {

        },
        methods: {
            handleDrag() {
                //this.$refs.select.blur()
            },
            dialogFormVisible(){
                this.dialogTableVisible=false
            },
            openDialog(){
                this.dialogTableVisible=true
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
            search:function(val){
                this.searchForm=JSON.stringify(val)
                this.getData()
            },
            //编辑
            handleEdit:function(id){

                //this.getData()
            },
            //删除一条
            handleDelete(ids){
                //console.log(ids)
                if(ids.length<1){
                    alert('请先选择一条数据！')
                }else{
                    if(confirm("确认删除？")){
                        handleDelete('/roles/delete',JSON.stringify(ids)).then(response => {
                            this.searchForm=''
                            this.cur_page= 0
                            this.getData()
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }

            },
            //重置
            reload(){
                this.searchForm=''
                this.getData()
            },
            //获取数据
            getData(){
                getData('/roles', this.perpages, this.cur_page,this.searchForm).then(response => {
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


