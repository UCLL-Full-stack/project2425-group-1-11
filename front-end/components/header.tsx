import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/Language';
import { useTranslation } from 'next-i18next';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { t } = useTranslation();

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
      {t('header.title')} 
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
        {t('header.nav.home')}
        </Link>
        <Link href="/appointments" className="nav-link px-4 fs-5 text-white">{t('header.nav.appointments')}</Link>
        <Link href="/doctors" className="nav-link px-4 fs-5 text-white">{t('header.nav.doctors')}</Link>
        <Link href="/records" className="nav-link px-4 fs-5 text-white">{t('header.nav.records')}</Link>
        <Link href="/patients" className="nav-link px-4 fs-5 text-white">{t('header.nav.patients')}</Link>
        <Link href="/clinics" className="nav-link px-4 fs-5 text-white">{t('header.nav.clinics')}</Link>
        {!loggedInUser && (
          <>
            <Link href="/users/login" className="nav-link px-4 fs-5 text-white">
            {t('header.nav.login')}
            </Link>
            <Link href="/users/register" className="nav-link px-4 fs-5 text-white">
            {t('header.nav.register')}
            </Link>
          </>
        )}
        {loggedInUser && (
            <a
              href="/users/login"
              onClick={handleClick}
              className="nav-link px-4 fs-5 text-white"
            >
              {t('header.nav.logout')}
            </a>
        )}
        {loggedInUser && (
            <div className="nav-link px-4 fs-5 text-white">
              {t('header.nav.welcome')} {loggedInUser.firstName}

            </div>
        )}
        <Language></Language>
      </nav>
    </header>
  );
};

export default Header;