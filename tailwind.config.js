/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        diffuse: 'diffuse 30s cubic-bezier(0.4, 0, 1, 1) infinite',
      },
      keyframes: {
        diffuse: {
          '0%, 100%': { filter: "hue-rotate(0deg) blur(64px)" },
          '10%': { filter: "hue-rotate(15deg) blur(64px)" },
          '20%': { filter: "hue-rotate(30deg) blur(64px)" },
          '30%': { filter: "hue-rotate(45deg) blur(64px)" },
          '40%': { filter: "hue-rotate(60deg) blur(64px)" },
          '50%': { filter: "hue-rotate(90deg) blur(64px)" },
          '60%': { filter: "hue-rotate(120deg) blur(64px)" },
          '70%': { filter: "hue-rotate(145deg) blur(64px)" },
          '80%': { filter: "hue-rotate(160deg) blur(64px)" },
          '90%': { filter: "hue-rotate(180deg) blur(64px)" },
        }
      },
      spacing: {
        128: "40rem"
      },
      colors: {
        adobeXD: {
          50: "#99147a",
          100: "#4d093d",
          200: "#2e0524"
        },
        android: {
          50: "#b7de3e",
          100: "#a7c83f",
          200: "#8ca834"
        },
        angular: {
          50: "#e80940",
          100: "#c50836",
          200: "#a1082d"
        },
        aws: {
          50: "#faa11b",
          100: "#ff9c08",
          200: "#cc7e08"
        },
        blender: {
          50: "#f2881d",
          100: "#eb7a08",
          200: "#c76706"
        },
        cSharp: {
          50: "#7a59f0",
          100: "#5632d5",
          200: "#4126a3"
        },
        compose: {
          50: "#72a5f7",
          100: "#488af5",
          200: "#3364b5"
        },
        css: {
          50: "#6684f2",
          100: "#2d54e5",
          200: "#1f3ba3"
        },
        docker: {
          50: "#5689f0",
          100: "#2568ef",
          200: "#1e52ba"
        },
        express: {
          50: "#f5df2c",
          100: "#f7e025",
          200: "#baa91c"
        },
        firebase: {
          50: "#fccd3a",
          100: "#ffcd33",
          200: "#c49d25"
        },
        html: {
          50: "#e86543",
          100: "#e5532d",
          200: "#b03f21"
        },
        java: {
          50: "#e8272c",
          100: "#e10b10",
          200: "#a3080c"
        },
        javascript: {
          50: "#f5de27",
          100: "#f7df1e",
          200: "#c2af17"
        },
        jsp: {
          50: "#f07c22",
          100: "#f06e08",
          200: "#ba5506"
        },
        keras: {
          50: "#d92b2b",
          100: "#d10808",
          200: "#9c0505"
        },
        kotlin: {
          50: "#818dde",
          100: "#6b7ae1",
          200: "#515dad"
        },
        matplotlib: {
          50: "#2b81b3",
          100: "#185a80",
          200: "#0e374f"
        },
        mongoDB: {
          50: "#6cd15c",
          100: "#55ad47",
          200: "#3f8034"
        },
        mySQL: {
          50: "#0e94b3",
          100: "#087993",
          200: "#055263"
        },
        nodeJS: {
          50: "#9bd413",
          100: "#8fc708",
          200: "#658c06"
        },
        pandas: {
          50: "#5c4bd1",
          100: "#130958",
          200: "#0c0636"
        },
        php: {
          50: "#9297d1",
          100: "#7b7fb5",
          200: "#5c5f8a"
        },
        python: {
          50: "#4d8bbf",
          100: "#366b98",
          200: "#254969"
        },
        scikit: {
          50: "#faa248",
          100: "#f89c3f",
          200: "#b06e2c"
        },
        seaborn: {
          50: "#9acad6",
          100: "#81b2be",
          200: "#577780"
        },
        solidity: {
          50: "#999999",
          100: "#6b6b6b",
          200: "#424242"
        },
        typescript: {
          50: "#4f92db",
          100: "#377cc8",
          200: "#265991"
        },
        unity: {
          50: "#7d7d7d",
          100: "#3d3d3d",
          200: "#080808"
        },
        reactNative: {
          50: "#79dcf7",
          100: "#66dbfb",
          200: "#20add4"
        },
        expo: {
          50: "#2f2f7a",
          100: "#151552",
          200: "#0f0f40"
        },
        nextJS: {
          50: "#7d7d7d",
          100: "#3d3d3d",
          200: "#080808"
        },
        reactJS: {
          50: "#79dcf7",
          100: "#66dbfb",
          200: "#20add4"
        },
        arduino: {
          50: "#1bbdcf",
          100: "#00707c",
          200: "#005159"
        },
        gemini: {
          50: "#85a7e6",
          100: "#548bed",
          200: "#3c78e6"
        },
        c: {
          50: "#bdcad9",
          100: "#aabbce",
          200: "#8595a8"
        },
        fusion360: {
          50: "#e6792c",
          100: "#fe6a01",
          200: "#bd5004"
        },
        threeDPrinting: {
          50: "#bd38c9",
          100: "#9a1ea6",
          200: "#771480"
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}