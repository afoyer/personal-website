'use client'

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
                    ;(function() {
                        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        var darkMode = localStorage.getItem('darkMode');
                        
                        if (darkMode === 'true' || (darkMode === null && prefersDark)) {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.remove('dark');
                        }
                    })()
                `
      }}
      id="theme-script"
      key="theme-script"
    />
  )
}
