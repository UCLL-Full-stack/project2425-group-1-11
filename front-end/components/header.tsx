import Link from 'next/link';

const Header: React.FC = () => {
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
      </nav>
    </header>
  );
};

export default Header;