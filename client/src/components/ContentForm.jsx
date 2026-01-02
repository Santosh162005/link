import { useState, useEffect } from 'react'

export default function ContentForm({ onSave, content, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'text',
    title: '',
    description: '',
    content: '',
    linkUrl: '',
    image: null
  })

  useEffect(() => {
    if (content) {
      setFormData({
        type: content.type,
        title: content.title,
        description: content.description || '',
        content: content.content || '',
        linkUrl: content.linkUrl || '',
        image: null
      })
    }
  }, [content])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }))
  }

  const handleTypeChange = (e) => {
    setFormData(prev => ({ 
      ...prev, 
      type: e.target.value,
      content: '',
      linkUrl: '',
      image: null
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }

    if (formData.type === 'text' && !formData.content.trim()) {
      alert('Content is required for text')
      return
    }

    if (formData.type === 'link' && !formData.linkUrl.trim()) {
      alert('URL is required for links')
      return
    }

    onSave(formData)
  }

  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px' }}>{content ? 'Edit Content' : 'Add New Content'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Content Type *</label>
          <select name="type" value={formData.type} onChange={handleTypeChange}>
            <option value="text">Text</option>
            <option value="link">Link</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div className="form-group">
          <label>Title *</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a description..."
          />
        </div>

        {formData.type === 'text' && (
          <div className="form-group">
            <label>Content *</label>
            <textarea 
              name="content" 
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter your text content"
            />
          </div>
        )}

        {formData.type === 'link' && (
          <div className="form-group">
            <label>URL *</label>
            <input 
              type="url" 
              name="linkUrl" 
              value={formData.linkUrl}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        )}

        {formData.type === 'image' && (
          <div className="form-group">
            <label>Image File *</label>
            <input 
              type="file" 
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {content?.imageUrl && <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>Current image: {content.imageUrl}</p>}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {content ? 'Update' : 'Create'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
