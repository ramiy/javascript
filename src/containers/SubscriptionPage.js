import { connect } from "react-redux";
import SubscriptionPage from "../components/account/subscriptions/SubscriptionPage";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
	getAllSubscriptions,
	openCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
import { getOrders } from "../actions/orders";
import { retrieveSites } from "../actions/sites";
import {
	getAllSubscriptionsById,
	getConnectedSubscriptions,
	getSubscriptionsOrders,
	getSubscriptionsSites, getConnectedSubscriptionsSites, getSubscriptionsProducts,
} from "../selectors/entities/subscriptions";
import {
	getCancelSubscriptionState,
	isSubscriptionPageLoading,
} from "../selectors/ui/subscriptions";
import _isUndefined from "lodash/isUndefined";

/* eslint-disable require-jsdoc */
/* eslint-disable-next-line max-statements */
export const mapStateToProps = ( state, ownProps ) => {
	const selectedSubscriptionId = ownProps.match.params.id;
	const subscription = getAllSubscriptionsById( state )[ selectedSubscriptionId ];
	if ( _isUndefined( subscription ) || isSubscriptionPageLoading( state ) ) {
		return {
			isLoading: true,
		};
	}

	const orders = getSubscriptionsOrders( state )[ selectedSubscriptionId ];
	console.log( orders );
	const products = getSubscriptionsProducts( state )[ selectedSubscriptionId ]
		.filter( product => {
			return product.sourceShopId === 1;
		} );

	const cancelSubscriptionState = getCancelSubscriptionState( state );

	return Object.assign( {}, {
		subscription,
		orders,
		sites: getSubscriptionsSites( state )[ selectedSubscriptionId ],
		products,
		connectedSubscriptions: getConnectedSubscriptions( state )[ selectedSubscriptionId ],
		connectedSubscriptionsSites: getConnectedSubscriptionsSites( state )[ selectedSubscriptionId ],
	}, cancelSubscriptionState );
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			// Fetch required model data.
			dispatch( getOrders() );
			dispatch( getAllSubscriptions() );
			dispatch( retrieveSites() );
			dispatch( getAllProducts() );
			dispatch( getProductGroups() );
		},
		cancelSubscription: ( subscriptionId, shopId ) => {
			dispatch( cancelSubscription( subscriptionId, shopId ) );
		},
		openCancelModal: () => {
			dispatch( openCancelSubscriptionModal() );
		},
		closeCancelModal: () => {
			dispatch( closeCancelSubscriptionModal() );
		},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionPage );

export default SubscriptionsPageContainer;
