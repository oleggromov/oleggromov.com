module.exports = {
    build: {
        sources: {
            base: './content',
            pages: [
                'articles/**/index.md',
                'cv/index.md',
                'projects/index.md'
            ],
            pieces: [
                'pieces/*.md'
            ]
        },

        dest: './build'
    },

    tplPath: './src',

    common: require('./content/common.js')
};
