import Notice from '@/components/Notice.vue';
import Vue from 'vue';

Notice.getInstance = props => {
  const instance = new Vue({
    render(h) {
      return h(Notice, { props });
    }
  }).$mount();

  document.body.appendChild(instance.$el);
  const notice = instance.$children[0];
  return notice;
}

let msgInstance = null;
function getInstance() {
  msgInstance = msgInstance || Notice.getInstance();
  return msgInstance;
}

export default {
  info({ content = "", duration = 2 }) {
    getInstance().add({
      content,
      duration
    });
  }
}