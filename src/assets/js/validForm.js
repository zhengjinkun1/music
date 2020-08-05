class VaildForm {
    constructor(){
        this.validUserFormReg = {
            nickName:{
                reg:/^[\u4e00-\u9fa5\w]{1,10}$/,
                msg:'昵称格式不正确'
            },
            phone:{
                reg:/^1[3-9]\d{9}$/,
                msg:'手机号格式不正确'
            },
            password:{
                reg:/^[a-zA-Z]\w{5,15}$/,
                msg:'密码不正确'
            },
        }

        // 昵称,1-10个字符,汉字字母数字_组合   \w(字母数字_组合)
        // this.nickNameReg = /^[u4e00-\u9fa5\w]{1-10}$/;
        // 手机号
        // this.phoneReg = /^1[3-9]\d{9}$/;
        // 密码 首字符为字母
        // this.passwordReg = /^[a-zA-Z]\w{5-15}$/
    }
    // 验证表单
    validUserForm(o,self){
        //o 验证表单数据,类型object
        for(let key in o){
            if(!this.validUserFormReg[key].reg.test(o[key])){
                self.$toast(this.validUserFormReg[key].msg);
                return false;
            }
        }
        return true;
    }
}
export default new VaildForm();