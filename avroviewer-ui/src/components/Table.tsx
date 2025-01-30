import { useTheme } from "../context/theme";

interface AvroRecord {
  [key: string]: any;
}

interface TableProps {
  schema: string[];
  records: AvroRecord[];
  isDark: boolean;
}

export default function Table({ schema, records, isDark }: TableProps) {
  const { theme } = useTheme();

  const columns: {
    key: string;
    label: string;
    nested?: { key: string; label: string }[];
  }[] = [];

  schema.forEach((field) => {
    const parts = field.split(".");
    if (parts.length === 1) {
      columns.push({ key: field, label: field });
    } else {
      const parent = parts[0];
      const child = parts.slice(1).join(".");
      let parentColumn = columns.find((col) => col.key === parent);

      if (!parentColumn) {
        parentColumn = { key: parent, label: parent, nested: [] };
        columns.push(parentColumn);
      }

      parentColumn.nested!.push({ key: child, label: child });
    }
  });

  const totalLeafColumns = columns.reduce(
    (total, col) => total + (col.nested ? col.nested.length : 1),
    0
  );

  const isThereNestedColumns = columns.some((col) => col.nested);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        <colgroup>
          {columns.map((col) =>
            col.nested ? (
              col.nested.map((_, i) => (
                <col
                  key={`${col.key}-${i}`}
                  style={{ width: `${100 / totalLeafColumns}%` }}
                />
              ))
            ) : (
              <col
                key={col.key}
                style={{ width: `${100 / totalLeafColumns}%` }}
              />
            )
          )}
        </colgroup>
        <thead>
          <tr className={theme.headerBg}>
            {columns.map((col, colIndex) => {
              if (col.nested) {
                return (
                  <th
                    key={col.key}
                    colSpan={col.nested.length}
                    className="p-0 relative text-sm"
                  >
                    <div className="text-left">
                      <div className="p-4 pb-2 relative flex justify-center">
                        <span className={`font-medium ${theme.selectedText}`}>
                          {col.label}
                        </span>
                        <div
                          className={`absolute left-0 right-0 bottom-0 h-px ${theme.headerBorder}`}
                        ></div>
                      </div>
                      <div
                        className="grid"
                        style={{
                          gridTemplateColumns: `repeat(${col.nested.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {col.nested.map((nestedCol, nestedIndex) => (
                          <div
                            key={nestedCol.key}
                            className="p-4 pt-2 flex justify-center relative"
                          >
                            <span
                              className={`font-medium ${theme.selectedText}`}
                            >
                              {nestedCol.label}
                            </span>
                            {col.nested &&
                              nestedIndex < col.nested.length - 1 && (
                                <div
                                  className={`absolute right-0 top-1/3 bottom-1/3 w-px ${theme.headerBorder}`}
                                ></div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {colIndex < columns.length - 1 && (
                      <div
                        className={`absolute right-0 top-1/3 bottom-1/3 w-px ${theme.headerBorder}`}
                      ></div>
                    )}
                  </th>
                );
              }
              return (
                <th key={col.key} className="relative p-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-medium ${theme.selectedText}`}>
                      {col.label}
                    </span>
                  </div>
                  {colIndex < columns.length - 1 && (
                    <div
                      className={`absolute right-0 top-1/3 bottom-1/3 w-px ${theme.headerBorder}`}
                    ></div>
                  )}
                  <div className="opacity-0 p-4 pb-2">spacer</div>
                  {isThereNestedColumns && (
                    <div className="opacity-0 p-4 pt-2">content</div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {records.map((record, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${theme.hover}  ${
                isDark
                  ? "text-gray-300 hover:bg-opacity-10"
                  : "text-gray-600 hover:bg-opacity-30"
              }`}
            >
              {schema.map((field, index) => (
                <td
                  key={index + rowIndex}
                  className="px-3 py-2 text-center text-sm"
                >
                  {record[field] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
