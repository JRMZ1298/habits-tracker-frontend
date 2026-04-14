export const HeroSection = () => {
  return (
    <section
      className="px-6 md:px-12 py-16 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      id="features"
    >
      <div className="flex flex-col gap-8 order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 bg-[#b8f6d3] text-[#005f2f] px-4 py-1.5 rounded-full w-fit text-xs font-bold uppercase tracking-[0.18em]">
          <span className="material-symbols-outlined text-[18px]">
            energy_savings_leaf
          </span>
          <span>New: Mindful Tracking 2.0</span>
        </div>
        <h1 className="text-6xl md:text-[5rem] font-extrabold text-[#003622] leading-[1.05] tracking-tight">
          Cultivate Your <br />
          <span className="bg-gradient-to-r from-[#006a35] to-[#005c2d] bg-clip-text text-transparent">
            Best Self
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[#35654d] max-w-xl leading-relaxed">
          Transform your daily routines into intentional growth. Track exercise,
          hydration, and reading with our biophilic habit ecosystem designed for
          human rhythm.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="bg-[#006a35] text-[#cdffd4] px-10 py-5 rounded-full font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-[#006a35]/20 flex items-center gap-2">
            Start Growing{" "}
            <span className="material-symbols-outlined">trending_up</span>
          </button>
          <button className="bg-[#ffffff] text-[#006a35] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#f0fff3] transition-all active:scale-95 flex items-center gap-2">
            Watch Demo{" "}
            <span className="material-symbols-outlined">play_circle</span>
          </button>
        </div>
      </div>

      <div className="relative order-1 lg:order-2">
        <div className="absolute inset-0 bg-[#6bfe9c] rounded-[4rem] rotate-3 blur-3xl opacity-20" />
        <div className="relative z-10 rounded-4xl overflow-hidden aspect-square md:aspect-[4/5] shadow-2xl bg-white">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF1Te_s03rXQc-fpHsb0TxwnhlQfnmcASGcPtCJSMBursPOZRL0ykOh4bjRck65H8pgJip1yyBx84IUzw-UcC_86zR6Tq_wlC9RqNR1yzAyhimqPlax6SoQz0Q55r4oriXEDDavZ8jOGhXk3bN1A7lCIL3DLv_WwuT3egLeYTDONSWsblFNmOPjbCA0efZrALmuoJ5IDVSUKRb4wxKxO5if1PKXy8zqOmlAQXTK0bVSt-qFNCorg_2XWS2IWJjQe0nzvVXqiymfHo"
            alt="Persona practicando yoga en un invernadero con luz natural"
          />
          <div className="absolute top-8 -left-8 backdrop-blur-[24px] bg-white/80 p-6 rounded-3xl shadow-xl max-w-[12.5rem]">
            <p className="font-semibold text-[11px] uppercase tracking-[0.28em] text-[#35654d] mb-2">
              HYDRATION
            </p>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-3xl font-extrabold text-[#006093]">
                2.4
              </span>
              <span className="text-sm text-[#35654d] mb-1">/ 3L</span>
            </div>
            <div className="h-2 w-full bg-[#ffffff] rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-[#006093] rounded-full" />
            </div>
          </div>
          <div className="absolute bottom-12 -right-6 backdrop-blur-[24px] bg-white/80 p-6 rounded-3xl shadow-xl max-w-[12.5rem]">
            <p className="font-semibold text-[11px] uppercase tracking-[0.28em] text-[#35654d] mb-2">
              READING STREAK
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#ff9742] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#fff0e8]">
                  local_fire_department
                </span>
              </div>
              <span className="text-3xl font-extrabold text-[#904800]">14</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
