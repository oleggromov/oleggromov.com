const React = require('react');

class ArticleCovered extends React.Component {
	render() {
		return (
			<html>
			<head>
				<title>Test</title>
			</head>
			<body>
				<pre>
					{ JSON.stringify(this.props, null, 4) }
				</pre>
			</body>
			</html>
		);
	}
}

module.exports = ArticleCovered;
