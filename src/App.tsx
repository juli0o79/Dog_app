import React from 'react'
import {Provider} from 'react-redux'
import store from './redux/store'
import Header from './header'
import DogContainer from './dog'
import Footer from './footer'

function App() {
  const color:any = 'white';
  return (
    <Provider store={store}>
    <div>
        <Header />
        <DogContainer />
        <Footer />
    </div>
    </Provider>
  );
}

export default App;
