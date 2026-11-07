function applyTheme(theme){
    document.documentElement.dataset.theme = theme;
    document.getElementById("theme-toggle").innerText = theme == "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
}

export function toggleTheme(){
    applyTheme(localStorage.getItem("theme") || "light");

    document.getElementById("theme-toggle").addEventListener("click", (e) => {
        const currentTheme = document.documentElement.dataset.theme;
        applyTheme(currentTheme === "dark" ? "light" : "dark");
        e.currentTarget.blur();
    });
}