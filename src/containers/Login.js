import { connect } from "react-redux";
import Login from "../components/login/Login";
import { loginRequest } from "../actions/login";

export const mapStateToProps = ( state, ownProps ) => {
	return Object.assign( {}, state.ui.login );
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		/**
		 * Opens the door to the treasures of MyYoast,
		 * if their credentials are correctly filled in.
		 *
		 * @param {Object} params The request parameters.
		 * @param {string} params.email The email address of the user who is trying to log in.
		 * @param {string} params.password The password of the user who is trying to log in.
		 * @param {boolean} params.rememberMe Whether or not the user wants to be reminded, and have their login session extended.
		 *
		 * @returns {void}
		 */
		attemptLogin: ( params ) => {
			dispatch( loginRequest( params ) );
		},
	};
};

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Login );

export default LoginContainer;
