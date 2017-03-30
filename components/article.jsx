const React = require('react');

class Article extends React.Component {
	render() {
		return (
			<div>
				<h1>Article</h1>
				<pre>
					{ JSON.stringify(this.props, null, 4) }
				</pre>
			</div>
		);
	}
}

module.exports = Article;
