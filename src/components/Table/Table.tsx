import React, { useEffect, useState } from "react";

import jsonData from "../../data/MOCK_DATA.json";
import useDebounce from "./useDebounce";
import { TableData } from "./RecordDataTypes";
import Pagination from "./Pagination";

import "./Table.scss";

const Table: React.FC = () => {
	const [state, setState] = useState<TableData[]>([]);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	const [isSearching, setIsSearching] = useState(false);
	const [recordPerPage] = useState(100);
	const [currentPage, setCurrentPage] = useState(1);

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
						<td headers="Company's ids">{res?.id}</td>
						<td headers="Company's Name">{res?.company_name}</td>
						<td headers="Company's deals Currency">
							{res?.currency}
						</td>
						<td headers="Company's Departments">
							{res?.department}
						</td>
						<td headers="Company's Total Sales">
							{res?.sales_total}
						</td>
						<td headers="Company's City">{res?.city}</td>
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
							<th scope="col">Company ID</th>
							<th scope="col">Company Name</th>
							<th scope="col">Currency</th>
							<th scope="col">Department</th>
							<th scope="col">Total Sales</th>
							<th scope="col">City</th>
						</tr>
					</thead>
					<tbody>
						<TableBody />
					</tbody>
				</table>
			</div>
			{search.length < 1 && (
				<Pagination
					jsonData={jsonData}
					currentPage={currentPage}
					recordPerPage={recordPerPage}
					displayNextPage={displayNextPage}
				/>
			)}
		</div>
	);
};

export default Table;
