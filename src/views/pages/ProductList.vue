<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :data="categoryList"></search-box>
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <!-- 表格 -->
    <products-table
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"
    >
    </products-table>
  </div>
</template>
<script>
import searchBox from '@/components/search.vue';
import ProductsTable from '@/components/productsTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  components: {
    searchBox,
    ProductsTable,
  },
  data() {
    return {
      tableData: [], // 存储表格的信息
      categoryList: [], // 类目的信息
      searchForm: {}, // 搜索的信息
      page: {
        // 配置信息
        current: 1, // 当前页数
        pageSize: 10,
        showSizeChanger: true, // 是否可以改变pagesize
        total: 1, // 数据总数
      },
      categoryObj: {}, // 用来存储类目信息，名称
    };
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name, // 对应的类目名字
          }));
        });
    },
    changePage(page) {
      // 换页
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      // 点击编辑按钮
      this.$router.push({
        // 跳转到编辑页面
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => (
          <div style="color:red;">{`确认删除标题为：${record.title}的商品吗？`}</div>
        ),
        onOk: () => { // 这里要使用箭头函数，this指向更新数据
          api
            .remove({ // 删除
              id: record.id,
            })
            .then(() => {
              this.getTableData(); // 更新数据
            });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>
<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
