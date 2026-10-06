import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  if (showProducts) return <ProductList onHomeClick={() => setShowProducts(false)} />;

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1>Welcome To Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => setShowProducts(true)}>
            Get Started
          </button>
        </div>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
