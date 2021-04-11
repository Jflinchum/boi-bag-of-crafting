import { Component } from 'react';
import './App.css';
import { COMPONENTS_PAGE } from './constants';
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

const mapRecipes = (recipes) => {
  return (
    Object.keys(recipes).map((recipeId) => {
      return (
        <li key={`recipe-${recipeId}`}>
          <span className="recipeLabel">{itemList[recipeId]}</span>
          <hr/>
          <div className="craftingPageItems">{mapItems({ items: recipeList[recipeId][0] })}</div>
          <hr/>
          <div className="craftingPageItems">{mapItems({ items: recipeList[recipeId][1] })}</div>
          <hr/>
          <div className="craftingPageItems">{mapItems({ items: recipeList[recipeId][2] })}</div>
          <hr/>
          <div className="craftingPageItems">{mapItems({ items: recipeList[recipeId][3] })}</div>
          <hr/>
        </li>
      )
    })
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bagItems: []
    };
  }

  addItemToBag(item) {
    const currentItems = this.state.bagItems;
    if (currentItems.length >= 8) {
      currentItems.shift();
    }
    currentItems.push(item);
    this.setState({ bagItems: currentItems });
  }

  removeItemFromBag(index) {
    const currentItems = this.state.bagItems;
    currentItems.splice(index, 1);
    this.setState({ bagItems: currentItems });
  }

  render() {
    window.recipes = recipeList;
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
            <ul>
              {
                mapRecipes(recipeList)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
