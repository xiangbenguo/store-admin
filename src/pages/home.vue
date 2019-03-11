<template>
  <div class="container">
    <web-header></web-header>
    <div class="mainDiv">
       <span class="title">分类管理</span>
       <el-button class="addCategory" type="primary" @click="displayCreateBox">添加分类</el-button>
       <div class="categoryInfo">
         <el-table :data="infoList"  border  style="width: 80%">
              <el-table-column  prop="id"  label="ID"  width="60">
              </el-table-column>
              <el-table-column  prop="categoryName" label="分类名称" width="300">
              </el-table-column>
              <el-table-column  label="属性管理">
                <template slot-scope="scope">
                    <i class="el-icon-menu" @click="propertyClick(scope.row)"></i>
                </template>
              </el-table-column>
              <el-table-column  label="产品管理">
                <template slot-scope="scope">
                    <i class="el-icon-goods" @click="productClick(scope.row)"></i>
                </template>
              </el-table-column>
              <el-table-column  label="编辑">
                <template slot-scope="scope">
                    <i class="el-icon-edit-outline" @click="editClick(scope.row)"></i>
                </template>
              </el-table-column>
              <el-table-column  label="删除">
                <template slot-scope="scope">
                    <i class="el-icon-delete" @click="deleteClick(scope.row)"></i>
                </template>
              </el-table-column>
          </el-table>
          <el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="30%">
              <el-form :model="form" ref="form">
                  <el-form-item label="分类名称" :label-width="formLabelWidth" prop="categoryName" :rules="[{required: true, message: '分类名称不能为空'}]">
                      <el-input v-model="form.categoryName" autocomplete="off" ></el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="submit">提 交</el-button>
              </div>
          </el-dialog>
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
      infoList: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        categoryName: ''
      }
    }
  },
  components: {
    'web-header': Header
  },
  methods: {
    propertyClick (value) {
      console.log(value)
      this.$router.push({path:'/property', query: {cid: value.id, categoryName: value.categoryName}})
    },
    productClick (value) {
      console.log(value)
      this.$router.push({path:'/product', query: {cid: value.id, categoryName: value.categoryName}})
    },
    editClick (rowData) {
      console.log(rowData)
      this.$prompt('分类名称', '编辑分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:  /\S/,
        inputErrorMessage: '请输入分类名称'
      }).then(({ value }) => {
        this.$axios.post('http://localhost:8080/category/update',{'id':rowData.id,'name': value}).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功' 
            })
            this.getList()
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消编辑'
        })
      })
    },
    deleteClick (value) {
      console.log(value)
      this.$confirm('确认要删除此分类？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('http://localhost:8080/category/delete',{'id':value.id}).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '成功删除!'
            })
            this.getList()
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    displayCreateBox () {
      this.dialogFormVisible = true
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8080/category/add',{'name': this.form.categoryName}).then((res) => {
            console.log(res)
            if (res.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getList()
              this.$refs.form.resetFields()//清除表单验证成功的样式
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getList () {
      this.infoList = []
      this.$axios({
        methods: 'get',
        url: 'http://localhost:8080/category/list'
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {
              id: res.data.data[i].id,
              categoryName: res.data.data[i].name
            }
            this.infoList.push(obj)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getList()
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
  .addCategory {
    position: absolute;
    top: 0px;
    right: 100px
  }
  .categoryInfo {
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
