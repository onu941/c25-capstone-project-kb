import { PriceListTableProps } from "../../app/interface";

import { useEffect, useState } from "react";

export function NewPriceListTable(props: PriceListTableProps) {
  const [priceDurations, setPriceDurations] = useState<string[]>([]);

  useEffect(() => {
    const calculatePriceDurations = async () => {
      const durations = await Promise.all(
        props.data.map((d) => findPriceDuration(d.start_time, d.total_hour))
      );
      setPriceDurations(durations);
    };

    calculatePriceDurations();
  }, [props.data]);

  const findPriceDuration = async (start_time: string, total_hour: number) => {
    const time = new Date(`1970-01-01T${start_time}`);

    time.setHours(time.getHours() + total_hour);

    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="grid grid-cols-3 grid-flow-row w-full mt-4">
      {props.data.map((d, index) => (
        <div className="flex justify-center mb-8" key={index}>
          <table className="bg-slate-800 bg-opacity-50 border-solid border-2 border-slate-500 border-opacity-30">
            {/* head */}
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="border-solid border-slate-500 border-opacity-30 border-2 pt-4 pb-3 px-7 text-lg bg-slate-800 bg-opacity-90"
                >
                  Price List #{index + 1}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th className="text-slate-300 pt-4 pb-2 px-7 text-center">
                  Period
                </th>
                <td className="text-slate-300 pt-3 pb-2 px-7 text-center">
                  {d.is_holiday ? "Sat, Sun, Holidays" : "Mon - Fri"}
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <th className="text-slate-300 py-2 px-7 text-center">
                  Base Fee
                </th>
                <td className="text-slate-300 py-2 px-7 text-center">
                  {d.base_room_fee}
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th className="text-slate-300 py-2 px-7 text-center">
                  Fee / Person
                </th>
                <td className="text-slate-300 py-2 px-7 text-center">
                  {d.headcount_price}
                </td>
              </tr>
              {/* row 4 */}
              <tr>
                <th className="text-slate-300 pt-2 pb-4 px-7 text-center">
                  Duration
                </th>
                <td className="text-slate-300 pt-2 pb-4 px-7 text-center">
                  {d.start_time.slice(0, -3)} - {priceDurations[index]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
