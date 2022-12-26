import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api'

const forbiddenStatus = 403;
const unauthorizedStatus = 401;

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `${JSON.parse(token)}`;
        setIsAuth(true);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === unauthorizedStatus
        || error?.response?.status === forbiddenStatus) {
        localStorage.clear();
        api.defaults.headers.Authorization = undefined;
        setIsAuth(false);
        navigate('/login');
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    setLoading(true);

    const userInfo = JSON.parse(localStorage.getItem('user'));

    const token = JSON.parse(localStorage.getItem('token'));
    const { name, profile, email } = userInfo || {};

    (
      async () => {
        if (token && name && profile && email) {
          try {
            // verificar se o token é válido
            // await api.get('/customer/products');
            api.defaults.headers.Authorization = `${token}`;
            await api.get('/contacts');

            setUser({ name, email, profile });
            setIsAuth(true);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            setUser({});
            setIsAuth(false);
            api.defaults.headers.Authorization = undefined;
            localStorage.clear();
            console.log(err);
          }
        }

        setLoading(false);
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (userData) => {
    setLoading(true);

    try {
      const { data: { data } } = await api.post('/login/signin', userData);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));

      if (!data.message) {
        api.defaults.headers.Authorization = `${data.token}`;
        setUser(data.user);
        setIsAuth(true);

        if (data.user.profile === 'user') {
          navigate('/contacts');
        } else if (data.user.profile === 'admin') {
          navigate('/users');
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return 'error';
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      // descomentar quando tiver o endpoint de blacklist token
      // await api.delete('/auth/logout');
      setIsAuth(false);
      setUser({});
      localStorage.clear();
      api.defaults.headers.Authorization = undefined;
      setLoading(false);
      navigate('/login');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);

    try {
      const { data: { data } } = await api.post('/login/signup', userData);


      if (!data.message) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', JSON.stringify(data.token));


        api.defaults.headers.Authorization = `${data.token}`;
        setUser(data.user);
        setIsAuth(true);
        navigate('/contacts');
      }
      setLoading(false);
      // return 'error';
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  return {
    isAuth,
    loading,
    user,
    handleLogin,
    handleLogout,
    handleRegister,
  };
};

export default useAuth;
