import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import { render } from 'react-dom';
import axios from "axios";
import './style.css';

class PerfAnalytics extends Component {
  constructor() {
    super();
    const chartData = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: 'ms',
          data: [],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    this.state = {
      chart: {
        options: options,
        data: chartData,
      }
    };
  }
  componentDidMount() {
    this.fillChartData();
  }

  async fillChartData() {
    const url = "http://localhost:3004/get-timing-data";
    let doml = [];
    let data = await axios
      .get(url)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    const chartData = {
      ttfb: {
        labels: ['0','10', '20', '30'],
        datasets: [
          {
            label: 'ms',
            data: data.data.ttfb,
            fill: false,
            backgroundColor: 'rgb(175, 129, 201)',
            borderColor: 'rgba(175, 129, 201, 0.2)',
          },
        ],
      },
      domLoadTime: {
        labels: ['0','10', '20', '30'],
        datasets: [
          {
            label: 'ms',
            data: data.data.domLoadTime,
            fill: false,
            backgroundColor: 'rgb( 242, 202, 133)',
            borderColor: 'rgba( 242, 202, 133,0.2)',
          },
        ],
      },
      fcp: {
        labels: ['0','10', '20', '30'],
        datasets: [
          {
            label: 'ms',
            data: data.data.fcp,
            fill: false,
            backgroundColor: 'rgb(84, 209, 241)',
            borderColor: 'rgba(84, 209, 241,0.2)',
          },
        ],
      },
      windowLoadTime: {
        labels: ['0','10', '20', '30'],
        datasets: [
          {
            label: 'ms',
            data: data.data.windowLoadTime,
            fill: false,
            backgroundColor: 'rgb(175, 129, 201)',
            borderColor: 'rgba(175, 129, 201,0.2)',
          },
        ],
      }
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    this.setState({
      chart: {
        options: options,
        data: chartData,
      }
    });
  }

  render() {
    const { chart } = this.state;
    return (
      <div>
        <div className='header'>
          <h1 className='title'>PerfAnalytics Dashboard</h1>
        </div>
        <div class="float-container" >

          <div class="float-child">
            <h2>TTFB</h2>
            <Line data={chart.data.ttfb} options={chart.options} />
          </div>
          <div class="float-child">
            <h2>Dom Load</h2>
            <Line data={chart.data.domLoadTime} options={chart.options} />
          </div>
          <div class="float-child">
            <h2>FCP</h2>
            <Line data={chart.data.fcp} options={chart.options} />
          </div>
          <div class="float-child">
            <h2>Window Load</h2>
            <Line data={chart.data.windowLoadTime} options={chart.options} />
          </div>
        </div>
      </div>
    );
  }
}

export default PerfAnalytics;