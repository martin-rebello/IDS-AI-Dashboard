import { LayoutDashboard, AlertTriangle, Activity, Settings, Shield } from 'lucide-react';

interface SidebarProps {
  activeView: 'dashboard' | 'alerts' | 'profiling' | 'config';
  setActiveView: (view: 'dashboard' | 'alerts' | 'profiling' | 'config') => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alerts' as const, label: 'Alertas', icon: AlertTriangle },
    { id: 'profiling' as const, label: 'Perfilado', icon: Activity },
    { id: 'config' as const, label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl">IDS-IA</h1>
            <p className="text-xs text-gray-400">Sistema de Detección</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm">AD</span>
          </div>
          <div>
            <p className="text-sm">Administrador</p>
            <p className="text-xs text-gray-400">admin@ids.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
