<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <MotivationElement :motivation="motivation"></MotivationElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_TITLE_MENU } from '~/store/store.const'
import MotivationElement from '~/components/my-page/MotivationElement'
export default {
  name: 'SelfPRPage',
  components: { MotivationElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      motivation: {
        id: 1,
        motivation: '・ビューティー雑誌を読むこと ' +
          'ヘアスタイルとメイクすること',
        other_notable_things: '・ビューティーサロンのプロモーション、サービス、製品に関する紹介、コンサルティング、情報を顧客に提供する。\n' +
          '・顧客のためのアドバイスと美容ケアのための美容サロンの代表的なイメージを選ばれとなった。\n' +
          '・美容をコンサルティング、顧客にサービスを使用するよう説得する。'
      }
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.motivation'), route: '/my-page/motivation' }
    ])
  }
}
</script>
