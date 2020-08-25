<template>
    <div class="loginPage" v-loading="loading" style="width: 500px; margin: 50px auto;">

        <div class="loginCenter">
            <div class="center">
                <div class="bg"></div>
                <div class="login">
                    <div class="loginTop">
                        <div class="title">用户登录</div>

                        <el-form :model="loginFormPwd" status-icon :rules="rules" ref="loginFormPwd" class="rule-form">
                            <el-form-item prop="userAccno">
                                <el-input placeholder="手机或邮箱" v-model="loginFormPwd.userAccno"></el-input>
                            </el-form-item>

                            <el-form-item prop="password">
                                <el-input type="password" placeholder="登录密码" @keyup.enter.native="pwdLogin('loginFormPwd')" v-model="loginFormPwd.password"></el-input>
                            </el-form-item>

                            <el-form-item prop="code">
                                <div style="display: flex;justify-content: space-between;height: 40px;">
                                    <el-input inline placeholder="请输入验证码" v-model="loginFormPwd.code"></el-input>
                                    <div class="code" @click="refreshCode" style="margin-left: 10px;">
                                        <identify
                                            :identifyCode="identifyCode"
                                        ></identify>
                                    </div>
                                </div>
                            </el-form-item>

                        </el-form>


                        <el-button :autofocus="true" class="fullBtn" type="primary" @click="pwdLogin('loginFormPwd')">登录</el-button>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import {identifyMixins} from "./identify"
    export default {
        name: "login",
        mixins: [identifyMixins],
        data() {
            var validAccount = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("账号不能为空!"));
                } else if(value == 'admin'){
                    callback()
                } else {
                    let phoneReg = /^1[3-578]\d{9}$/;
                    let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                    if (phoneReg.test(value) || mailReg.test(value)) {
                        callback();
                    } else {
                        callback(new Error("请输入正确的邮箱或者手机号"));
                    }
                }
            };
            var validPass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("密码不能为空"));
                } else {
                    // 字母+特殊符号 数字+特殊符号 字母+数字+特殊符号
                    const reg = /^(?![0-9]+$)[a-zA-Z0-9~!@#$%^&*.?_-]{6,20}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error("6-20个字符，请使用字母、数字或特殊符号的组合密码"));
                    }
                }
            };
            var validCode = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("验证码不能为空"));
                } else {
                    if (this.identifyCode == value) {
                        callback();
                    } else {
                        return callback(new Error("请输入正确的验证码"));
                    }
                }
            };
            return {
                loading: false,
                loginFormPwd: {
                    userAccno: this.getCookie('userAccno') || "",
                    password: this.getCookie('password') || "",
                    code: ''
                },
                rules: {
                    userAccno: [{validator: validAccount, trigger: "blur"}],
                    password: [{validator: validPass, trigger: "blur"}],
                    code: [{validator: validCode, trigger: "blur"}]
                }
            };
        },
        mounted(){

        },
        methods: {
            pwdLogin(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        var userAccno = this.loginFormPwd.userAccno
                        this.loading = true
                        this.$store.dispatch("getLoginUser", {
                            url: `/cimuser/service/v2/login?accno=${userAccno}&password=${encodeURIComponent(this.loginFormPwd.password)}&loginType=SERVER`}).then(res => {
                            console.log(res);
                            this.$router.push({path:'/'});
                            this.loading = false
                        }).catch(err => {
                            this.$message.error({
                                type: 'error',
                                message: err.msg
                            })
                            this.loading = false
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>
<style scoped="" lang="scss">
</style>

