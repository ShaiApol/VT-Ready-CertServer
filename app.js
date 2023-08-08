const express = require("express");
const nodeHtmlToImage = require("node-html-to-image");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.type("html").send(html));

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;

app.get("/generateCertificate", async (req, res) => {
  // Extract parameters from the query string
  const { name, day, month, year, training_name } = req.query;

  function getMonth(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Subtract 1 from the month number since JavaScript Date months are zero-indexed
    const adjustedMonthNumber = monthNumber - 1;

    if (adjustedMonthNumber >= 0 && adjustedMonthNumber < 12) {
      return months[adjustedMonthNumber];
    } else {
      return "Invalid month number";
    }
  }

  // Generate the HTML content for the certificate
  const html = `
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");
    </style>
  </head>
  <body
    class="p-16 flex flex-col"
    style="
      width: 1040px;
      height: 800px;
      background-image: url('https://vt-ready-certificate-server.onrender.com/public/template.png');
      background-repeat: no-repeat;
    "
  >
    <div class="flex flex-row items-center">
      <img src="https://vt-ready-certificate-server.onrender.com/public/logo.svg" class="h-48 w-48" />
      <div class="grow"></div>
      <h1 class="text-right text-6xl">Certificate of<br /><b>Completion</b></h1>
    </div>
    <div class="grow"></div>
    <div class="flex flex-row">
      <div class="grow"></div>
      <p
        style="font-family: 'Kaushan Script', cursive"
        class="w-2/3 text-6xl text-right"
      >
        ${name}
      </p>
    </div>
    <div class="flex flex-row">
      <div class="grow"></div>
      <div class="text-right w-2/3 text-xl">
        This is to certify that the VT Ready volunteer, whose name appears
        above, has successfully completed the training program
        <div class="my-4">
          <b class="text-4xl w-2/3">${training_name}</b>
        </div>
        on this <b>${day}</b> day of <b>${getMonth(month)}</b>, <b>${year}</b>.
      </div>
    </div>
    <div class="h-32"></div>
    <p class="text-right">VT Ready</p>
  </body>
</html>

  `;

  const image = await nodeHtmlToImage({
    html: html,
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
  // Set the response content type to HTML
});

app.get("/generateHeatmap", async (req, res) => {
  const { userLocations } = req.query;
  console.log(userLocations);
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
      <link rel="stylesheet" type="text/css" href="public/styles.css" />
      <title>Document</title>
    </head>
    <body style="height: 100%; width: 100%">
      <div id="map"></div>
      <script>
        ((g) => {
          var h,
            a,
            k,
            p = "The Google Maps JavaScript API",
            c = "google",
            l = "importLibrary",
            q = "__ib__",
            m = document,
            b = window;
          b = b[c] || (b[c] = {});
          var d = b.maps || (b.maps = {}),
            r = new Set(),
            e = new URLSearchParams(),
            u = () =>
              h ||
              (h = new Promise(async (f, n) => {
                await (a = m.createElement("script"));
                e.set("libraries", [...r] + "");
                for (k in g)
                  e.set(
                    k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                    g[k]
                  );
                e.set("callback", c + ".maps." + q);
                a.src = \`https://maps.\${c}apis.com/maps/api/js?\` + e;
                d[q] = f;
                a.onerror = () => (h = n(Error(p + " could not load.")));
                a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                m.head.append(a);
              }));
          d[l]
            ? console.warn(p + " only loads once. Ignoring:", g)
            : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
        })({
          key: "AIzaSyAP-IkIEmtq7bvYGusX6kaICdpcytjFgOU",
          v: "weekly",
          // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
          // Add other bootstrap parameters as needed, using camel case.
        });
  
        let map;
  
        async function initMap() {
          const { Map } = await google.maps.importLibrary("maps");
          const { HeatmapLayer } = await google.maps.importLibrary(
            "visualization"
          );
  
          map = new Map(document.getElementById("map"), {
            center: { lat: 12.8797, lng: 121.774 },
            zoom: 6,
            mapId: "VT_READY",
          });
          
          
          var heatmapData = [
            ${userLocations.map((locationRaw) => {
              location = locationRaw.split(",");
              return `new google.maps.LatLng(${location[0]}, ${location[1]})\n`;
            })}
          ];
  
          var heatmap = new HeatmapLayer({
            data: heatmapData,
          });
          heatmap.setMap(map);
          heatmap.set("radius", heatmap.get("radius") ? null : 50);
        }
  
        initMap();
      </script>
    </body>
  </html>
  
`;

  res.send(html);
});
