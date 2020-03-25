import { NextPage, GetStaticProps, NextPageContext } from 'next';
import { Alert } from 'react-bootstrap';

import { ProtectedPage } from '@app/components';
import { useAuth } from '@app/hooks';
import { authenticateOrRedirect, constants } from '@app/utils';

interface Props {
  // store?: AppStore;
}

const Component: NextPage<Props> = props => {
  const { user } = useAuth();
  const email = user && user.email;

  return (
    <ProtectedPage>
      <div className="container mt-5">
        <Alert variant="primary">Protected Page: {email}</Alert>
      </div>
    </ProtectedPage>
  );
};

Component.getInitialProps = async (ctx: NextPageContext) => {
  authenticateOrRedirect(ctx);

  return {};
};

export default Component;
