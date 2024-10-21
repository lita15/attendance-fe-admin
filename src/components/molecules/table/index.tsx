import React, { FC, ReactElement, useEffect, useState } from "react";
import { Table } from "antd/lib";
import type { TableColumnsType } from "antd/lib";
import moment from "moment";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataType {
  key: React.Key;
  fullName: string;
  checkIn: Date;
  checkOut: Date;
  purpose: string;
  address: string;
  numberCard: number;
}
interface AttendanceProps {
  data: any;
  refetch: () => void;
  mutate: any;
}

export const TableHistory: FC<AttendanceProps> = (props): ReactElement => {
  const { data, refetch, mutate } = props;

  const handleCheckout = (id: string) => {
    if (id) {
      const payload = {
        checkOut: new Date(),
      };
      mutate(
        { id, payload },
        {
          onSuccess: () => {
            toast.success("Checkout successful!");
            refetch();
          },
          onError: () => {
            toast.error("Checkout failed. Please try again.");
          },
        }
      );
    } else {
      console.error("Checkout failed: No ID provided");
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      sorter: (a: DataType, b: DataType) => {
        return moment(a.checkIn).unix() - moment(b.checkIn).unix();
      },
      render: (date: Date) => moment(date).format("dddd, DD MMMM YYYY, HH:mm"),
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      sorter: (a: DataType, b: DataType) => {
        return moment(a.checkOut).unix() - moment(b.checkOut).unix();
      },
      render: (date: Date) =>
        date
          ? moment(date).format("dddd, DD MMMM YYYY, HH:mm")
          : "Not checked out yet",
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      sorter: (a, b) => a.purpose.length - b.purpose.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Number Card",
      dataIndex: "numberCard",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.numberCard - b.numberCard,
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: "0",
      render: (id: string, record: DataType) => (
        <section className="flex gap-2 text-base">
          <Link
            href={`history-management/${id}`}
            className="p-1 rounded-md shadow-sm border-[1px]  hover:text-[#498AD4]"
          >
            <AiOutlineEye />
          </Link>

          <button
            onClick={() => handleCheckout(id)}
            disabled={!!record.checkOut}
            className={`rounded-lg px-5 text-sm border-[1px]  ${
              record?.checkOut === null
                ? "border-[#498AD4] hover:bg-[#498AD4] hover:text-white"
                : "bg-[#498AD4] text-white "
            }`}
          >
            Checkout
          </button>
        </section>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 50 }}
      />
    </div>
  );
};
