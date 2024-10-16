import { NextPage } from "next";
import { ReactElement, useState } from "react";
import { BaseLayout } from "@/components/layout/baseLayout";
import { TableHistory } from "@/components/molecules/table";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetAllHistoryTable, useUpdateCheckOut } from "./api";
import { Dropdown } from "antd/lib";
import { Space } from "antd/lib";
import * as XLSX from "xlsx";
import moment from "moment";

export const HistoryManagementModule: NextPage = (): ReactElement => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState("fullName");

  const { data, refetch } = useGetAllHistoryTable({ [dropdown]: search });
  const { mutate } = useUpdateCheckOut();

  const items = [
    { key: "fullName", label: <p>Full Name</p> },
    { key: "address", label: <p>Address</p> },
    { key: "purpose", label: <p>Purpose</p> },
    { key: "numberCard", label: <p>Number Card</p> },
  ];

  const handleMenuClick = (e: any) => {
    setDropdown(e.key);
  };

  const formattedTimeCheckIn = moment(data?.checkIn)
    .utcOffset("+10:00")
    .format("dddd, DD MMMM YYYY, HH:mm");

  const formattedTimeChecekOut = moment(data?.checkOut)
    .utcOffset("+10:00")
    .format("dddd, DD MMMM YYYY, HH:mm");

  const generateExcel = () => {
    const filteredData = data.map((data: any) => ({
      fullName: data.fullName,
      checkIn: formattedTimeCheckIn,
      checkOut: formattedTimeChecekOut || "Not checked out yet",
      address: data.address,
      purpose: data.purpose,
      identity: data.identity || "-",
      numberCard: data.numberCard || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Data");
    XLSX.writeFile(workbook, "attendance_report.xlsx");
  };
  return (
    <div className="">
      <BaseLayout>
        <section className="  gap-4 mt-10">
          <div className=" flex md:flex-row flex-col md:justify-between mb-5 gap-3 ">
            <div className=" flex gap-3">
              <section className="border-[#498AD4] border-[1px] bg-[#ffff] rounded-sm shadow-sm flex px-4 py-2 text-sm w-fit items-center gap-2 overflow-hidden md:min-w-96 text-[#4F0F11]">
                <AiOutlineSearch className="text-black text-lg" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#ffff] text-black outline-none"
                  placeholder="Search History"
                />
              </section>

              <Space wrap>
                <Dropdown
                  menu={{
                    items,
                    onClick: handleMenuClick,
                  }}
                  placement="bottom"
                  arrow
                >
                  <button className="border-[#498AD4] border-[1px] rounded-sm px-5 py-2 w-fit">
                    Search Category
                  </button>
                </Dropdown>
              </Space>
            </div>

            <button
              className=" border-[#498AD4] border-[1px] rounded-lg px-5 w-fit "
              onClick={generateExcel}
            >
              Download
            </button>
          </div>

          <TableHistory data={data} refetch={refetch} mutate={mutate} />
        </section>
      </BaseLayout>
    </div>
  );
};
