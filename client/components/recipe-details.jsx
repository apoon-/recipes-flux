/*jshint unused:false */

/**
React
*/
var React = require("react");
var Reflux = require("reflux");
var RecipeStore = require("../stores");
var RecipeActions = require("../actions");

/** 
Router & Data
*/

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var _ = require("lodash");

/**
Child Components
*/

var Ingredient = require("./ingredient");

/**
Component 
*/

var RecipeDetails = React.createClass({  
  displayName : "RecipeDetails",
  propTypes: {},
  mixins : [Reflux.connect(RecipeStore, "recipeStore")],
  getInitialState : function() { 
    return RecipeStore.getRecipe(this.props.params._id);
  }, 
  componentWillMount : function() {
    this.parseInstructions();
  },
  componentWillUnmount : function() {},
  parseInstructions : function () {
    /**
    Process instructions to split string on newline
    */
    var str = this.state.instructions;
    var html = "<p>" + str.replace(/\n([ \t]*\n)+/g, "</p><p>")
                          .replace(/\n/g, "</p><p>") + "</p>";
    this.state.parsedInstructions = html;
    /**
    Make servings a controlled input and 
    http://facebook.github.io/react/docs/forms.html#controlled-components
    */ 
  },
  render : function() {
    console.log(this.state);
    function createNodes (ingredient) {
      return ( /*jshint ignore:start*/
        <Ingredient ingredient={ingredient}/>
      /*jshint ignore:end */);
    }

    var ingredientNodes = this.state.ingredients.map(createNodes)
    /*jshint ignore:start */
    return(
    <div className="Recipe">
      <p className="Recipe-title">{this.state.title}</p>
      <p> Serves: {this.state.portions} (change)</p>      
      <div className="row">
        <div className="col-lg-4"> 
          {ingredientNodes}
        </div>
        <div 
          className="Recipe-instructions col-lg-4" 
          dangerouslySetInnerHTML={{__html: this.state.parsedInstructions}}
        /> 
      </div>
      <RouteHandler {...this.props}/>
    </div>
  /*jshint ignore:end */);
  }
});

module.exports = RecipeDetails;


/**
Ingredient 

  render : function() {

    return (
    <div className="Recipes">
      <p> Recipe Bank: </p>
      {recipeNodes}
      <RouteHandler {...this.props}/>
    </div>
  )}
*/