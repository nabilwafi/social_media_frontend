import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && !axios.defaults.headers.common['Authorization']) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log('request', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();

        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log('response', refreshError);
        return Promise.reject(refreshError);
      }
    }
  },
);

const refreshToken = async () => {
  try {
    const res = await axiosInstance.post('/auth/token');

    const newAccessToken = res.data.data;

    localStorage.setItem('accessToken', newAccessToken);

    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${newAccessToken}`;

    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default axiosInstance;
