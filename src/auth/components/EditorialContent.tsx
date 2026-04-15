export const EditorialContent = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-8 pr-12">
      <div className="space-y-4">
        <span className="font-label text-primary font-bold tracking-widest text-sm uppercase">
          Join the Framework
        </span>
        <h1 className="text-6xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1]">
          Start Your <span className="text-primary italic">Growth</span> Journey
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed max-w-md">
          Step into a Living Greenhouse where your intentions are nurtured and
          your habits thrive. Design the life you've always wanted to cultivate.
        </p>
      </div>
      {/* Feature "Living" Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-surface-container-low p-6 rounded-lg flex items-start gap-4">
          <div className="bg-primary-container text-on-primary-container p-3 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">eco</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg">
              Organic Tracking
            </h3>
            <p className="font-label text-sm text-on-surface-variant opacity-80">
              Flexible progress bars that grow with your consistency.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-low/60 p-6 rounded-lg flex items-start gap-4">
          <div className="bg-secondary-container text-on-secondary-container p-3 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">water_drop</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg">Mindful Rituals</h3>
            <p className="font-label text-sm text-on-surface-variant opacity-80">
              Deep focus tools designed for persistence, not pressure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
