<template>
  <div class="login-container">
    <el-form class="login-form" :label-position="labelPosition" label-width="50px">
      <h3 class="title">管理后台</h3>
      <el-form-item label="账号">
        <el-input v-model="user" width="300px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password"  type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    return {
      labelPosition: 'right',
      user: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      if (this.user === 'admin' && this.password === '123456') {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          window.localStorage.setItem('isLogin',true)
          this.$store.commit('login')
          this.$router.push('/home')
      } else {
          this.$alert('账号密码错误', '提示', {
            confirmButtonText: '确定'
          })
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  z-index: 1000
}
.login-form {
  width: 420px;
  max-width: 100%;
  padding: 35px 35px 15px 5px;
  margin: 160px auto;
}
.title {
  font-size: 26px;
  font-weight: 400;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
  color: #fff
}
</style>
