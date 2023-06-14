export default function PricingBlock() {
  return (
    <div className="w-full rounded-lg p-8 border-solid border-2 border-slate-300 border-opacity-50 drop-shadow-lg bg-slate-800">
      <p>Pricing Plan:</p>
      <br></br>
      <p>Weekday / Weekends and Public Holidays / All days</p>
      <p>Start Time, End Time</p>
      <br></br>
      <p>Base Charge</p>
      <p>Price / person</p>
      <br></br>
      <p>
        hidden input: total hours. end time minus start time. if start time and
        end time are both 00:00, set total hours to 24
      </p>
    </div>
  );
}
