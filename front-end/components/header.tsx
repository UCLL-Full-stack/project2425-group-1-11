import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
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
        <Link className="nav-link px-4 fs-5 text-white"
          href="/login"
        >
          Login
        </Link>
      )}

      {loggedInUser && (
        <a
          href="/login"
          onClick={handleClick}
          className="nav-link px-4 fs-5 text-white"
        >
          Logout
        </a>
      )}

      {loggedInUser && (
        <div className="nav-link px-4 fs-5 text-white">
          Welcome, {loggedInUser.firstName} !
        </div>
      )}

      </nav>
    </header>
  );
};

export default Header;
