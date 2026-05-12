import { render, screen } from "@/test/test-utils";
import type { Badge } from "@/interfaces/api";

const unlockedBadge: Badge = {
  id: 1,
  key: "first-log",
  name: "Primer registro",
  icon: "ecs_tasks",
  description: "Completaste tu primer hábito",
  category: "primeros_pasos",
  required_streak: 1,
  unlocked: true,
  unlocked_at: "2025-01-15T10:00:00Z",
};

const lockedBadge: Badge = {
  ...unlockedBadge,
  unlocked: false,
  unlocked_at: null,
  required_streak: 7,
};

describe("BadgeCard", () => {
  it("renders unlocked badge with icon", async () => {
    const { BadgeCard } = await import("@/app/components/BadgeCard");
    render(<BadgeCard badge={unlockedBadge} currentStreak={5} />);
    expect(screen.getByText("Primer registro")).toBeInTheDocument();
    expect(screen.getByText("ecs_tasks")).toBeInTheDocument();
  });

  it("shows unlock date for unlocked badge", async () => {
    const { BadgeCard } = await import("@/app/components/BadgeCard");
    render(<BadgeCard badge={unlockedBadge} currentStreak={5} />);
    expect(screen.getByText(/15\s*ene/i)).toBeInTheDocument();
  });

  it("renders locked badge with lock icon", async () => {
    const { BadgeCard } = await import("@/app/components/BadgeCard");
    render(<BadgeCard badge={lockedBadge} currentStreak={3} />);
    expect(screen.getByText("lock")).toBeInTheDocument();
  });

  it("shows progress for locked badge", async () => {
    const { BadgeCard } = await import("@/app/components/BadgeCard");
    render(<BadgeCard badge={lockedBadge} currentStreak={3} />);
    expect(screen.getByText("3 días")).toBeInTheDocument();
    expect(screen.getByText("7 días")).toBeInTheDocument();
  });

  it("applies opacity style for locked badge", async () => {
    const { BadgeCard } = await import("@/app/components/BadgeCard");
    const { container } = render(
      <BadgeCard badge={lockedBadge} currentStreak={3} />,
    );
    expect(container.firstChild).toHaveClass("opacity-50");
  });
});
