const receipeListElement = document.querySelector("#receipe-list");
const loaderElement = document.querySelector("#loader-text");

const switchPage = () => {
    document.querySelector("main.container").style.display = "none" ;
    document.querySelector(".details").style.display = "block";
};

const onButtonSearchClicked = (value) => {
    searchRecipe(value);
};

const searchRecipe = async (keyword) => {
    loaderElement.style.display = 'block';

    try {
        const result = await DataSource.searchRecipe(keyword);
        renderResult(result);
    } catch (message) {
        fallbackResult(message)
    }
}

const informationRecipe = async (id) => {
    loaderElement.style.display = 'block';

    try {
        const result = await DataSource.informationRecipe(id);
        renderResultDetail(result);
    } catch (message) {
        fallbackResult(message)
    }
}

const listCategories = async () => {
    try {
        const result = await DataSource.categories();
        renderCategories(result);
    } catch (message) {
        fallbackResult(message)
    }
}

const renderResult = results => {
    loaderElement.style.display = 'none';
    let cards = '';
    results.forEach(result => {
        cards += `<div class="col mb-4">
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-anchor=".jumbotron">
                        <div class="card card-receipe" data-id="${result.id}">
                            <img src="https://spoonacular.com/recipeImages/${result.image}" class="card-img card-img-top" alt="${result.title}" />
                            <div class="card-body">
                                <h5 class="card-title text-truncate">${result.title}</h5>
                                <p class="card-text">
                                    <span class="float-left"><img src="assets/images/utensils.svg" class="icon-svg"> SERVES ${result.servings}</span>
                                    <span class="float-right"><i class="fa fa-clock-o"></i> ${result.readyInMinutes} MINS</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });
    receipeListElement.innerHTML = cards;

    // Detail Recipe
    const cardsElement = document.querySelectorAll(".card-receipe");
    cardsElement.forEach(card => {
        card.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            informationRecipe(id);
        });
    });
};

const renderResultDetail = results => {
    loaderElement.style.display = 'none';

    switchPage();

    // Breadcrumb
    document.querySelector("#current-page").innerHTML = results.title;

    // Image
    document.querySelector("#detailImage").src = results.image;

    // Detail Header
    document.querySelector("#detail-title").innerHTML = (results.title ? results.title : 'NaN');
    document.querySelector("#detail-sourcename").innerHTML = (results.sourceName ? results.sourceName : '-');
    document.querySelector("#detail-preparationminutes").innerHTML = (results.preparationMinutes ? `COOK : ${results.preparationMinutes} MINS` : 0);
    document.querySelector("#detail-servings").innerHTML = (results.servings ? `SERVES  ${results.servings}` : 0);
    document.querySelector("#detail-summary").innerHTML = (results.summary ? results.summary : '-');

    // Ingredients
    results.extendedIngredients.map((ingredient, index) => {
        document.querySelector(".ingredients").innerHTML += `<li>${ingredient.original}</li>`;
    });

    // Instructions
    results.analyzedInstructions[0].steps.map((instruction, index) => {
        document.querySelector(".methods").innerHTML += `<li>${instruction.step}</li>`;
    });

    $(window).scrollTop(0);
};

const renderCategories = results => {
    let htmlContent = '';

    results.map((category, index1) => {
        htmlContent += `
          <div class="d-flow-root mt-4">
            <h6 class="float-left">${category.name}</h6>
          </div>`;

          htmlContent += '<ul class="navbar-nav me-auto">';

          category.items.map((item, index2) => {
            htmlContent += `
                <li class="nav-item">
                  ${item}
                  <div class="form-check float-end">
                    <input class="form-check-input" type="checkbox" data-item="${item}" id="checkbox-${index1}-${index2}">
                    <label class="form-check-label" for="checkbox-${index1}-${index2}"></label>
                  </div>
                </li>`;
          });

          htmlContent += '</ul>';
    });

    document.querySelector('#receipe-category').innerHTML = htmlContent;
};

const fallbackResult = message => {
    loaderElement.style.display = 'none';
    receipeListElement.innerHTML = `
        <div class="col">
            <h4 class="text-center">${message}</h4>
        </div>
    `;
};

const events = () => {
    // Search Receipe
    const searchElement = document.querySelector("#searchButtonElement");
    searchElement.addEventListener("click", function () {
        const inputKeyword = document.querySelector("#searchElement").value;
        onButtonSearchClicked(inputKeyword);
    });

    // Clear Filter Categories
    const clearFilterElement = document.querySelector("#clearFilter");
    clearFilterElement.addEventListener("click", function () {
        const checkbox = document.querySelectorAll("input[type=checkbox]");
        checkbox.forEach(item => {
            item.checked = false;
        });
    });

    // Back to Home
    const backToLanding = document.querySelector("#backToLanding");
    backToLanding.addEventListener("click", function () {
        document.querySelector("main.container").style.display = "block" ;
        document.querySelector(".details").style.display = "none";
    });
};

const main = () => {
    events();

    window.addEventListener("load", function () {
        // Default List Receipe
        searchRecipe('desserts');

        // Default List Categories
        listCategories();
    });

    setTimeout(() => {
        // Filter Categories
        const checkbox = document.querySelectorAll("input[type=checkbox]");
        checkbox.forEach(item => {
            item.addEventListener("click", function () {
                const category = this.getAttribute("data-item");
                searchRecipe(category);
            });
        });
    }, 2000);
};

document.addEventListener('DOMContentLoaded', main);
