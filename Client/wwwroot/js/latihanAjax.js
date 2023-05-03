// console.log('latihanAjax.js');

// const API_KEY = '0d83d121e0afb1f0043673f8c49b7dcb';

// $.ajax({
//     url: "https://pokeapi.co/api/v2/pokemon/",
// }).done(function (result) {
//     console.log(result.results);
//     $.each(result.results, function (key, value) {

//         $('#pokemon-list').append(
//             `<li>${value.name}</li>`
//         );
//     });
// }).fail(function (error) {
//     console.log(error);
// });

// $.ajax({
//     url: "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1",
//     method: "GET",
//     dataType: "json"
// }).done(function (result) {
//     let no = 1;
//     let movies = '';
//     $.each(result.results, function (key, value) {
//         movies += `<tr>
//                 <td>${no++}</td>
//                 <td>${value.title}</td>
//                 <td>${value.popularity}</td>
//                 <td>${value.vote_average}</td>
//                 <td></td>
//             </tr>`;

//         $('#movies-list').html(movies);
//     });
// }).fail(function (error) {
//     console.log(error);
// });

// $.ajax({
//     url: "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1",
//     method: "GET",
//     dataType: "json",
//     success: function (result) {
//         let no = 1;
//         let movies = '';
//         $.each(result.results, function (key, value) {
//             movies += `<tr>
//                     <td>${no++}</td>
//                     <td>${value.title}</td>
//                     <td>${value.popularity}</td>
//                     <td>${value.vote_average}</td>
//                     <td></td>
//                 </tr>`;

//             $('#movies-list').html(movies);
//         });
//     },
//     error: function (error) {
//         console.log(error);
//     }
// });
