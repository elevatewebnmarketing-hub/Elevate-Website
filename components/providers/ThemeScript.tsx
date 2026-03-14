export function ThemeScript() {
  const script = `(function(){var t=localStorage.getItem('elevate-theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');var d=m?m.matches:null;var dark=t==='dark'||(t!=='light'&&(d===true||d===null));if(dark)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
