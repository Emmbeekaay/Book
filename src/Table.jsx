import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import React, { useState, useMemo } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";
import { Box, Button, Flex, Input, Select, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";

 const BasicTable = ({ tableData, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

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
    state,
    setPageSize,
    selectedFlatRows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
   
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  

  return (
    <Box>
      <Box w='100px' mt='20px'>
      <Select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
          {pageSize}
          </option>
        ))}
      </Select>
      </Box>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th  border='2px' {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr border='2px'{...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td border='2px' {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>

      <div>
        <span >
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    
    </Box>
  );
};

export default  BasicTable

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <Flex w='300px' gap='10px' m='auto' alignItems='center' mb='20px'>
      <strong>Search:</strong>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Flex>
  );
};


