module.exports = {
    build: {
        content: {
            page: [
                'notes/**/index.md',
                'places/**/index.md'
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
            },
            {
                name: 'Places',
                url: '/places/',
                isCategory: true
            }
        ],

        copy: [
            'places/**/images/*',
            'notes/**/images/*'
        ],

        tagBaseUrl: '/notes/tags',

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
