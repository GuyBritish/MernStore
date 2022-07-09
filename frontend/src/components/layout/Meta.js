import React from "react";

import { Helmet } from "react-helmet";

const Meta = (props) => {
	const {
		title = "Welcome to MernStore",
		description = "We sell the best products for cheap",
		keywords = "electronics, buy electronics, cheap electronics",
	} = props;
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

export default Meta;
