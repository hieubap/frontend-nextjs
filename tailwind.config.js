module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'mobile' : '375px',
            // => @media (min-width: 340px) { ... }

            'tablet': '640px',
            // => @media (min-width: 640px) { ... }

            'laptop': '1024px',
            // => @media (min-width: 1024px) { ... }

            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
        extend: {
            // 1rem = 16px
            fontSize: {
                'xs': '.75rem',
                'sm': '.875rem',
                'tiny': '.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '5rem',
            },
            colors: {
                'white' : '#fff',
                'default' : '',
                'primary' : '#4caf50',
                'secondary' : '#019707',
                "gr-1":"#56ff5c",
                'third': '#c0ebc3',
                'fourth':"#bee7c0",
                'white-2':'#fafafb',
                'ghost' : '',
                'warn' : '',
                'error' : '',
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ]
};
