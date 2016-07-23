module.exports = {
    build: {
        sources: {
            page: [
                'articles/**/index.md',
                // 'cv/index.md',
                // 'projects/index.md'
            ],
            piece: [
                'pieces/*.md'
            ]
        },

        lists: [
            'articles/'
        ],

        tagBase: 'articles/tag',

        paths: {
            content: './content',
            build: './build',
            tpl: './src'
        }
    },

    extra: {
        common: require('./content/common.js')
    }
};
