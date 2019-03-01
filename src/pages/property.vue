<template>
    <div class="container">
        <web-header></web-header>
        <div class="mainDiv">
            <span class="title">属性管理 / {{this.$route.query.categoryName}}</span>
            <el-button class="addProperty" type="primary" @click="displayCreateBox">添加属性</el-button>
            <div class="propertyInfo">
                <el-table  :data="infoList"  border  style="width: 80%">
                    <el-table-column  prop="id"  label="ID"  width="60">
                    </el-table-column>
                    <el-table-column  prop="propertyName" label="属性名称" width="500">
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
                <el-dialog title="新增属性" :visible.sync="dialogFormVisible" width="30%">
                    <el-form :model="form" ref="form">
                        <el-form-item label="属性名称" :label-width="formLabelWidth" prop="propertyName" :rules="[{required: true, message: '属性名称不能为空'}]">
                            <el-input v-model="form.propertyName" autocomplete="off"></el-input>
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
  data () {
    return {
      infoList: [
        {
          id: '1',
          propertyName: '操作系统'
        }, {
          id: '2',
          propertyName: '3D类型'
        }, {
          id: '3',
          propertyName: '能效等级'
        }, {
          id: '4',
          propertyName: '产品名称'
        }, {
          id: '5',
          propertyName: '网络连接方式'
        }, {
          id: '6',
          propertyName: '制造商名称'
        }
      ],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        propertyName: ''
      }
    }
  },
  components: {
    'web-header': Header
  },
  methods : {
    editClick (value) {
      console.log(value)
      this.$prompt('属性名称', '编辑属性', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:  /\S/,
        inputErrorMessage: '请输入属性名称'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '编辑成功' 
        })
        console.log(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消编辑'
        })
      })
    },
    deleteClick (value) {
      console.log(value)
      this.$confirm('确认要删除该属性？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功删除!'
        });
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
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  created () {
    console.log(this.$route.query.cid)
  }
}
</script>

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
  .addProperty {
    position: absolute;
    top: 0px;
    right: 100px
  }
  .propertyInfo {
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
