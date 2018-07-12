<template>
    <commontable :search="search"  :table-data="tableData"  ></commontable>
</template>

<script>
    import Commontable from '@/components/Commontable'
    export default {
        components: {
            Commontable
        },

        data() {
            return {
                //填充数据
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                //搜索单选和下拉框
                search:{
                    options:{
                        item1:{
                            name:'角色名称',
                            items:['超级管理','文章管理']
                        },
                        item2:{
                            name:'是否启用',
                            items:['是','否']
                        },
                        item2:{
                            name:'是否启用',
                            items:['是','否']
                        },
                        /*添加更多……*/
                    },
                    radios:{
                        item1:{
                            name:'角色名称',
                            items:['超级管理','文章管理']
                        },
                        item2:{
                            name:'是否启用',
                            items:['是','否']
                        },
                        /*添加更多……*/
                    },
                    /*输入框*/
                    inputs:{

                    }



                },

            }
        },

    }
</script>


