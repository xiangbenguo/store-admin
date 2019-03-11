<template>
    <div class="container">
        <web-header></web-header>
        <div class="mainDiv">
            <span class="title">产品管理 / {{this.$route.query.categoryName}}</span>
            <el-button class="addProperty" type="primary" @click="displayCreateBox">添加产品</el-button>
            <div class="propertyInfo">
                <el-table  :data="infoList"  border  style="width: 90%">
                    <el-table-column  prop="id"  label="ID"  width="60">
                    </el-table-column>
                    <el-table-column  prop="productName" label="产品名称">
                    </el-table-column>
                    <el-table-column  prop="price" label="价格" width="100">
                    </el-table-column>
                    <el-table-column  prop="storeNum" label="库存数量" width="100">
                    </el-table-column>
                    <el-table-column  label="图片管理" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-picture" @click="pictureClick(scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column  label="属性设置" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-setting" @click="settingClick(scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column  label="编辑" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-edit-outline" @click="editClick(scope.row)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column  label="删除" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-delete" @click="deleteClick(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="新增产品" :visible.sync="dialogFormVisible" width="30%">
                    <el-form :model="form" ref="form">
                        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="productName" :rules="[{required: true, message: '产品名称不能为空'}]">
                            <el-input v-model="form.productName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="产品价格" :label-width="formLabelWidth" prop="price" :rules="[{required: true, message: '价格不能为空'},{ type: 'number', message: '价格必须为数字值'}]">
                            <el-input v-model.number="form.price" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="库存数量" :label-width="formLabelWidth" prop="storeNum" :rules="[{required: true, message: '库存数量不能为空'},{ type: 'number', message: '库存必须为数字值'}]">
                            <el-input v-model.number="form.storeNum" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addSubmit">提 交</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="属性设置" :visible.sync="propertySettingDialog" width="800px">
                    <el-form :inline="true" :model="propertyForm">
                        <el-form-item v-for="(item,index) in propertyForm.propertyNameList" :key="index" :label="propertyForm.propertyNameList[index]" label-width="120px">
                            <el-input v-model="propertyForm.propertyValueList[index]" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="propertySetting">提 交</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="编辑产品" :visible.sync="editProductInfo" width="30%">
                    <el-form :model="editForm" ref="form">
                        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="productName" :rules="[{required: true, message: '产品名称不能为空'}]">
                            <el-input v-model="editForm.productName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="产品价格" :label-width="formLabelWidth" prop="price" :rules="[{required: true, message: '价格不能为空'},{ type: 'number', message: '价格必须为数字值'}]">
                            <el-input v-model.number="editForm.price" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="库存数量" :label-width="formLabelWidth" prop="storeNum" :rules="[{required: true, message: '库存数量不能为空'},{ type: 'number', message: '库存必须为数字值'}]">
                            <el-input v-model.number="editForm.storeNum" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="editSubmit">提 交</el-button>
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
      infoList: [],
      propertyForm: {
        pid: '',
        ptid: [],
        propertyNameList: [],
        propertyValueList: []
      },
      dialogFormVisible: false,
      propertySettingDialog: false,
      editProductInfo: false,
      formLabelWidth: '80px',
      form: {
        productName: '',
        price: '',
        storeNum: ''
      },
      editForm: {
        id: '',
        productName: '',
        price: '',
        storeNum: ''
      }
    }
  },
  components: {
    'web-header': Header
  },
  methods : {
    pictureClick (value) {
      console.log(value)
      this.$router.push({path:'/picture', query: {pid: value.id, productName: value.productName}})
    },
    settingClick (value) {
      console.log(value)
      this.propertyForm= {
        pid: value.id,
        ptid: [],
        propertyNameList: [],
        propertyValueList: []
      }
      this.propertySettingDialog = true
      this.$axios.get(`${this.$restUrl}/property/getCidList?cid=${this.$route.query.cid}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          for (var i = 0; i < res.data.data.length; i++) {
            this.propertyForm.ptid.push(res.data.data[i].id)
            this.propertyForm.propertyNameList.push(res.data.data[i].name)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
      this.$axios.get(`${this.$restUrl}/propertyValue/getPidValueList?pid=${value.id}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          for (var i = 0; i < res.data.data.length; i++) {
            this.propertyForm.propertyValueList.push(res.data.data[i].value)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
      console.log(this.propertyForm)
    },
    editClick (value) {
      console.log(value)
      this.editForm = {
        id: value.id,
        productName: value.productName,
        price: parseInt(value.price),
        storeNum: parseInt(value.storeNum)
      }
      this.editProductInfo = true
    },
    deleteClick (value) {
      console.log(value)
      this.$confirm('确认要删除该产品？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('http://localhost:8080/product/delete',{'id':value.id}).then((res) => {
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
    addSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            name: this.form.productName,
            price: this.form.price,
            stock: this.form.storeNum,
            cid: this.$route.query.cid
          }
          this.$axios.post(`${this.$restUrl}/product/add`, data).then((res) => {
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
    editSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            id: this.editForm.id,
            name: this.editForm.productName,
            price: this.editForm.price,
            stock: this.editForm.storeNum,
          }
          this.$axios.post(`${this.$restUrl}/product/update`, data).then((res) => {
            console.log(res)
            if (res.data.code === 200) {
              this.editProductInfo = false
              this.$message({
                type: 'success',
                message: '编辑成功'
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
    propertySetting () {
      console.log(this.propertyForm)
      this.deletePidList()
      for (var i = 0; i < this.propertyForm.propertyNameList.length; i++) {
         
        this.$axios.post(`${this.$restUrl}/propertyValue/add`,{
          value: this.propertyForm.propertyValueList[i],
          pid: this.propertyForm.pid,
          ptid: this.propertyForm.ptid[i]
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
      this.propertySettingDialog = false
      
    },
    getList () {
      this.infoList = []
      this.$axios.get(`${this.$restUrl}/product/getCidList?cid=${this.$route.query.cid}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {
              id: res.data.data[i].id,
              productName: res.data.data[i].name,
              price: res.data.data[i].price,
              storeNum: res.data.data[i].stock,
            }
            this.infoList.push(obj)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    deletePidList () {
      this.$axios.post(`${this.$restUrl}/propertyValue/deletePidList`, {'pid': this.propertyForm.pid}).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    console.log(this.$route.query.cid)
    this.getList()
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
