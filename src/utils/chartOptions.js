export const pieChartOptions = {
  chart: {
    type: "donut",
    height: 350,
    fontFamily: "Inter, sans-serif",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151",
          },
          value: {
            show: true,
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            formatter: function (val) {
              return "$" + parseFloat(val).toLocaleString();
            },
          },
          total: {
            show: true,
            fontSize: "16px",
            fontWeight: 600,
            color: "#6B7280",
            label: "Total Spent",
            formatter: function (w) {
              return "$" + w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString();
            },
          },
        },
      },
    },
  },
  legend: {
    position: "bottom",
    fontSize: "14px",
    fontWeight: 500,
    markers: {
      width: 12,
      height: 12,
      radius: 6,
    },
  },
  colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316"],
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 280,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const barChartOptions = {
  chart: {
    type: "bar",
    height: 350,
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    labels: {
      style: {
        colors: "#6B7280",
        fontSize: "14px",
      },
    },
  },
  yaxis: {
    title: {
      text: "Amount ($)",
      style: {
        color: "#6B7280",
        fontSize: "14px",
        fontWeight: 500,
      },
    },
    labels: {
      formatter: function (val) {
        return "$" + val.toLocaleString();
      },
      style: {
        colors: "#6B7280",
        fontSize: "14px",
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$" + val.toLocaleString();
      },
    },
  },
  colors: ["#10B981", "#3B82F6"],
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 4,
  },
};