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
	const debouncedSearchTerm = useDebounce(search, 500);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		document.title = "List of Companies With Details";
		setState(jsonData);
	}, []);

	useEffect(() => {
		if (search.length > 2 && debouncedSearchTerm) {
			console.log(search);
			setIsSearching(true);
			const filterData = jsonData.filter(
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
			setState(jsonData);
		}
	}, [search, debouncedSearchTerm]);

	const TableBody = () => {
		return (
			<>
				{isSearching && <div>Searching ...</div>}
				{state.map((res) => (
					<div className="divTableRow" key={res?.id}>
						<div className="divTableCell">{res?.id}</div>
						<div className="divTableCell">{res?.company_name}</div>
						<div className="divTableCell">{res?.currency}</div>
						<div className="divTableCell">{res?.department}</div>
						<div className="divTableCell">{res?.sales_total}</div>
						<div className="divTableCell">{res?.city}</div>
					</div>
				))}
				{state.length < 1 && (
					<div className="divTableRow">
						<div className="groupRow">No Record Found.</div>
					</div>
				)}
			</>
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
				<div className="divTable blueTable">
					<div className="divTableHeading">
						<div className="divTableRow">
							<div className="divTableHead">S.No</div>
							<div className="divTableHead">Country Name</div>
							<div className="divTableHead">Currency</div>
							<div className="divTableHead">Department</div>
							<div className="divTableHead">Sales Total</div>
							<div className="divTableHead">City</div>
						</div>
					</div>
					<div className="divTableBody">
						<TableBody />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
