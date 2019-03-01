<template>
    <div class="container">
        <div class="asideMenu">
                <el-menu    default-active="1"  class="el-menu-vertical-demo"
                background-color="#545c64" text-color="#fff"    active-text-color="#ffd04b">
                    <router-link to="/home">
                        <el-menu-item index="1">
                            <i class="el-icon-location"></i>
                            <span>分类管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/user">
                        <el-menu-item index="2">
                            <i class="el-icon-bell"></i>
                            <span>用户管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/order">
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span>订单管理</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
        </div>
        <div class="appmain">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.asideMenu {
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999
}
.el-menu {
    height: 100vh
}
.el-menu-item {
    min-width: 0
}
.appmain {
    width: 100%
}
</style>
