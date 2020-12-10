<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-info v-if="current === 0" @next="next" :form="form" />
      <sale-info
        v-else-if="current === 1"
        :form="form"
        @next="next"
        @prev="prev"
      />
    </div>
  </div>
</template>
<script>
import BasicInfo from '@/components/basicDetail.vue';
import SaleInfo from '@/components/saleDetail.vue';
import api from '@/api/product';

export default {
  components: {
    BasicInfo,
    SaleInfo,
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  created() {
    // 拿到当前页面的id
    const { id } = this.$route.params;
    if (id) {
      // 如果存在，说明是编辑操作,读取商品详情
      api.detail(id).then((res) => {
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      console.log(form);
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 提交数据
        if (this.$route.params.id) {
          // 编辑操作更新数据
          api.edit(this.form).then((res) => {
            console.log(res, '===edit===');
            this.$message.success('编辑成功！');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          api.add(this.form).then((res) => {
            console.log(res, '======');
            this.$message.success('新增成功！');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
