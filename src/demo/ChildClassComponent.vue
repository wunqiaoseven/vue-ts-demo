<script lang="tsx">
  import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
  import http from '@/http/HttpService';
  import {ScHttp} from '@/decorators';
  import {Getter, State, Action, Mutation} from 'vuex-class';

  @Component({})
  export default class ChildClassComponent extends Vue {
    @Getter('user/info') info;
    @State(state => state.login) loginSate;
    @Action('user/setUser') setUser;
    @Mutation('user/setLogin') setLogin;

    @Prop({default: 'default value'}) readonly ccss!: string;

    @ScHttp(['getCaptchaApi'])
    @Emit()
    processChange(data?) {
    }

    async created() {
      this.processChange('processChange');

      try {
        const ccss = await this.getCaptchaApi({canshu: '12323ddff'});
      } catch (e) {
        console.log(e);
      }
      try {
        const ccss = await http.getCaptchaApi({canshu: '12323ddff'});
      } catch (e) {
        console.log(e);
      }

    }

    render(h, context) {
      return (
        <div>jsx</div>
      );
    }
  }
</script>
