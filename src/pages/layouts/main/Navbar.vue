<template>
  <div class="navbar">
  </div>

</template>

<script lang="ts">

  import {Vue, Component} from 'vue-property-decorator';
  import {Getter, Action} from 'vuex-class';

  @Component({

  })
  export default class Navbar extends Vue {
    @Getter('app/sidebar') sidebar;
    @Action('app/toggleSideBar') toggleSideBar;
    @Action('user/loginOut') logOutAction;

    loginOut() {
      this.logOutAction.then(() => this.$router.push({path: '/login'}));
    }

  }
</script>

<style lang="scss" scoped>
  .navbar {
    background-color: #F2F2F2;
    border-radius: 0px !important;
    border-bottom: none;
    margin-bottom: -2px;
    height: 50px;
    width: 100%;

    .title {
      background-color: #fff;
      margin-bottom: 20px;

      h4 {
        line-height: 70px;
        height: 70px;
        margin: 0 10px;
        display: inline-block;
        float: left;
      }
    }

    .right-menu {
      float: right;
      height: 100%;

      .nx-help {
        display: inline-block;
        vertical-align: top;
      }
    }

    .hamburger-container {
      line-height: 70px;
      height: 70px;
      float: left;
      padding: 0 10px;
    }

    .top_box {
      position: fixed;
      width: calc(100% - 200px);
      z-index: 9999;
      background-color: #fff;
      top: 0;
      height: 50px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      min-width: 850px;
      overflow: auto;

      div {
        height: 50px;
        line-height: 50px;
      }

      .userInfoHidden {
        position: relative;

        &:hover > .box {
          display: block;
        }

        .box {
          z-index: 1000;
          position: absolute;
          width: 100px;
          height: 40px;
          line-height: 40px;
          left: 0;
          margin-left: -40px;
          top: 39px;
          border: 1px solid #e5e5e5;
          background: #fff;
          text-align: center;
          border-radius: 2px;
          display: none;

          a {
            cursor: pointer;

            &:hover {
              color: #20a0ff;
            }
          }

          div {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          height: 30px;
          line-height: 30px;
          p {
          display: inline-block;
          margin: 0;
          &:first-child {
          margin-right: 55px;
          }
          }
          a {
          display: inline-block;
          &:first-child {
          margin-right: 55px;
          }
          }
          }
        }
      }
    }
  }
</style>
