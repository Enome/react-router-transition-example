/** @jsx React.DOM */

var React = require('react/addons');
var page = require('page');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var navigate = function (url) {
  return function () {
    page(url); 
  };
};

var Page1 = React.createClass({

  render: function () {
    return (
      <div className='page page1'>
        <h1>Page 1</h1>
        <a onClick={navigate('/page2')}>Page 2</a>
      </div> 
    );
  },

});

var Page2 = React.createClass({

  render: function () {
    return (
      <div className='page page2'>
        <h1>Page 2</h1>
        <a onClick={navigate('/')}>Page 1</a>
      </div> 
    );
  },

});

var transitions = [ 

  /* Do nothing */

  { from: '', to: '', transition: { name: '', enter: false, leave: false }},
  { from: '',  to: 'none', transition: { name: '', enter: false, leave: false } },
  { from: '',  to: 'overlay', transition: { name: '', enter: false, leave: false } },

  /* Transition */

  { from: 'none',  to: 'overlay', transition: { name: 'none-overlay', enter: true, leave: true } },
  { from: 'overlay',  to: 'none', transition: { name: 'overlay-none', enter: true, leave: true } },

];

var App = React.createClass({

  previous_transition: '',

  /* LOGIC */

  getTransition: function (from, to) {

    var transition = transitions.filter(function (transition) {
      return transition.from === from && transition.to === to;
    })[0].transition;

    return transition;

  },

  /* LIFECYCLE EVENTS */

  componentDidMount: function () {

    var self = this;

    page('/', function (ctx) {
      self.setState({ 
        component: <Page1 key={ctx.path}/>,
        transition: 'none',
      }); 
    });

    page('/page2', function (ctx) {
      self.setState({ 
        component: <Page2 key={ctx.path} />,
        transition: 'overlay',
      }); 
    });

    page.start();

  },

  getInitialState: function () {
    return {
      component: <div />,
      transition: '',
    };
  },


  /* RENDER */

  render: function () {

    var transition = this.getTransition(this.previous_transition, this.state.transition);
    this.previous_transition = this.state.transition;

    return (
      <div>
        <CSSTransitionGroup transitionName={transition.name} transitionEnter={transition.enter} transitionLeave={transition.leave}>
          {this.state.component}
        </CSSTransitionGroup>
      </div>
    );
  },

});


React.renderComponent(<App />, document.querySelector('body'));
