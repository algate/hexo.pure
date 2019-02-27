title: dialog弹层组件全面解析-实现思路一
date: 2017-03-26 17:31:30
categories:
- Vue
tags:
- dialog
---
效果如下图流程
![](/hexo.pure/images/posts/vue/dialog/01.png)![](/hexo.pure/images/posts/vue/dialog/02.png)

#### one.自己定义弹层(弹层实现不包括别的样式和事件-非UI框架实现思路)

通过父组件页面的flag来显示和隐藏弹层
<!-- more -->
vue
* 1

        <!-- 页面点击事件 -->
        <hgroup>
            <button class="c_button_icon" @click="J_addOrEdit(null,'add')"><i class="icon_add size_12"></i></button>
            <!-- <el-button type="primary" size="small" icon="el-icon-plus"></el-button> -->
            <el-button type="primary" size="small" @click="J_import">导入</el-button>
            <el-button type="primary" size="small" @click="J_deletes">删除</el-button>
        </hgroup>

    <!-- table组件事件 -->（此处使用elementUI的command-还不错，统一管理，代码简洁，规范整理不是显的太乱）
    <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="J_addOrEdit(scope.row,'edit')">编辑</el-button>
            <el-dropdown trigger="click" @command="J_handle">
                <span class="el-dropdown-link">更多</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command='{"handle":"J_reset","row":scope.row}'>重置密码
                    </el-dropdown-item>
                    <el-dropdown-item :command='{"handle":"J_enable","row":scope.row}'>启用
                    </el-dropdown-item>
                    <el-dropdown-item :command='{"handle":"J_disabled","row":scope.row}'>禁用
                    </el-dropdown-item>
                    <el-dropdown-item :command='{"handle":"J_delete","row":scope.row}'>删除
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
    </el-table-column>

* 2

        <!-- 子组件 -->
        <div v-show="flag.flag_dialog_addOrEdit">
            <dialogAddorEdit @close="close" :info_user="user" ref="ref_user"></dialogAddorEdit>
        </div>
        <div v-if="flag.flag_dialog_import">
            <dialogImport @close="close"></dialogImport>
        </div>
        <div v-show="flag.flag_dialog_delete">
            <dialogDel @close="close"></dialogDel>
        </div>
        <div v-show="flag.flag_dialog_reset">
            <dialogReset @close="close"></dialogReset>
        </div>
        <div v-show="flag.flag_dialog_enable">
            <dialogEnable @close="close"></dialogEnable>
        </div>

>需要注意的是：使用 `v-show`和 `v-if` 之后各有利弊：
1.使用`v-if`之后，dialog相当于重新加载，导致的结果就是子组件获取`$ref`上的数据的时候获取不到，需要进入弹层的时候赋值
并且表单验证之后，直接关闭弹层再打开也没有飘红的现象。
（在用vue 使用elementUI验证规则的时候，定义规则的时候，需要注意。v-if，值为undefined）--关于验证可以访问另一篇文章：[vue-表单验证规则]()。
2.使用`v-show`,dialog相当于显示和隐藏，`$ref`上的数据可以获取到，省去不少麻烦。
但是，表单验证的时候，验证过表单直接关闭弹层再打开就会出现飘红的现象。体验很糟糕，不过elementUI提供了方案，关闭弹层触发的时候执行重置为初始值并移除校验结果。


>给子组件传递数据用了两种方式，`:info_user="user"` 和 `ref="ref_user"`
user 父组件数据绑定到子组件上去
$ref.ref_user 来操作子组件数据

script:

* 1.

        import dialogDel from './user_dialog/user_delete';
        import dialogAddorEdit from './user_dialog/user_addOrEdit';
        import dialogImport from './user_dialog/user_import';
        import dialogReset from './user_dialog/user_reset';
        import dialogEnable from './user_dialog/user_enable';

* 2.

        data () {
            return {
                flag: {
                    flag_dialog_delete: false,
                    flag_dialog_addOrEdit: false,
                    flag_dialog_import: false,
                    flag_dialog_reset: false,
                    flag_dialog_enable: false
                },
                multipleSelection: []
            }
        },
* 3.

        components: {
            dialogDel,
            dialogAddorEdit,
            dialogImport,
            dialogReset,
            dialogEnable
        },

* 4.

        method: {
            <!--  点击操作 -->
            J_handle (command) {
                switch (command.handle) {
                case 'J_reset':
                    this.flag.flag_dialog_reset = true;
                    console.log(command.row);
                    break;
                case 'J_enable':
                    this.flag.flag_dialog_enable = true;
                    console.log(command.row);
                    break;
                case 'J_disabled':
                    this.flag.flag_dialog_enable = true;
                    console.log(command.row);
                    break;
                case 'J_delete':
                    this.flag.flag_dialog_delete = true;
                    console.log(command.row);
                    break;
                }
            },
            // add & edit
            J_addOrEdit (data, edit) {
                this.flag.flag_dialog_addOrEdit = true;
                if (edit === 'edit') {
                    this.$refs.ref_user.title = '用户编辑';
                    this.$refs.ref_user.deptId = this.deptId;
                    this.$refs.ref_user.userType = this.userType;
                    this.user = Object.assign({}, data);
                } else {
                    this.$refs.ref_user.title = '添加用户';
                    this.$refs.ref_user.deptId = this.deptId;
                    this.$refs.ref_user.userType = this.userType;
                    this.user = {};
                }
                console.log(data);
            },
            // import
            J_import () {
                this.flag.flag_dialog_import = true;
            },
            // deletes
            J_deletes () {
                this.flag.flag_dialog_delete = true;
            },
            <!-- msg为子组件emit给父组件传递的数据 -->
            close (msg) {
                this.flag.flag_dialog_delete = false;
                this.flag.flag_dialog_addOrEdit = false;
                this.flag.flag_dialog_import = false;
                this.flag.flag_dialog_reset = false;
                this.flag.flag_dialog_enable = false;
                /* eslint-disable no-unused-expressions */
                msg ? this.J_get_students() : null;
            }
        }

子组件页面
>子组件页面关闭和取消按钮添加close事件，通过 `$emit` 传递给父组件
子组件使用props => :info_user 来获得父组件user绑定过来的数据
初始化 user_ref 上的 title 的默认值

* 1.user_addOrEdit

    <!-- vue文件 -->
    <template>
        <div class="c_dialog_box">
            <div class="c_dialog">
                <header class="c_dialog_header">
                    <span>{{title}}</span>
                    <i class="el-icon-close right" @click="close"></i>
                </header>
                <section class="c_dialog_center">
                    <div>
                        <el-form :model="info_user" label-width="80px">
                            <el-form-item label="账号">
                                <el-input v-model="info_user.gradecode" placeholder="账号"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="info_user.gradename" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="机构">
                                <el-input v-model="info_user.superior" placeholder="机构"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="info_user.graderoom">
                                    <el-radio label="1">男</el-radio>
                                    <el-radio label="2">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="info_user.gradenum" placeholder="邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="info_user.genre" placeholder="电话"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </section>
                <footer class="c_dialog_footer">
                    <el-button type="info" size="small" plain @click="close">取消</el-button>
                    <el-button type="primary" size="small" @click="J_dialog_data_save">确定</el-button>
                </footer>
            </div>
        </div>
    </template>
    <script>
    import { userService } from 'services/usermanage.service';
    export default {
        props: ['info_user'],
        data () {
            return {
                <!-- v-if时 通过$ref操作子组件初始化是没有值的(需要赋值) -->
                title: ''
            };
        },
        created () {
            console.log(this.info_user);
        },
        updated() {
            console.log(this.title);
        },
        methods: {
            close () {
                this.$emit('close');
            },
            J_dialog_data_save() {
                if (this.title === '用户编辑') {
                    // save edit data
                    let params = {
                        id: this.info_user.id,
                        deptId: this.deptId,
                        loginName: this.info_user.loginName,
                        name: this.info_user.name,
                        sex: this.info_user.sex,
                        email: this.info_user.email,
                        phone: this.info_user.phone
                    };
                    userService.editUser(params).then(r => {
                        r.data.code === 0 ? this.$message.success(r.data.msg) : this.$message.error(r.data.msg);
                        this.$emit('close', r.data.code === 0 ? 'update' : null);
                    });
                } else {
                    // save add data
                    let params = {
                        deptId: this.deptId,
                        loginName: this.info_user.loginName,
                        name: this.info_user.name,
                        sex: this.info_user.sex,
                        userType: this.userType,
                        email: this.info_user.email,
                        phone: this.info_user.phone
                    };
                    userService.addUser(params).then(r => {
                        r.data.code === 0 ? this.$message.success(r.data.msg) : this.$message.error(r.data.msg);
                        this.$emit('close', r.data.code === 0 ? 'update' : null);
                    });
                }
            }
        }
    };
    </script>
    <style lang="scss">
        @import "src/style/c_dialog";
    </style>

* 2.user_delete

        <template>
            <div class="c_dialog_box">
                <div class="c_dialog">
                    <header class="c_dialog_header">
                        <span>删除确认</span>
                        <i class="el-icon-close right" @click="close"></i>
                    </header>
                    <section class="c_dialog_center">
                        <p>您正在执行删除操作，确认删除所选内容</p>
                    </section>
                    <footer class="c_dialog_footer">
                        <el-button type="info" size="small" plain @click="close">取消</el-button>
                        <el-button type="primary" size="small">确定</el-button>
                    </footer>
                </div>
            </div>
        </template>

        <script>
        export default {
            data () {
                return {

                };
            },
            methods: {
                close () {
                    this.$emit('close');
                }
            }
        };
        </script>
        <style lang="scss">
            @import "src/style/c_dialog";
        </style>

* c_dialog样式文件

        .c_dialog_box {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
        }
        .c_dialog {
            min-width: 420px;
            position:absolute;
            top:50%;
            left:50%;
            -webkit-transform: translate(-50%,-50%);
            -moz-transform: translate(-50%,-50%);
            transform:translate(-50%,-50%);
            background: #fff;
        }
        .c_dialog .c_dialog_header {
            height: 50px;
            padding-left: 30px;
            padding-right: 15px;
            line-height: 50px;
            color: #fff;
            font-size: 16px;
            background: #2dabff;
        }
        .c_dialog .c_dialog_header .right {
            float: right;
            font-size: 18px;
            line-height: 50px;
            cursor: pointer;
        }
        .c_dialog .c_dialog_center {
            padding: 30px 35px;
        }
        .c_dialog_import_progress {
            border: none;
            width: 100%;
            height: 30px;
            background: #ccc;
            color: #19ca6c; /\* IE10、Firefox \*/
        }
        progress::-moz-progress-bar { background: #19ca6c; }  /\* firefox value \*/
        progress::-webkit-progress-bar { background: #e3e9ee; }
        progress::-webkit-progress-value  { background: #19ca6c; }
        .c_dialog .c_dialog_footer {
            padding: 20px 30px;
            text-align: right;
        }
