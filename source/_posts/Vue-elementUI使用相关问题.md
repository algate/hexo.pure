title: vue-elementUI使用相关问题
date: 2018-04-25 18:52:30
categories:
- Vue
tags:
- elementUI
---

##### 1.form表格排序

在el-table需要排序的那一列加入 sortbale

    <el-table-column prop="createDate" label="申请日期" width="200" sortable :sort-method="auditSortby">
    sort-by sort-method都是自定义排序规则

    sort-method跟[]的sort类似。so数字相关的可以这样写

    <!-- js -->
    auditSortby(a, b) {
        return new Date(a.createDate).getTime() - new Date(b.createDate).getTime();
    },
<!-- more -->
##### 2.格式化数据

下边介绍两种方法：

    Number - 1:
    <el-table-column prop="status" label="状态" width="140" sortable sort-by>
        <template slot-scope="scope">{{ scope.row.status==='0'?'启用':'禁用' }}</template>
    </el-table-column>

    Number - 2:
    <el-table-column prop="sex" label="性别" width="100" :formatter="data_set_sex">
    </el-table-column>
    <!-- js -->
    data_set_sex (row) {
        return row.sex === '0' ? '男' : '女';
    },

##### 3.form - 更多按钮显示多项操作
通过绑定command来实现

    <el-table-column fixed="right" label="操作"  align="center" min-width="120">
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="J_addOrEdit(scope.row,'edit')">编辑</el-button>
            <el-dropdown trigger="click" @command="J_handle">
                <span class="el-dropdown-link">更多</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command='{"handle":"J_reset","row":scope.row}'>重置密码
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status==='1'" :command='{"handle":"J_enable","row":scope.row}'>启用
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status==='0'" :command='{"handle":"J_disabled","row":scope.row}'>禁用
                    </el-dropdown-item>
                    <el-dropdown-item :command='{"handle":"J_delete","row":scope.row}'>删除
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
    </el-table-column>

    <!-- JS -->
    J_handle (command) {
        switch (command.handle) {
        case 'J_reset':
            this.flag.flag_dialog_reset = true;
            this.user = Object.assign({}, command.row);
            console.log(command.row);
            break;
        case 'J_enable':
            this.flag.flag_dialog_enable = true;
            this.user = Object.assign({}, command.row);
            this.$refs.ref_user_status.enablesize = '启用';
            break;
        case 'J_disabled':
            this.flag.flag_dialog_enable = true;
            this.user = Object.assign({}, command.row);
            this.$refs.ref_user_status.enablesize = '禁用';
            break;
        case 'J_delete':
            this.flag.flag_dialog_delete = true;
            this.dialog_data.userid = command.row.id;
            break;
        }
    }

##### 4.多项checkbox选择
如下图所示:
![](/hexo.pure/images/posts/vue/elementUI/01.png)

    <el-table-column prop="fronts" label="前台功能权限" min-width="400">
        <template slot-scope="scope" >
            <!-- <el-checkbox-group> -->
                <el-checkbox v-for="fun in scope.row.fronts" :label="fun.funName" :key="fun.id" v-model="fun.checked"> </el-checkbox>
            <!-- </el-checkbox-group> -->
        </template>
    </el-table-column>

    如果给所有选中的复制：
    <!-- Js -->
    fetchApi(`rest/rights/role/function/${role.id}`, 'GET').then(r => {
        let tempOldprivilege = r.data;
        for (var i = 0; i < this.data_privilege.length; i++) {
            this.data_privilege[i].fronts.forEach((key) => {
                tempOldprivilege.forEach(value => {
                    key.id === value.id ? (() => {
                        console.log(key.id, key.checked, key.funName);
                        this.$set(key, 'checked', true);
                    })() : null;
                });
            });
            this.data_privilege[i].afters.forEach((key) => {
                tempOldprivilege.forEach(value => {
                    key.id === value.id ? (() => {
                        console.log(key.id, key.checked, key.funName);
                        this.$set(key, 'checked', true);
                    })() : null;
                });
            });
        }
    });

>tempOldprivilege为所有选中的列表，fronts为表格某一列的，afters为另一列；

但是有时候我们需要把重新选中的罗列出来

    let tempPrivilege = [];
    for (var i = 0; i < this.data_privilege.length; i++) {
        let F = this.data_privilege[i].fronts.filter((key) => {
            return key.checked;
        });
        let A = this.data_privilege[i].afters.filter((key) => {
            return key.checked;
        });
        tempPrivilege = tempPrivilege.concat(F.concat(A));
    }

>filter为js的迭代器算法--具体参考<<数据结构与算法-迭代器算法>>
tempPrivilege为选中的所有的数组，F和A分别代表两列数组选中的数组

##### 5.未完待续…
