"use client"

import { usePathname } from 'next/navigation';

export const HeaderTitle = () => {
  const pathname = usePathname();
  
  const title = pathname === '/' 
    ? 'Там, где мир начинается с путешествий' 
    : 'Истории ваших путешествий';

  const isHomePage = pathname === '/';

  return (
    <h2 className={`
      header__title 
      ${isHomePage ? 'header__title--main' : 'header__title--stories'}
    `}>
      {title}
    </h2>
  );
};