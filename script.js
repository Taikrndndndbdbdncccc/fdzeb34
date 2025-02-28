document.addEventListener("DOMContentLoaded", function() {
    // Tampilkan jam Malaysia dan hari secara otomatis
    function updateTime() {
        let now = new Date();
        let options = { timeZone: "Asia/Kuala_Lumpur", hour: "2-digit", minute: "2-digit", second: "2-digit" };
        let time = new Intl.DateTimeFormat("id-ID", options).format(now);
        document.getElementById("current-time").textContent = "Jam: " + time;

        let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let dayName = days[now.getDay()];
        document.getElementById("current-day").textContent = "Hari: " + dayName;
    }
    setInterval(updateTime, 1000);
    updateTime(); 

    // Fetch jadwal shalat otomatis (Malaysia)
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Kuala Lumpur&country=Malaysia&method=2")
        .then(response => response.json())
        .then(data => {
            let timings = data.data.timings;
            document.getElementById("subuh").textContent = timings.Fajr;
            document.getElementById("zuhur").textContent = timings.Dhuhr;
            document.getElementById("asar").textContent = timings.Asr;
            document.getElementById("magrib").textContent = timings.Maghrib;
            document.getElementById("isya").textContent = timings.Isha;
        })
        .catch(error => console.error("Gagal mengambil jadwal shalat", error));
});
