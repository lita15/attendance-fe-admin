import { NextPage } from "next";
import { ReactElement, useState } from "react";
import { BaseLayout } from "@/components/layout/baseLayout";
import { TableHistory } from "@/components/molecules/table";
import { useGetAllHistoryTable, useUpdateCheckOut } from "./api";
import { Select } from "antd/lib";
import { DatePicker } from "antd/lib";
import moment from "moment";
import type { DatePickerProps } from "antd/lib";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const HistoryManagementModule: NextPage = (): ReactElement => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState("fullName");
  const [target, setTarget] = useState("");
  const { data, refetch } = useGetAllHistoryTable({ [dropdown]: search });
  const { mutate } = useUpdateCheckOut();

  const items = [
    { value: "fullName", label: <p>Full Name</p> },
    { value: "address", label: <p>Address</p> },
    { value: "purpose", label: <p>Purpose</p> },
    { value: "numberCard", label: <p>Number Card</p> },
    { value: "checkIn", label: <p>Check In</p> },
  ];

  const handleChangeSelectCategory = (value: string) => {
    setDropdown(value);
    setTarget(value);
  };

  const onChangeCheckIn: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setSearch(date.format("YYYY-MM-DD"));
    } else {
      setSearch("");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const filteredData = data.map((data: any) => {
      const formattedCheckIn = moment(data.checkIn).format(
        "DD MMMM YYYY, HH:mm"
      );
      const formattedCheckOut = data.checkOut
        ? moment(data.checkOut).format("DD MMMM YYYY, HH:mm")
        : "";

      return {
        fullName: data.fullName,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        address: data.address,
        purpose: data.purpose,
        identity: data.identity || "-",
        numberCard: data.numberCard || "-",
        signature: data.signature,
      };
    });

    const tableColumn = [
      "Full Name",
      "Check In",
      "Check Out",
      "Address",
      "Purpose",
      "Identity",
      "Number Card",
      "Signature",
    ];
    const tableRows: any[] = [];

    // Populate the table rows with the data
    filteredData.forEach((item: any) => {
      const rowData = [
        item.fullName,
        item.checkIn,
        item.checkOut ? item.checkOut : "-",
        item.address,
        item.purpose,
        item.identity,
        item.numberCard,
        item.signature ? "" : "-",
      ];
      tableRows.push(rowData);
    });

    doc.text("Attendance Report", 14, 15);

    // Add the autoTable (table) plugin to format the data
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      didDrawCell: (data: any) => {
        const columnIndex = data.column.index;
        const rowIndex = data.row.index;

        if (
          data.section === "body" &&
          columnIndex === 7 &&
          filteredData[rowIndex].signature
        ) {
          const imgData = filteredData[rowIndex].signature;
          // Tambahkan gambar ke dalam cell
          doc.addImage(imgData, "PNG", data.cell.x + 1, data.cell.y + 1, 10, 5);
        }
      },
    });

    doc.save("attendance_report.pdf");
  };

  return (
    <div className="">
      <BaseLayout>
        <section className="  gap-4 mt-10">
          <div className=" flex md:flex-row flex-col md:justify-between mb-5 gap-3 ">
            <div className=" flex gap-3">
              <Select
                defaultValue="Category"
                style={{ width: 150 }}
                onChange={handleChangeSelectCategory}
                options={items}
              />

              {target !== "checkIn" ? (
                <section className="border-[#498AD4] border-[1px] bg-[#ffff] rounded-sm shadow-sm flex px-4 py-2 text-sm w-fit items-center gap-2 overflow-hidden md:min-w-96 text-[#4F0F11]">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#ffff] text-black outline-none"
                    placeholder="Search History"
                  />
                </section>
              ) : (
                <DatePicker onChange={onChangeCheckIn} />
              )}
            </div>

            <button
              className=" border-[#498AD4] border-[1px] rounded-lg px-5 w-fit "
              onClick={generatePDF}
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
