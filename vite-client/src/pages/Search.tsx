import { FormEvent, useEffect, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, BodyHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import { DropdownInputSimple } from "../components/minicomponents/Inputs";
import { SubmitButton } from "../components/minicomponents/Buttons";
import { PartyroomCardLarge } from "../components/minicomponents/Cards";
import { SearchResults } from "../app/interface";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function Search() {
  const navigate = useNavigate();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  useEffect(() => {
    const getDistricts = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/district`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const districts = await response.json();
      setDistricts(districts);
    };

    getDistricts();
  }, []);

  const onSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const form = event.target as HTMLFormElement;
    console.log("form", form.district);
    const districtId = form.district.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/partyroom/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          districtId,
        }),
      }
    );

    const results = await response.json();
    console.log(results);

    if (response.ok) {
      setSearchResults(results);
      if (results.length == 0) {
        toast.error("No results for this district");
      }
    } else {
      console.log("not working");
    }
  };

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
            title="Find By District"
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          <div className="mt-12 mx-6 md:mx-0 mb-6 px-6 bg-slate-800 bg-opacity-40 rounded-lg border-solid border-2 border-slate-500 border-opacity-50">
            <form onSubmit={onSearchSubmit} className="mb-4 pt-6">
              <div className="mt-4">
                <DropdownInputSimple
                  name="district"
                  type="text"
                  placeholder="Select a district"
                  options={districts}
                  defaultValue={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <SubmitButton isCentered label="Search" />
              </div>
            </form>
          </div>
          <BodyHeader title="Results:" />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mb-32 mx-6 md:mx-0">
            {searchResults.length > 0 &&
              searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/partyroom?room_id=${result.partyroom_id}`)
                  }
                >
                  <PartyroomCardLarge
                    image={`${import.meta.env.VITE_API_SERVER}/rooms/${
                      result.filename
                    }`}
                    alt="sample"
                    name={result.name}
                    address={result.address}
                    pax={result.capacity}
                  />
                </div>
              ))}
          </div>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
