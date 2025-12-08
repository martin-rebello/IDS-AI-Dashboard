import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, Shield, AlertCircle, Activity, Server } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from './ui/badge';

// Mock data para gráficos
const trafficData = [
  { time: '00:00', normal: 450, anomalias: 2 },
  { time: '02:00', normal: 380, anomalias: 1 },
  { time: '04:00', normal: 320, anomalias: 0 },
  { time: '06:00', normal: 420, anomalias: 3 },
  { time: '08:00', normal: 680, anomalias: 5 },
  { time: '10:00', normal: 890, anomalias: 12 },
  { time: '12:00', normal: 920, anomalias: 8 },
  { time: '14:00', normal: 850, anomalias: 6 },
  { time: '16:00', normal: 780, anomalias: 4 },
  { time: '18:00', normal: 650, anomalias: 7 },
  { time: '20:00', normal: 520, anomalias: 3 },
  { time: '22:00', normal: 480, anomalias: 2 },
];

const topThreats = [
  { name: 'DoS Attack', count: 127, severity: 'critical' },
  { name: 'Port Scan', count: 89, severity: 'high' },
  { name: 'Brute Force', count: 56, severity: 'high' },
  { name: 'SQL Injection', count: 34, severity: 'medium' },
  { name: 'Data Exfiltration', count: 12, severity: 'critical' },
];

const threatDistribution = [
  { name: 'DoS', value: 127, color: '#ef4444' },
  { name: 'Port Scan', value: 89, color: '#f97316' },
  { name: 'Brute Force', value: 56, color: '#f59e0b' },
  { name: 'SQL Injection', value: 34, color: '#eab308' },
  { name: 'Otros', value: 12, color: '#6b7280' },
];

export function DashboardView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Panel de Control Principal</h1>
        <p className="text-gray-600">Monitoreo en tiempo real de la seguridad de red</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Tasa de Detección</CardTitle>
            <Shield className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 mb-1">96.8%</div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+2.3% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Falsos Positivos (FPR)</CardTitle>
            <AlertCircle className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 mb-1">2.4%</div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>-0.8% mejora</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Alertas Activas</CardTitle>
            <Activity className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 mb-1">38</div>
            <div className="flex items-center gap-1 text-orange-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>15 críticas</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Sensores Activos</CardTitle>
            <Server className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 mb-1">24/25</div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <span>96% disponibilidad</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tráfico de Red - Últimas 24 Horas</CardTitle>
            <p className="text-sm text-gray-600">Línea base normal vs. actividad anómala detectada</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="normal" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Tráfico Normal" />
                <Area type="monotone" dataKey="anomalias" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} name="Anomalías" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Amenazas</CardTitle>
            <p className="text-sm text-gray-600">Tipos detectados hoy</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Amenazas y Estado del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Amenazas Detectadas</CardTitle>
            <p className="text-sm text-gray-600">Ataques más frecuentes en las últimas 24 horas</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topThreats.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm text-gray-700">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{threat.name}</p>
                      <p className="text-sm text-gray-600">{threat.count} detecciones</p>
                    </div>
                  </div>
                  <Badge 
                    variant={threat.severity === 'critical' ? 'destructive' : 'default'}
                    className={threat.severity === 'high' ? 'bg-orange-500' : threat.severity === 'medium' ? 'bg-yellow-500' : ''}
                  >
                    {threat.severity === 'critical' ? 'Crítica' : threat.severity === 'high' ? 'Alta' : 'Media'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado del Sistema</CardTitle>
            <p className="text-sm text-gray-600">Salud de componentes principales</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-gray-900">Motor de IA</p>
                    <p className="text-sm text-gray-600">Funcionando óptimamente</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Activo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-gray-900">Base de Datos de Perfiles</p>
                    <p className="text-sm text-gray-600">Actualizada hace 5 min</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Sincronizado</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div>
                    <p className="text-gray-900">Sensor 12 (DMZ)</p>
                    <p className="text-sm text-gray-600">Latencia elevada detectada</p>
                  </div>
                </div>
                <Badge className="bg-yellow-500">Advertencia</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-gray-900">Sistema de Alertas</p>
                    <p className="text-sm text-gray-600">38 alertas procesadas</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Operacional</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
