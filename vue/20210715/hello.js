Vue.component('messages', {
  template: `
  <div>
    <input v-model='writer' type='text' placeholder='작성자' />
    <textarea v-model='content'></textarea>
    <button @click='addComment'>등록</button>
    <div v-for='comment in comments' style='border: 1px solid black; width: 100px'>
        <p>{{ comment.content }}</p>
        <p>by{{ comment.writer }}</p>
    </div>
  </div>
  `,
  data() {
    return {
      comments: [],
      writer: '',
      content: '',
    }
  },
  methods: {
    addComment() {
      const comment = { writer: this.writer, content: this.content}
      this.comments.unshift(comment);
      this.writer = '';
      this.content = '';
    }
  }
})
let app = new Vue({
  el: '#app',
  // data: {
  //   comments: [],
  //   writer: '',
  //   content: '',
  // },
  // methods: {
  //   addComment() {
  //     const comment = { writer: this.writer, content: this.content}
  //     this.comments.unshift(comment);
  //     this.writer = '';
  //     this.content = '';
  //   }
  // }
})