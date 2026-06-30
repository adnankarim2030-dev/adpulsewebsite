'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaSignOutAlt, FaInbox, FaCogs, FaFolderOpen, FaVideo, 
  FaPlus, FaEdit, FaTrash, FaEye, FaSpinner, FaCloudUploadAlt,
  FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import './admin.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads'); // leads | services | projects | settings
  
  // Data States
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({ active_popup_video: '/AdPulse 5 Years Celebration.mp4' });

  // UI States
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: success | error

  // Modals & Active Edit Entities
  const [activeLead, setActiveLead] = useState(null);
  const [serviceModal, setServiceModal] = useState({ isOpen: false, mode: 'create', data: null });
  const [projectModal, setProjectModal] = useState({ isOpen: false, mode: 'create', data: null });
  
  // File Upload State
  const [uploadProgress, setUploadProgress] = useState({ uploading: false, targetField: '' });

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, servicesRes, projectsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/services'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/settings')
      ]);

      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (servicesRes.ok) {
        const rawServices = await servicesRes.json();
        // Parse JSON stringified features/whyChoose/images
        const parsedServices = rawServices.map(s => ({
          ...s,
          images: s.images ? JSON.parse(s.images) : [],
          features: s.features ? JSON.parse(s.features) : [],
          whyChoose: s.whyChoose ? JSON.parse(s.whyChoose) : []
        }));
        setServices(parsedServices);
      }
      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (settingsRes.ok) setSettings(await settingsRes.json());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      showNotification('Failed to load data from server. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Logout handler
  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      try {
        const res = await fetch('/api/admin/logout', { method: 'POST' });
        if (res.ok) {
          router.push('/admin/login');
          router.refresh();
        }
      } catch (err) {
        console.error('Logout failed:', err);
      }
    }
  };

  // Delete handlers
  const handleDeleteLead = async (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setActionLoading(true);
      try {
        const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setLeads(leads.filter(l => l.id !== id));
          showNotification('Lead deleted successfully');
          if (activeLead && activeLead.id === id) setActiveLead(null);
        } else {
          showNotification('Failed to delete lead', 'error');
        }
      } catch (e) {
        showNotification('Failed to delete lead', 'error');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleDeleteService = async (id) => {
    if (confirm('Are you sure you want to delete this service? All details will be permanently removed.')) {
      setActionLoading(true);
      try {
        const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setServices(services.filter(s => s.id !== id));
          showNotification('Service deleted successfully');
        } else {
          const err = await res.json();
          showNotification(err.error || 'Failed to delete service', 'error');
        }
      } catch (e) {
        showNotification('Failed to delete service', 'error');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setActionLoading(true);
      try {
        const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setProjects(projects.filter(p => p.id !== id));
          showNotification('Project deleted successfully');
        } else {
          showNotification('Failed to delete project', 'error');
        }
      } catch (e) {
        showNotification('Failed to delete project', 'error');
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Upload file handler
  const handleFileUpload = async (e, targetField, modalType) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadProgress({ uploading: true, targetField });
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showNotification(`${file.name} uploaded successfully!`);
        
        if (modalType === 'service') {
          setServiceModal(prev => ({
            ...prev,
            data: { ...prev.data, [targetField]: data.url }
          }));
        } else if (modalType === 'project') {
          setProjectModal(prev => ({
            ...prev,
            data: { ...prev.data, [targetField]: data.url }
          }));
        } else if (modalType === 'settings') {
          // Instantly update active popup video setting
          await handleSaveSetting('active_popup_video', data.url);
        }
      } else {
        showNotification(data.error || 'File upload failed', 'error');
      }
    } catch (err) {
      console.error('File upload error:', err);
      showNotification('File upload failed due to network error', 'error');
    } finally {
      setUploadProgress({ uploading: false, targetField: '' });
    }
  };

  // Save Settings handler
  const handleSaveSetting = async (key, value) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      });

      if (res.ok) {
        setSettings(prev => ({ ...prev, [key]: value }));
        showNotification('Popup video setting updated successfully');
      } else {
        showNotification('Failed to save settings', 'error');
      }
    } catch (e) {
      showNotification('Failed to save settings', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Save CRUD handlers
  const handleSaveService = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const form = e.target;
    
    // Process list inputs
    const features = form.features.value.split('\n').map(x => x.trim()).filter(Boolean);
    const whyChoose = form.whyChoose.value.split('\n').map(x => x.trim()).filter(Boolean);
    
    const payload = {
      ...serviceModal.data,
      title: form.title.value,
      slug: form.slug.value,
      number: form.number.value,
      shortTitle: form.shortTitle.value,
      tagline: form.tagline.value,
      description: form.description.value,
      price: form.price.value || null,
      icon: form.icon.value || null,
      features,
      whyChoose
    };

    try {
      const method = serviceModal.mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const savedData = await res.json();

      if (res.ok) {
        // Parse list objects
        const parsedSavedData = {
          ...savedData,
          images: savedData.images ? JSON.parse(savedData.images) : [],
          features: savedData.features ? JSON.parse(savedData.features) : [],
          whyChoose: savedData.whyChoose ? JSON.parse(savedData.whyChoose) : []
        };

        if (serviceModal.mode === 'create') {
          setServices([...services, parsedSavedData]);
          showNotification('Service created successfully');
        } else {
          setServices(services.map(s => s.id === parsedSavedData.id ? parsedSavedData : s));
          showNotification('Service updated successfully');
        }
        setServiceModal({ isOpen: false, mode: 'create', data: null });
      } else {
        showNotification(savedData.error || 'Failed to save service', 'error');
      }
    } catch (err) {
      showNotification('Failed to save service due to connection error', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const form = e.target;

    const payload = {
      ...projectModal.data,
      name: form.name.value,
      sector: form.sector.value,
      youtubeId: form.youtubeId.value,
      desc: form.desc.value,
    };

    try {
      const method = projectModal.mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const savedData = await res.json();

      if (res.ok) {
        if (projectModal.mode === 'create') {
          setProjects([...projects, savedData]);
          showNotification('Project created successfully');
        } else {
          setProjects(projects.map(p => p.id === savedData.id ? savedData : p));
          showNotification('Project updated successfully');
        }
        setProjectModal({ isOpen: false, mode: 'create', data: null });
      } else {
        showNotification(savedData.error || 'Failed to save project', 'error');
      }
    } catch (err) {
      showNotification('Failed to save project due to connection error', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Open modals
  const openServiceCreate = () => {
    setServiceModal({
      isOpen: true,
      mode: 'create',
      data: {
        title: '', slug: '', number: '', shortTitle: '', tagline: '', description: '',
        image: '', images: [], features: [], whyChoose: [], price: '', icon: ''
      }
    });
  };

  const openServiceEdit = (service) => {
    setServiceModal({
      isOpen: true,
      mode: 'edit',
      data: { ...service }
    });
  };

  const openProjectCreate = () => {
    setProjectModal({
      isOpen: true,
      mode: 'create',
      data: { name: '', sector: '', logo: '', youtubeId: '', desc: '' }
    });
  };

  const openProjectEdit = (project) => {
    setProjectModal({
      isOpen: true,
      mode: 'edit',
      data: { ...project }
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <img src="/logo.png" alt="AdPulse" className="sidebar-logo" />
          <span>CMS Panel</span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
            id="tab-btn-leads"
          >
            <FaInbox />
            <span>Leads Inbox</span>
            {leads.length > 0 && <span className="badge-count">{leads.length}</span>}
          </button>

          <button 
            className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
            id="tab-btn-services"
          >
            <FaCogs />
            <span>Services</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
            id="tab-btn-projects"
          >
            <FaFolderOpen />
            <span>Projects</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            id="tab-btn-settings"
          >
            <FaVideo />
            <span>Popup Video</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout" id="logout-btn">
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to AdPulse IMC website control dashboard.</p>
          </div>
          <div className="header-stats">
            <div className="stat-pill">{leads.length} leads</div>
            <div className="stat-pill">{services.length} services</div>
            <div className="stat-pill">{projects.length} projects</div>
          </div>
        </header>

        {/* Dynamic Notification Alert */}
        {message.text && (
          <div className={`notification-toast ${message.type === 'error' ? 'toast-error' : 'toast-success'}`} id="dashboard-notification">
            {message.type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Global Loading Spinner */}
        {loading ? (
          <div className="loading-state">
            <FaSpinner className="spin" />
            <p>Fetching database records...</p>
          </div>
        ) : (
          <div className="dashboard-content">
            
            {/* ── TAB 1: LEADS INBOX ── */}
            {activeTab === 'leads' && (
              <section className="section-card">
                <div className="section-header">
                  <h2>Leads & Inquiries Inbox</h2>
                  <p>View and manage client requests sent via contact forms.</p>
                </div>

                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Service Requested</th>
                        <th>Message Preview</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="no-data">No lead inquiries found in the database.</td>
                        </tr>
                      ) : (
                        leads.map((lead) => (
                          <tr key={lead.id}>
                            <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                            <td><strong>{lead.name}</strong></td>
                            <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                            <td><span className="badge-tag">{lead.service || 'General'}</span></td>
                            <td className="msg-preview">{lead.message}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-icon btn-view" onClick={() => setActiveLead(lead)} title="View Message">
                                  <FaEye />
                                </button>
                                <button className="btn-icon btn-delete" onClick={() => handleDeleteLead(lead.id)} disabled={actionLoading} title="Delete Lead">
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── TAB 2: SERVICES ── */}
            {activeTab === 'services' && (
              <section className="section-card">
                <div className="section-header flex-header">
                  <div>
                    <h2>Manage Services</h2>
                    <p>Add, edit, or delete services displayed on the website.</p>
                  </div>
                  <button className="btn-primary flex-btn" onClick={openServiceCreate}>
                    <FaPlus /> Add Service
                  </button>
                </div>

                <div className="grid-cards">
                  {services.length === 0 ? (
                    <div className="no-data-full">No services found. Click 'Add Service' to create one.</div>
                  ) : (
                    services.map((service) => (
                      <div className="card-item" key={service.id}>
                        <div className="card-image-wrapper">
                          <img src={service.image || '/images/services/production.png'} alt={service.title} />
                        </div>
                        <div className="card-body">
                          <span className="card-badge">{service.number || '00'}</span>
                          <h3>{service.title}</h3>
                          <p className="card-desc">{service.tagline}</p>
                          <div className="card-footer">
                            <span className="card-meta">Slug: <code>/{service.slug}</code></span>
                            <div className="action-buttons">
                              <button className="btn-icon btn-edit" onClick={() => openServiceEdit(service)} title="Edit">
                                <FaEdit />
                              </button>
                              <button className="btn-icon btn-delete" onClick={() => handleDeleteService(service.id)} disabled={actionLoading} title="Delete">
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* ── TAB 3: PROJECTS ── */}
            {activeTab === 'projects' && (
              <section className="section-card">
                <div className="section-header flex-header">
                  <div>
                    <h2>Manage Portfolio Case Studies</h2>
                    <p>Control the projects displayed in the "Our Work" portfolio grid.</p>
                  </div>
                  <button className="btn-primary flex-btn" onClick={openProjectCreate}>
                    <FaPlus /> Add Project
                  </button>
                </div>

                <div className="grid-cards">
                  {projects.length === 0 ? (
                    <div className="no-data-full">No portfolio projects found. Click 'Add Project' to create one.</div>
                  ) : (
                    projects.map((project) => (
                      <div className="card-item" key={project.id}>
                        <div className="card-image-wrapper youtube-preview">
                          <iframe 
                            src={`https://www.youtube.com/embed/${project.youtubeId}?mute=1&controls=0&showinfo=0`}
                            title={project.name}
                            frameBorder="0"
                            className="preview-iframe"
                          ></iframe>
                        </div>
                        <div className="card-body">
                          <span className="card-badge">{project.sector}</span>
                          <h3>{project.name}</h3>
                          <p className="card-desc">{project.desc}</p>
                          <div className="card-footer">
                            <span className="card-meta">Logo/Client: <code>{project.logo || 'N/A'}</code></span>
                            <div className="action-buttons">
                              <button className="btn-icon btn-edit" onClick={() => openProjectEdit(project)} title="Edit">
                                <FaEdit />
                              </button>
                              <button className="btn-icon btn-delete" onClick={() => handleDeleteProject(project.id)} disabled={actionLoading} title="Delete">
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* ── TAB 4: POPUP SETTINGS ── */}
            {activeTab === 'settings' && (
              <section className="section-card">
                <div className="section-header">
                  <h2>Homepage Video Popup Settings</h2>
                  <p>Upload a new MP4 video or change the popup video path that autoplays on first page load.</p>
                </div>

                <div className="settings-grid">
                  <div className="settings-form-panel">
                    <div className="form-group">
                      <label>Active Video Path/URL</label>
                      <input 
                        type="text" 
                        value={settings.active_popup_video} 
                        onChange={(e) => setSettings({ ...settings, active_popup_video: e.target.value })}
                        className="form-input" 
                        id="setting-video-url-input"
                      />
                      <p className="field-hint">Specify the path to the video (e.g. <code>/AdPulse 5 Years Celebration.mp4</code> or an uploaded video path like <code>/uploads/myvideo.mp4</code>).</p>
                    </div>

                    <button 
                      onClick={() => handleSaveSetting('active_popup_video', settings.active_popup_video)}
                      disabled={actionLoading}
                      className="btn-primary"
                      id="save-video-setting-btn"
                    >
                      {actionLoading ? 'Saving...' : 'Update Popup Video'}
                    </button>
                  </div>

                  <div className="settings-upload-panel">
                    <h3>Upload New Video File</h3>
                    <p>Select an MP4 video file to upload directly to the server. The filename will be sanitized and saved inside the <code>/uploads/</code> folder.</p>

                    <div className="file-upload-box">
                      <input 
                        type="file" 
                        accept="video/mp4" 
                        onChange={(e) => handleFileUpload(e, 'active_popup_video', 'settings')} 
                        id="video-file-upload-input"
                        disabled={uploadProgress.uploading}
                        className="hidden-file-input"
                      />
                      <label htmlFor="video-file-upload-input" className="file-upload-label">
                        <FaCloudUploadAlt className="upload-icon" />
                        <span>{uploadProgress.uploading && uploadProgress.targetField === 'active_popup_video' ? 'Uploading MP4 video...' : 'Select MP4 Video File'}</span>
                      </label>
                    </div>

                    {settings.active_popup_video && (
                      <div className="video-player-preview">
                        <h4>Live Video Preview</h4>
                        <video 
                          key={settings.active_popup_video}
                          src={settings.active_popup_video} 
                          controls 
                          muted 
                          className="preview-video-element"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

          </div>
        )}
      </main>

      {/* ── MODAL: VIEW LEAD DETAIL ── */}
      {activeLead && (
        <div className="modal-overlay" onClick={() => setActiveLead(null)}>
          <div className="modal-content lead-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Lead Details</h2>
              <button className="close-modal" onClick={() => setActiveLead(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="lead-detail-row">
                <span className="detail-label">Sender Name:</span>
                <span className="detail-val"><strong>{activeLead.name}</strong></span>
              </div>
              <div className="lead-detail-row">
                <span className="detail-label">Email Address:</span>
                <span className="detail-val"><a href={`mailto:${activeLead.email}`}>{activeLead.email}</a></span>
              </div>
              {activeLead.phone && (
                <div className="lead-detail-row">
                  <span className="detail-label">Phone Number:</span>
                  <span className="detail-val">{activeLead.phone}</span>
                </div>
              )}
              <div className="lead-detail-row">
                <span className="detail-label">Requested Service:</span>
                <span className="detail-val"><span className="badge-tag">{activeLead.service || 'General inquiry'}</span></span>
              </div>
              <div className="lead-detail-row">
                <span className="detail-label">Received Date:</span>
                <span className="detail-val">{new Date(activeLead.createdAt).toLocaleString()}</span>
              </div>
              <div className="lead-detail-row message-block">
                <span className="detail-label">Message:</span>
                <p className="detail-val message-text">{activeLead.message}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveLead(null)}>Close</button>
              <button className="btn-danger" onClick={() => handleDeleteLead(activeLead.id)} disabled={actionLoading}>Delete Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: CREATE/EDIT SERVICE ── */}
      {serviceModal.isOpen && serviceModal.data && (
        <div className="modal-overlay" onClick={() => setServiceModal({ isOpen: false, mode: 'create', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{serviceModal.mode === 'create' ? 'Create New Service' : 'Edit Service'}</h2>
              <button className="close-modal" onClick={() => setServiceModal({ isOpen: false, mode: 'create', data: null })}>&times;</button>
            </div>
            <form onSubmit={handleSaveService}>
              <div className="modal-body scrollable-body">
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="srv-title">Service Title *</label>
                    <input 
                      type="text" 
                      id="srv-title" 
                      name="title" 
                      defaultValue={serviceModal.data.title}
                      required 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="srv-slug">URL Slug (unique) *</label>
                    <input 
                      type="text" 
                      id="srv-slug" 
                      name="slug" 
                      defaultValue={serviceModal.data.slug}
                      placeholder="e.g. tvc-production"
                      required 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="srv-number">Display Number</label>
                    <input 
                      type="text" 
                      id="srv-number" 
                      name="number" 
                      defaultValue={serviceModal.data.number}
                      placeholder="e.g. 01"
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="srv-shortTitle">Short Title (Nav/Meta)</label>
                    <input 
                      type="text" 
                      id="srv-shortTitle" 
                      name="shortTitle" 
                      defaultValue={serviceModal.data.shortTitle}
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="srv-tagline">Tagline / Short description *</label>
                  <input 
                    type="text" 
                    id="srv-tagline" 
                    name="tagline" 
                    defaultValue={serviceModal.data.tagline}
                    required 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="srv-description">Full Content Description *</label>
                  <textarea 
                    id="srv-description" 
                    name="description" 
                    defaultValue={serviceModal.data.description}
                    rows="4" 
                    required 
                    className="form-textarea" 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="srv-image">Cover Image Path</label>
                    <input 
                      type="text" 
                      id="srv-image" 
                      name="image" 
                      value={serviceModal.data.image || ''} 
                      onChange={(e) => setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, image: e.target.value }
                      })}
                      placeholder="e.g. /images/services/production.png"
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group flex-none" style={{ alignSelf: 'flex-end' }}>
                    <div className="file-upload-btn-wrap">
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="srv-image-file" 
                        onChange={(e) => handleFileUpload(e, 'image', 'service')} 
                        className="hidden-file-input"
                      />
                      <label htmlFor="srv-image-file" className="btn-secondary py-btn">
                        {uploadProgress.uploading && uploadProgress.targetField === 'image' ? 'Uploading...' : 'Upload Image'}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="srv-features">Included Features (one per line)</label>
                  <textarea 
                    id="srv-features" 
                    name="features" 
                    defaultValue={serviceModal.data.features ? serviceModal.data.features.join('\n') : ''}
                    rows="3" 
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    className="form-textarea" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="srv-whyChoose">Why Choose Us Points (one per line)</label>
                  <textarea 
                    id="srv-whyChoose" 
                    name="whyChoose" 
                    defaultValue={serviceModal.data.whyChoose ? serviceModal.data.whyChoose.join('\n') : ''}
                    rows="3" 
                    placeholder="Reason 1&#10;Reason 2"
                    className="form-textarea" 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="srv-icon">React Icon Name (class)</label>
                    <input 
                      type="text" 
                      id="srv-icon" 
                      name="icon" 
                      defaultValue={serviceModal.data.icon}
                      placeholder="e.g. FaFilm"
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="srv-price">Price (Optional)</label>
                    <input 
                      type="text" 
                      id="srv-price" 
                      name="price" 
                      defaultValue={serviceModal.data.price}
                      className="form-input" 
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setServiceModal({ isOpen: false, mode: 'create', data: null })}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={actionLoading}>
                  {actionLoading ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: CREATE/EDIT PROJECT ── */}
      {projectModal.isOpen && projectModal.data && (
        <div className="modal-overlay" onClick={() => setProjectModal({ isOpen: false, mode: 'create', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{projectModal.mode === 'create' ? 'Create Portfolio Project' : 'Edit Project Details'}</h2>
              <button className="close-modal" onClick={() => setProjectModal({ isOpen: false, mode: 'create', data: null })}>&times;</button>
            </div>
            <form onSubmit={handleSaveProject}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="proj-name">Project Name *</label>
                  <input 
                    type="text" 
                    id="proj-name" 
                    name="name" 
                    defaultValue={projectModal.data.name}
                    placeholder="e.g. Diners Grand Opening Ceremony"
                    required 
                    className="form-input" 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="proj-sector">Industry Sector *</label>
                    <input 
                      type="text" 
                      id="proj-sector" 
                      name="sector" 
                      defaultValue={projectModal.data.sector}
                      placeholder="e.g. Retail Marketing"
                      required 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="proj-youtubeId">YouTube Video ID *</label>
                    <input 
                      type="text" 
                      id="proj-youtubeId" 
                      name="youtubeId" 
                      defaultValue={projectModal.data.youtubeId}
                      placeholder="e.g. eWxt66xPk-U"
                      required 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="proj-desc">Short Description / Campaign Outcome *</label>
                  <textarea 
                    id="proj-desc" 
                    name="desc" 
                    defaultValue={projectModal.data.desc}
                    rows="3" 
                    required 
                    className="form-textarea" 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="proj-logo">Client Brand Website / Logo Text</label>
                    <input 
                      type="text" 
                      id="proj-logo" 
                      name="logo" 
                      defaultValue={projectModal.data.logo}
                      placeholder="e.g. diners.com.pk"
                      className="form-input" 
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setProjectModal({ isOpen: false, mode: 'create', data: null })}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={actionLoading}>
                  {actionLoading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
