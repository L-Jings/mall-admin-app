<template>
    <div class="product-list">
        <!-- 搜索 -->
        <search-box @submit="searchSubmit" :data="categoryList"></search-box>
        <!-- 表格 -->
        <products-table
            :data="tableData"
            :page="page"
            @change="changePage"
            :categoryList="categoryList"
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
      page: { // 配置信息
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
    },
    getTableData() {
      api.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name, // 对应的类目名字
        }));
      });
    },
    changePage(page) { // 换页
      this.page = page;
      this.getTableData();
    },
  },
};
</script>
