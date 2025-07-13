import { Provider } from 'react-redux'
import './App.css'
import FlowBuilder from './components/FlowBuilder'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <FlowBuilder/>
    </Provider>
  )
}

export default App
