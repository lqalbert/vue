<template>
    <div>
        <commontable @changeCurrent="handleCurrentChange" @changePagesize="handleSizeChange" :ban-fields="banFields" :table-data="tableData"
                     :table-title="tableTitle" :perpages="perpages" :total="total"></commontable>
        <div>{{getList}}</div>
    </div>
</template>

<script>
    import {getData} from '@/api/table'
    import Commontable from '@/components/Commontable'

    export default {
        components: {
            Commontable
        },

        data() {
            return {
                perpages: 0,
                cur_page: 0,
                total: 1,
                tableTitle: [],
                tableData: [],
               // banFields:[]
               banFields:['role_mark','is_use','role_name']
            }
        },
        computed: {
            getList: function () {
                this.getData()
                return null
            }
        },
        methods: {
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
            getData() {
                getData('/roles', this.perpages, this.cur_page).then(response => {
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


