<template>
  <div class="container">
    <web-header></web-header>
    <div class="mainDiv">
       <span class="title">订单管理</span>
       <div class="userInfo">
         <el-table  :data="infoList"  border  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <a :href="`localhost:8082/#/productInfo?pid=${props.row.pid}`" target="_blank" class="productInfoSrc">{{props.row.productName}}</a>
                </template>
            </el-table-column>
            <el-table-column  prop="id"  label="ID"  width="60">
            </el-table-column>
            <el-table-column  prop="status" label="状态" width="100">
            </el-table-column>
            <el-table-column  prop="productPrice" label="金额" width="100">
            </el-table-column>
            <el-table-column  prop="number" label="数量" width="60">
            </el-table-column>
            <el-table-column  prop="BuyerName"  label="买家姓名"  width="100">
            </el-table-column>
            <el-table-column  prop="creationTime" label="创建时间">
            </el-table-column>
            <el-table-column  prop="paymentTime" label="支付时间">
            </el-table-column>
            <el-table-column  prop="deliveryTime" label="发货时间">
            </el-table-column>
            <el-table-column  prop="receiveTime"  label="确认收货时间">
            </el-table-column>
            <el-table-column  prop="operation" label="操作" width="100">
                <template slot-scope="props">
                    <el-button size="mini" type="primary" @click="handleclick(props.row)" v-if="props.row.operation">发货</el-button>
                </template>
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
    handleclick (value) {
      this.theDelivery(value.id)
    },
    theDelivery (oid) {
      var data = {
        'id': oid,
        'status': 3
      }
      this.$axios.post(`http://localhost:8080/order/theDelivery`, data).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$alert('已发货', '提示', {
            confirmButtonText: '确定'
          })
          this.getOrderList()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getOrderList () {
      this.$axios.get('http://localhost:8080/order/list').then((res) => {
        console.log(res)
        this.infoList = []
        for (var i = 0; i < res.data.data.length; i++) {
          var obj = {
            pid: res.data.data[i].pid,
            id: res.data.data[i].id,
            productPrice: '',
            productName: '',
            status: res.data.data[i].status,
            amount: '',
            number: res.data.data[i].amount,
            BuyerName: res.data.data[i].receiver,
            creationTime: res.data.data[i].createtime.replace('.000+0000', ''),
            paymentTime: res.data.data[i].payTime === null ? '' : res.data.data[i].payTime.replace('.000+0000', ''),
            deliveryTime: res.data.data[i].deliveryTime === null ? '' : res.data.data[i].deliveryTime.replace('.000+0000', ''),
            receiveTime: res.data.data[i].confirmTime === null ? '' : res.data.data[i].confirmTime.replace('.000+0000', ''),
            operation: res.data.data[i].status === 2
          }
          this.infoList.push(obj)
          this.getProductInfo(res.data.data[i].pid, i)
        }
        console.log(this.infoList)
      }).catch((err) => {
        console.log(err)
      })
    },
    getProductInfo (pid, index) {
      this.$axios.get(`http://localhost:8080/product/get?id=${pid}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.infoList[index].productName = res.data.data.name
          this.infoList[index].productPrice = res.data.data.price
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getOrderList()
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
  .productInfoSrc {
    color: #337ab7;
    text-decoration: none
  }
  .productInfoSrc:hover {
    color: #FF003E
  }
</style>

<style>
  .cell {
    text-align: center;
    font-size: 16px
  }
</style>
