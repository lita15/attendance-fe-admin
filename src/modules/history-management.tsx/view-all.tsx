import { NextPage } from "next";
import { ReactElement } from "react";
import { BaseLayout } from "@/components/layout/baseLayout";
import { useGetByIdHistoryTable } from "./api";
import { useRouter } from "next/router";
import moment from "moment";

export const HistoryManagementViewModule: NextPage = (): ReactElement => {
  const { query } = useRouter();
  const { data } = useGetByIdHistoryTable(query?._id);
  console.log("cek", data);

  const formattedTimeCheckIn = moment(data?.checkIn)
    .utcOffset("+10:00")
    .format("dddd, DD MMMM YYYY, HH:mm");

  const formattedTimeChecekOut = moment(data?.checkOut)
    .utcOffset("+10:00")
    .format("dddd, DD MMMM YYYY, HH:mm");

  return (
    <div className="">
      <BaseLayout>
        <section className=" gap-4 mt-10">
          <h1 className=" text-[20px] font-bold">Detail Information </h1>
          <section className=" grid grid-cols-2 mt-5">
            <div className="">
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Full Name</h3>
                <p>{data?.fullName}</p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Check In</h3>
                <p>{formattedTimeCheckIn}</p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Number Card</h3>
                <p>{data?.numberCard}</p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Purpose</h3>
                <p>{data?.purpose}</p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Identity</h3>
                <p>{data?.identity}</p>
              </section>
            </div>
            <div className="">
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Address</h3>
                <p>{data?.address}</p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Check Out</h3>
                <p>
                  {data?.checkOut !== null
                    ? formattedTimeChecekOut
                    : "Not Checkout Yet"}
                </p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Gender</h3>
                <p>{data?.gender}</p>
              </section>
              <section className=" mb-4">
                <h3 className=" text-[16px] font-semibold">Meet With</h3>
                <p>{data?.meetWith}</p>
              </section>

              <section className="mb-4">
                <h3 className="text-[16px] font-semibold">Signature</h3>
                {data?.signature ? (
                  <img
                    src={data.signature}
                    alt="Signature"
                    className="border border-gray-300"
                  />
                ) : (
                  <p>No Signature Available</p>
                )}
              </section>
            </div>
          </section>
        </section>

        <button
          onClick={() => window.history.back()}
          type="submit"
          className="bg-[#6ca4d5] py-2 px-4 rounded-lg flex text-white font-bold transition-all ease-in-out mb-10 mt-5"
        >
          Back
        </button>
      </BaseLayout>
    </div>
  );
};
