import { PriceListTableProps } from "../../app/interface";

export function PriceListTable(props: PriceListTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead className="text-slate-200 text-opacity-90">
          <tr>
            <th>#</th>
            <th>Period</th>
            <th>Base Fee</th>
            <th>Price / Person</th>
            <th>Duration</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody className="text-slate-400 text-opacity-70">
          {/* row 1 */}
          {props.data.map((d, index) => (
            <tr>
              <th>
                <span className="text-opacity-90 text-slate-200">
                  {index + 1}
                </span>
              </th>
              <td>{d.is_holiday ? "Weekends & Holidays" : "Weekdays"}</td>
              <td>{d.base_room_fee}</td>
              <td>{d.headcount_price}</td>
              <td>{d.start_time}</td>
              <td>{d.total_hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NewPriceListTable(props: PriceListTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Price List</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>Period</th>
            <td>is_holiday</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>Base Fee</th>
            <td>base_room_fee</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>Fee / Person</th>
            <td>headcount_price</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>Fee / Person</th>
            <td>headcount_price</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
