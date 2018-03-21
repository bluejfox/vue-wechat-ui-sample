import message from '@/config/message.json';
import router from '@/config/router';

export default {
  env: {
    SERVICE_URL: '/ume-ems/rest/s01/',
    APP_TITLE: 'Trans',
    SERVICE_TIME_OUT: 60000,
    STORAGE_KEY: '__TRANS_STORAGE_',
    LOADING_TEXT: '加载中',
  },
  message,
  router,
};
