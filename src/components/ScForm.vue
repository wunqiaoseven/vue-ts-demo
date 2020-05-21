<template>
  <el-form ref="form" :inline="inline" :model="syncedModel" label-width="80px" class="demo-form-inline">
    <el-form-item v-for="formItem in formData" :label="formItem.label">
      <!--输入框-->
      <el-input v-if="formItem.EnFormItemType===EnFormItemType.INPUT" v-model="syncedModel[formItem.model]"
                :type="formItem.elType"></el-input>
      <!--下拉选择-->
      <el-select v-if="formItem.EnFormItemType===EnFormItemType.SELECT" v-model="syncedModel[formItem.model]"
                 :placeholder="formItem.placeholder">
        <el-option v-for="op in formItem.options" :label="op.label" :value="op.value"></el-option>
      </el-select>
      <!--开关-->
      <el-switch v-if="formItem.EnFormItemType===EnFormItemType.SWITCH" v-model="syncedModel[formItem.model]"></el-switch>
      <!--日期选择-->
      <el-date-picker
        v-if="formItem.EnFormItemType===EnFormItemType.DATE"
        v-model="syncedModel[formItem.model]"
        :type="formItem.elType"
        :range-separator="formItem.rangeSeparator"
        :start-placeholder="formItem.startPlaceholder"
        :end-placeholder="formItem.endPlaceholder">
      </el-date-picker>
      <!--多选框-->
      <el-checkbox-group v-if="formItem.EnFormItemType===EnFormItemType.CHECKBOX" v-model="syncedModel[formItem.model]">
        <el-checkbox v-for="checkbox in formItem.options" :label="checkbox.label" :name="checkbox.name"></el-checkbox>
      </el-checkbox-group>
      <!--单选组-->
      <el-radio-group v-if="formItem.EnFormItemType===EnFormItemType.RADIO" v-model="syncedModel[formItem.model]">
        <el-radio v-for="radio in formItem.options" :label="radio.label"></el-radio>
      </el-radio-group>
      <!--时间选择-->
      <el-time-select
        v-if="formItem.EnFormItemType===EnFormItemType.TIME" v-model="syncedModel[formItem.model]"
        :placeholder="formItem.placeholder" :picker-options="formItem.options">
      </el-time-select>
    </el-form-item>
    <!--按钮组-->
    <el-form-item>
      <el-button v-if="submitText" type="primary" @click="onSubmit">{{submitText}}</el-button>
      <el-button v-if="cancelText" @click="onCancel">{{cancelText}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit, PropSync} from 'vue-property-decorator';
  import {ScEnum, ScComputed} from '@/decorators';
  import IfScForm from '@/types/sc-form';
  import IfScFormItem from '@/types/sc-form-item';

  @Component({})
  export default class ScForm extends Vue implements IfScForm {
    @ScEnum(['EnFormItemType'])
    @Prop() readonly cancelText!: string;
    @Prop() readonly submitText!: string;
    @Prop({default: true}) readonly inline!: boolean;
    @Prop({default: []}) readonly formData!: Array<IfScFormItem>;
    @PropSync('formModel', {type: Object, default: {}}) syncedModel!: Object;

    @ScComputed('ccsshh', function() {
      return this.submitText + 'ccssghpplllsdf';
    })

    created() {
    }

    @Emit()
    onSubmit() {
      return this.syncedModel;
    }

    @Emit()
    onCancel() {
      return this.syncedModel;
    }

    resetForm() {
      this.syncedModel = {};
    }

  }
</script>

<style scoped>

</style>
