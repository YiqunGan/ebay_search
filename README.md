# ebay-search-app
### users can search items by keywords and other conditions from eBay API.

Developed an eBay search website, used HTML5, CSS, Bootstrap for a responsive web design. The app can perfectly run on both mobile browser and desktop browser.

Supported searching by keywords and other conditions. Validated the input information with TypeScript and sent Ajax calls with Angular in the front-end. Angular material is used for pagination, tab and cards to display results.

Called eBay API and filtered the returned json data by Node.js to map the API response to user interface.

Deployed the application in Google Cloud Platform App Engine.

#### All the image assests, including pictures, logo, and icons,  belong to ebay, and all resources are only allowed to used by studying purpose

The app is available at:

https://ebaysearch-yiqun.wl.r.appspot.com/

### Front End (HTML5, CSS, Bootstrap, Angular, TypeScript)

a. Search items by keywords and other filters

<img src = 'https://ftp.bmp.ovh/imgs/2020/07/ec483910c380a6ba.png' width=500 />

b. Display the returned information

<img src = 'https://ftp.bmp.ovh/imgs/2020/07/4a69025979ac4593.png' width=500/>

<img src = 'https://ftp.bmp.ovh/imgs/2020/07/13194a4b80f9e597.png' width=500/>


c. A responsive web design for both desktop and mobile browser

<img src = 'https://ftp.bmp.ovh/imgs/2020/07/dda0b66384d0a8f1.png' width=300/>

<img src = 'https://ftp.bmp.ovh/imgs/2020/07/6e5ed07039682f74.png' width=300/> 

### Backend (Node.js, JavaScript) and GCP App Engine

All APIs calls are done through Node.js server. The response of Json data are filtered in the server side. The needed information are sent back to frontend and mapped to the user interface.

The application is deployed on Google Cloud Platform with Google App Engine, it can  automatically scale based on incoming traffic, which are highly customizable.
