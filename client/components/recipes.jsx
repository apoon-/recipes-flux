/*jshint unused:false */
var React = require("react");
var Recipe = require("./recipe");
var Reflux = require("reflux");
var RecipeStore = require("../stores");

/** 
Router & Data
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

/**
Component
*/

var Recipes = React.createClass({
  displayName : "Recipes",
  mixins : [Reflux.connect(RecipeStore, "recipeStore")],
  getInitialState : function() {
    return {store: RecipeStore.getRecipes()};
  },
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  createRecipeNodes : function () {
    var nodes = this.state.store.map(function(recipe){
    return (/*jshint ignore:start */
        <Recipe recipe={recipe} key={recipe._id}>
        </Recipe>
      /*jshint ignore:end */);
    });
    return nodes;
  },  
  render : function() {
    var recipeNodes = this.createRecipeNodes();
    return (/*jshint ignore:start */
    <div className="Recipes">
      <p className="Recipes-title"> Recipe Bank: </p>
      {recipeNodes}
      <RouteHandler {...this.props}/>
    </div>
    /*jshint ignore:end */);
  }
});

module.exports = Recipes;