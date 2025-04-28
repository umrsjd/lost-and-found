import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)` // Changed to motion.div
  padding-top: 80px;
  min-height: 100vh;
  background: #001F3F;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const SearchSection = styled.div`
  padding: 2rem;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoriesSection = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  flex: 2;
  padding: 1rem 2rem;
  border: none;
  font-size: 1.1rem;
  background: #1a1a1a;
  color: white;
  &:focus {
    outline: none;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #1a1a1a;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  color: white;
  &:hover {
    background: #2a2a2a;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const LocationInput = styled.input`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-left: 1px solid #eee;
  font-size: 1.1rem;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background: #E74C3C;
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #C0392B;
  }
`;




const CategoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #E74C3C;
`;

const CategoryName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: white;
`;

const CategoryCount = styled.span`
  color: #E74C3C;
  font-size: 0.9rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CategoryCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;



function FindItem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState('Location');
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Kolkata areas database
  const kolkataAreas = [
    'Salt Lake Sector 1',
    'Salt Lake Sector 2',
    'Salt Lake Sector 3',
    'Salt Lake Sector 4',
    'Salt Lake Sector 5',
    'New Town Action Area 1',
    'New Town Action Area 2',
    'New Town Action Area 3',
    'Park Street',
    'Ballygunge',
    'Bhowanipore',
    'Alipore',
    'Jadavpur',
    'Gariahat',
    'Behala',
    'Tollygunge',
    'Howrah',
    'Sealdah',
    'Esplanade',
    'Kalighat',
    'Lake Town',
    'Dum Dum',
    'Kasba',
    'Garia',
    'Rajarhat'
  ];

  const categories = [
    { icon: '📱', name: 'Phones & Tablets', count: 47 },
    { icon: '👜', name: 'Bags', count: 166 },
    { icon: '💎', name: 'Jewelry', count: 14 },
    { icon: '⌚', name: 'Watches', count: 2 },
    { icon: '👤', name: 'People', count: 245 },
    { icon: '📄', name: 'Documents', count: 219 },
    { icon: '🔑', name: 'Keys', count: 27 },
    { icon: '🧸', name: 'Toys', count: 4 },
    { icon: '💻', name: 'Laptop', count: 4 },
    { icon: '👓', name: 'Fashion Accessories', count: 1 },
    { icon: '👕', name: 'Clothes & Shoes', count: 1 },
    { icon: '🐕', name: 'Pets', count: 345 },
    { icon: '🏈', name: 'Sports Equipment', count: 1 },
    { icon: '📁', name: 'Other', count: 20 },
    { icon: '🚗', name: 'Automobile', count: 18 }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCategories([]);
      setShowDropdown(false);
      setSelectedCategory(null); // Reset selected category when search is cleared
    }
  };

  const handleCategorySelect = (category) => {
    setSearchTerm(category.name);
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleLocationSearch = (e) => {
    const searchValue = e.target.value;
    setLocationTerm(searchValue);
    
    if (searchValue.length > 0) {
      const filtered = kolkataAreas.filter(area =>
        area.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAreas(filtered);
      setShowDropdown(true);
    } else {
      setFilteredAreas([]);
      setShowDropdown(false);
    }
  };

  const handleLocationSelect = (area) => {
    setLocation(area);
    setLocationTerm(area);
    setShowDropdown(false);
  };

  const displayedCategories = selectedCategory 
    ? [selectedCategory] 
    : categories;

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SearchSection>
        <SearchBarContainer>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search for lost items..."
              value={searchTerm}
              onChange={handleSearch}
              onClick={() => setShowDropdown(true)}
            />
            <LocationInput
              type="text"
              placeholder="Location"
              value={locationTerm}
              onChange={handleLocationSearch}
            />
            <SearchButton>Search</SearchButton>
          </SearchBar>
          {showDropdown && searchTerm && (
            <DropdownContainer>
              {filteredCategories.map((category, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.icon} {category.name}
                </DropdownItem>
              ))}
            </DropdownContainer>
          )}
          {showDropdown && locationTerm && (
            <DropdownContainer>
              {filteredAreas.map((area, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleLocationSelect(area)}
                >
                  {area}
                </DropdownItem>
              ))}
            </DropdownContainer>
          )}
        </SearchBarContainer>
      </SearchSection>

      <CategoriesSection>
        <CategoryGrid>
          {displayedCategories.map((category, index) => (
            <CategoryCard
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
              <CategoryCount>{category.count} items</CategoryCount>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategoriesSection>
    </PageContainer>
  );
}

export default FindItem;