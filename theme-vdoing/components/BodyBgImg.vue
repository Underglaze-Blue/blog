<template>
  <div
    class="body-bg"
    :style="`background: url('https://cdn.jsdelivr.net/gh/Underglaze-Blue/git-img@main/2023-04-12/3%20(1)-1829-1830.png') rgba(0,0,0,0.1) center center / cover no-repeat;opacity:${opacity}`"
  ></div>
</template>

<script>
import { type } from '../util'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      bgImg: '',
      opacity: 0.5
    }
  },
  mounted () {
    let { bodyBgImg, bodyBgImgOpacity, bing } = this.$themeConfig

    if (type(bodyBgImg) === 'string') {
      this.bgImg = bodyBgImg
      console.log(this.bgImg)
    } else if (type(bodyBgImg) === 'array') {
      bodyBgImg.push('/bg/xiangrikui.jpg') // 添加向日葵图
      let i = 1
      const now = dayjs()
      while (bodyBgImg.length < 10 ) {
        const temp = now.subtract(i, "day").format('YYYY/MM/DD')
        i++
        bodyBgImg.push(`${bing.url}${temp}/${bing.size}.jpg`)
      }
      let count = 0
      let timer = null

      this.bgImg = bodyBgImg[count]
      clearInterval(timer)
      timer = setInterval(() => {
        if (++count >= bodyBgImg.length) {
          count = 0
        }
        const reg = /^(((https|http)?:\/\/)|(\/\/))[^\s]+/
        this.bgImg = reg.test(bodyBgImg[count]) ? bodyBgImg[count] : this.$withBase(bodyBgImg[count])
      }, 10 * 60 * 1000);
    }

    if (bodyBgImgOpacity !== undefined) {
      this.opacity = bodyBgImgOpacity
    }

  }
}
</script>

<style lang='stylus'>
.body-bg
  position fixed
  left 0
  top 0
  z-index -999999
  height 100vh
  width 100vw
  transition background 1s
  background-blend-mode multiply
  filter blur(0px)
</style>
