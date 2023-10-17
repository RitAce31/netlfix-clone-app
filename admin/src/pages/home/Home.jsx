import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo } from "react";
import { getUserStats } from "../../services/Services";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    try {
      getUserStats().then((res) => {
        const sortedUserStats = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        sortedUserStats.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ]);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
