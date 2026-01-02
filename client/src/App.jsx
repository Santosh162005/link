import { useState, useEffect } from 'react'
import { contentAPI } from './api'
import ContentForm from './components/ContentForm'
import ContentCard from './components/ContentCard'

export default function App() {
  const [contents, setContents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    setLoading(true)
    try {
      const res = await contentAPI.getAll()
      setContents(res.data)
    } catch (error) {
      console.error('Error fetching contents:', error)
    }
    setLoading(false)
  }

  const handleSave = async (data) => {
    try {
      const formData = new FormData()
      formData.append('type', data.type)
      formData.append('title', data.title)
      formData.append('description', data.description)

      if (data.type === 'text') {
        formData.append('content', data.content)
      } else if (data.type === 'link') {
        formData.append('linkUrl', data.linkUrl)
      } else if (data.type === 'image' && data.image) {
        formData.append('image', data.image)
      }

      if (editingId) {
        await contentAPI.update(editingId, formData)
      } else {
        await contentAPI.create(formData)
      }

      await fetchContents()
      setShowForm(false)
      setEditingId(null)
    } catch (error) {
      alert('Error saving content: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this content?')) {
      try {
        await contentAPI.delete(id)
        await fetchContents()
      } catch (error) {
        alert('Error deleting: ' + error.message)
      }
    }
  }

  const handleEdit = (content) => {
    setEditingId(content._id)
    setShowForm(true)
  }

  const handleAddReview = async (id, reviewText) => {
    try {
      await contentAPI.addReview(id, reviewText)
      await fetchContents()
    } catch (error) {
      alert('Error adding review: ' + error.message)
    }
  }

  const handleDeleteReview = async (contentId, reviewId) => {
    try {
      await contentAPI.deleteReview(contentId, reviewId)
      await fetchContents()
    } catch (error) {
      alert('Error deleting review: ' + error.message)
    }
  }

  const filteredContents = filter === 'all' 
    ? contents 
    : contents.filter(c => c.type === filter)

  const contentToEdit = editingId ? contents.find(c => c._id === editingId) : null

  return (
    <div className="container">
      <header>
        <div className="container">
          <h1>📦 Content Hub</h1>
          <p>Store and manage your content with reviews</p>
        </div>
      </header>

      <div className="tabs">
        <button 
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({contents.length})
        </button>
        <button 
          className={`tab-btn ${filter === 'text' ? 'active' : ''}`}
          onClick={() => setFilter('text')}
        >
          Text
        </button>
        <button 
          className={`tab-btn ${filter === 'link' ? 'active' : ''}`}
          onClick={() => setFilter('link')}
        >
          Links
        </button>
        <button 
          className={`tab-btn ${filter === 'image' ? 'active' : ''}`}
          onClick={() => setFilter('image')}
        >
          Images
        </button>
        <button 
          className="btn btn-primary"
          style={{ marginLeft: 'auto', flex: 'none', width: 'auto' }}
          onClick={() => {
            setEditingId(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? 'Cancel' : '+ Add Content'}
        </button>
      </div>

      {showForm && (
        <ContentForm 
          onSave={handleSave} 
          content={contentToEdit}
          onCancel={() => {
            setShowForm(false)
            setEditingId(null)
          }}
        />
      )}

      {loading ? (
        <div className="empty-state">
          <p>Loading...</p>
        </div>
      ) : filteredContents.length === 0 ? (
        <div className="empty-state">
          <p>No content found. Create your first item!</p>
        </div>
      ) : (
        <div className="content-grid">
          {filteredContents.map(content => (
            <ContentCard 
              key={content._id}
              content={content}
              onEdit={() => handleEdit(content)}
              onDelete={() => handleDelete(content._id)}
              onAddReview={(text) => handleAddReview(content._id, text)}
              onDeleteReview={(reviewId) => handleDeleteReview(content._id, reviewId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
