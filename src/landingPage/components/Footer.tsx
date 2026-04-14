export const Footer = () => {
  const links = [
    "Privacy Policy",
    "Terms of Service",
    "Contact Us",
    "Twitter",
    "Instagram",
  ];

  return (
    <footer className="bg-[#c4fedd] w-full rounded-t-[3rem] mt-20 flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 text-[#006a35] font-[Manrope] text-sm">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <span className="text-xl font-black">Vitality</span>
        <p className="opacity-80 max-w-[12.5rem] text-center md:text-left">
          © 2024 Vitality Framework. Grow intentionally.
        </p>
      </div>
      <nav className="flex flex-wrap justify-center gap-8">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[#006893] opacity-80 hover:text-[#006a35] transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex gap-4">
        <button className="w-10 h-10 rounded-full bg-[#006a35]/10 flex items-center justify-center hover:bg-[#006a35]/20 transition-colors">
          <span className="material-symbols-outlined text-sm">globe</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#006a35]/10 flex items-center justify-center hover:bg-[#006a35]/20 transition-colors">
          <span className="material-symbols-outlined text-sm">dark_mode</span>
        </button>
      </div>
    </footer>
  );
};
