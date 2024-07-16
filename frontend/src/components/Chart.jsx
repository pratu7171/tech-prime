import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetDashboardChart } from "../redux/project/project.action";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const BarChart = () => {
  const [data, setData] = useState({ total: [], closed: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDashboardChart())
      .then((res) =>
        setData({
          total: res.map((el) => el.registeredCount),
          closed: res.map((el) => el.closedCount),
        })
      )
      .catch((e) => console.log(e));
  }, [dispatch]);

  const per = data.total.map((totalCount, index) => {
    const closedCount = data.closed[index];
    return Math.round((closedCount / totalCount) * 100) + "%";
  });

  const labelData = ["STR", "FIN", "QLT", "MAN", "STO", "HR"];

  const chartData = {
    labels: per.map((value, index) => `${value}\n${labelData[index]}`),
    datasets: [
      {
        label: "Total",
        data: data.total,
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.5,
        categoryPercentage: 0.4,
      },
      {
        label: "Closed",
        data: data.closed,
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.5,
        categoryPercentage: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: "bold",
          },
          autoSkip: false,
          maxRotation: 0,
          padding: 5,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 5,
          min: 0,
          max: 50,
          callback: (value) => `${value}`,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "end",
        offset: -17,
        align: "start",
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 15,
      },
    },
    elements: {
      bar: {
        barThickness: 10,
        categorySpacing: 5,
      },
    },
  };

  return (
    <div className="md:ml-[-18px] ml-[-15px]">
      <h2 className="text-[20px] font-nunito leading-[27px] mb-[13px] text-[#010202] font-[500]">
        Department wise - Total Vs Closed
      </h2>
      <div className="w-full md:w-[635px] md:h-[387px] h-[524px] bg-white rounded-[10px] md:p-[22px] p-[20px] shadow-lg">
        <Bar
          width={"355px"}
          height={"360px"}
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default BarChart;
