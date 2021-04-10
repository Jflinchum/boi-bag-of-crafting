import { Component } from 'react';
import './App.css';
import { COMPONENTS_PAGE1, COMPONENTS_PAGE2 } from './constants';
import { getComponentId, getComponentBackgroundPosition } from './util';

const mapItems = (items, clickEvent) => {
  return (
    items.map((componentName, i) => {
    const componentId = getComponentId(componentName);
    const classNames = `component component-${componentId}`
    return (
      <button
        className={classNames}
        style={{ "backgroundPosition": `${getComponentBackgroundPosition(componentId)}` }}
        onClick={() => { clickEvent(componentName, i); }}
        key={`componentName-${i}`}
        />
    );
  }));
};

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

  render() {
    return (
      <div className="app">
        <div id="boi-crafting-ui" className="craftingContainer">
          <div id="boi-component-page1" className="componentPage">
            {mapItems(COMPONENTS_PAGE1, (item) => {
              this.addItemToBag(item);
            })}
          </div>
          <div id="boi-crafting-page" className="craftingPage">
            {mapItems(this.state.bagItems, () => {})}
          </div>
          <div id="boi-component-page2" className="componentPage">
            {mapItems(COMPONENTS_PAGE2, (item) => {
              this.addItemToBag(item);
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
