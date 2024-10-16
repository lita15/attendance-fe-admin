import { NextPage } from "next";
import { ReactElement } from "react";
import { BaseLayout } from "../../components/layout/baseLayout";
import { CardDashboard } from "@/components/molecules/card";
import { AiFillSignal } from "react-icons/ai";
import { useDashboard } from "./api";

export const HomeModule: NextPage = (): ReactElement => {
  const { data } = useDashboard({});

  console.log("cek", data);
  return (
    <div className="">
      <BaseLayout>
        <section className=" md:flex  grid md:gap-10 gap-4 mt-10">
          <CardDashboard
            title="All Attendance"
            count={data?.allAttendance}
            icon={<AiFillSignal size={35} />}
          />
          <CardDashboard
            title="Active Count"
            count={data?.activeCount}
            icon={<AiFillSignal size={35} />}
          />
          <CardDashboard
            title="Non Active Count"
            count={data?.nonActiveCount}
            icon={<AiFillSignal size={35} />}
          />
        </section>
      </BaseLayout>
    </div>
  );
};
