module.exports = {
    build: {
        sources: {
            page: [
                'articles/**/index.md',
                'cv/index.md',
                'projects/index.md'
            ],
            list: [
                'articles/math/',
                'articles/'
            ],
            piece: [
                'pieces/*.md'
            ]
        },

        paths: {
            content: './content',
            build: './build',
            tpl: './src'
        }
    },

    common: require('./content/common.js')
};
