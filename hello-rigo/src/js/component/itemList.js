import React from "react";
import PropTypes from "prop-types";

export const ItemList = props => {
	return (
		<li className="list-group-item">
			{props.cat}
			{props.position > 0 && (
				<button
					type="button"
					className="d-flex justify-content-between float-right"
					onClick={props.lifting}>
					^
				</button>
			)}
			<button
				type="button"
				className="d-flex justify-content-between float-right"
				onClick={props.flying}>
				X
			</button>
		</li>
	);
};

ItemList.propTypes = {
	cat: PropTypes.string,
	flying: PropTypes.func,
	lifting: PropTypes.func,
	position: PropTypes.func
};
