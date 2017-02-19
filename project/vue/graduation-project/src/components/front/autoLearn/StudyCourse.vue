<template>
  <div id="myTrain">
    <div class="btn-box">
      <a id="prev">上一页</a>
      <a id="next">下一页</a>
      <a v-on:click="showNum">显示页码</a>
      <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
      <router-link to="/index/study/applyforlearn" class="return">返回</router-link>
    </div>
    <canvas id="the-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'myTrain',
  data () {
    return {
      total: 0,
      number: 0
    }
  },
  mounted: function () {
    this.show()
  },
  methods: {
    showNum: function () {
      alert(this.number + '/' + this.total)
    },
    show: function () {
      var $this = this
      var url = '/static/' + window.location.search.split('&')[1].split('=')[1]
      window.PDFJS.workerSrc = '/static/pdf.worker.js'
      var pdfDoc = null
      var pageNum = +window.location.search.split('&')[0].split('=')[1]
      var pageRendering = false
      var pageNumPending = null
      var scale = 1.5
      var canvas = document.getElementById('the-canvas')
      function renderPage (num) {
        pageRendering = true
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport(scale)
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport
          }
          var renderTask = page.render(renderContext)

          // Wait for rendering to finish
          renderTask.promise.then(function () {
            pageRendering = false
            if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending)
              pageNumPending = null
            }
          })
        })

        // Update page counters
        document.getElementById('page_num').textContent = pageNum
        $this.number = $this.number > pageNum ? $this.number : pageNum
      }

      function queueRenderPage (num) {
        if (pageRendering) {
          pageNumPending = num
        } else {
          renderPage(num)
        }
      }

      function onPrevPage () {
        if (pageNum <= 1) {
          return
        }
        pageNum--
        queueRenderPage(pageNum)
      }
      document.getElementById('prev').addEventListener('click', onPrevPage)

      function onNextPage () {
        if (pageNum >= pdfDoc.numPages) {
          return
        }
        pageNum++
        queueRenderPage(pageNum)
      }
      document.getElementById('next').addEventListener('click', onNextPage)

      window.PDFJS.getDocument(url).then(function (pdfDoc_) {
        pdfDoc = pdfDoc_
        document.getElementById('page_count').textContent = pdfDoc.numPages
        $this.total = pdfDoc.numPages
        renderPage(pageNum)
      })
    }
  }
}
</script>

<style scoped>
#myTrain{
	background-color: #404040;
	padding-top: 30px;
	min-height: 100%;
}
#myTrain a{
	color: #fff;
	cursor: pointer;
	padding: 2px 10px;
}
#myTrain .return{
	color: #00d1b2;
}
.btn-box{
	position: fixed;
	top: 00px;
	width: 100%;
	height: 35px;
	line-height: 35px;
	background-color: #474747;
}
.btn-box span{
	color: #fff;
}
</style>
