               
<br/>
<div align="center">

<h3 align="center">Newsea</h3>
<p align="center">
News website for Artiselite's Technical Challenge (Frontend)


  


</p>
</div>

 ### Built With

- [Vue](https://vuejs.org)
- [TailwindCSS](https://tailwindcss.com/)
- [NewsAPI](https://newsapi.org/)
 ### Installation

_npm is required to install the application._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/eizw/newsea.git
   ```
3. Go into the `frontend` directory
   ```sh
   cd frontend
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Create a a `.env` file inside the `frontend` (current) directory and enter your api key
   ```sh
   echo 'VITE_NEWSAPI_KEY="YOUR_API_KEY"' > .env
   ```
6. Run the development server
   ```sh
   npm run dev
   ```
7. To build, use the package build command and serve on a `localhost`
   ```sh
   npm run build
   serve
   ```
 ## Usage

Homepage: All top-headlines by category

Search page: to browse all types of news with available filters on the `/v2/everything` endpoint
