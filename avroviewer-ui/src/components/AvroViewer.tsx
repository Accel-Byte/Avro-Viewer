import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";
import TableHeader from "./TableHeader";
import _ from "lodash";
import Modal from "./Modal";
import NoData from "./NoData";

function paginate(items: AvroRecord[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

interface AvroRecord {
  [key: string]: any;
}

export default function AvroViewer() {
  const [schema, setSchema] = useState<string[] | null>(null);
  const [fullSchema, setFullSchema] = useState<string | null>(null);
  const [records, setRecords] = useState<AvroRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AvroRecord[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  const getPageData = () => {
    let filtered = records;

    if (searchQuery && selectedColumn) {
      filtered = records.filter((record) =>
        record[selectedColumn]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setCurrentPage(1);
    }

    setFilteredRecords(filtered);
  };

  const currentRecords = paginate(filteredRecords, currentPage, pageSize);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { schema: fullSchema, headerValues, rowValues } = event.data;
      setFullSchema(fullSchema);
      setSchema(headerValues);
      setRecords(rowValues);
    });
  }, []);

  useEffect(() => {
    getPageData();
  }, [records, currentPage, searchQuery, selectedColumn, pageSize]);

  return (
    <div
      className={`w-full min-h-[98vh] p-2 pt-8 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {schema && fullSchema && (
        <>
          <h1
            className={`text-7xl text-center font-extrabold text-transparent bg-clip-text ${
              isDark ? "bg-amber-300" : "bg-slate-600"
            }`}
          >
            Avro Viewer
          </h1>

          {/* Fancy text with anchor link */}
          <div className="text-center mt-4">
            <p className="text-lg">
              To view the full schema,{" "}
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-cyan-400 hover:text-cyan-400"
                    : "text-fuchsia-600 hover:text-fuchsia-600"
                }  font-semibold relative group inline-block focus:outline-none`}
                onClick={() => setIsModalOpen(true)}
              >
                Click me!
                <span
                  className={`${
                    isDark ? "bg-cyan-400" : "bg-fuchsia-600"
                  } absolute bottom-[-0.25rem] right-0 w-0 h-[2px] rounded-full transition-all duration-400 group-hover:w-full group-hover:left-0`}
                ></span>
              </a>
            </p>
          </div>

          {records && !records.length ? (
            <NoData />
          ) : (
            <div className="flex flex-col mt-4 p-2">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div
                    className={`border rounded-lg ${
                      isDark ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <TableHeader
                      schema={schema}
                      selectedColumn={selectedColumn}
                      setSelectedColumn={setSelectedColumn}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      pageSize={pageSize}
                      setPageSize={setPageSize}
                      setCurrentPage={setCurrentPage}
                      fullSchema={fullSchema}
                      isDark={isDark}
                      setIsDark={setIsDark}
                    />
                    <Table
                      schema={schema}
                      records={currentRecords}
                      isDark={isDark}
                    />
                    <Pagination
                      itemsCount={filteredRecords.length}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                      isDark={isDark}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            schema={fullSchema}
            isDark={isDark}
          />
        </>
      )}
    </div>
  );
}
