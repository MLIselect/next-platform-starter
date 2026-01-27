// ==========================================
// CHEEKY BOT v2.1 (The "Envy Protocol" Update)
// ==========================================

function updateCheekyTicker() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); 
  // IMPORTANT: Make sure your tab name at the bottom of the screen matches "Sheet1"
  
  var messages = [];

  // 1. DEFINE TARGET CITIES (North + Florida Expansion)
  var targets = [
    // --- THE FROZEN NORTH ---
    { name: "TORONTO 🇨🇦", lat: 43.65, lon: -79.38 },
    { name: "YORK REGION 🇨🇦", lat: 44.00, lon: -79.46 },
    { name: "MONTREAL 🇨🇦", lat: 45.50, lon: -73.56 },
    { name: "DETROIT 🇺🇸", lat: 42.33, lon: -83.04 },
    { name: "BUFFALO 🇺🇸", lat: 42.88, lon: -78.87 }, 
    { name: "SYRACUSE 🇺🇸", lat: 43.04, lon: -76.14 }, 
    { name: "CLEVELAND 🇺🇸", lat: 41.49, lon: -81.69 }, 
    { name: "LONDON (ON) 🇨🇦", lat: 42.98, lon: -81.24 }, 
    { name: "BARRIE 🇨🇦", lat: 44.38, lon: -79.69 }, 
    { name: "BOSTON 🇺🇸", lat: 42.36, lon: -71.05 },
    { name: "HALIFAX 🇨🇦", lat: 44.64, lon: -63.57 }, 
    { name: "OTTAWA 🇨🇦", lat: 45.42, lon: -75.69 }, 
    { name: "MINNEAPOLIS 🇺🇸", lat: 44.97, lon: -93.26 }, 
    { name: "CHICAGO 🇺🇸", lat: 41.87, lon: -87.62 },

    // --- THE ANTAGONISTS (Places we are jealous of) ---
    { name: "MIAMI 🌴", lat: 25.76, lon: -80.19 },
    { name: "ORLANDO 🐭", lat: 28.53, lon: -81.37 }
  ];

  // 2. SCAN CITIES (Using Free Open-Meteo API)
  for (var i = 0; i < targets.length; i++) {
    var city = targets[i];
    try {
      // Fetch forecast for today (Index 0)
      var url = "https://api.open-meteo.com/v1/forecast?latitude=" + city.lat + "&longitude=" + city.lon + "&daily=snowfall_sum,temperature_2m_min,windspeed_10m_max&timezone=auto";
      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());
      
      var snow = data.daily.snowfall_sum[0]; // Snow in cm
      var temp = data.daily.temperature_2m_min[0]; // Low Temp in C
      var wind = data.daily.windspeed_10m_max[0]; // Wind in km/h

      // --- THE CHEEKY TRANSLATOR LOGIC ---

      // SCENARIO A: The "Buffalo Special" (Heavy Snow > 10cm)
      if (snow > 10) {
        messages.push("🚨 " + city.name + " ALERT: " + snow + "CM CONFIRMED. TOTAL WHITE OUT. HIDE THE SHOVELS.");
      }
      // SCENARIO B: Moderate Snow (2-10cm) - "The Nuisance"
      else if (snow > 2) {
        messages.push("❄️ " + city.name + ": SLUSHY MESS (" + snow + "CM). ROADS ARE GREASY. DRIVE SLOW.");
      }
      // SCENARIO C: Extreme Cold (< -20C)
      else if (temp < -20) {
        messages.push("🥶 " + city.name + " DEEP FREEZE: " + temp + "°C. YOUR FACE WILL HURT. BUSES MIGHT GEL UP.");
      }
      // SCENARIO D: The Florida Envy Protocol (> 20C)
      else if (temp > 20) {
        messages.push("🤬 " + city.name + " REPORT: IT IS " + temp + "°C AND SUNNY. THEY ARE AT THE BEACH. DISGUSTING.");
      }
      // SCENARIO E: High Wind (> 60km/h)
      else if (wind > 60) {
        messages.push("💨 " + city.name + " WIND WARNING: " + wind + " KM/H GUSTS. HOLD ONTO YOUR TOUPEE.");
      }

    } catch (e) {
      // If a city fails, just skip it quietly
    }
  }

  // 3. ADD UNIVERSAL FILLER (To keep the ticker flowing if weather is boring)
  var fillers = [
    "🧂 ONTARIO SALT TRUCKS ON STANDBY. RESPECT THE PLOW.",
    "🛒 US STRATEGY: WALMART SLED AISLE IS A WARZONE.",
    "🛌 PRO TIP: SLEEP WITH YOUR PAJAMAS INSIDE OUT (IT WORKS).",
    "🚌 BUS STATUS: CHECK LOCAL BOARDS. IF IT'S ICY, THEY WON'T ROLL.",
    "☕ TIM HORTONS LINEUP STATUS: CRITICAL.",
    "📉 SCHOOL PREDICTION: CALCULATOR ACCURACY AT 94%."
  ];
  
  // Add 3 random fillers to the mix
  messages.push(fillers[Math.floor(Math.random()*fillers.length)]);
  messages.push(fillers[Math.floor(Math.random()*fillers.length)]);
  messages.push(fillers[Math.floor(Math.random()*fillers.length)]);

  // 4. PUBLISH TO SHEET
  sheet.clear(); // Wipe the old news
  var output = messages.map(function(m) { return [m]; });
  sheet.getRange(1, 1, output.length, 1).setValues(output);
}
