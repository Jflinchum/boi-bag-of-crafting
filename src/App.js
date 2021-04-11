import { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import { COMPONENTS_PAGE, RECIPE_PER_PAGE } from './constants';
import { itemList, recipeList } from './itemRecipes';
import { getComponentId, getComponentBackgroundPosition } from './util';

const mapItems = ({ items, clickEvent = () => {} }) => {
  return (
    items.map((componentName, i) => {
    const componentId = getComponentId(componentName);
    const classNames = `componentButton component-${componentId}`
    return (
      <div className="component" key={`componentName-${i}`}>
        <button
          className={classNames}
          style={{ "backgroundPosition": `${getComponentBackgroundPosition(componentId)}` }}
          onClick={() => { clickEvent(componentName, i); }}
          key={`componentName-${i}`}
          />
      </div>
    );
  }));
};

const mapRecipes = (recipes, recipeIds) => {
  return (
    recipeIds.map((recipeId) => {
      return (
        <li className="recipe" key={`recipe-${recipeId}`}>
          <span className="recipeLabel">{itemList[recipeId]}</span>
          <div className="recipeList">
            {
              recipes[recipeId].map((recipe) => {
                return (
                  <div className="recipeItem craftingPageItems">
                    {mapItems({ items: recipe })}
                  </div>
                )
              })
            }
          </div>
        </li>
      )
    })
  )
}

/**
 * recipeList: { '1': [['RED_HEART', 'SOUL_HEART', ...], [...], [...]], '2': [...] }
 * componentFilter: ['RED_HEART', 'SOUL_HEART', ...]
 */
const filterRecipeList = (recipeList, componentFilter) => {
  let returnObject = {};
  Object.keys(recipeList).forEach((recipeId) => {
    const recipes = recipeList[recipeId];
    recipes.forEach((recipe) => {
      // If a single recipe in the recipe list has a subset of the componentFilter, add it to the return object
      if (
        componentFilter.every(
          component => recipe.includes(component)
          && componentFilter.filter(el => el === component).length
          <= recipe.filter(el => el === component).length
        )) {
          returnObject[recipeId] = [...(returnObject[recipeId] || []), recipe];
        }
    });
  });
  return returnObject;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bagItems: [],
      currentPage: 0
    };
  }

  addItemToBag = (item) => {
    const currentItems = this.state.bagItems;
    if (currentItems.length >= 8) {
      currentItems.shift();
    }
    currentItems.push(item);
    this.setState({ bagItems: currentItems, currentPage: 0 });
  }

  removeItemFromBag = (index) => {
    const currentItems = this.state.bagItems;
    currentItems.splice(index, 1);
    this.setState({ bagItems: currentItems, currentPage: 0 });
  }

  handlePageClick = ({ selected }) => {
    this.setState({ currentPage: selected });
  }

  render() {
    const filteredRecipes = filterRecipeList(recipeList, this.state.bagItems);
    return (
      <div className="app">
        <div id="boi-crafting-ui" className="craftingContainer">
          <div id="boi-component-page" className="componentPage">
            {
              mapItems({ items: COMPONENTS_PAGE, clickEvent: (item) => {
              this.addItemToBag(item);
            }})
            }
          </div>
          <div id="boi-crafting-page" className="craftingPage">
            <div id="boi-crafting-page-item-list" className="craftingPageItems">
              {
                mapItems({ items: this.state.bagItems, clickEvent: (itemName, index) => {
                this.removeItemFromBag(index);
              }})
              }
            </div>
          </div>
        </div>
        <div id="boi-item-recipe" className="recipePage">
          <div id="boi-item-recipe-list">
            {
              mapRecipes(
                filteredRecipes,
                Object
                  .keys(filteredRecipes)
                  .slice(this.state.currentPage * RECIPE_PER_PAGE, this.state.currentPage * RECIPE_PER_PAGE + RECIPE_PER_PAGE)
                )
            }
            <ReactPaginate
              pageCount={Math.floor(Object.keys(filteredRecipes).length / RECIPE_PER_PAGE)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              forcePage={this.state.currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
