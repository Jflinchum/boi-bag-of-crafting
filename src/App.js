import { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Fuse from 'fuse.js';
import './App.css';
import { COMPONENTS_PAGE, RECIPE_PER_PAGE } from './constants';
import { itemRecipeObjects } from './itemRecipes';
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

const mapRecipes = (recipes) => {
  return (
    recipes.map((recipe) => {
      return (
        <li className="recipe" key={`recipe-${recipe.id}`}>
          <a
            className="recipeLabel"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://bindingofisaacrebirth.fandom.com/wiki/${encodeURIComponent(recipe.name.replace(/ /g, '_')).replace(/[!'()*]/g, escape)}`}
          >
              {recipe.name}
          </a>
          <div className="recipeList">
            {
              recipe.recipeList.map((recipe) => {
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
 * recipeList: { '1': { name: 'The Sad Onion', recipeList: [['RED_HEART', 'SOUL_HEART', ...], [...], [...]] }, '2': {...} }
 * componentFilter: ['RED_HEART', 'SOUL_HEART', ...]
 */
const filterRecipeList = (itemRecipeMapping, componentFilter, textFilter) => {
  let returnObject = {};
  const searchArray = Object.keys(itemRecipeMapping).map((recipeId) => ({ id: recipeId, name: itemRecipeMapping[recipeId].name, recipeList: itemRecipeMapping[recipeId].recipeList }));
  let textFilteredMapping = searchArray;
  if (textFilter) {
    const fuse = new Fuse(searchArray, { includeScore: true, keys: ['name'] });
    textFilteredMapping = fuse.search(textFilter).map((fuseObject) => (fuseObject.item));
  }
  textFilteredMapping.forEach((recipeMapping) => {
    const recipes = recipeMapping.recipeList || [];
    recipes.forEach((recipe) => {
      // If a single recipe in the recipe list has a subset of the componentFilter, add it to the return object
      if (
        componentFilter.every(
          component => recipe.includes(component)
          && componentFilter.filter(el => el === component).length
          <= recipe.filter(el => el === component).length
        )) {
          returnObject[recipeMapping.id] = {
            name: itemRecipeMapping[recipeMapping.id].name,
            recipeList: [...(returnObject[recipeMapping.id] ? returnObject[recipeMapping.id].recipeList : []), recipe]
          };
        }
    });
  });
  return textFilteredMapping.filter(({ id }) => returnObject[id]);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bagItems: [],
      currentPage: 0,
      search: ''
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
    const filteredRecipes = filterRecipeList(itemRecipeObjects, this.state.bagItems, this.state.search);
    return (
      <div className="app">
        <div id="boi-crafting-ui" className="craftingContainer">
          <div id="boi-component-page" className="componentPage">
            <div className="craftingHeader">
              <h3>Components</h3>
              <span className="subtext">Click on an item here to add it to the bag</span>
            </div>
            {
              mapItems({ items: COMPONENTS_PAGE, clickEvent: (item) => {
              this.addItemToBag(item);
            }})
            }
          </div>
          <div id="boi-crafting-page" className="craftingPage">
            <div id="boi-crafting-page-item-list" className="craftingPageItems">
              <div className="craftingHeader">
                <h3>Bag of Crafting</h3>
                <span className="subtext">Click on items here to remove them from the bag</span>
              </div>
              {
                mapItems({ items: this.state.bagItems, clickEvent: (itemName, index) => {
                this.removeItemFromBag(index);
              }})
              }
            </div>
          </div>
        </div>
        <div id="boi-item-recipe" className="recipePage">
          <div className="recipeListHeader">
            <h3 className="craftingHeader">Search for Items</h3>
            <div className="recipeActionContainer">
              <input
                placeholder="e.g. The Sad Onion"
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
                />
            </div>
          </div>
          <div id="boi-item-recipe-list">
            <div className="recipeItems">
              {
                mapRecipes(
                  filteredRecipes
                    .slice(this.state.currentPage * RECIPE_PER_PAGE, this.state.currentPage * RECIPE_PER_PAGE + RECIPE_PER_PAGE)
                  )
              }
            </div>
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
