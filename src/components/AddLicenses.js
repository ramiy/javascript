import React from "react";
import styled from "styled-components";
import { LargeButton, LargeButtonLink } from "./Button.js";
import { FormattedMessage } from "react-intl";

const AddLicensesModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-size: 18px;
`;

const AddLicensesHeading = styled.h1`
	font-weight: 300;
	font-size: 1.5em;
	margin: 0;
`;

const AddLicensesText = styled.p`
	font-weight: 300;
	font-size: 1em;
`;

const Buttons = styled.div`
	text-align: right;
	flex: 200px 1 0;
	margin-bottom: 1.5em;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and ( max-width: 420px ) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		a,
		button {
			margin-left: 0px;
			margin-bottom: 12px;
		}
	}
`;

/**
 * Renders the AddLicenses component.
 *
 * @param {Object} props                 Component props.
 * @param {Function} props.onCancelClick The function to execute when the cancel button is clicked.
 * @param {Function} props.onUpgradeClick   The function to execute when the link button is clicked.
 *
 * @returns {ReactElement} A react component describing the AddLicenses modal.
 */
export default function AddLicenses( props ) {
	return (
			<AddLicensesModal>
				<AddLicensesHeading>
					<FormattedMessage id="subscriptions.upgrade-subscription.header" defaultMessage="Upgrade subscription" />
				</AddLicensesHeading>
				<AddLicensesText>
					<label htmlFor="addLicensesInputField">
						<FormattedMessage id="subscriptions.upgrade-subscription.text" defaultMessage="You've used up all the site
						licenses on your current subscription. Do you want to upgade you subscription? (Description of how this change will be billed)" />
					</label>
				</AddLicensesText>
				<Buttons>
					<LargeButton type="button" onClick={ props.onClose } >
						<FormattedMessage id="subscriptions.upgrade-subscription.cancel" defaultMessage="cancel" />
					</LargeButton>

					<LargeButtonLink to={ props.onUpgrade }>
						<FormattedMessage id="subscriptions.upgrade-subscription.link" defaultMessage="upgrade" />
					</LargeButtonLink>
				</Buttons>
			</AddLicensesModal>
	);
}

AddLicenses.propTypes = {
	onClose: React.PropTypes.func.isRequired,
	onUpgrade: React.PropTypes.string.isRequired,
};
