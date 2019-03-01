<template>
    <div class="top">
        <div class="logo">
            <img src="../assets/tmall.png" alt="" width="70px" height="auto">
            <router-link to="/home">
                <span class="title">tmall后台管理系统</span>
            </router-link>
        </div>
        <div class="right">
            <el-button type="primary" size="medium" round @click="logout">退出</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'web-header',
  methods: {
    logout () {
      this.$confirm('确认要退出？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('logout')
        this.$router.push('/login')
      }).catch(() => {
      })
    }
  },
  mounted () {
    if (!this.$store.state.isLogin) {
      alert('请重新登录')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
    .top {
        width: 100%;
        height: 73px;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dcdfe6;
        box-shadow:-2px 0 5px #cccccc,2px 0 15px #cccccc;
    }
    .title {
        font-size: 30px;
        font-weight: bold;
        margin-left: 20px;
        color: #2c3e50;
        display: inline-block
    }
    .logo {
        margin-left: 10px;
        line-height: 73px;
        display: flex;
        align-items: center
    }
    .right {
        margin-right: 20px;
        line-height: 5vh;
        display: flex;
        align-items: center
    }
    .right img{
        width: 40px;
        height: 40px;
        border-radius: 50%
    }
</style>
