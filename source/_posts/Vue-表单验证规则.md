title: Vue - 表单验证规则
date: 2018-04-13 18:12:30
categories:
- Vue
tags:
- 表单验证
---
表单相关代码：

    <header class="c_dialog_header">
        <span>{{title}}</span>
        <i class="el-icon-close right" @click="close('info_user')"></i>
    </header>
    <el-form :model="info_user" label-width="80px" :rules="rules" ref="info_user">
        <el-form-item label="账号" prop="loginName">
            <el-input v-model="info_user.loginName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="info_user.name" placeholder="姓名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="机构">
            <el-input v-model="info_user.deptName" placeholder="机构"></el-input>
        </el-form-item> -->
        <el-form-item label="性别">
            <el-radio-group v-model="info_user.sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" v-if="userType===3">
             <el-checkbox-group v-model="info_user.userType">
                <el-checkbox label="老师"></el-checkbox>
                <el-checkbox label="校领导"></el-checkbox>
                <el-checkbox label="站点管理员"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="info_user.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="info_user.phone" placeholder="电话"></el-input>
        </el-form-item>
    </el-form>
    <footer class="c_dialog_footer">
        <el-button type="info" size="small" plain @click="close('info_user')">取消</el-button>
        <el-button type="primary" size="small" @click="J_dialog_data_save('info_user')">确定</el-button>
    </footer>
>此处代码为弹层 about 添加和编辑功能时使用的代码

* script:

    data() {
        <!-- 自定义规则 validateLoginname -->
        let validateLoginname = (rule, value, callback) => {
            <!-- 如果使用v-if，value为undefined；如果使用v-show，可以判断 value==='' -->
            if (!value) {
                callback();
            } else {
                if (this.info_user.loginName !== '') {
                    let params = {
                        loginName: this.info_user.loginName
                    };
                    userService.check_loginname(params).then(r => {
                        r.data.code !== 0 ? callback(new Error('重新输入账户名')) : callback();
                    });
                }
            }
        };
        return {
            userType: '',
            title: '',
            rules: {
                loginName: [
                    { required: true, message: '请输入账号名' },
                    { validator: validateLoginname, trigger: 'blur' }
                ]
            }
        };
    }

* script-method

    methods: {
        close(form) {
            <!-- 需要移除校验结果 -->
            // 这是个弹层，用的v-show显示的弹层。直接关闭弹层需要清除校验结果使用的方法
            this.$refs[form].resetFields();
            this.$emit('close');
        },
        J_dialog_data_save(form) {
            <!-- 验证方法 -->
            this.$refs[form].validate((valid) => {
                /* eslint-disable no-unused-expressions */
                valid ? () => {
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
                } : null;
            });
        }
    }
