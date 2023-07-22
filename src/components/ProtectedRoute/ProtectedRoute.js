import { Navigate } from 'react-router-dom';
import React from 'react';

// Компонент для защиты маршрутов, доступных только для авторизованных пользователей
// Принимает другой компонент в качестве пропса и может передать ему неограниченное число пропсов
const ProtectedRoute = ({ component: Component, ...props }) => {
  // Если пользователь авторизован, рендерит переданный компонент, иначе перенаправляет на страницу входа
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
