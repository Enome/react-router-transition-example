# React with routes and page transitions

This example uses page.js for routing and `CSSTransitionGroup` for transitions. Each component has a transition state associated with it. Instead of using that transition state name for setting `transitionName` on `CSSTransitionGroup` it's uses the name to generate a new `transitionName` based on the previous transition.

I also have the following array which tells the router component which `transitionName` to generate.

```js
var transitions = [ 
  { from: 'none',  to: 'overlay', transition: { name: 'none-overlay', enter: true, leave: true } },
];
```

So if the current page component has the transition `'none'` and the new component has the transition `'overlay'` the `transitionName` will be `'none-over'`.
