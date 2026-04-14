export const TopAppBar = () => {
  const navItems = ["Features", "Testimonials", "Login", "Signup"];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-4 bg-[#dbffe8]/80 backdrop-blur-xl shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black tracking-tight text-[#006a35]">
          Vitality
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[#006a35] font-semibold tracking-tight hover:bg-[#c4fedd] transition-colors px-3 py-1 rounded-full active:scale-95"
          >
            {item}
          </a>
        ))}
      </nav>
      <button className="bg-[#006a35] text-[#cdffd4] px-8 py-3 rounded-full font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[#006a35]/10">
        Get Started
      </button>
    </header>
  );
};
