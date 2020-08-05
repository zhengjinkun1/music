<template>
    <div class="register">
        <van-nav-bar
            title="注册"
            left-text="登录"
            right-text="关闭" 
            @click-left="goPage('Login')"
        />
        <div class="logo">
            <img class="auto-img" src="../assets/images/2.png" alt="">
        </div>

        <van-form @submit="register">
            <van-field
              v-model="userInfo.phone"
              type="text"
              name="手机号码"
              label="手机号码"
              placeholder="手机号码"
              left-icon="phone-o"
              maxlength="11"
            >
              <template v-slot:right-icon>
                  <div>1</div>
              </template>
            </van-field>
            
            <van-field
              v-model="userInfo.nickName"
              type="text"
              name="昵称"
              label="昵称"
              placeholder="字母数字_组合(1-10)"
              left-icon="contact"
              maxlength="10"

             
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
                立即注册
              </van-button>
            </div>
        </van-form>
    </div>
    
</template>

<script>
    import '../assets/css/register.less'
    // 导入验证表单模块
    import validForm from '../assets/js/validForm'
    export default {
        data(){
          return {
            userInfo:{
              phone:'',
              nickName:'',
              password:'',
            },
            isEye:false 
          }
        },
        methods:{
          // 切换密码格式
          viewPassword(){
            this.isEye = !this.isEye;
          },
          register(){
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
                url:'/register/cellphone',
                // post传参需要在data中写
                params
              }).then(result => {
                // 关闭加载提示
                this.$toast.clear();
                
                if(result.data.code == 200){
                  // this.$toast('注册成功');
                  this.$router.push({name: 'Login'});
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

