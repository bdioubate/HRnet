import { useMemo } from "react"

import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table"
import GlobalFilter from "../../components/GlobalFilter";

const EmployeeList = () => {
    const employeeInStorage = localStorage.getItem('employees')
    const copyEmployeeInStorage = useMemo(() => (
        employeeInStorage === null ? 
            [] 
        : 
            [...JSON.parse(employeeInStorage)]
    ), [employeeInStorage])
    const data = useMemo(() => copyEmployeeInStorage, [copyEmployeeInStorage])        
    
    const columns = useMemo(() => [
        {
            Header: "First Name",
            accessor: "firstName"
        },
        {
            Header: "Last Name",
            accessor: "lastName"
        },
        {
            Header: "Start Date",
            accessor: "startDate"
        },
        {
            Header: "Department",
            accessor: "department"
        },
        {
            Header: "Date of Birth",
            accessor: "dateOfBirth"
        },
        {
            Header: "Street",
            accessor: "street"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "State",
            accessor: "addressState" 
        },
        {
            Header: "Zip Code",
            accessor: "zipCode"
        }
    ], [])

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage, 
        canNextPage, 
        canPreviousPage, 
        pageOptions, 
        gotoPage, 
        pageCount, 
        state, 
        prepareRow, 
        setPageSize, 
        setGlobalFilter
    } = useTable(
        { 
            columns, 
            data
            //initialState: {pageIndex : 0-1 }
        }, 
        useGlobalFilter, 
        useSortBy, 
        usePagination)
    
    const { pageIndex, pageSize, globalFilter } = state
    
    return (
        <main id="employee-div" className="main container">
            <h1>Current Employees</h1>
            <div id="showEntries">
                <span>Show</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                    >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                <span>entries</span>
            </div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table id="employee-table" className="display" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th className={` sort ${column.isSorted ? (column.isSortedDesc ? 'sort_asc ' : ' sort_desc ') : ''}`} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {
                employeeInStorage === null ? 
                    <tbody>
                        <tr>
                            <td id="noData">
                                No data available in table
                            </td>
                        </tr>
                    </tbody>
                : 
                    <tbody {... getTableBodyProps}>
                        {page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>
                                            {/*cell.render("Cell")*/}
                                            {
                                            cell.column.Header === "Date of Birth" ? 
                                                new Date(Number(cell.value)).toLocaleDateString() 
                                            : 
                                                cell.column.Header === "Start Date" ? 
                                                    new Date(Number(cell.value)).toLocaleDateString() 
                                                :
                                                    cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                }
            </table>
            <div id="manyShowEntries">
                    <span>Showing</span>
                    <span>
                        {
                        employeeInStorage === null ? 
                        pageIndex
                        :   
                        pageIndex + 1
                        } to {pageOptions.length}
                    </span>
                    <span> of {pageOptions.length} entries</span>
            </div>
            <div id="btnShowEntries">
                <button className="btnTable" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {pageCount === 0 ? '0' : '1'}
                </button> 
                <input type="number" min={pageCount === 0 ? 0 : 1} max={pageCount}
                defaultValue={pageCount === 0 ? pageIndex : pageIndex + 1} 
                onChange={ e => {
                    const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
                    gotoPage(pageNumber)
                }}
                />
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {`${pageCount}`}
                </button>
                <button className="btnTable" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </main>
    )
  }
  
  export default EmployeeList 

  //L87 {column.isSorted ? (column.isSortedDesc ? '<' : ' >') : ''}