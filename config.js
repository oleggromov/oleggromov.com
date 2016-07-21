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
            src: './content',
            dest: './build',
            tpl: './src'
        }
    },

    common: require('./content/common.js')
};
