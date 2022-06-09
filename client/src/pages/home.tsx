import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

export const Home = () => {
  const [val, setVal] = useState(0);

  console.log(useState(12345)[0]);

  return (
    <MainLayout>
      <input
        type="range"
        value={val}
        onChange={(e: any) => setVal(e.target.value)}
      />
    </MainLayout>
  );
};
