<template>
  <el-dialog :visible="syncedShowCaptcha" title="图形验证码" @close="close" @open="open" width="520px">
    <div style="text-align: center">
      <img @click="getImgCode()" :src="imgPath" style="height: 170px; width: 400px"/>
      <el-form :model="validCodeFrm" :rules="validCodeFrmRules" ref="validCodeRef" label-width="100px" key="zm">
        <el-form-item label="图形验证码" prop="imgCode" style="margin-right: 20px;">
          <el-input size="small" placeholder="请输入图形验证码" v-model="validCodeFrm.imgCode"/>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button @click="checkValid()" size="big" type="success" style="width: 140px;">发 送</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">

  import {Vue, Component, Prop, Watch, PropSync, Emit} from 'vue-property-decorator';
  import config from '../config/index';
  import api from '@/http/http-api';

  @Component({})
  export default class ScCaptcha extends Vue {
    imgPath: string = '';//验证码图片
    validCodeFrm: any = {imgCode: ''};//表单model
    validCodeFrmRules: any = {        //验证规则
      imgCode: [
        {required: true, trigger: 'change', message: '验证码不能为空'}],
    };
    @PropSync('showCaptcha', {type: Boolean, default: false}) syncedShowCaptcha!: Boolean;//开关
    @Prop({default: ''}) readonly captchaApi!: string;//验证码图片接口名称

    checkValid() {
      (<any>this.$refs.validCodeRef).validate((valid) => {
        if (!valid) return;
        this.onSuccess();
      });
    }

    getImgCode() {
      this.imgPath = `${config.baseUrl + api._get[this.Captcha || '']}?t=${Math.random()}`;
    }

    @Watch('showCaptcha')
    open() {
      this.getImgCode();
      this.$refs.validCodeRef && (<any>this.$refs.validCodeRef).resetFields();
    }

    @Emit()
    onSuccess() {
      this.syncedShowCaptcha = false;
      return this.validCodeFrm.imgCode;
    }

  }
</script>

<style>

</style>
