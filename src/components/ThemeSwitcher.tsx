interface ThemeSwitcherProps {
  currentTheme: "claro" | "escuro";
  onChange: (theme: "claro" | "escuro") => void;
}

export default function ThemeSwitcher({ currentTheme, onChange }: ThemeSwitcherProps) {
  const isDarkBase = currentTheme === "escuro";

  const themes: { id: "claro" | "escuro"; label: string }[] = [
    { id: "claro", label: "Claro" },
    { id: "escuro", label: "Escuro" }
  ];

  return (
    <div className={`neu-tab-container ${isDarkBase ? "dark-mode-neu" : ""}`}>
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          className={`neu-tab-btn ${currentTheme === theme.id ? "active" : ""}`}
          onClick={() => onChange(theme.id)}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}
