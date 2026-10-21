import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Tự động gửi cookie phiên làm việc và đọc XSRF-TOKEN mới nhất trên mọi request để tránh lỗi 419 sau khi đăng nhập SPA
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
