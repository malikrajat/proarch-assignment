import React, { useEffect, useState } from "react";
import jsonData from "../../data/MOCK_DATA.json";
import useDebounce from "./useDebounce";

import "./Table.scss";

type TableData = {
	id: number;
	company_name: string;
	currency_code: string;
	currency: string;
	department: string;
	sales_total: string;
	city: string;
};

const Table: React.FC = () => {
	const [state, setState] = useState<TableData[]>([]);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 100);
	const [isSearching, setIsSearching] = useState(false);
	const [recordPerPage] = useState(100);
	const [currentPage, setCurrentPage] = useState(1);
	const [previousLastPage, setPreviousLastPage] = useState(true);
	const [nextLastPage, setNextLastPage] = useState(false);

	useEffect(() => {
		document.title = "List of Companies With Details";
		displayNextPage(1);
	}, []);

	useEffect(() => {
		if (search.length > 2 && debouncedSearchTerm) {
			setIsSearching(true);
			const filterData: TableData[] = jsonData.filter(
				(res) =>
					res.company_name
						.toUpperCase()
						.indexOf(search.toUpperCase()) !== -1 ||
					res.city.toUpperCase().indexOf(search.toUpperCase()) !==
						-1 ||
					res.department
						.toUpperCase()
						.indexOf(search.toUpperCase()) !== -1 ||
					res.sales_total
						.toUpperCase()
						.indexOf(search.toUpperCase()) !== -1
			);
			setIsSearching(false);
			setState(filterData);
		}
		if (search.length < 1) {
			displayNextPage(1);
		}
	}, [search, debouncedSearchTerm]);

	const TableBody = () => {
		return (
			<>
				{isSearching && <div>Searching ...</div>}
				{state.map((res) => (
					<tr key={res?.id}>
						<td>{res?.id}</td>
						<td>{res?.company_name}</td>
						<td>{res?.currency}</td>
						<td>{res?.department}</td>
						<td>{res?.sales_total}</td>
						<td>{res?.city}</td>
					</tr>
				))}
				{state.length < 1 && (
					<tr>
						<td colSpan={6}>No Record Found</td>
					</tr>
				)}
			</>
		);
	};

	const displayNextPage = (pageNumber: number) => {
		const recordList: TableData[] = search.length < 1 ? jsonData : state;
		let statingRecordNumber: number =
			pageNumber !== 1 ? pageNumber * recordPerPage - recordPerPage : 0;
		let endingRecordNumber: number = pageNumber * recordPerPage;
		let currentRecordAsPerNumbered: TableData[] = recordList.slice(
			statingRecordNumber,
			endingRecordNumber
		);
		setCurrentPage(pageNumber);
		setState(currentRecordAsPerNumbered);
		previousPage(pageNumber);
		nextPage(pageNumber);
	};

	const PageNumbers = () => {
		const totalRecords: number =
			search.length < 1 ? jsonData.length : state.length;
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
		const totalRecords: number =
			search.length < 1 ? jsonData.length : state.length;
		const totalPageNumber: number = Math.ceil(totalRecords / recordPerPage);
		if (pageNumber === totalPageNumber) {
			setNextLastPage(true);
		}
		if (pageNumber !== totalPageNumber) {
			setNextLastPage(false);
		}
	};

	const Pagination = () => {
		return (
			<nav aria-label="Page navigation example">
				<ul className="pagination floatRight">
					<li
						className={
							previousLastPage
								? "page-item disabled"
								: " page-item"
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
				</ul>
			</nav>
		);
	};

	return (
		<div className="table-data" aria-live="polite" aria-atomic="true">
			<div className="input" aria-label="Primary">
				<input
					id="searchInput"
					type="text"
					onChange={(e) => setSearch(e.target.value)}
					value={search}
					name="search"
					tabIndex={0}
					maxLength={80}
					autoFocus
					aria-label="Filter Table Data"
					aria-required="true"
					placeholder="Search by Country Name, Department, Total Sales, City "
				/>
			</div>

			<div className="table" aria-label="Secondary">
				<table className="table table-hover" cellSpacing="0">
					<thead>
						<tr>
							<th>Company ID</th>
							<th>Company Name</th>
							<th>Currency</th>
							<th>Department</th>
							<th>Total Sales</th>
							<th>City</th>
						</tr>
					</thead>
					<tbody>
						<TableBody />
					</tbody>
				</table>
			</div>
			{search.length < 1 && <Pagination />}
		</div>
	);
};

export default Table;
