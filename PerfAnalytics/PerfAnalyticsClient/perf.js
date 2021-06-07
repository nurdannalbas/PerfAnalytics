let ttfbData = [];
let fcpData = [];
let domLoadData = [];
let windowLoadData = [];
var beforeLoadTime = new Date().getTime();
window.onload = Pageloadtime;

document.addEventListener("DOMContentLoaded", function () {
   
    if (JSON.parse(sessionStorage.getItem("ttfbData")) != null) {
        ttfbData = JSON.parse(sessionStorage.getItem("ttfbData"));
    }
    if (JSON.parse(sessionStorage.getItem("fcpData")) != null) {
        fcpData = JSON.parse(sessionStorage.getItem("fcpData"));
    }
    if (JSON.parse(sessionStorage.getItem("domLoadData")) != null) {
        domLoadData = JSON.parse(sessionStorage.getItem("domLoadData"));
    }
    if (JSON.parse(sessionStorage.getItem("windowLoadData")) != null) {
        windowLoadData = JSON.parse(sessionStorage.getItem("windowLoadData"));
    }
    AutoRefresh(60000);
    getWebVitalsFCP();
    loadXMLDoc();
});

function AutoRefresh( t ) {
    setTimeout(function(){location.reload(true);}, t);
}

function loadXMLDoc() {
    const url = "https://unpkg.com/web-vitals";
    axios.get(url)
        .then(data => {
            if (data) {
                var ttfb = window.performance.timing.responseStart - window.performance.timing.requestStart;
                ttfbData.push(ttfb);
                sessionStorage.setItem("ttfbData", JSON.stringify(ttfbData));
                document.getElementById("ttfb").innerHTML = "Ttfb time is <font color='purple'><b>" + ttfb + "</b></font> MiliSeconds";
                var domLoadTime = window.performance.timing.domInteractive - window.performance.timing.fetchStart;
                domLoadData.push(domLoadTime) ;
                sessionStorage.setItem("domLoadData", JSON.stringify(domLoadData));
                document.getElementById("domLoadTime").innerHTML = "Dom Load Time time is <font color='orange'><b>" + domLoadTime + "</b></font> MiliSeconds";
            }
        })
        .catch(err => console.log(err));
}
 function getWebVitalsFCP() {
    webVitals.getFCP(function (data) {
        const fcp = data.value;
        fcpData.push(fcp);
        sessionStorage.setItem("fcpData", JSON.stringify(fcpData));
        document.getElementById("fcp").innerHTML = "Fcp time is <font color='blue'><b>" + data.value + "</b></font> MiliSeconds";

    });
};

function Pageloadtime() {
    var afterLoadtime = new Date().getTime();

    windowLoadTime = (afterLoadtime - beforeLoadTime) / 1000
    windowLoadData.push(windowLoadTime) ;
    sessionStorage.setItem("windowLoadData", JSON.stringify(windowLoadData));
    document.getElementById("loadTime").innerHTML = "Window load time is <font color='red'><b>" + windowLoadTime + "</b></font> Seconds";
}

function postDetail() {
    const urlPost = "http://localhost:3004/send-timing-data";
    const timingData = {
        ttfb: ttfbData,
        domLoadTime: domLoadData,
        fcp: fcpData,
        windowLoadTime: windowLoadData

    };
    axios.post(urlPost, {
        timingData: timingData
    })
        .then(data => console.log('Sent data: ' + data))
        .catch(err => console.log(err));
}