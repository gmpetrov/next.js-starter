import { NextPage } from 'next';
import Link from 'next/link';
import { Jumbotron, Button } from 'react-bootstrap';

import { Page } from '@app/components';

import { constants } from '@app/utils';

const Home: NextPage = () => {
  return (
    <Page>
      <Jumbotron className="container mt-5">
        {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
        <div className="d-flex flex-column">
          <h1 className="display-4 text-primary text-capitalize">
            this is cool
          </h1>
          <p className="text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <Link href={constants.ROUTES.LOGIN}>
            <Button
              variant="primary"
              className="btn-lg rounded-pill ml-auto align-self-end"
            >
              Join now
            </Button>
          </Link>
        </div>
      </Jumbotron>
    </Page>
  );
};

export default Home;
