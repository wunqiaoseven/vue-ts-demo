import {Vue, Component} from 'vue-property-decorator';
@Component({})
export default class TestMixin extends Vue {

  public testMixinArg: string = 'this is test mixin arg';

  public testMixinFunc(): void {
    console.log('this string is from test mixin console.log');
  }
}
