export const LoginFooter = () => {
  return (
    <footer className="bg-surface-container-low rounded-t-xl mt-20 flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <span className="text-xl font-black text-primary tracking-tighter">
          Vitality
        </span>
        <p className="font-label text-sm text-on-surface-variant opacity-80">
          © 2024 Vitality Framework. Grow intentionally.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <a
          className="font-label text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="font-label text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="font-label text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors"
          href="#"
        >
          Contact Us
        </a>
        <a
          className="font-label text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors"
          href="#"
        >
          Twitter
        </a>
        <a
          className="font-label text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors"
          href="#"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};
