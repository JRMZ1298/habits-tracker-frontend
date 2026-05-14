import { Link } from "react-router";

export const BrandHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="w-10 h-10 flex items-center justify-center">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          spa
        </span>
      </div>
      <Link
        to="/home"
        className="text-2xl font-headline font-extrabold text-ink tracking-tighter"
      >
        Vitality
      </Link>
    </div>
  );
};
