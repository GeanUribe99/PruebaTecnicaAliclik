import React from "react";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
    headers: string[];
    children: React.ReactNode;
  }
  
  export function Table({ headers, children }: Props) {
    return (
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    );
  }
  