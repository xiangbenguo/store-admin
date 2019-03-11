<template>
  <div class="container">
    <web-header></web-header>
    <div class="mainDiv">
       <span class="title">用户管理</span>
       <div class="userInfo">
         <el-table  :data="infoList"  border  style="width: 80%">
              <el-table-column  prop="id"  label="ID"  width="60">
              </el-table-column>
              <el-table-column  prop="userName" label="用户名" width="250">
              </el-table-column>
              <el-table-column  prop="passWord" label="密码" width="250">
              </el-table-column>
              <el-table-column  prop="registeredTime" label="注册时间">
              </el-table-column>
          </el-table>
       </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/web-header'
export default {
  name: 'HelloWorld',
  data () {
    return {
      infoList: []
    }
  },
  components: {
    'web-header': Header
  },
  methods: {
  },
  created () {
    this.infoList=[]
    this.$axios.get('http://localhost:8080/user/list').then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            for (var i = 0; i < res.data.data.length; i++) {
              var obj = {
                id: res.data.data[i].id,
                userName: res.data.data[i].username,
                passWord: res.data.data[i].password,
                registeredTime: res.data.data[i].createtime.replace('.000+0000','')
              }
              this.infoList.push(obj)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin-left: 180px
  }
  .mainDiv {
    margin: 30px auto;
    width: 90%;
    position: relative
  }
  .title {
    font-size: 18px;
    font-weight: bold
  }
  .userInfo {
    margin-top: 30px
  }
  i {
    cursor: pointer;
    font-size: 20px
  }
</style>

<style>
  .cell {
    text-align: center;
    font-size: 16px
  }
  .el-dialog__title {
    font-weight: bold
  }
  .el-dialog__footer {
    text-align: center
  }
</style>
