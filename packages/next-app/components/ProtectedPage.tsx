import React, { useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';

import { Page } from '@app/components';
import { useAuth } from '@app/hooks';

import { constants } from '@app/utils';

const ProtectedPage: NextPage = props => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push(constants.ROUTES.LOGIN);
    }
  }, [isAuthenticated]);

  return <Page {...props} />;
};
export default ProtectedPage;
