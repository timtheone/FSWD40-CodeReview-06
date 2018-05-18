
// Animation on scroll for navbar
$(window).scroll(function() {
    if($(document).scrollTop() > 30) {
        $('#mainNav').removeClass("navbar-dark").addClass("navbar-light white-nav")
    }
    else {
    $('#mainNav').removeClass("white-nav navbar-light").addClass("navbar-dark")
    }
});

// Parsing JSON data of media objects to library array
let library = JSON.parse(libData)


function showItems() {
    for (let i = 0; i < library.length; i++) {
        // Dynamicly creating DOM structure with content from Library array
        $("#row1").append(
            `
            <div class="card col-lg-4 col-md-6" data-toggle="modal" data-target="#Modal${i}">
                <div class="row" style="margin: 3px;">
                    <div class="image-card col-lg-5">
                        <img src="${library[i].Image}" alt="">
                    </div>
                    <div class="meta-info-card col-lg-7">
                        <p>Category: ${library[i].Type}</p>                  
                        <p>Title: ${library[i].Title}</p>                  
                        <p>Author: ${library[i].Author}</p>
                        <p>Genre: ${library[i].Genre}</p>
                        <p>Publisher: ${library[i].Publisher}</p>
                        <p>Rating:</p>
                    </div>
                </div>
            </div>
            `
        )
        for (let j = 0; j < library[i].Rating; j++) {
            let star = "<i class=\"fas fa-star\"></i>"
            $(".meta-info-card p:last").append(star)
        }
        // Creating modal forms for media Objects
        $('body').append(` <div class="modal fade" id="Modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${library[i].Title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="cardModal">
                <div class="row" style="margin: 3px;">
                    <div class="image-card col-lg-5">
                        <img src="${library[i].Image}" alt="">
                    </div>
                    <div class="meta-info-cardModal col-lg-7">
                        <p>Category: ${library[i].Type}</p>                  
                        <p>Title: ${library[i].Title}</p>                  
                        <p>Author: ${library[i].Author}</p>
                        <p>Genre: ${library[i].Genre}</p>
                        <p>Publisher: ${library[i].Publisher}</p>
                        <p>Rating:</p>
                    </div>
                </div>
                <div class="row">
                    <p>Description: ${library[i].ShortDescription}</p>
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`)
      for (let k = 0; k < library[i].Rating; k++) {
        let star = "<i class=\"fas fa-star\"></i>"
        $(".meta-info-cardModal p:last").append(star)
    }

    }
}
showItems();
// Adding new items function
function newItem () {
    let title = $("input#title").val();
    let type = $("select#type").val();
    let rating = $("select#rating").val();
    let author = $("input#author").val();
    let genre = $("input#genre").val();
    let image = $("input#image").val();
    let publisher = $("input#publisher").val();
    let description = $("textarea#description").val();
    // Logic for rejecting item if it meets certain requiments
    if ((author == "Danielle Steel" && type=="Book") || (author=="Roland Emmerich" && type=="Movie")){
        $(".alert:eq(1)").fadeTo(2000, 500).slideUp(300)
        // Logic for rejecting item if one of the input fields is empty
    } else if ((title && author && genre && image && publisher && description) !== "") {
        // Pushing new item to library Array
        library.push({
            "Title":title,
            "Type":type,
            "Author":author,
            "Genre": genre,
            "Publisher":publisher,
            "Image": image,
            "ShortDescription": description,
            "Rating": rating
        })
        // Replacing every element in #row1 with ""
        $("#row1").html("")
        // Constructing the dom structure from Library array again so we can see the newly added item.
        showItems();
        $(".alert:eq(2)").fadeTo(2000, 500).slideUp(300)
     } else {
        $(".alert:eq(0)").fadeTo(2000, 500).slideUp(300)
     }
}

$("#buttonVal").on("click",newItem)

// I dont really understand how it works. I copied this from bootstrap examples
// Basicly, it only adds class with red border around input fields when they are empy
window.addEventListener('load', function() {
    
    var forms = document.getElementsByClassName('needs-validation');
    
    
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener("submit", function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
    });
}, false);