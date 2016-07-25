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

    menu: [
        {
            name: 'Articles',
            url: '/articles',

            tags: true
        },
        {
            name: 'Projects',
            url: '/projects'
        },
        {
            name: 'CV',
            url: '/cv'
        }
    ],

    extra: {
        common: require('./content/common.js')
    }
};
