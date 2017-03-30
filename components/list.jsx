const React = require('react');

class List extends React.Component {
	render() {
		return (
			<div>
				<h1>List</h1>
				<pre>
					{ JSON.stringify(this.props, null, 4) }
				</pre>
			</div>
		);
	}
}

module.exports = List;
