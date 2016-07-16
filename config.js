module.exports = {
    build: {
        sources: {
            base: './content',
            list: [
                'articles/**/index.md',
                // 'cv/index.md',
                // 'projects/index.md'
            ]
        },

        dest: './build'
    },

    tplPath: './src',

    common: require('./content/common.js')
};
