<template>
	<div id="newdata">
		<div class="form_box">			
			<div class="form-group">
				<label>资料名称</label>
				<input type="text" class="form-control" v-model="myDataObj.gtitle">
			</div>
			<div class="form-group">
				<label for="cover_upload">封面上传</label>
				<input type="file" id="cover_upload" accept="image/*" @change="imageUpload">
			</div>
			<div class="form-group">
				<label>简介</label>
				<textarea class="form-control" rows="10" v-model="myDataObj.gintro"></textarea>
			</div>
			<div class="form-group">
				<label for="pdf_upload">PDF上传</label>
				<input type="file" id="pdf_upload" accept="application/pdf" @change="pdfUpload">
			</div>
			<div class="form-group">
				<label>PDF页数</label>
				<input type="text" class="form-control" v-model="pageNum" placeholder="只能输入数字" maxlength="5">
			</div>
		</div>
		<div class="btn-box">
			<slot>
	  			<a class="btn btn-info" @click="addNewData">添加</a>
			</slot>
			<a class="btn btn-primary" v-if="fromlist" @click="changeData">修改</a>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      myDataObj: this.changeMes ? this.changeMes : {},
      pageNum: this.changeMes ? this.changeMes.gpages : null,
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  props: ['fromlist', 'changeMes'],
  watch: {
    pageNum (newVal) {
      this.pageNum = newVal.replace(/[^\d]/g, '')
      this.myDataObj.gpages = this.pageNum
    },
    changeMes: {
      handler: (newVal, oldVal) => {
        this.myDataObj = newVal
        this.pageNum = newVal.gpages
      },
      deep: true
    }
  },
  methods: {
    changeData () {
      this.$http.post(this.houtai_url + 'change_courseData', this.myDataObj)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.$emit('changeData')
        }
      }, (res) => {
        console.log(res)
      })
    },
    addNewData () {
      this.$http.post(this.houtai_url + 'new_courseData', this.myDataObj)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.$router.push('/admin/datalist')
        }
      }, (res) => {
        console.log(res)
      })
    },
    imageUpload () {
      var fileObeject = document.getElementById('cover_upload')
      if (fileObeject.value.length) {
        var fileName = fileObeject.value
        var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase()
        if (extension === '.jpg' || extension === '.png') {
          var data = new FormData()
          data.append('image', fileObeject.files[0])
          this.$http.post(this.houtai_url + 'image/upload', data)
          .then((res) => {
            console.log(res.data)
            if (res.data.success) {
              this.myDataObj.gimgurl = res.data.path
            }
          }, (res) => {
            console.log(res)
          })
        } else {
          alert('只允许上传jpg和png')
        }
      }
    },
    pdfUpload () {
      var pdfObeject = document.getElementById('pdf_upload')
      if (pdfObeject.value.length) {
        var formData = new FormData()
        formData.append('file', pdfObeject.files[0])
        formData.append('name', pdfObeject.value)
        this.$http.post(this.houtai_url + 'pdf/uploading', formData)
        .then((res) => {
          console.log(res.data)
          if (res.data.success) {
            this.myDataObj.gPDFurl = res.data.path
          }
        }, (res) => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style scoped>
textarea{
	resize: none;
}
.form_box{
	width: 30%;
	margin: 60px;
}
.btn-box{
	margin-left: 60px;
}
.btn{
	width: 100px;
	margin-right: 20px;
}
</style>
