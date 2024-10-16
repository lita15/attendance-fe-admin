import { HistoryManagementViewModule } from "@/modules/history-management.tsx/view-all";
import { NextPage } from "next";
import { ReactElement } from "react";

const HistoryManagementDetail: NextPage = (): ReactElement => {
  return <HistoryManagementViewModule />;
};

export default HistoryManagementDetail;
