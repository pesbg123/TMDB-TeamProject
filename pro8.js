const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjAwYjljMmY0NzA2MzIzMDdkNTk5Y2E2MDU1YWM4NSIsInN1YiI6IjY0NzM0ZDM0YmUyZDQ5MDBhN2Q2MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.904cgBblGnOetTZ00BRWJnlIigPpKGEFzmBXQRjeYHk',
  },
};

function showMovieList() {
  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let rows = data['results'];
      console.log(rows);
      const movieCardBox = document.getElementById('cards-box');
      movieCardBox.innerHTML = '';
      rows.forEach((item) => {
        let movieTitle = item['original_title'];
        let movieDesc = item['overview'];
        let movieRate = item['vote_average'];
        let movieImg = item['poster_path'];
        let movieId = item['id'];

        let temp_html = `<div class="col" style="color: white">
                           <div class="card h-100" style="background-color: rgb(58, 58, 57)">
                               <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                  class="card-img-top" />
                               <div class="card-body">
                                  <h5 class="card-title">${movieTitle}</h5>
                                  <p class="card-text">${movieDesc}</p>
                                  <p>⭐${movieRate}</p>
                              </div>
                          </div>
                      </div>`;
        movieCardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = movieCardBox.lastElementChild;
        clickCardBox.addEventListener('click', () => clickCard(movieId));
      });
    });
}

function clickCard(movieId) {
  alert(`id = ${movieId}`);
}

showMovieList();
