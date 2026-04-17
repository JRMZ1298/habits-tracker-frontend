export const BrandHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="w-10 h-10 bg-on-background rounded-full flex items-center justify-center">
        <span
          className="material-symbols-outlined text-white"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          spa
        </span>
      </div>
      <span className="text-2xl font-headline font-extrabold text-on-background tracking-tighter">
        Vitality
      </span>
    </div>
  );
};
