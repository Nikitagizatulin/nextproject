export default ({ getState }) => next => action => {
  const prevState = getState()
  const returnValue = next(action)
  const nextState = getState()
  console.log(`%c prev state`, `color: #F39E30`, prevState)
  console.log(`%c action`, `color: #03A9F4`, action.type)
  console.log(`%c next state`, `color: #4CAF50`, nextState)
  return returnValue
};