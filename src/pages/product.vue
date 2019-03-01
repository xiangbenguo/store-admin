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
                        <el-button type="primary" @click="submit">提 交</el-button>
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
          productName: '夏普屏PANDA/熊猫 LE39D71S 39英寸智能WiFi液晶平板电视40 42 43',
          price: '2499',
          storeNum: '75'
        }, {
          id: '2',
          productName: 'Changhong/长虹 65S1安卓智能12核65英寸网络平板LED液晶电视机70',
          price: '4499',
          storeNum: '84'
        }, {
          id: '3',
          productName: 'Hisense/海信 LED40EC520UA 40英寸4K智能平板液晶电视机WIFI网络',
          price: '2399',
          storeNum: '82'
        }, {
          id: '4',
          productName: 'Hisense/海信 LED49EC320A 49吋led液晶电视机智能网络平板电视50',
          price: '2799',
          storeNum: '90'
        }
      ],
      propertyForm: {
        propertyNameList: ['操作系统','3D类型','能效等级','产品名称','网络连接方式','制造商名称','型号','分辨率','制造商名称','型号','分辨率','制造商名称','型号','分辨率'],
        propertyValueList: ['VIDAA','无','一级','Hisense/海信 LED60EC660...','全部支持','青岛海信电器股份有限公司','LED60EC660US','3840x2160','青岛海信电器股份有限公司','LED60EC660US','3840x2160','青岛海信电器股份有限公司','LED60EC660US','3840x2160']
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
      this.propertySettingDialog = true
    },
    editClick (value) {
      console.log(value)
      // this.$prompt('产品名称', '编辑产品', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputPattern:  /\S/,
      //   inputErrorMessage: '请输入属性名称'
      // }).then(({ value }) => {
      //   this.$message({
      //     type: 'success',
      //     message: '编辑成功' 
      //   })
      //   console.log(value)
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消编辑'
      //   })
      // })
      this.editForm = {
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
    },
    propertySetting () {
      console.log(this.propertyForm)
      this.propertySettingDialog = false
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
