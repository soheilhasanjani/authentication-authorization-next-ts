// app/dashboard/page.tsx
import React from "react";
import { withAuth } from "../../auth";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default withAuth(Dashboard, "admin");
