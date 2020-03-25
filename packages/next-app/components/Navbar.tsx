import Link from 'next/link';
import { constants } from '@app/utils';
import { useRouter } from 'next/router';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

import { Authenticated, NotAuthenticated } from '@app/components';
import { useAuth } from '@app/hooks';

export default () => {
  const { pathname } = useRouter();
  const { logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Link href={constants.ROUTES.HOME}>
        <a>
          <h2 className="navbar-brand text-primary">{constants.APP_NAME}</h2>
        </a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Authenticated>
            <a className="nav-link" onClick={logout}>
              Logout
            </a>
          </Authenticated>

          <NotAuthenticated>
            <Link href={constants.ROUTES.LOGIN}>
              <a className="nav-link">Login</a>
            </Link>
          </NotAuthenticated>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <Link href={constants.ROUTES.HOME}>
    //     <a>
    //       <h1 className="navbar-brand">Bootstrap</h1>
    //     </a>
    //   </Link>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNav"
    //     aria-controls="navbarNav"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item">
    //         <Link href={constants.ROUTES.LOGIN}>
    //           <a className="nav-link">Login</a>
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link href={constants.ROUTES.ABOUT}>
    //           <a className="nav-link">About</a>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};
