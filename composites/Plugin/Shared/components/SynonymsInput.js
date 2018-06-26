import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import isFunction from "lodash/isFunction";

import colors from "../../../../style-guide/colors.json";

const SynonymsField = styled.input`
	margin-right: 0.5em;
`;

class SynonymsInput extends React.Component {
	/**
	 * Constructs a SynonymsField component
	 *
	 * @param {Object} props          The props for this input field component.
	 * @param {string} props.id       The id of the SynonymsField.
	 * @param {string} props.label    The label of the SynonymsField.
	 * @param {string} props.synonyms The initial synonyms passed to the state.
	 * @param {string} props.onChange The change event handler.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.handleChange = this.handleChange.bind( this );

		this.state = {
			synonyms: this.props.synonyms,
		};
	}

	/**
	 * Handles changes in the input.
	 *
	 * @param {Event} event The onChange event.
	 *
	 * @returns {void} Calls the onChange prop if given.
	 */
	handleChange( event ) {
		const { onChange } = this.props;
		const synonyms = event.target.value;

		this.setState( { synonyms } );
		if ( isFunction( onChange ) ) {
			onChange( synonyms );
		}
	}

	/**
	 * Renders the SynonymsField component.
	 *
	 * @returns {ReactElement} The SynonymsField component.
	 */
	render() {
		return (
			<React.Fragment>
				<label htmlFor={ this.props.id }>
					{ this.props.label }
				</label>
				<SynonymsField
					type="text"
					id={ this.props.id }
					onChange={ this.handleChange }
					defaultValue={ this.props.synonyms }
				/>
			</React.Fragment>
		);
	}
}

SynonymsInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	synonyms: PropTypes.string,
	onChange: PropTypes.func,
};

SynonymsInput.defaultProps = {
	id: uniqueId( "yoast-synonyms-input-" ),
	synonyms: "",
};

export default SynonymsInput;

