import { NextPage } from 'next';
import { Navbar } from '@app/components';

const Page: NextPage = props => (
  <>
    <Navbar></Navbar>
    <div className="container-fluid" {...props} />
  </>
);

export default Page;
