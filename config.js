module.exports = {
    build: {
        sources: {
            pages: [
                'articles/**/index.md',
                'cv/index.md',
                'projects/index.md'
            ],
            lists: [
                'articles/math/',
                'articles/'
            ],
            pieces: [
                'pieces/*.md'
            ]
        },

        source: './content',
        dest: './build'
    },

    tplPath: './src',

    common: require('./content/common.js')
};
