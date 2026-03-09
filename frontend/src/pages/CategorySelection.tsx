import { useNavigate } from 'react-router-dom';
import './CategorySelection.css';

const CategorySelection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'hackathons',
      title: 'Hackathons',
      description: 'Find coding competitions and innovation challenges',
      icon: '💻',
      color: '#4CAF50'
    },
    {
      id: 'scholarships',
      title: 'Scholarships',
      description: 'Discover educational funding opportunities',
      icon: '🎓',
      color: '#2196F3'
    },
    {
      id: 'government_schemes',
      title: 'Government Schemes',
      description: 'Explore government welfare programs and benefits',
      icon: '🏛️',
      color: '#FF9800'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/opportunities/${categoryId}`);
  };

  return (
    <div className="category-selection">
      <div className="container">
        <header className="header">
          <h1>Opportunity Navigator</h1>
          <p>Find opportunities that match your profile</p>
        </header>

        <div className="categories-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => handleCategorySelect(category.id)}
              style={{ borderColor: category.color }}
              aria-label={`Select ${category.title} category`}
            >
              <div className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
