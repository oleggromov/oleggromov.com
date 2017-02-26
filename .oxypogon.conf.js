module.exports = {
    build: {
        content: {
            page: [
                'notes/**/index.md'
            ],
            piece: [
                'pieces/*.md'
            ]
        },

        lists: [
            {
                name: 'everything',
                url: '/'
            },
            {
                name: 'Notes',
                url: '/notes/',
                isCategory: true
            }
        ],

        copy: [],

        tagBaseUrl: '/notes/tag',

        paths: {
            content: './content',
            build: './build',
            tpl: './src'
        }
    },

    buildConfig: {
        previewSize: 2,
    },

    extra: {
        common: require('./content/common.js')
    }
};
