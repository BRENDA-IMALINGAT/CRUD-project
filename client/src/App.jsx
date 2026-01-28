import { useState, useEffect } from 'react';
import { Plus, Database, Sun, Moon } from 'lucide-react';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import { getItems, createItem, updateItem, deleteItem } from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  const filteredItems = items.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const title = item.title?.toLowerCase() ?? '';
    const description = item.description?.toLowerCase() ?? '';
    return title.includes(q) || description.includes(q);
  });

  const hasItems = items.length > 0;

  const handleCreate = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (currentItem) {
        await updateItem(currentItem.id, data);
      } else {
        await createItem(data);
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Error saving item", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '10px', borderRadius: '16px', display: 'flex' }}>
              <Database color="white" size={24} />
            </div>
            <div>
              <h1 style={{ marginBottom: '0.25rem', textAlign: 'left' }}>CRUD</h1>
              <p style={{ margin: 0, color: 'var(--text-scnd)', fontSize: '0.9rem' }}>
                Create, read, update, and delete items with our CRUD App.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn-icon"
              onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle color mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <input
              className="input-field search-input"
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleCreate} className="btn btn-primary">
              <Plus size={20} />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : !hasItems ? (
          <div className="empty-state">
            <h3>No items found</h3>
            <p>Create your first item to get started</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <h3>No items match your search</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid-list">
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ItemForm
          item={currentItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
