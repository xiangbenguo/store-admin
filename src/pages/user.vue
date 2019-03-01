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
      infoList: [
        {
          id: '1',
          userName: '15208327082',
          passWord: '123456',
          registeredTime: '2019-2-25'
        }, {
          id: '2',
          userName: '15208327082',
          passWord: '123456',
          registeredTime: '2019-2-25'
        }
      ]
    }
  },
  components: {
    'web-header': Header
  },
  methods: {
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
