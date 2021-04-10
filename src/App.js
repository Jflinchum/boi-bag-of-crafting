import './App.css';
import { COMPONENTS_PAGE1, COMPONENTS_PAGE2 } from './constants';
import { getComponentId, getComponentBackgroundPosition } from './util';

const ComponentsPage = (COMPONENTS_PAGE) => {
  return (
    COMPONENTS_PAGE.map((componentName) => {
    const componentId = getComponentId(componentName);
    const classNames = `component component-${componentId}`
    return (<button className={classNames} style={{ "background-position": `${getComponentBackgroundPosition(componentId)}` }}/>);
  }));
}

const App = () => {
  return (
    <div className="app">
      <div id="boi-crafting-ui" className="craftingContainer">
        <div id="boi-component-page1" className="componentPage">
          {ComponentsPage(COMPONENTS_PAGE1)}
        </div>
        <div id="boi-crafting-page" className="craftingPage">
        </div>
        <div id="boi-component-page2" className="componentPage">
          {ComponentsPage(COMPONENTS_PAGE2)}
        </div>
      </div>
    </div>
  );
}

export default App;
