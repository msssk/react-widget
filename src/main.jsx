import React from 'react';
import { findDOMNode, render } from 'react-dom';
import createButton from 'dojo-widgets/components/button/createButton';
import createProjector from 'dojo-widgets/createProjector';
import d from 'dojo-widgets/d';

function createReactComponent(widgetConstructor, childrenTarget) {
	return React.createClass({
		componentDidMount: function() {
			// TODO: full mapping of props to appropriate widgetOptions
			var widgetOptions = {
				state: {}
			};

			for (var key in this.props) {
				if (key === 'children' && childrenTarget) {
					widgetOptions.state[childrenTarget] = this.props.children;
				}
				else {
					widgetOptions.state[key] = this.props[key];
				}
			}

			// TODO: full event handling solution
			widgetOptions.listeners = {
				click: this.onClick
			};

			this.projector = createProjector();
			this.projector.root = findDOMNode(this);
			this.projector.children = [ d(widgetConstructor, widgetOptions) ];
			this.projector.append();
		},

		componentWillUnmount: function() {
			this.projector.destroy();
		},

		onClick: function(event) {
			if (this.props.onClick) {
				this.props.onClick.call(this, event);
			}
		},

		render: function() {
			return <div className="widget-wrapper"></div>;
		},

		setState: function(nextState, callback) {
			// TODO: curry state to dojo widget
		}
	});
}

var WButton = createReactComponent(createButton, 'label');

function onClick(event) {
	console.log("Wrapped Button Widget clicked");
}

class App extends React.Component {
	render () {
		return <WButton className="blue" onClick={onClick}>Wrapped Button Widget</WButton>;
	}
}

render(<App/>, document.getElementById('app'));
