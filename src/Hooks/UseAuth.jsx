import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContexts/AuthContexts';

const UseAuth = () => {
   const authInfo = use(AuthContext);
   return authInfo;
};

export default UseAuth;