import React, { useEffect, useState } from "react";
import jsonData from "../../data/MOCK_DATA.json";

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
	useEffect(() => {
		setState(jsonData);
	}, []);

	const filterTable = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		if (search.length > 2) {
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
			setState(filterData);
		}
		if (search.length < 1) {
			setState(jsonData);
		}
	}, [search]);
	return (
		<div className="table-data">
			<div className="input">
				<input
					type="text"
					onChange={(e) => filterTable(e)}
					value={search}
					placeholder="Search by Country Name, Department, Total Sales, City "
				/>
			</div>
			<div className="table">
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
						{state.map((res) => (
							<div className="divTableRow" key={res?.id}>
								<div className="divTableCell">{res?.id}</div>
								<div className="divTableCell">
									{res?.company_name}
								</div>
								<div className="divTableCell">
									{res?.currency}
								</div>
								<div className="divTableCell">
									{res?.department}
								</div>
								<div className="divTableCell">
									{res?.sales_total}
								</div>
								<div className="divTableCell">{res?.city}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
