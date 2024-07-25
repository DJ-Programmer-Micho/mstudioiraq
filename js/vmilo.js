// $(document).ready(function() {
//     var key = "AIzaSyBnqxxNiohS1kTM5TVYem1USaLZtQB3WAs";
//     var playlistId = "PLbVEQFP71oAsOqlZLDFKbRp21fN0NVbAr";
//     var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
  
//     var options = {
//       part: "snippet",
//       key: key,
//       maxResults: 200,
//       playlistId: playlistId
//     };
  
//     loadVids();
//     loaddesc();
  
//     function loadVids() {
//       $.getJSON(URL, options, function(data) {
//         var id = data.items[0].snippet.resourceId.videoId;
//         mainVid(id);
//         // resultsLoop(data);
//       });
//     }

//     function loaddesc() {
//       $.getJSON(URL, options, function(data) {
//         var orginal_desc = data.items[0].snippet.description;
//         idescription = orginal_desc.split("\n").join("<br>")
//         idescription = orginal_desc.split("\n").join("<br>")
//         maindesc(idescription.slice(0,300) + "...");
//         resultsLoop(data);
//       });
//     }
  
//     function mainVid(id) {
//       $("#video").html(`
//                       <iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
//                   `);
//     }
//     function maindesc(idescription) {
//       $("#desc").html(`
//                       <p class="title text-white">${idescription}</p>
//                   `);
//     }
    
//         function resultsLoop(data) {
  
//           $.each(data.items, function (i, item) {
            
//             var thumb = item.snippet.thumbnails.high.url;
//             var title = item.snippet.title;
//             var desc1 = item.snippet.description;
//             var desc = desc1.slice(0,300) + "...";
//             var vid = item.snippet.resourceId.videoId;
//   //main Control
//               $('.list-inner').append(`
//               <article class="col col-12 col-sm-12 col-md-6 col-lg-4 mb-4" data-key="${vid}" dd="${desc}">
//                  <img src="${thumb}" class="card-img-top">
//                     <div class="details">
//                       <div class="title text-white">${title}</div>                      
//                  </div>
//               </article>
//               `);
//           });
//       }
      
    
//       $('.list-inner').on('click', 'article', function () {
//         var id = $(this).attr('data-key');
//         mainVid(id);
//       });
//       $('.list-inner').on('click', 'article', function () {
//         var orginal_desc = $(this).attr('dd');
//         idescription = orginal_desc.split("\n").join("<br>");
//         idescription2 = idescription.slice(0,300) + "...";
//         maindesc(idescription2);
        
//       });
//   });
