"use client"

import dynamic from "next/dynamic"

const DashboardClient = dynamic(
  () => import("@/features/dashboard/components/layout/dashboard-client"),
  { ssr: false }
);

const DashboardClientWrapper = () => {
  return (
		<div className="w-screen h-screen flex items-start justify-start">
			<DashboardClient />
		</div>
  )
};

export default DashboardClientWrapper