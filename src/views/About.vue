<template>
  <div>
    <div class="weui-flex title">
      <div class="weui-flex__item">
        <img class="logo" src="../assets/logo.png"/>
      </div>
      <div class="weui-flex__item weui-flex align">
        <a href="javascript:;"
          class="weui-btn weui-btn_mini weui-btn_primary trans-btn_function">预约咨询</a>
      </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <!-- slides -->
      <swiper-slide>
        <img src="../assets/mainimg01.jpg" class="swiper-image"/>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/mainimg02.jpg" class="swiper-image"/>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <article class="weui-article">
      <section>
        <h2 class="about-title">关于华南日通</h2>
        <section>
          <p>
            世界500强物流企业，在世界37个国家的195个城市所拥有的331个业务网点。
            经营范围：承办普通道路货运、道路货物仓储、道路货物搬运装卸和其他与道路货物运输相关的辅助性服务；
            海运、陆运、空运进出口货物、国际展品、私人物品及过境货物的国际运输代理业务，
            包括：揽货、托运、订舱、舱储中转、集装箱拼装拆箱、结算运杂费、报关、报验、保险、
            相关的短途运输服务及运输咨询业务、国际多式联运、集运（含集装箱拼箱）。
          </p>
        </section>
      </section>
    </article>
    <div class="weui-flex about-link__button-container">
      <div class="weui-flex__item">
        <a href="javascript:;"
          class="weui-btn weui-btn_mini weui-btn_primary trans-btn_function">赴任搬家</a>
      </div>
      <div class="weui-flex__item">
        <a href="javascript:;"
          class="weui-btn weui-btn_mini weui-btn_primary trans-btn_function">归任搬家</a>
      </div>
      <div class="weui-flex__item">
        <a href="javascript:;"
          class="weui-btn weui-btn_mini weui-btn_primary trans-btn_function">其他服务</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .title {
    height: 40px;
  }
  .logo {
    width: 40px;
    height: 40px;
  }
  .align {
    align-items: center;
  }
  .align .weui-btn {
    float: right;
    margin-right: 10px;
  }
  .swiper {
    margin-top: 5px;
  }
  .swiper-image {
    height: 200px;
  }
  .about-title {
    height: 30px;
    font-weight: 700;
  }
  .about-link__button-container .weui-flex__item{
    text-align: center;
  }
</style>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

