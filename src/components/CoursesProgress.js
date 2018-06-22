import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
// A import { CourseCard } from "./PaperStyles";
import CourseCard from "./courses/CourseCard";
import styled from "styled-components";

const OuterContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 288px);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
	justify-content: center;
	align-items: flex-start;
	padding: 0;
`;

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
} );

/**
 * A function that returns the Courses Progress Tab component.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
class CoursesProgress extends React.Component {
	/**
	 * Sets the CoursesProgress object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.loadData();

		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	render() {
		return (
			<OuterContainer>
				{
					this.props.courses.map( ( course, i ) => {
						// Only show deprecated courses if the student is enrolled in the course.
						// Hide all courses with no shop URL.
						if ( ( ! course.deprecated || course.isEnrolled ) && course.shopUrl ) {
							return <CourseCard key={ i } { ...course } loadData={ this.props.loadData } />;
						}
						return null;
					} )
				}
			</OuterContainer>
		);
	}
}

CoursesProgress.propTypes = {
	intl: intlShape.isRequired,
	courses: PropTypes.array,
	loadData: PropTypes.func,
};

export default injectIntl( CoursesProgress );
