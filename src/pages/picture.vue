<template>
    <div class="container">
        <web-header></web-header>
        <div class="mainDiv">
            <span class="title">产品管理 / {{this.$route.query.productName}} / 图片管理</span>
            <div class="imgDiv">
              <div class="singleImgDiv" style="margin-right:150px">
                  <el-table  :data="singleImgList"  border  style="width: 100%">
                      <el-table-column  prop="id"  label="ID"  width="60">
                      </el-table-column>
                      <el-table-column  prop="singleImgSrc" label="产品单个图片" width="300">
                          <template slot-scope="scope">
                              <img :src="url(scope.row.url)" alt="" class="singleImg">
                          </template>
                      </el-table-column>
                      <el-table-column  label="删除" width="100">
                          <template slot-scope="scope">
                              <i class="el-icon-delete" @click="deleteClick(scope.row)"></i>
                          </template>
                      </el-table-column>
                  </el-table>
                  <div class="addImg">
                    <el-upload
                      class="upload-demo"
                      action="http://localhost:8080/file/upload/"
                      :on-preview="handlePreview"
                      :on-success="singleHandleSuccess"
                      :before-upload="singlePictureNum"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </div>
              </div>
              <div class="detailImgDiv">
                  <el-table  :data="detailImgList"  border  style="width: 100%">
                      <el-table-column  prop="id"  label="ID"  width="60">
                      </el-table-column>
                      <el-table-column  prop="detailImgSrc" label="产品详情图片" width="300">
                          <template slot-scope="scope">
                              <img :src="url(scope.row.url)" alt="" class="singleImg">
                          </template>
                      </el-table-column>
                      <el-table-column  label="删除" width="100">
                          <template slot-scope="scope">
                              <i class="el-icon-delete" @click="deleteClick(scope.row)"></i>
                          </template>
                      </el-table-column>
                  </el-table>
                  <div class="addImg">
                    <el-upload
                      class="upload-demo"
                      action="http://localhost:8080/file/upload/"
                      :on-preview="handlePreview"
                      :on-success="detailHandleSuccess"
                      :before-upload="detailPictureNum"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/web-header'
export default {
  data () {
    return {
      singleImgList: [],
      detailImgList: [],
      formLabelWidth: '80px',
      form: {
        propertyName: ''
      },
      fileList: []
    }
  },
  components: {
    'web-header': Header
  },
  methods : {
    deleteClick (value) {
      console.log(value)
      this.$confirm('确认要删除该图片？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(`${this.$restUrl}/productImg/delete`, {'id': value.id}).then((res) => {
          console.log(res)
            this.$message({
            type: 'success',
            message: '成功删除!'
          })
          this.getList()
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
    handlePreview(file) {
      console.log(file);
    },
    singleHandleSuccess(res) {
      console.log(res)
      const data = {
        pid: this.$route.query.pid,
        url: res.data,
        type: 1
      }
      this.$axios.post(`${this.$restUrl}/productImg/add`, data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    detailHandleSuccess(res) {
      console.log(res)
      const data = {
        pid: this.$route.query.pid,
        url: res.data,
        type: 2
      }
      this.$axios.post(`${this.$restUrl}/productImg/add`, data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getList () {
      this.singleImgList = []
      this.detailImgList = []
      this.$axios.get(`${this.$restUrl}/productImg/getPidList?pid=${this.$route.query.pid}`).then((res) => {
        console.log(res)
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].type === 1) {
            this.singleImgList.push(res.data.data[i])
          } else {
            this.detailImgList.push(res.data.data[i])
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    url (src) {
      return require(`E://upload/${src}`)
    },
    singlePictureNum () {
      if (this.singleImgList.length > 4) {
        this.$alert('最多只能上传5张图片','提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      return false
      }
    },
    detailPictureNum () {
      if (this.detailImgList.length > 4) {
        this.$alert('最多只能上传5张图片','提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      return false
      }
    }
  },
  created () {
    console.log(this.$route.query.pid)
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
  .imgDiv {
    display: flex;
    width: 1080px;
    margin: 30px auto 0
  }
  .singleImgDiv {
    width: 461px
  }
  .detailImgDiv {
    width: 461px
  }
  .singleImg {
    width: 60px;
    height: 60px;
  }
  .addImg {
    margin-top: 10px;
    padding: 20px;
    text-align: center;
    border: 1px solid #faebcc
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
</style>
