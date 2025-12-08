import { useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { AlertsView } from './components/AlertsView';
import { ProfilingView } from './components/ProfilingView';
import { ConfigView } from './components/ConfigView';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'alerts' | 'profiling' | 'config'>('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'alerts' && <AlertsView />}
        {activeView === 'profiling' && <ProfilingView />}
        {activeView === 'config' && <ConfigView />}
      </main>
    </div>
  );
}
