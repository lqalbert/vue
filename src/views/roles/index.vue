<template>
    <commontable :table-data="allData"></commontable>
</template>

<script>
    import Commontable from '@/components/Commontable'

    export default {
        components: {
            Commontable
        },

        data() {
            return {
                //禁止搜索字段
                banFields: [

                ],
                //填充数据
                allData: {
                    //表头
                    tableTitle: [
                        {
                            "Field": "username",
                            "Type": "varchar(255)",
                            "Collation": "utf8mb4_unicode_ci",
                            "Null": "NO",
                            "Key": "",
                            "Default": null,
                            "Extra": "",
                            "Privileges": "select,insert,update,references",
                            "Comment": "用户名",
                        },
                        {
                            "Field": "email",
                            "Type": "varchar(255)",
                            "Collation": "utf8mb4_unicode_ci",
                            "Null": "NO",
                            "Key": "",
                            "Default": null,
                            "Extra": "",
                            "Privileges": "select,insert,update,references",
                            "Comment": "邮箱",
                        },

                        {
                            "Field": "is_use",
                            "Type": "enum('y','n')",
                            "Collation": "utf8mb4_unicode_ci",
                            "Null": "NO",
                            "Key": "",
                            "Default": "y",
                            "Extra": "",
                            "Privileges": "select,insert,update,references",
                            "Comment": "是否启用:y=是,n=否",
                        },

                    ],
                    //表数据
                    data: [{
                        is_use: '是',
                        username: '王小虎',
                        email: '1566489@qq.com'
                    }, {
                        is_use: '否',
                        username: '小刚',
                        email: 'fsdf@qq.com'
                    }, {
                        is_use: '是',
                        username: '小明',
                        email: 'ty435@qq.com'
                    }]
                }


            }
        },

    }
</script>


