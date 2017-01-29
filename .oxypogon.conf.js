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
            '/',
            '/notes/'
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

    menu: [
        {
            name: 'Notes',
            url: '/notes',

            tags: true
        }
    ],

    extra: {
        common: require('./content/common.js')
    }
};
