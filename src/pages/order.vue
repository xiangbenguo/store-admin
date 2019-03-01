<template>
  <div class="container">
    <web-header></web-header>
    <div class="mainDiv">
       <span class="title">订单管理</span>
       <div class="userInfo">
         <el-table  :data="infoList"  border  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <a :href="`localhost:8080/#/productInfo?pid=${props.row.pid}`" target="_blank" class="productInfoSrc">{{props.row.productName}}</a>
                </template>
            </el-table-column>
            <el-table-column  prop="id"  label="ID"  width="60">
            </el-table-column>
            <el-table-column  prop="status" label="状态" width="100">
            </el-table-column>
            <el-table-column  prop="amount" label="金额" width="100">
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
      infoList: [
        {
          id: '1',
          productName: '阿迪达斯裤子男秋冬季休闲裤加绒卫裤长裤小脚男裤收口束脚运动裤',
          pid: '10',
          status: '待支付',
          amount: '￥2000',
          number: '2',
          BuyerName: '向本国',
          creationTime: '2019-2-25',
          paymentTime: '',
          deliveryTime: '',
          receiveTime: '',
          operation: false
        }, {
          id: '2',
          productName: '阿迪达斯裤子男秋冬季休闲裤加绒卫裤长裤小脚男裤收口束脚运动裤',
          pid: '10',
          status: '待发货',
          amount: '￥2000',
          number: '2',
          BuyerName: '向本国',
          creationTime: '2019-2-25',
          paymentTime: '2019-2-25',
          deliveryTime: '',
          receiveTime: '',
          operation: true
        }, {
          id: '3',
          productName: '阿迪达斯裤子男秋冬季休闲裤加绒卫裤长裤小脚男裤收口束脚运动裤',
          pid: '10',
          status: '待收货',
          amount: '￥2000',
          number: '2',
          BuyerName: '向本国',
          creationTime: '2019-2-25',
          paymentTime: '2019-2-25',
          deliveryTime: '2019-2-25',
          receiveTime: '',
          operation: false
        }, {
          id: '4',
          productName: '阿迪达斯裤子男秋冬季休闲裤加绒卫裤长裤小脚男裤收口束脚运动裤',
          pid: '10',
          status: '已完成',
          amount: '￥2000',
          number: '2',
          BuyerName: '向本国',
          creationTime: '2019-2-25',
          paymentTime: '2019-2-25',
          deliveryTime: '2019-2-25',
          receiveTime: '2019-2-25',
          operation: false
        }
      ]
    }
  },
  components: {
    'web-header': Header
  },
  methods: {
    handleclick (value) {
      console.log(value)
    }
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
