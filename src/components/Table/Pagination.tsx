import React, { useEffect, useState } from "react";
import { PaginationPropType } from "./PaginationPropType";
import PropTypes from "prop-types";

const Pagination: React.FC<PaginationPropType> = ({
	jsonData,
	currentPage,
	recordPerPage,
	displayNextPage,
}) => {
	const [previousLastPage, setPreviousLastPage] = useState(true);
	const [nextLastPage, setNextLastPage] = useState(false);

	useEffect(() => {
		previousPage(currentPage);
		nextPage(currentPage);
	}, [currentPage]);

	const PaginationRow = () => {
		return (
			<>
				<li
					className={
						previousLastPage ? "page-item disabled" : " page-item"
					}
				>
					<a
						className="page-link"
						href="#!"
						onClick={() => displayNextPage(currentPage - 1)}
					>
						Previous
					</a>
				</li>
				<PageNumbers />
				<li
					className={
						nextLastPage ? "page-item disabled" : "page-item"
					}
				>
					<a
						className="page-link"
						href="#!"
						onClick={() => displayNextPage(currentPage + 1)}
					>
						Next
					</a>
				</li>
			</>
		);
	};

	const PageNumbers = () => {
		const totalRecords: number = Array.isArray(jsonData)
			? jsonData.length
			: 0;
		const totalPageNumber: number = Math.ceil(totalRecords / recordPerPage);
		const pageNumbersArray = new Array(totalPageNumber).fill(null);
		return (
			<>
				{pageNumbersArray.map((count, index) => (
					<li
						className={
							currentPage === index + 1
								? "page-item active"
								: "page-item"
						}
						key={index}
					>
						<a
							className="page-link"
							href="#!"
							onClick={() => displayNextPage(index + 1)}
						>
							{index + 1}
						</a>
					</li>
				))}
			</>
		);
	};
	const previousPage = (pageNumber: number) => {
		if (pageNumber > 1) {
			setPreviousLastPage(false);
		}
		if (pageNumber <= 1) {
			setPreviousLastPage(true);
		}
	};

	const nextPage = (pageNumber: number) => {
		const totalRecords: number = Array.isArray(jsonData)
			? jsonData.length
			: 0;

		const totalPageNumber: number = Math.ceil(totalRecords / recordPerPage);
		if (pageNumber === totalPageNumber) {
			setNextLastPage(true);
		}
		if (pageNumber !== totalPageNumber) {
			setNextLastPage(false);
		}
	};

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination floatRight">
				<PaginationRow />
			</ul>
		</nav>
	);
};
Pagination.propTypes = {
	jsonData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			company_name: PropTypes.string.isRequired,
			currency_code: PropTypes.string.isRequired,
			currency: PropTypes.string.isRequired,
			department: PropTypes.string.isRequired,
			sales_total: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
		})
	).isRequired,
	currentPage: PropTypes.number.isRequired,
	recordPerPage: PropTypes.number.isRequired,
	displayNextPage: PropTypes.func.isRequired,
};

export default Pagination;
