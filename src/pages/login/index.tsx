import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { login } from '../../api';
import { useAppDispatch } from '../../hooks';
import styles from './index.module.scss';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backgroundUrl = 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJM2Q6uPXCAAAAAAAAAAAABkARQnAQ';
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    const { username, password} = values;
    setLoading(true);
    login(username, password).then(data => {
      setLoading(false);
      console.log(data);
      const user = data;
      // console.log(res.data);
      // const user = res.data;
      dispatch({
        type: 'app/setUser',
        payload: user,
      })
      message.success('登录成功');
      localStorage.setItem('token', user.access_token);
      localStorage.setItem('token_expires', JSON.stringify(Date.now() + 30000000));
      dispatch({
        type: 'app/setToken',
        payload: user.access_token,
      })
      setTimeout(()=>{
        navigate('/')
      }, 100)
      // navigate('/');
      
    }).catch((err) => {
      console.log(err);
      message.error('用户名或密码错误');
      setLoading(false);
    })
    // console.log(values);
  }
  return (
    <div className={styles.loginPage}>
      <div className={styles.background} style={{backgroundImage: `url(${backgroundUrl})`}}>
        {/* <img src={backgroundUrl} alt="" /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>
        <div className={styles.mainContainer}>
          <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<AiOutlineUser className={styles.formItemIcon} />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<AiOutlineLock className={styles.formItemIcon} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.checkbox}>Remember me</Checkbox>
              </Form.Item>

              {/* <a className={styles.loginFormForget} href="">
                Forgot password
              </a> */}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.loginFormButton}
                loading={loading}
              >
                Log in
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;