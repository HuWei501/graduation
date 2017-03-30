<template>
  <div id="myTrain">
    <div class="btn-box">
      <a id="prev">上一页</a>
      <a id="next">下一页</a>
      <span>Page : <span id="page_num"></span> / <span id="page_count"></span></span>
      <a class="return" @click="returnDataList">返回</a>
    </div>
    <canvas id="the-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'myTrain',
  data () {
    return {
      dataMes: {},
      startTime: new Date().getTime(),
      learnedNum: 0,
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  mounted: function () {
    var dataList = this.$store.state.datas
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].gdataID === +window.location.search.split('&')[0].split('=')[1]) {
        this.dataMes = dataList[i]
      }
    }
    this.show()
    this.firstLearn()
  },
  methods: {
    firstLearn () {
      if (!this.dataMes.gstate) {
        this.$http.post(this.houtai_url + 'startLearnData', {
          guserid: this.$store.state.loginMes.gid,
          gdataid: this.dataMes.gdataID
        }).then((res) => {
          console.log(res.data)
        }, (res) => {
          console.log(res)
        })
      }
    },
    returnDataList () {
      this.savePageAndTime()
      if (+window.location.search.split('&')[1].split('=')[1]) {
        this.$router.push('/index/study/learnsummarize')
      } else {
        this.$router.push('/index/study/applyforlearn')
      }
    },
    savePageAndTime () {
      var learningtime = Math.ceil(((new Date().getTime()) - this.startTime) / 1000)
      this.startTime = new Date().getTime()
      this.$http.post(this.houtai_url + 'updatePageTime', {
        learnedpage: this.learnedNum,
        learntime: learningtime,
        guserid: this.$store.state.loginMes.gid,
        gdataid: this.dataMes.gdataID
      }).then((res) => {
        console.log(res.data)
      }, (res) => {
        console.log(res)
      })
    },
    show: function () {
      var url = this.houtai_url + 'pdf/' + this.dataMes.gPDFurl
      window.PDFJS.workerSrc = 'static/pdf.worker.js'
      var pdfDoc = null
      var pageNum = this.dataMes.glearnedpage ? this.dataMes.glearnedpage : 1
      this.learnedNum = pageNum
      var pageRendering = false
      var pageNumPending = null
      var scale = 1.5
      var canvas = document.getElementById('the-canvas')
      var $this = this
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
        if (pageNum > $this.learnedNum) {
          $this.learnedNum = pageNum
        }
        $this.savePageAndTime()
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
        if ($this.dataMes.gpages !== pdfDoc.numPages) {
          $this.$http.post($this.houtai_url + 'changePDFPage', {
            pages: pdfDoc.numPages,
            gdataid: $this.dataMes.gdataID
          }).then((res) => {
            console.log(res.data)
          }, (res) => {
            console.log(res)
          })
        }
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
