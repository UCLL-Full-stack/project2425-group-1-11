import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/Language';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser)); // Update state with parsed user
    }
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  console.log("loggedInUser:", loggedInUser);
  
  return (
    <header className="p-3 mb-3 border-bottom bg-gradient" style={{ backgroundColor: 'darkgreen' }}>
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        LVMed App
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/appointments" className="nav-link px-4 fs-5 text-white">Appointments</Link>
        <Link href="/doctors" className="nav-link px-4 fs-5 text-white">Doctors</Link>
        <Link href="/records" className="nav-link px-4 fs-5 text-white">Records</Link>
        <Link href="/patients" className="nav-link px-4 fs-5 text-white">Patients</Link>
        <Link href="/clinics" className="nav-link px-4 fs-5 text-white">Clinics</Link>
        {!loggedInUser && (
          <>
            <Link href="/users/login" className="nav-link px-4 fs-5 text-white">
              Login
            </Link>
            <Link href="/users/register" className="nav-link px-4 fs-5 text-white">
              Register
            </Link>
          </>
        )}
        {loggedInUser && (
            <a
              href="/users/login"
              onClick={handleClick}
              className="nav-link px-4 fs-5 text-white"
            >
              Logout
            </a>
        )}
        {loggedInUser && (
            <div className="nav-link px-4 fs-5 text-white">
              Welcome, {`${loggedInUser.firstName} ${loggedInUser.lastName}`}!
            </div>
        )}
        <Language></Language>
      </nav>
    </header>
  );
};

export default Header;