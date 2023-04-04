const chartContainer = document.querySelector(".chart-container");

async function DataFromAPI() {
  // Get the modal
  const modal = document.getElementById("infoModal");

  // Get the close button
  const closeButton = document.getElementsByClassName("close")[0];

  // When the user clicks on the close button, close the modal
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Function to display random data in the modal
  function showRandomData() {
    const randomData = Math.random().toString(36).substring(7);
    document.getElementById("modalText").innerHTML = randomData;
    modal.style.display = "block";
  }

  const apiUrl =
    "https://ndy7m4kqv6.execute-api.eu-west-2.amazonaws.com/test/tickets";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Fetched data:", data);

    // Transform raw data to a desired format
    const concertsArray = data.Items.map((item) => {
      return {
        name: item.name.S,
        // Extract date value as string
        date: item.date.S,
        // Extract checking date values as an array of strings
        checkingDate: item.checkingDate.L.map((d) => d.S),
        // Extract file creation date as string
        fileCreationDate: item.fileCreationDate.S,
        // Extract min price values as an array of numbers
        minPrice: item.minPrice.L.map((p) => Number(p.N)),
        // Extract URL value as string
        url: item.url.S,
        // Extract available ticket values as an array of numbers
        availableTickets: item.availableTickets.L.map((t) => Number(t.N)),
        // Extract GA1, GA2, and GA3 values
        ga1: {
          amount: item.ga1.M.amount.L.map((a) => Number(a.N)),
          price: item.ga1.M.price.S,
        },
        ga2: {
          amount: item.ga2.M.amount.L.map((a) => Number(a.N)),
          price: item.ga2.M.price.S,
        },
        ga3: {
          amount: item.ga3.M.amount.L.map((a) => Number(a.N)),
          price: item.ga3.M.price.S,
        },
      };
    });

    concertsArray.sort((a, b) => {
      const soldPercentageA =
        (a.availableTickets[a.availableTickets.length - 1] * 100) /
        a.availableTickets[0];

      const soldPercentageB =
        (b.availableTickets[b.availableTickets.length - 1] * 100) /
        b.availableTickets[0];
      return soldPercentageA - soldPercentageB;
    });

    concertsArray.forEach((el) => {
      console.log(
        el.name,
        (el.availableTickets[el.availableTickets.length - 1] * 100) /
          el.availableTickets[0]
      );
    });

    concertsArray.forEach((arrayData, index) => {
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // WORKING ON A SINGLE CHART
      // console.log(arrayData);

      const canvasID = `myChart${index + 1}`;

      // Add Material Icons information icon to the chart container
      const infoButtonHTML =
        '<div class="info-button material-icons">info</div>';

      // Add the chart and information button to the chart container
      const chartContent = `
      <div class="chart" style="position:relative">
      ${infoButtonHTML}
      <canvas id="${canvasID}"></canvas>
      </div>`;
      chartContainer.insertAdjacentHTML("beforeend", chartContent);

      const canvas = document.getElementById(canvasID);
      const ctx = canvas.getContext("2d");

      const chartElement = document
        .querySelector(`#${canvasID}`)
        .closest(".chart");
      const infoButton = chartElement.querySelector(".info-button");

      infoButton.addEventListener("click", showRandomData);

      let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(58,123,213,1");
      gradient.addColorStop(1, "rgba(0,210,255, 0.3)");

      const labels = arrayData.checkingDate;

      const data = {
        labels,
        datasets: [
          {
            // Points on the array (X Line)
            data: arrayData.availableTickets,
            // History with name
            label: arrayData.name,
            fill: true,
            backgroundColor: gradient,
            borderColor: "#fff",
          },
          {
            // Points on the array (X Line)
            data: arrayData.ga1.amount,
            // History with name
            label: "GA1",
            // fill: true,
            // backgroundColor: gradient,
            borderColor: "#FF0808",
          },
          {
            // Points on the array (X Line)
            data: arrayData.ga2.amount,
            // History with name
            label: "GA2",
            // fill: true,
            // backgroundColor: gradient,
            borderColor: "#FFBF08",
          },
          {
            // Points on the array (X Line)
            data: arrayData.ga3.amount,
            // History with name
            label: "GA3",
            // fill: true,
            // backgroundColor: gradient,
            borderColor: "#31FF08",
          },
        ],
      };

      // Configuration of the chart (line, circle, etc.)
      const config = {
        type: "line",
        // Passing data object
        data: data,
        options: {
          radius: 5,
          hitRadius: 100,
          responsive: true,

          plugins: {
            tooltip: {
              enabled: true,
              mode: "nearest",
              intersect: false,
              callbacks: {
                label: function (context) {
                  const datasetIndex = context.datasetIndex;
                  const dataIndex = context.dataIndex;
                  const label = context.chart.data.labels[dataIndex];
                  const tickets =
                    context.chart.data.datasets[datasetIndex].data[dataIndex];
                  let ticketPrice;

                  switch (datasetIndex) {
                    case 1:
                      ticketPrice = arrayData.ga1.price;
                      break;
                    case 2:
                      ticketPrice = arrayData.ga2.price;
                      break;
                    case 3:
                      ticketPrice = arrayData.ga3.price;
                      break;
                    default:
                      ticketPrice = "N/A";
                  }

                  return `${tickets}: ${ticketPrice}`;
                },
              },
            },
          },

          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return value + " tickets";
                },
              },
              beginAtZero: true,
            },
          },
        },
      };

      // Object that gets 2 params (ctx, config object)
      const chart = new Chart(ctx, config);
      // canvas.chart = chart
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

DataFromAPI();
