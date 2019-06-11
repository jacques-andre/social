// vue.config.js
module.exports = {
    pages:{
    index: {
        entry: './src/pages/feed/main.js',
        template: 'public/index.html',
        title: 'Feed',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    register: {
        entry: './src/pages/register/main.js',
        template: 'public/index.html',
        title: 'Register',
        chunks: ['chunk-vendors', 'chunk-common', 'register']
    },
    login: {
        entry: './src/pages/login/main.js',
        template: 'public/index.html',
        title: 'LogIn',
        chunks: ['chunk-vendors', 'chunk-common', 'login']
    }
    }
};
