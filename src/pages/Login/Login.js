import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {AuthLayout} from '../../layouts/AuthLayout';
import {ErrorModal} from '../../components/Error/ErrorModal';
import { Spinner } from '../../components/Spinner';

import { userLogin } from '../../store/authSlice';

import './style.css';

export const Login = () => {
  const {register, handleSubmit, reset} = useForm();

  const {loading, userInfo, error} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(userInfo){
      navigate("/", {replace: true});
    }
  },[navigate,userInfo]);

  const onSubmit =  (data) => {
    dispatch(userLogin(data));
    reset();
  };

  return (
    <AuthLayout>
      <div className="login-container">
        <div className="login-block">
          <h3 className="login-form_title">
            Вход в личный кабинет
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <input
              className="login-input"
              placeholder="Ваш логин"
              {...register("username")}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Ваш пароль"
              {...register("password")}
              required
            />
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? <Spinner type="circle"/> : 'Войти'}
            </button>
          </form>
        </div>
        {error && <ErrorModal error="Неверный логин или пароль"/>}
      </div>
    </AuthLayout>
  );
};