module.exports = {
	build: {
		base: '../build/'
		sources: [
			{
				src: './content/articles/**/index.md',
				dest: [
					{
						tpl: 'preview',
						dest: './articles/index.html'
					},
					{
						tpl: 'article',
						dest: './articles/**/index.html'
					}
				]
			},
			{
				src: './content/articles/math/**/index.md',
				dest: [
					{
						tpl: 'preview',
						dest: './articles/math/index.html'
					},
					{
						tpl: 'article',
						dest: './articles/math/**/index.html'
					}
				]
			},
			{
				src: './content/cv/index.md',
				dest: {
					tpl: 'cv',
					dest: './cv/index.html'
				}
			},
			{
				src: './content/projects/index.md',
				dest: {
					tpl: 'projects',
					dest: './projects/index.html'
				}
			}
		]
	},

	meta: {
		intro: require('intro.md'),

		menu: [
			{
				name: "Articles",
				link: "/articles/",

				subs: [
					{
						name: "Math",
						link: "/articles/math/"
					}
				]
			},

			{
				name: "CV",
				link: "/cv/"
			},

			{
				name: "Projects",
				link: "/projects/"
			}
		],

		external: [
			{
				name: "github",
				link: "//github.com/oleggromov"
			},
			{
				name: "facebook",
				link: "//facebook.com/oleg.v.gromov"
			},
			{
				name: "stackoverflow",
				link: "//stackoverflow.com/users/1557048/oleggromov"
			},
			{
				name: "twitter",
				link: "//twitter.com/oleggromov"
			}
		]
	}
};
