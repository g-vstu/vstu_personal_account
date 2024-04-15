import React from 'react';
import {useSelector} from 'react-redux';

import AppRoutes from './routes/AppRoutes';

export const App = () => {

  const auth = useSelector((state) => state.auth);
  return (
   <AppRoutes isAuthenticated={auth.userToken} roles={auth.roles} />
  );
}
