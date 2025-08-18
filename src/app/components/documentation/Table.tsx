import { cx } from "lib/cx";

export const Table = ({
  table,
  title,
  className,
  trClassNames = [],
  tdClassNames = [],
}: {
  table: React.ReactNode[][];
  title?: string;
  className?: string;
  trClassNames?: string[];
  tdClassNames?: string[];
}) => {
  const tableHeader = table[0];
  const tableBody = table.slice(1);
  return (
    <table
      className={cx(
        "w-full divide-y border text-sm text-gray-900 dark:text-neutral-100 dark:divide-neutral-800 border-gray-200 dark:border-neutral-800",
        className
      )}
    >
      <thead className="text-left align-top divide-y bg-gray-50 dark:bg-neutral-800 dark:text-neutral-100 dark:divide-neutral-700">
        {title && (
          <tr className="divide-x bg-gray-50 dark:bg-neutral-800 dark:divide-neutral-700">
            <th
              className="px-2 py-1.5 font-bold"
              scope="colSpan"
              colSpan={tableHeader.length}
            >
              {title}
            </th>
          </tr>
        )}
        <tr className="divide-x bg-gray-50 dark:bg-neutral-800 dark:divide-neutral-700">
          {tableHeader.map((item, idx) => (
            <th className="px-2 py-1.5 font-semibold" scope="col" key={idx}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-left align-top divide-y dark:divide-neutral-800">
        {tableBody.map((row, rowIdx) => (
          <tr
            className={cx(
              "divide-x bg-gray-50 dark:bg-neutral-900",
              trClassNames[rowIdx]
            )}
            key={rowIdx}
          >
            {row.map((item, colIdx) => (
              <td
                className={cx("px-2 py-1.5", tdClassNames[colIdx])}
                key={colIdx}
              >
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
