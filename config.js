module.exports = {
    build: {
        content: {
            page: [
                'articles/**/index.md'
            ],
            piece: [
                'pieces/*.md'
            ]
        },

        lists: [
            '/articles/'
        ],

        tagBaseUrl: '/articles/tag',

        paths: {
            content: './content',
            build: './build',
            tpl: './src'
        }
    },

    buildConfig: {
        previewSize: 3,
    },

    menu: [
        {
            name: 'Articles',
            url: '/articles',

            tags: true
        }
    ],

    extra: {
        common: require('./content/common.js')
    }
};
