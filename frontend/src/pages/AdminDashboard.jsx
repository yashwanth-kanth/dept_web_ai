import React, { useState, useRef } from 'react';
import { useSession, signOut } from '../auth-client';
import { Navigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Calendar, Users as UsersIcon, Plus, Trash2, Edit3,
  ExternalLink, LogOut, Briefcase, Image as ImageIcon, Upload, CheckCircle, AlertCircle, Code as CodeIcon
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  if (isPending) return <div className="min-h-screen flex items-center justify-center font-black text-gray-400 uppercase tracking-widest">Loading...</div>;
  if (!session) return <Navigate to="/admin" />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'config', label: 'Site Config', icon: Settings },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'partners', label: 'Partners', icon: Briefcase },
    { id: 'users', label: 'Manage Users', icon: UsersIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        <div className="p-6">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Management</h2>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight transition-all ${activeTab === tab.id ? 'bg-redAccent text-white shadow-lg shadow-redAccent/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                <tab.icon size={18} />{tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-gray-100">
          <button onClick={async () => await signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 flex justify-between items-end">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">{tabs.find(t => t.id === activeTab).label}</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Administrator Control Panel • {session.user.name}</p>
          </div>
          <Link to="/" className="flex items-center gap-2 px-6 py-2 border-2 border-gray-200 rounded-full text-xs font-black uppercase tracking-widest text-gray-500 hover:border-redAccent hover:text-redAccent transition-all bg-white shadow-sm">
            Preview Site <ExternalLink size={14} />
          </Link>
        </header>
        <section className="bg-white rounded-[2.5rem] p-8 min-h-[600px] border border-gray-100 shadow-sm relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'config' && <ConfigTab />}
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'partners' && <PartnersTab />}
          {activeTab === 'users' && <UsersTab />}
        </section>
      </main>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100"><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Security</h3><p className="text-2xl font-black text-gray-900 leading-none">Vetted Admin</p></div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100"><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Content Power</h3><p className="text-2xl font-black text-gray-900 leading-none">Advanced CMS</p></div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100"><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Media Storage</h3><p className="text-2xl font-black text-gray-900 leading-none">Dynamic Uploads</p></div>
      </div>
      <div className="p-10 border border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center py-20">
        <LayoutDashboard className="text-redAccent/20 mb-6" size={64} />
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Enterprise Content Control</h2>
        <p className="text-gray-500 font-bold max-w-sm uppercase text-[10px] tracking-widest">Manage every text string and visual asset across your department website.</p>
      </div>
    </div>
  );
}

function ConfigTab() {
  const queryClient = useQueryClient();
  const { data: configs = [] } = useQuery({ queryKey: ['config'], queryFn: () => apiFetch.get('/api/config') });
  const [editingKey, setEditingKey] = useState(null);
  const [val, setVal] = useState('');
  const [selectedPage, setSelectedPage] = useState('Home');
  const [uploading, setUploading] = useState(null);

  const updateMutation = useMutation({
    mutationFn: ({ key, value }) => apiFetch.post('/api/config', { key, value }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['config'] }),
  });

  const handleUpdate = async (key, value) => {
    await updateMutation.mutateAsync({ key, value });
    setEditingKey(null);
  };

  const handleFileUpload = async (event, key) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(key);
    try {
      const { url } = await apiFetch.upload(file);
      await handleUpdate(key, url);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(null);
    }
  };

  const defaultKeys = [
    { key: 'global_custom_css', label: 'Custom CSS Overrides', page: 'Style', type: 'code' },
    { key: 'global_site_title', label: 'Browser Tab Title', page: 'Global', type: 'text' },
    { key: 'global_favicon_url', label: 'Favicon URL', page: 'Header', type: 'image' },
    { key: 'navbar_links', label: 'Navbar Links (JSON Array)', page: 'Header', type: 'textarea' },
    { key: 'chat_header_title', label: 'Chat Popup Title', page: 'Global', type: 'text' },
    { key: 'chat_body_title', label: 'Chat Support Text', page: 'Global', type: 'textarea' },
    { key: 'header_logo', label: 'Navbar Logo', page: 'Header', type: 'image' },
    { key: 'header_title_main', label: 'Institution Name (Navbar)', page: 'Header', type: 'text' },
    { key: 'header_title_sub', label: 'Institution Tagline (Navbar)', page: 'Header', type: 'text' },
    { key: 'footer_logo', label: 'Footer Logo', page: 'Footer', type: 'image' },
    { key: 'footer_bg_image', label: 'Footer Background Photo', page: 'Footer', type: 'image' },
    { key: 'footer_title', label: 'Institution Name (Footer)', page: 'Footer', type: 'text' },
    { key: 'footer_subtitle', label: 'Department Name (Footer)', page: 'Footer', type: 'text' },
    { key: 'footer_address', label: 'Full Campus Address', page: 'Footer', type: 'textarea' },
    { key: 'footer_location_extra', label: 'Location Details', page: 'Footer', type: 'text' },
    { key: 'footer_linkedin_url', label: 'LinkedIn URL', page: 'Footer', type: 'text' },
    { key: 'footer_instagram_url', label: 'Instagram URL', page: 'Footer', type: 'text' },
    { key: 'footer_facebook_url', label: 'Facebook URL', page: 'Footer', type: 'text' },
    { key: 'footer_youtube_url', label: 'YouTube URL', page: 'Footer', type: 'text' },
    { key: 'footer_copyright_text', label: 'Copyright Entity', page: 'Footer', type: 'text' },
    { key: 'hero_title_pre', label: 'Hero Title (Prefix)', page: 'Home', type: 'text' },
    { key: 'hero_title_main', label: 'Hero Title (Main Red)', page: 'Home', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', page: 'Home', type: 'textarea' },
    { key: 'home_admissions_image', label: 'Admissions Section Photo', page: 'Home', type: 'image' },
    { key: 'home_admissions_title', label: 'Admissions Section Title', page: 'Home', type: 'text' },
    { key: 'home_admissions_text', label: 'Admissions Section Text', page: 'Home', type: 'textarea' },
    { key: 'about_campus_image', label: 'Campus Hero Photo', page: 'About', type: 'image' },
    { key: 'vision_statement', label: 'Department Vision', page: 'About', type: 'textarea' },
    { key: 'mission_statement', label: 'Department Mission', page: 'About', type: 'textarea' },
    { key: 'about_story_text', label: 'Department Story', page: 'About', type: 'textarea' },
    { key: 'events_page_description', label: 'Events Page Description', page: 'Events', type: 'textarea' },
    { key: 'gallery_page_description', label: 'Gallery Page Description', page: 'Gallery', type: 'textarea' },
    { key: 'contact_email', label: 'Public Email', page: 'Contact', type: 'text' },
    { key: 'contact_phone', label: 'Public Phone Number', page: 'Contact', type: 'text' },
    { key: 'theme_primary_color', label: 'Primary Brand Color', page: 'Style', type: 'color' },
    { key: 'theme_accent_color', label: 'Accent/Highlight Color', page: 'Style', type: 'color' },
    { key: 'header_bg_color', label: 'Navbar Background Color', page: 'Style', type: 'color' },
    { key: 'footer_bg_color', label: 'Footer Background Color', page: 'Style', type: 'color' },
    { key: 'placement_package', label: 'Average CTC (LPA)', page: 'Global', type: 'text' },
    { key: 'placement_rate', label: 'Placement Percentage', page: 'Global', type: 'text' },
    { key: 'students_enrolled', label: 'Total Students', page: 'Global', type: 'text' },
    { key: 'research_publications', label: 'Research Papers', page: 'Global', type: 'text' },
  ];

  const pages = ['Home', 'Footer', 'About', 'Events', 'Gallery', 'Contact', 'Header', 'Global', 'Style'];
  const filteredKeys = defaultKeys.filter(k => k.page === selectedPage);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 flex-wrap gap-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-3 min-w-fit">Select Module</h3>
        <div className="flex flex-wrap gap-2">
          {pages.map(p => (
            <button key={p} onClick={() => setSelectedPage(p)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedPage === p ? 'bg-redAccent text-white shadow-lg shadow-redAccent/20' : 'bg-white text-gray-500 hover:text-gray-900 border border-gray-100 hover:border-gray-300'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {filteredKeys.map(item => {
          const config = configs.find(c => c.key === item.key);
          const isImage = item.type === 'image';
          const isCode = item.type === 'code';
          return (
            <div key={item.key} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5">
              <div className="flex-1 md:mr-10">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</h4>
                  {isImage && <ImageIcon size={12} className="text-gray-300" />}
                  {isCode && <CodeIcon size={12} className="text-redAccent" />}
                </div>
                {editingKey === item.key ? (
                  <div className="animate-in fade-in zoom-in-95">
                    {item.type === 'textarea' || isCode ? (
                      <textarea value={val} onChange={e => setVal(e.target.value)} placeholder={isCode ? "/* Enter global CSS overrides here */" : ""}
                        className={`w-full bg-white border border-gray-200 p-4 rounded-2xl font-bold text-gray-900 outline-none focus:ring-2 focus:ring-redAccent/20 min-h-[120px] ${isCode ? 'font-mono text-sm' : ''}`} autoFocus />
                    ) : item.type === 'color' ? (
                      <div className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-2xl">
                        <input type="color" value={val || '#000000'} onChange={e => setVal(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 bg-transparent" autoFocus />
                        <input type="text" value={val} onChange={e => setVal(e.target.value)} className="flex-1 font-mono font-bold text-gray-900 outline-none" placeholder="#000000" />
                      </div>
                    ) : (
                      <input value={val} onChange={e => setVal(e.target.value)} className="w-full bg-white border border-gray-200 p-4 rounded-2xl font-bold text-gray-900 outline-none focus:ring-2 focus:ring-redAccent/20" autoFocus />
                    )}
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleUpdate(item.key, val)} className="bg-redAccent text-white px-8 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-redAccent/20">Apply Change</button>
                      <button onClick={() => setEditingKey(null)} className="bg-white border border-gray-200 text-gray-400 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {isImage ? (
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl border-2 border-white shadow-inner overflow-hidden">
                          {config?.value ? <img src={config.value} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-gray-200" /></div>}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-300 uppercase truncate max-w-[200px]">{config?.value ? config.value.split('/').pop() : 'No file selected'}</p>
                          <div className="flex gap-2 mt-2">
                            <label className={`cursor-pointer flex items-center gap-2 px-6 py-2 bg-white border border-gray-100 rounded-xl font-black text-[9px] uppercase tracking-widest text-gray-500 hover:text-redAccent hover:border-redAccent transition-all shadow-sm ${uploading === item.key ? 'opacity-50 pointer-events-none' : ''}`}>
                              {uploading === item.key ? <>Uploading...</> : <><Upload size={14} /> Upload New</>}
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, item.key)} />
                            </label>
                            <button onClick={() => { setEditingKey(item.key); setVal(config?.value || ''); }} className="px-4 py-2 text-[9px] font-black uppercase text-gray-400 hover:text-gray-900 tracking-widest">Manually Set URL</button>
                          </div>
                        </div>
                      </div>
                    ) : isCode ? (
                      <div className="bg-gray-900/5 p-4 rounded-xl border border-gray-200 mt-1">
                        <code className="text-[10px] text-red-900 font-mono block whitespace-pre-wrap">{config?.value ? config.value.substring(0, 200) + (config.value.length > 200 ? '...' : '') : '/* No overrides defined */'}</code>
                      </div>
                    ) : (
                      <p className="text-xl font-black text-gray-900 leading-tight tracking-tight whitespace-pre-wrap">{config?.value || <span className="text-gray-300">Not Configured</span>}</p>
                    )}
                  </div>
                )}
              </div>
              {!isImage && editingKey !== item.key && (
                <button onClick={() => { setEditingKey(item.key); setVal(config?.value || ''); }} className={`mt-4 md:mt-0 p-4 bg-white border border-gray-100 text-gray-300 hover:text-redAccent rounded-2xl transition-all shadow-sm hover:shadow-lg ${isCode ? 'border-red-100 bg-red-50/10' : ''}`}>
                  <Edit3 size={20} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventsTab() {
  const queryClient = useQueryClient();
  const { data: events = [] } = useQuery({ queryKey: ['events'], queryFn: () => apiFetch.get('/api/events') });
  const [showAdd, setShowAdd] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', venue: '', description: '', status: 'upcoming', isFeatured: false, rsvps_count: 0, image: '' });

  const createMutation = useMutation({
    mutationFn: (data) => apiFetch.post('/api/events', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => apiFetch.patch(`/api/events/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => apiFetch.delete(`/api/events/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    await createMutation.mutateAsync(formData);
    setShowAdd(false);
    setFormData({ title: '', date: '', venue: '', description: '', status: 'upcoming', isFeatured: false, rsvps_count: 0, image: '' });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await apiFetch.upload(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };

  const toggleFeatured = async (event) => {
    await updateMutation.mutateAsync({ id: event.id, ...event, isFeatured: !event.isFeatured });
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setShowAdd(!showAdd)} className="bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-redAccent transition-all shadow-xl shadow-black/10">
        {showAdd ? 'Discard Entry' : 'Create New Event'}
      </button>
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-300 shadow-sm">
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Event Title</label>
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold text-gray-900" required />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Date</label>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold" required />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Venue</label>
            <input value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold" required />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold min-h-[120px]" required />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Event Banner</label>
            <div className="flex items-center gap-6 p-5 bg-white rounded-2xl border border-gray-100">
              {formData.image && <img src={formData.image} className="w-20 h-20 rounded-xl object-cover" />}
              <label className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-redAccent transition-colors">
                {uploading ? 'Uploading...' : <><Upload size={16} /> Choose File</>}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 bg-white rounded-2xl border border-gray-100 py-3">
            <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-6 h-6 accent-redAccent" />
            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Feature in Showcase</label>
          </div>
          <button type="submit" className="md:col-span-2 bg-redAccent text-white p-5 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-redAccent/20 transform hover:-translate-y-1 transition-all">Publish Event</button>
        </form>
      )}
      <div className="grid gap-4 mt-10">
        {events.map(event => (
          <div key={event.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              {event.image ? (
                <img src={event.image} className="w-16 h-16 rounded-2xl object-cover grayscale brightness-95" />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400"><Calendar size={28} /></div>
              )}
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-black text-gray-900 uppercase tracking-tight">{event.title}</h4>
                  {event.isFeatured && <span className="bg-yellow-400 text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Spotlight</span>}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{event.venue} • {new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => toggleFeatured(event)} className={`p-3 rounded-xl transition-all ${event.isFeatured ? 'text-yellow-500 bg-white shadow-sm' : 'text-gray-300 hover:bg-white'}`}><Plus size={18} /></button>
              <button onClick={() => deleteMutation.mutate(event.id)} className="p-3 bg-white text-gray-300 hover:text-redAccent rounded-xl shadow-sm transition-all"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnersTab() {
  const queryClient = useQueryClient();
  const { data: partners = [] } = useQuery({ queryKey: ['partners'], queryFn: () => apiFetch.get('/api/partners') });
  const [formData, setFormData] = useState({ name: '', logo: '', image: '', icon: 'Cpu', tags: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [uploading, setUploading] = useState(null);

  const addMutation = useMutation({
    mutationFn: (data) => apiFetch.post('/api/partners', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => apiFetch.delete(`/api/partners/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] }),
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    await addMutation.mutateAsync({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(t => t) });
    setFormData({ name: '', logo: '', image: '', icon: 'Cpu', tags: '' });
    setShowAdd(false);
  };

  const handlePartnerUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(type);
    try {
      const { url } = await apiFetch.upload(file);
      setFormData(prev => ({ ...prev, [type]: url }));
    } catch (err) { alert(err.message); }
    finally { setUploading(null); }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setShowAdd(!showAdd)} className="bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-redAccent transition-all shadow-xl shadow-black/10">
        {showAdd ? 'Close' : 'Add Strategic Partner'}
      </button>
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-300">
          <div>
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Partner Name</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold" required />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">GrayScale Logo</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 p-5 bg-white border border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:border-redAccent hover:text-redAccent transition-all">
                {uploading === 'logo' ? 'Uploading...' : 'Choose File'}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePartnerUpload(e, 'logo')} />
              </label>
              {formData.logo && <div className="w-12 h-12 bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center text-[8px] font-black text-green-500"><CheckCircle size={14} /></div>}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Showcase Image</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 p-5 bg-white border border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:border-redAccent hover:text-redAccent transition-all">
                {uploading === 'image' ? 'Uploading...' : 'Choose File'}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePartnerUpload(e, 'image')} />
              </label>
              {formData.image && <div className="w-12 h-12 bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center text-[8px] font-black text-green-500"><CheckCircle size={14} /></div>}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Tech Icon (e.g. Cpu)</label>
            <input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase ml-2">Categorical Tags (Comma Separated)</label>
            <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-white border border-gray-100 p-5 rounded-2xl font-bold" placeholder="CORE, MENTORSHIP..." />
          </div>
          <button type="submit" className="md:col-span-2 bg-redAccent text-white p-5 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-redAccent/20">Finalize Partner</button>
        </form>
      )}
      <div className="grid gap-4 mt-6">
        {partners.map(p => (
          <div key={p.id} className="p-6 bg-white rounded-3xl border border-gray-100 flex items-center justify-between group shadow-sm">
            <div className="flex items-center gap-6">
              <img src={p.logo} className="w-12 h-12 object-contain grayscale" />
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-tight">{p.name}</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {p.tags?.map((t, i) => <span key={i} className="text-[8px] font-black bg-gray-50 px-2 py-0.5 rounded text-gray-400 border border-gray-100">{t}</span>)}
                </div>
              </div>
            </div>
            <button onClick={() => deleteMutation.mutate(p.id)} className="p-3 text-gray-300 hover:text-redAccent transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      const res = await fetch('/api/auth/sign-up/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.message || 'Failed');
      setSuccessMsg(`Account Created: ${name}`);
      setEmail(''); setPassword(''); setName('');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl px-4 py-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-gray-900 rounded-3xl text-white shadow-xl shadow-gray-900/40"><UsersIcon size={32} /></div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Identity Management</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Create authorized administrative access.</p>
        </div>
      </div>
      {successMsg && (
        <div className="mb-8 p-6 bg-green-50 border border-green-100 text-green-700 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-4">
          <CheckCircle size={24} /><span className="font-black uppercase text-xs tracking-widest">{successMsg}</span>
        </div>
      )}
      <form onSubmit={handleCreateUser} className="space-y-6 bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-3">Administrator Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-5 bg-white border border-gray-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-redAccent/10" required />
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-3">Secure Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-5 bg-white border border-gray-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-redAccent/10" required />
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-3">Access Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-5 bg-white border border-gray-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-redAccent/10" required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-black text-white font-black p-6 rounded-3xl hover:bg-redAccent transition-all shadow-2xl shadow-black/20 disabled:opacity-50 uppercase tracking-widest text-xs mt-4">
          {loading ? 'Validating...' : 'Authorize New Admin'}
        </button>
      </form>
    </div>
  );
}
