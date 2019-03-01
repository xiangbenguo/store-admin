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
                              <img :src="scope.row.singleImgSrc" alt="" class="singleImg">
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
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
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
                              <img :src="scope.row.detailImgSrc" alt="" class="singleImg">
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
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
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
      singleImgList: [
        {
          id: '1',
          singleImgSrc: 'http://how2j.cn/tmall/img/productSingle/8620.jpg'
        }, {
          id: '2',
          singleImgSrc: 'http://how2j.cn/tmall/img/productSingle/8619.jpg'
        }, {
          id: '3',
          singleImgSrc: 'http://how2j.cn/tmall/img/productSingle/8618.jpg'
        }, {
          id: '4',
          singleImgSrc: 'http://how2j.cn/tmall/img/productSingle/8617.jpg'
        }, {
          id: '5',
          singleImgSrc: 'http://how2j.cn/tmall/img/productSingle/8616.jpg'
        }
      ],
      detailImgList: [
        {
          id: '1',
          detailImgSrc: 'http://how2j.cn/tmall/img/productSingle/8620.jpg'
        }, {
          id: '2',
          detailImgSrc: 'http://how2j.cn/tmall/img/productSingle/8619.jpg'
        }, {
          id: '3',
          detailImgSrc: 'http://how2j.cn/tmall/img/productSingle/8618.jpg'
        }, {
          id: '4',
          detailImgSrc: 'http://how2j.cn/tmall/img/productSingle/8617.jpg'
        }, {
          id: '5',
          detailImgSrc: 'http://how2j.cn/tmall/img/productSingle/8616.jpg'
        }
      ],
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
    handlePreview(file) {
      console.log(file);
    },
  },
  created () {
    console.log(this.$route.query.pid)
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
