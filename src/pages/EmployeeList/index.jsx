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
            accessor: "firstname"
        },
        {
            Header: "Last Name",
            accessor: "lastname"
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

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, prepareRow, setPageSize, setGlobalFilter} = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination)
    
    const { pageIndex, pageSize, globalFilter } = state
    
    return (
        <main id="employee-div" className="main container">
            <h1>Current Employees</h1>
            <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table id="employee-table" className="display" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '<' : ' >') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {
                employeeInStorage === null ? 
                    <p>No data available in table</p>
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
            <div>
                <span>
                    Showing{' '}
                    <strong>
                        {
                        employeeInStorage === null ? 
                        pageIndex
                        :   
                        pageIndex + 1
                        } to {pageOptions.length}
                    </strong>{' '}of{' '}{pageOptions.length}{' '}entries
                </span>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </main>
    )
  }
  
  export default EmployeeList 