const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 px-8 flex items-center justify-between">
      {/* Sol Kısım - Logo */}
      <div className="text-2xl font-bold">Eteration</div>

      {/* Orta Kısım - Arama Çubuğu */}
      <div className="w-1/3 mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-lg text-gray-800"
        />
      </div>

      {/* Sağ Kısım - Sepet ve Kullanıcı Bilgileri */}
      <div className="flex items-center space-x-6">
        {/* Sepet */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h12.1M7 13L5.4 7m0 0L4 3m1.4 4h15.2"
            />
          </svg>
          <span className="text-xl">117.000₺</span>
        </div>

        {/* Kullanıcı Bilgisi */}
        <div>
          <span className="font-bold">Kerem</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
