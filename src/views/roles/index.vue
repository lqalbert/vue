<template>
    <div>
        <commontable :table-data="tableData" :table-title="tableTitle" :perpages="perpages"  :total="total"></commontable>
        <div>{{getList}}</div>
    </div>
</template>

<script>
    import {getData} from '@/api/table'
    import Commontable from '@/components/Commontable'
    //import {formateEnum} from '../../utils/formateEnum'
    import {formateEnum} from '@/utils/formateEnum'
    export default {
        components: {
            Commontable
        },

        data() {
            return {
                perpages:1,
                total:1,
                tableTitle:[],
                banFields: [],
                tableData: [],
            }
        },
        computed: {
            getList: function () {
                getData('/roles').then(response => {
                    this.tableTitle=response.fields
                    this.tableData=formateEnum(response.data.data,this.tableTitle)
                    this.perpages=response.data.per_page
                    this.total=response.data.total
                    //console.log(response)
                }).catch(error => {
                    console.log(error)
                });
                return null
            }
        },
        methods: {

        },

    }
</script>


