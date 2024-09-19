const flowbite = require("flowbite-react/tailwind");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
        "./index.html",
        "./views/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js",
        flowbite.content(),
    ],

    theme: {
        extend: {},
    },
    plugins: [
        flowbite.plugin(),
        require('flowbite/plugin')
    ],
}
