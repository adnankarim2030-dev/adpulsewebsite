import './admin.css';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let leads = [];
  let servicesCount = 0;
  let projectsCount = 0;
  let dbError = null;

  try {
    const { prisma } = await import('@/lib/prisma');
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    servicesCount = await prisma.service.count();
    projectsCount = await prisma.project.count();
  } catch (error) {
    console.error('Admin Dashboard database error:', error);
    dbError = error.message || 'Database connection error';
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        {dbError ? (
          <div style={{ backgroundColor: '#fff5f5', color: '#c41e1e', padding: '1rem', borderRadius: '5px', border: '1px solid #fda4a4', marginTop: '1rem', width: '100%', boxSizing: 'border-box' }}>
            ⚠️ Database connection failed: {dbError}. Please ensure DATABASE_URL is set in your server's .env file.
          </div>
        ) : (
          <div className="admin-stats">
            <span>{leads.length} Leads</span> | 
            <span> {servicesCount} Services</span> | 
            <span> {projectsCount} Projects</span>
          </div>
        )}
      </div>

      <div className="admin-nav">
        <button className="active">Leads</button>
        <button>Services</button>
        <button>Projects</button>
      </div>

      <div className="data-section">
        <h3>Recent Leads</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No leads found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td><strong>{lead.name}</strong></td>
                  <td>{lead.email}</td>
                  <td>{lead.service || 'N/A'}</td>
                  <td>
                    <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.message}
                    </div>
                  </td>
                  <td>
                    <button className="btn-action">View</button>
                    <button className="btn-action btn-delete">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="data-section" style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Content</h3>
          <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>+ ADD NEW</button>
        </div>
        <p style={{ color: '#666', marginTop: '1rem' }}>
          Use the tabs above to manage services and portfolio projects. This dashboard provides a central hub for all AdPulse operations.
        </p>
      </div>
    </div>
  );
}
