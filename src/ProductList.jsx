import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

// Self-contained SVG thumbnail so images never break.
const thumb = (emoji, bg) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="135" font-size="110" text-anchor="middle">${emoji}</text></svg>`,
  )}`;

const categories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', description: 'Produces oxygen at night and removes toxins.', cost: 15, image: thumb('🪴', '#d8f3dc') },
      { name: 'Spider Plant', description: 'Filters formaldehyde and xylene from the air.', cost: 12, image: thumb('🌿', '#d8f3dc') },
      { name: 'Peace Lily', description: 'Elegant white blooms that clean indoor air.', cost: 18, image: thumb('🌼', '#d8f3dc') },
      { name: 'Boston Fern', description: 'Natural humidifier that removes pollutants.', cost: 20, image: thumb('🌱', '#d8f3dc') },
      { name: 'Rubber Plant', description: 'Glossy leaves that absorb airborne chemicals.', cost: 17, image: thumb('🍃', '#d8f3dc') },
      { name: 'Aloe Vera', description: 'Soothing gel and a gentle air cleaner.', cost: 14, image: thumb('🌵', '#d8f3dc') },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', description: 'Calming fragrance that promotes relaxation.', cost: 20, image: thumb('💜', '#e9d8fd') },
      { name: 'Jasmine', description: 'Sweet floral scent that uplifts the mood.', cost: 18, image: thumb('🌸', '#e9d8fd') },
      { name: 'Rosemary', description: 'Fragrant herb for cooking and memory boost.', cost: 15, image: thumb('🌿', '#e9d8fd') },
      { name: 'Mint', description: 'Refreshing leaves, perfect for teas.', cost: 12, image: thumb('🍃', '#e9d8fd') },
      { name: 'Lemon Balm', description: 'Lemony aroma that eases stress.', cost: 14, image: thumb('🍋', '#e9d8fd') },
      { name: 'Basil', description: 'Aromatic kitchen herb that repels insects.', cost: 10, image: thumb('🌱', '#e9d8fd') },
    ],
  },
  {
    category: 'Succulents & Cacti',
    plants: [
      { name: 'Jade Plant', description: 'Symbol of good luck, very low maintenance.', cost: 16, image: thumb('🪴', '#fff3bf') },
      { name: 'Echeveria', description: 'Rosette-shaped succulent in soft pastel tones.', cost: 11, image: thumb('🌹', '#fff3bf') },
      { name: 'Barrel Cactus', description: 'Round, sun-loving cactus with golden spines.', cost: 22, image: thumb('🌵', '#fff3bf') },
      { name: 'Zebra Haworthia', description: 'Striped, compact succulent for small spaces.', cost: 13, image: thumb('🦓', '#fff3bf') },
      { name: "Burro's Tail", description: 'Trailing stems, ideal for hanging pots.', cost: 19, image: thumb('🌿', '#fff3bf') },
      { name: 'Christmas Cactus', description: 'Blooms bright flowers in the winter.', cost: 21, image: thumb('🎄', '#fff3bf') },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const inCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span className="brand-icon">🌿</span>
          <div>
            <h3>Paradise Nursery</h3>
            <small>Where Green Meets Serenity</small>
          </div>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a
            href="#cart"
            className="cart-link"
            aria-label={`Cart, ${totalItems} items`}
            onClick={(e) => { e.preventDefault(); setShowCart(true); }}
          >
            <svg viewBox="0 0 256 256" width="42" height="42">
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="14"
              ></path>
            </svg>
            <span className="cart-count">{totalItems}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {categories.map(({ category, plants }) => (
            <section key={category}>
              <h2 className="category-title">{category}</h2>
              <div className="product-list">
                {plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={inCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {inCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
