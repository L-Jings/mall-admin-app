<template>
  <div class="sale-detail">
    <a-form-model
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      :rules="rules"
      ref="ruleForm"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="" :wrapper-col="{ span: 24 }" class="next-btn">
        <a-button type="default" @click="prev" style="margin-right: 18px"
          >上一步</a-button
        >
        <a-button type="primary" @click="next">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      rules: {},
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: '',
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      // 如果form中图片数据存在,map处理成专门对对象数据格式
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    handleChange({ file, fileList }) {
      console.log(file);
      if (file.status === 'done') {
        // 如果图片上传成功，就向form添加图片地址
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'remove') {
        // 如果选择图片删除
        const { url } = file.response.data;
        // 过滤掉删除掉图片数据
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
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
    prev() {
      this.$emit('prev');
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>
