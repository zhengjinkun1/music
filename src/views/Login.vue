<template>
    <div class="register">
        <van-nav-bar
            title="登录"
            left-text="注册"
            right-text="关闭" 
            @click-left="goPage('Register')"
        />
        <div class="logo">
            <img class="auto-img" src="../assets/images/2.png" alt="">
        </div>

        <van-form @submit="login">
            <van-field
              v-model="userInfo.phone"
              type="text"
              name="手机号码"
              label="手机号码"
              placeholder="手机号码"
              left-icon="phone-o"
              maxlength="11"
            />
            <van-field
              v-model="userInfo.password"
              :type="isEye ?'text':'password'"
              name="密码"
              label="密码"
              placeholder="密码"
              left-icon="lock"
              :right-icon="isEye?'eye-o':'closed-eye'"
              @click-right-icon="viewPassword"
              maxlength="16"

            />
            <div class="register-btn">
              <van-button round block type="info" native-type="submit">
                立即登录
              </van-button>
              <div class="forgot">
                <span></span>
                <span class="fr">忘记密码？</span>
              </div>
            </div>
            
        </van-form>
    </div>
    
</template>

<script>
// 13219184852
    import '../assets/css/register.less'
    // 导入验证表单模块
    import validForm from '../assets/js/validForm'
    export default {
        data(){
          return {
            userInfo:{
              phone:'',
              password:''
            },
            // false闭合
            isEye:false
            
          }
        },
        methods:{
          // 切换密码格式
          viewPassword(){
            this.isEye = !this.isEye;
          },
          login(){
            // 
            if(validForm.validUserForm(this.userInfo,this)){
          //     // 复制对象
              let params = Object.assign({},this.userInfo);
              
              // data.appkey = this.appkey;
              // 开启加载
              this.$toast.loading({
                message:'加载中',
                forbidClick:true,
                // 延迟自动关闭加载提示，为0不会关闭
                duration:0
              })
              // // 发起注册请求
              this.axios({
                method:'get',
                url:'/login/cellphone',
                // post传参需要在data中写
                params
              }).then(result => {
                // 关闭加载提示
                this.$toast.clear();
                
                if(result.data.code == 200){
                  // this.$toast('登录成功');
                  this.$router.push({name: 'Main'});
                }else{
                  this.$toast(result.data.message);
                }
              }).catch(err=>{
                this.$toast.clear();
                
              })
            }
          },
          goPage(name){
            this.$router.push({name})
          }
        }
    }
</script>
<style lang="less" scoped>
    .forgot {
        margin-top: 20px;
    }
</style>
