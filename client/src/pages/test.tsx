import { MainLayout } from "../layouts/MainLayout";
import { useEffect } from "react";

export const Test = () => {
  const fetchMon = async () => {
    let response = await fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE1OTk4MDkzMywidWlkIjozMDM4OTYyNCwiaWFkIjoiMjAyMi0wNS0xMVQxMTowNDo0NC40NzBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIxMTk5NzEsInJnbiI6InVzZTEifQ._FYi5NDdwR2HRAcStwGhEw0LnjjwFWIp4Xye4L9ItsE",
      },
      body: JSON.stringify({
        query: "{ me { is_guest enabled created_at name email id} }",
      }),
    });

    let data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchMon();
  }, []);

  return (
    <MainLayout>
      <div>Тестовая страница</div>
    </MainLayout>
  );
};
