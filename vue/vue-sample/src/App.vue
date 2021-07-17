<template>
    <Menubar/>
    <div>
      <input type="text" v-model="writer" placeholder="writer">
      <textarea v-model="content" placeholder="content"></textarea>
      <button @click="save">등록</button>

      <ul>
        <li v-for='comment in comments' v-bind:key="comment.id">
          <p>{{ comment.content }}</p>
          <p>By{{ comment.writer }}</p>
        </li>
      </ul>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Menubar from './components/Menubar.vue';

interface Comment {
    id: number;
    writer: string;
    content: string;
}
const comments : Comment[] = [];


  export default defineComponent({
    components: {
      Menubar,
    },
    data: function() {
      return {
        id: 1,
        content: '',
        writer: '',
        comments,
      };
    },
    methods: {  
      save() {
        const comment: Comment = { id: this.id, content: this.content, writer: this.writer };
        this.comments.unshift(comment);
        this.content = '';
        this.writer = '';
        this.id++;
        console.log(comments);
      }
    },
  })
</script>
