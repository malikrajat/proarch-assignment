import { TableData } from "./RecordDataTypes";

export interface PaginationPropType {
	jsonData: TableData[];
	currentPage: number;
	recordPerPage: number;
	displayNextPage: (pageNumber: number) => void;
}

export default PaginationPropType;
