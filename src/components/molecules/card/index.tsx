import { FC, ReactElement } from "react";

interface Card {
  title?: string;
  count?: string;
  icon?: React.ReactNode;
}

export const CardDashboard: FC<Card> = (props): ReactElement => {
  return (
    <div>
      <div className=" w-72  border-[#498AD4] border-[1px] text-black p-4 rounded-lg">
        <div className=" flex flex-row gap-4 items-center">
          {props?.icon}
          <div className=" container mx-auto">
            <h1 className=" font-nunito text-[16px] font-semibold ">
              {props?.title}
            </h1>
            <p className=" font-nunito text-[20px]  font-bold text-[#A41E22]">
              {props?.count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
