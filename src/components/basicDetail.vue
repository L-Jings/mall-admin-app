<template>
  <div class="basic-detail">
    <a-form-model
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      :rules="rules"
      ref="ruleForm"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
          @change="changeCategory"
        >
          <a-select-option v-for="c in categoryList" :value="c.id" :key="c.id">
            {{ c.name }}</a-select-option
          >
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加子类目">
          <a-select-option v-for="c in categoryItems" :value="c" :key="c">
            {{ c }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="Please select"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" :wrapper-col="{ span: 24 }" class="next-btn">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
    //   form: {
    //     title: "",
    //     desc: "",
    //     category: "",
    //     c_items: [],
    //     tags: [],
    //   },
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ['form'],
  created() {
    categoryApi.list().then((res) => {
      // 获取类目
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      //   console.log(category);// 打印的是类目的id
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          // 如果对应的是当前类目项，就存储当前的子类目
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
