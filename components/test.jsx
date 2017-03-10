import React from 'react';
import ReactDOMServer from 'react-dom/server'

class Test extends React.Component {
	render() {
		return (
			<html>
			<head>
				<title>{ this.props.title }</title>
			</head>
			<body>
				<div style={{ color: this.props.color }}>
					{ this.props.color }
				</div>
			</body>
			</html>
		);
	}
}

export default ReactDOMServer.renderToStaticMarkup(
	<Test title="MyApp title" color="red" />,
	null
);
