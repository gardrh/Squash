// Function to fetch data from the Google Apps Script URL
function fetchData() {
    return fetch('https://script.google.com/macros/s/AKfycbxG_hpM5smQ9v7_UZuMQaH8LmN67y8J-Mol4tNxSytUkg3IeVUM3jJ98pmEiaMh-Nocbg/exec')
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}

// Function to create and render the Matchvinner chart
function renderMatchvinnerChart(data) {
    const matchvinnerData = Object.values(data.Matchvinner);

    const matchvinnerChartCanvas = document.getElementById('matchvinnerChart').getContext('2d');
    new Chart(matchvinnerChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Gard', 'Tobias', 'Uavgjort'],
            datasets: [{
                label: 'Matchvinner',
                data: matchvinnerData,
                backgroundColor: ['#ff5733', '#33ff57', '#337aff'],
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                },
            },
        },
    });
}

// Function to create and render the Set chart
function renderSetChart(data) {
    const setData = data.Set;

    const setChartCanvas = document.getElementById('setChart').getContext('2d');
    new Chart(setChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Gard', 'Tobias'],
            datasets: [{
                label: 'Set',
                data: [setData.Gard, setData.Tobias],
                backgroundColor: ['#ff5733', '#33ff57'],
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                },
            },
        },
    });
}

// Function to create and render the Fünf-meister chart
function renderFünfMeisterChart(data) {
    const fünfMeisterData = data['Fünf-meister'];

    const fünfMeisterChartCanvas = document.getElementById('fünfMeisterChart').getContext('2d');
    new Chart(fünfMeisterChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Gard', 'Tobias'],
            datasets: [{
                label: 'Fünf-meister',
                data: [fünfMeisterData.Gard, fünfMeisterData.Tobias],
                backgroundColor: ['#ff5733', '#33ff57'],
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                },
            },
        },
    });
}

// Fetch the data and generate the charts when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    
    if (data) {
        renderMatchvinnerChart(data);
        renderSetChart(data);
        renderFünfMeisterChart(data);
    }
});
