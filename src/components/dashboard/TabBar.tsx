"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TabBarProps {
  currentTab?: number;
  tabsOptions?: number[];
}

export const TabBar = ({
  tabsOptions = [1, 2, 3, 4],
  currentTab = 1,
}: TabBarProps) => {
  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();

  const handleSelectedTab = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };

  return (
    <div
      className="grid w-full space-x-2 rounded-xl bg-white p-2 mt-3"
      style={{
        gridTemplateColumns: `repeat(${tabsOptions.length}, minmax(0, 1fr))`,
      }}
    >
      {tabsOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            checked={selected === tab}
            onChange={() => {}}
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => handleSelectedTab(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
