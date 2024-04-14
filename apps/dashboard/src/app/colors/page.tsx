import Image from "next/image";

const colors = [
  { name: "Border", color: "border" },
  { name: "Input", color: "input" },
  { name: "Ring", color: "ring" },
  { name: "Background", color: "background" },
  { name: "Foreground", color: "foreground" },
  { name: "Primary", color: "primary" },
  { name: "Secondary", color: "secondary" },
  { name: "Destructive", color: "destructive" },
  { name: "Muted", color: "muted" },
  { name: "Accent", color: "accent" },
  { name: "Popover", color: "popover" },
  { name: "Card", color: "card" },
];

export default function ColorsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Colors
      <div className="grid grid-cols-3 gap-4 p-5">
        {colors.map(({ name, color }) => (
          <button
            key={name}
            className={`bg-${color} text-${color}-foreground hover:bg-${color}-foreground hover:text-${color} rounded-lg p-2 transition duration-300`}
            style={{ borderColor: `var(--${color})` }}
          >
            {name}
          </button>
        ))}
      </div>
    </main>
  );
}
